import React, { PropTypes, Component, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    StatusBar,
    SafeAreaView,
    ActivityIndicator
} from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

import { Secret_key, STRIPE_PUBLISHABLE_KEY } from '../../assert/key/key';

import { useSelector, useDispatch } from 'react-redux';
import { setCartItems } from '../../redux/actions';

import { Funtion_Place_Foods_Order } from '../../assert/networks/api_calls';
import { Actions } from 'react-native-router-flux';

import AwesomeAlert from 'react-native-awesome-alerts';

import GET_TOKEN from '../../assert/networks/dataAccess';

const Payemnts_Icons = require('../../assert/images/pays.png');


const CURRENCY = 'USD';
var CARD_TOKEN = null;

function getCreditCardToken(creditCardData) {
    // alert()
    const card = {
        'card[number]': creditCardData.values.number.replace(/ /g, ''),
        'card[exp_month]': creditCardData.values.expiry.split('/')[0],
        'card[exp_year]': creditCardData.values.expiry.split('/')[1],
        'card[cvc]': creditCardData.values.cvc
    };
    return fetch('https://api.stripe.com/v1/tokens', {
        headers: {
            // Use the correct MIME type for your server
            Accept: 'application/json',
            // Use the correct Content Type to send data to Stripe
            'Content-Type': 'application/x-www-form-urlencoded',
            // Use the Stripe publishable key as Bearer
            Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
        },
        // Use a proper HTTP method
        method: 'post',
        // Format the credit card data to a string of key-value pairs
        // divided by &
        body: Object.keys(card)
            .map(key => key + '=' + card[key])
            .join('&')
    }).
        then(response => response.json())
        .catch((error) => console.log(error))
};
/**
 * The method imitates a request to our server.
 *
 * @param creditCardToken
 * @return {Promise<Response>}
 */
function subscribeUser(creditCardToken) {
    return new Promise((resolve) => {
        console.log('Credit card token\n', creditCardToken);
        CARD_TOKEN = creditCardToken.id;
        setTimeout(() => {
            resolve({ status: true });
        }, 1000);
    });
};

