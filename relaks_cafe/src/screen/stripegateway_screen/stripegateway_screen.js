import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    StatusBar,
} from 'react-native';

import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

import { Secret_key, STRIPE_PUBLISHABLE_KEY } from '../../assert/key/key';

import { useSelector, useDispatch } from 'react-redux';
import { setCartItems } from '../../redux/actions';

import { Funtion_Place_Foods_Order } from '../../assert/networks/api_calls';
import { Actions } from 'react-native-router-flux';

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
    const dispatch = useDispatch();

    const [CardInput, setCardInput] = React.useState({})

    const onSubmit = async () => {

        if (CardInput.valid == false || typeof CardInput.valid == "undefined") {
            alert('Invalid Credit Card');
            return false;
        }

        let creditCardToken;
        try {
            // Create a credit card token
            creditCardToken = await getCreditCardToken(CardInput);
            // console.log("creditCardToken", creditCardToken)
            if (creditCardToken.error) {
                alert("creditCardToken error");
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
            alert(error)
        } else {

            let pament_data = await charges();
            console.log('pament_data', pament_data);
            alert("response " + JSON.stringify(pament_data.id));

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

            list.forEach(element => {

                if(element.dealType == "item"){
                    var obj = {
                        "foodItemId": element.foodItemId,
                        "portionId": element.portionId,
                        "quantity": element.quantity,
                        "note": element.note
                    }
                    dummyData.push(obj);
                }else{

                    var tmpList = element.dealItem;
                    tmpList.forEach((dels)=>{
                        var obj = {
                            "foodItemId": dels.foodItem.id,
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
                alert("Payment Successfully");
                Funtion_Place_Foods_Order(orderObj).then((response) => {
                   // alert("order place Successfully " + JSON.stringify(response));
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

                    Actions.authenticated();
                    //clear redux store
                }).catch((error) => {
                    console.log("error happen place oder " + error);
                });
            }
            else {
                alert('Payment failed');
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
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#2471A3" />
            <Image
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Stripe_logo%2C_revised_2016.png/1200px-Stripe_logo%2C_revised_2016.png' }}
                style={styles.ImgStyle}
            />
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
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    ImgStyle: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        borderRadius: 8,
    },
    button: {
        backgroundColor: 'yellow',
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
    }

});

//make this component available to the app
export default StripeGateway;