const StripeGateway = () => {

    const { items } = useSelector(state => state.userReducer);
    const { user } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const [CardInput, setCardInput] = React.useState({})
    const [show, setShow] = useState(false);
    const [modelTitel, setModelTitel] = useState("");
    const [modelMessage, setModelMessage] = useState("");

    const [spinerVisible, setSpinerVisible] = useState(false);

    const onSubmit = async () => {

        setSpinerVisible(true);

        if (CardInput.valid == false || typeof CardInput.valid == "undefined") {
            //alert('Invalid Credit Card');
            setModelTitel("Error");
            setModelMessage("Invalid Credit Card. Try again");
            setSpinerVisible(false);
            setShow(true);
            return false;
        }
        let creditCardToken;
        try {
            // Create a credit card token
            creditCardToken = await getCreditCardToken(CardInput);
            // console.log("creditCardToken", creditCardToken)
            if (creditCardToken.error) {
                //alert("creditCardToken error");
                setModelTitel("Error");
                setModelMessage("Somthing went wrong. Try again");
                setSpinerVisible(false);
                setShow(true);
                return;
            }
        } catch (e) {
            console.log("e", e);
            return;
        }
        // Send a request to your server with the received credit card token
        const { error } = await subscribeUser(creditCardToken);
        // Handle any errors from your server
        if (error) {
            // alert(error)
        } else {

            let pament_data = await charges();
            console.log('pament_data', pament_data);
            //alert("response " + JSON.stringify(pament_data.id));

            var orderObj = {
                "isDelivery": items.isDelivery,
                "refId": pament_data.id,
                "noOfItems": items.noOfItems, //qty
                "totalPrice": items.totalPrice,
                "promotionId": items.promotionId,
                "location": {
                    "latitude": items.location.latitude,
                    "longitude": items.location.longitude
                },
                "foodItems": items.foodItems,
            };

            dispatch(setCartItems(orderObj));

            //make calling api for server side

            var list = items.foodItems;

            var dummyData = [];

            console.log("cart " + JSON.stringify(list));

            list.forEach(element => {

                if (element.dealType == "item") {
                    var obj = {
                        "id": element.id,
                        "portionId": element.portionId,
                        "quantity": element.quantity,
                        "note": element.note
                    }
                    dummyData.push(obj);
                } else {

                    var tmpList = element.dealItem;
                    tmpList.forEach((dels) => {
                        var obj = {
                            "id": dels.foodItem.id,
                            "portionId": dels.portion.id,
                            "quantity": (parseInt(dels.quantity) * parseInt(element.quantity)),
                            "note": element.note
                        }
                        dummyData.push(obj);
                    });
                }
            });

            orderObj.foodItems = dummyData;

            console.log("final order obj " + JSON.stringify(orderObj));

            if (pament_data.status == 'succeeded') {
                //alert("Payment Successfully");

                console.log("tokens " + user.token);

                Funtion_Place_Foods_Order(orderObj, user.token).then((response) => {
                    //alert("order place Successfully " + JSON.stringify(response));
                    if (response.code == '201') {
                        var dts = {
                            "isDelivery": false,
                            "refId": "",
                            "noOfItems": 0,
                            "totalPrice": 0.00,
                            "promotionId": 0,
                            "location": {
                                "latitude": "34.052235",
                                "longitude": "-118.243683"
                            },
                            "foodItems": []
                        }

                        dispatch(setCartItems(dts));

                        //Actions.authenticated();
                        // Actions.OrderSt();
                        setSpinerVisible(false);
                        Actions.OrderSt({ "orderStatus": "Pending" });
                    } else if (response.code == '401') {
                        setModelTitel("Error");
                        setModelMessage("Authentication Fail, Plase login again");
                        setSpinerVisible(false);
                        setShow(true);
                        //redirct to login page
                        //show eorr
                    } else if (response.code == '500') {
                        //server error
                        setModelTitel("Error");
                        setModelMessage("Something went wrong, try again later");
                        setSpinerVisible(false);
                        setShow(true);
                    } else if (response.code == "502") {
                        setModelTitel("Error");
                        setModelMessage("Something went wrong, try again later");
                        setSpinerVisible(false);
                        setShow(true);
                    }
                    //clear redux store
                }).catch((error) => {
                    console.log("error happen place oder " + error);
                    setSpinerVisible(false);
                });
            }
            else {
                //alert('Payment failed');
                setModelTitel("Error");
                setModelMessage("Payment Failed, try again later");
                setSpinerVisible(false);
                setShow(true);
            }
        }
    };

    const charges = async () => {
        const card = {
            'amount': items.totalPrice,
            'currency': CURRENCY,
            'source': CARD_TOKEN,
            'description': "Order from mobile app"
        };

        return fetch('https://api.stripe.com/v1/charges', {
            headers: {
                // Use the correct MIME type for your server
                Accept: 'application/json',
                // Use the correct Content Type to send data to Stripe
                'Content-Type': 'application/x-www-form-urlencoded',
                // Use the Stripe publishable key as Bearer
                Authorization: `Bearer ${Secret_key}`
            },
            // Use a proper HTTP method
            method: 'post',
            // Format the credit card data to a string of key-value pairs
            // divided by &
            body: Object.keys(card)
                .map(key => key + '=' + card[key])
                .join('&')
        }).then(response => response.json());
    };



    const _onChange = (data) => {
        setCardInput(data)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#2471A3" />
                
                <View style={{ width : '100%', alignItems:'center' }}>
                <Image
                    //source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Stripe_logo%2C_revised_2016.png/1200px-Stripe_logo%2C_revised_2016.png' }}
                    source={Payemnts_Icons}
                    style={styles.ImgStyle}
                    resizeMode={'contain'}
                />
                </View>
                <CreditCardInput
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    validColor="#fff"
                    placeholderColor="#ccc"
                    onChange={_onChange} />

                <TouchableOpacity
                    onPress={onSubmit}
                    //onPress={()=>{alert("press");}}
                    style={styles.button}>
                    <Text
                        style={styles.buttonText}>
                        Pay Now
                    </Text>
                </TouchableOpacity>

                <AwesomeAlert
                    show={show}
                    showProgress={false}
                    title={modelTitel}
                    message={modelMessage}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="cancel"
                    confirmText="Ok"
                    confirmButtonColor="red" //#DD6B55
                    onCancelPressed={() => {
                        setShow(false);
                    }}
                    onConfirmPressed={() => {
                        setShow(false);
                    }}
                />
                {(spinerVisible) ?
                <View
                    style={{
                        flex: 1,
                        position: "absolute",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0.8,
                        width: wp("100%"),
                        height: hp("100%"),
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        //zIndex:1
                    }}
                >

                    <View style={styles.activityindicator_view}>
                        <ActivityIndicator animating size="large" color="#F5FCFF" />
                        <Text
                            style={{
                                color: "#000000"
                            }}
                        >
                            loading
                        </Text>
                    </View>
                </View>
                // <Feching_Loader/>
                : null}
            </View>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    ImgStyle: {
        width: '92%',
        height: 200,
        resizeMode: 'contain',
        borderRadius: 8,
        
    },
    button: {
        backgroundColor: '#EB1F25',
        width: 150,
        height: 45,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 15,
        color: '#000',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    inputContainerStyle: {
        backgroundColor: '#fff',
        borderRadius: 5
    },
    inputStyle: {
        backgroundColor: '#222242',
        paddingLeft: 15,
        borderRadius: 5,
        color: '#fff'
    },
    labelStyle: {
        marginBottom: 5,
        fontSize: 12
    },
    activityindicator_view: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        width: 100,
        height: 100,
        opacity: 1,
        borderRadius: 20
    }

});

//make this component available to the app
export default StripeGateway;