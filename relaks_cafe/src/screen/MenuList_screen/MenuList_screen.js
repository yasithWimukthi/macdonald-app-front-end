import React, { PropTypes, Component, useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import ZigzagView from "react-native-zigzag-view"
import { Actions } from 'react-native-router-flux';
import { Funtion_Get_Foods_List } from '../../assert/networks/api_calls';

import AwesomeAlert from 'react-native-awesome-alerts';

import { useSelector, useDispatch } from 'react-redux';
import { setCartItems } from '../../redux/actions';

import BottomBarView from '../../componet/bootmTabBar';

const FeaturesMenuItem = ({ imageUrl, MenuName, singleInfo, mealInfo }) => {
    return (
        <ZigzagView
            backgroundColor="#E9E9E9"
            surfaceColor="#F8F8F8"
            bottom={true}
            top={false}
        >
            <TouchableOpacity onPress={() => { Actions.SingleFood(); }}>
                <View style={Styles.FeatureMenuContainer}>
                    <View style={Styles.FeatureMenuHolder}>
                        <View style={Styles.FeatureMenuImageHolder}>
                            <Image resizeMode='cover' style={{ width: '95%', height: '65%', borderRadius: wp('2%') }} source={{ uri: imageUrl }} />
                        </View>
                        <View style={Styles.FeatureMenuInfoHolder}>
                            <View style={Styles.FetureText}>
                                <Text style={Styles.FeatureTextInfo}>Featured</Text>
                            </View>
                            <View style={Styles.MenuName}>
                                <Text style={Styles.MenuNameTextInfo}>{MenuName}</Text>
                            </View>
                            <View style={Styles.FetureText}>
                                <Text style={Styles.MenuInfoTextInfo}>{singleInfo}</Text>
                            </View>
                            <View style={Styles.FetureText}>
                                <Text style={Styles.MenuTextInfo}>Meal</Text>
                                <Text style={Styles.MenuInfoTextInfo}>{mealInfo}</Text>
                            </View>

                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </ZigzagView>
    );
}

const SingleMenuItem = ({ foodList }) => {
    //console.log("params " + JSON.stringify(foodList));
    return (
        <View style={{ flex: 1 }}>

            <ScrollView style={{ flex: 1 }}>
                <FlatList
                    data={foodList}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => {Actions.SingleFood({items : item});}}>
                                <View style={Styles.SingleMenuContainer}>
                                    <View style={Styles.SingleMenuHolder}>
                                        <View style={Styles.SingleMenuImageHolder}>
                                            <Image resizeMode='cover' style={{ width: '90%', height: '100%', borderRadius: wp('2%') }} source={{ uri: item.imgUrl }} />
                                        </View>
                                        <View style={Styles.SingleMenuInfoHolder}>
                                            <View style={Styles.MenuName}>
                                                <Text style={Styles.SingleMenuNameTextInfo}>{item.name}</Text>
                                            </View>
                                            <View style={Styles.FetureText}>
                                                <Text style={Styles.MenuInfoTextInfo}>{item.portions.length != 0 ? "€ " + item.portions[0].price + " " + item.portions[0].calories + " KJ/ " + item.portions[0].calories + " kcal " : null}</Text>
                                            </View>
                                            <View style={Styles.FetureText}>
                                                <Text style={Styles.SingleMenuNameTextInfo}>Meal</Text>
                                                <Text style={Styles.MenuInfoTextInfo}>{item.portions.length != 0 ? "€ " + item.portions[0].price + " " + item.portions[0].calories + " KJ/ " + item.portions[0].calories + " kcal " : null}</Text>
                                            </View>

                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </ScrollView>


        </View>
    );
}

const MenuList_Screen = ({ ...props }) => { //

    const { items } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const [foodList, setFoodList] = useState([]);

    const [show, setShow] = useState(false);
    const [modelTitel, setModelTitel] = useState("");
    const [modelMessage, setModelMessage] = useState("");

    const [visbile, setVisible] = useState((items.foodItems.length > 0) ? true : false);

    const [totals, setTolats] = useState(items.totalPrice);


    useEffect(() => {
        getFoodList(props.cat_id);
        setVisible((items.foodItems.length > 0) ? true : false);
        setTolats(items.totalPrice);
        // getFoodList("1");
    }, []);

    function getFoodList(ids) {
        Funtion_Get_Foods_List(ids).then((response) => {
            if (response.code == '200') {
                
                var tempList = response.responce.data;
                var filteredItems = tempList.filter(item => item.portions.length != 0);
                console.log("temp list "+JSON.stringify(tempList));
                var finalList = [];
                filteredItems.forEach((itms)=>{
                    var status = true;
                    var arrays = itms.portions;
                    for (var i = 0; i < arrays.length; i++) {
                        if (arrays[i].isAvailable == "0"){
                            status = false;
                            break;
                        }
                    }
                    if(status){
                        finalList.push(itms);
                    }
                });
                setFoodList(finalList);
            }else if (response.code == '404') {
                setModelTitel("Error");
                setModelMessage("Category not found. Try again");
                setShow(true);
                //redirct to login page
                //show eorr
            } else if (response.code == '401') {
                setModelTitel("Error");
                setModelMessage("Authentication Fail, Plase login again");
                setShow(true);
                //redirct to login page
                //show eorr
            } else if (response.code == '500') {
                //server error
                setModelTitel("Error");
                setModelMessage("Something went wrong, try again later");
                setShow(true);
            }
            
        }).catch((error) => {
            console.log("error on get food list by cat id " + error);
        });
    }

    return (
        <View style={Styles.main}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ height: hp('8%'), }}>

                </View>
                {/* <FeaturesMenuItem MenuName={"Double Sasuage and Egg Muffin"} singleInfo={"€ 2.89 2301 KJ/ 551 kcal "} mealInfo={"€ 4.39 2301 KJ/ 551 kcal"} imageUrl={"https://st4.depositphotos.com/14582236/22073/v/950/depositphotos_220731050-stock-illustration-cold-brewed-coffee-banner-ads.jpg"} /> */}

                <SingleMenuItem foodList={foodList} />

                {
                    (foodList.length == "0") ? 
                    <View style={Styles.NotItemHolder}>
                        <View style={Styles.NotItemContainer}>
                            <Text style={Styles.NoItemTextTextInfo}>Sorry No Avalible Food Right Now, Try Another Food Category.</Text>
                        </View>
                    </View> : null
                }

            </ScrollView>
            {/* <BottomBarView/> */}
            {
                (visbile) ? <View style={Styles.cartTile}>
                    <View style={Styles.cartTile_holder}>
                        <View style={Styles.cartTile_info_holder}>
                            <View style={Styles.cartTile_tesxts_holder}>
                                <Text style={Styles.itemText}>{items.foodItems.length + " items"}</Text>
                            </View>
                            <View style={Styles.cartTile_tesxts_holder}>
                                <Text style={Styles.totalText}>{"€ :" + totals}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => { Actions.Cart(); }}>
                            <View style={Styles.cartTile_btn_holder}>
                                <View style={Styles.btn_holder}>
                                    <Text style={[Styles.itemText,{color: '#000',}]}>View Cart</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View> : null
            }
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
        </View>
    );
}

const Styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignContent: 'center',
    },
    FeatureMenuContainer: {
        width: wp('100%'),
        height: hp('20%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#F5F5F5',
        borderBottomWidth: 1,
    },
    FeatureMenuHolder: {
        width: wp('90%'),
        height: hp('18%'),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    FeatureMenuImageHolder: {
        width: wp('25%'),
        height: hp('15%'),
        justifyContent: 'center',
    },
    FeatureMenuInfoHolder: {
        width: wp('65%'),
        height: hp('15%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: wp('3%')
    },
    FetureText: {
        width: wp('65%'),
        justifyContent: 'center',
        marginBottom: 5
    },
    MenuName: {
        width: wp('65%'),
        justifyContent: 'center',
        marginBottom: 5
    },
    FeatureTextInfo: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 13,
        color: 'red',
        letterSpacing: 0.04,
    },
    MenuNameTextInfo: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 15,
        color: '#000',
        letterSpacing: 0.04,
    },
    MenuTextInfo: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 12,
        color: '#000',
        letterSpacing: 0.04,
    },
    MenuInfoTextInfo: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 13,
        color: '#000',
        letterSpacing: 0.04,
    },
    SingleMenuContainer: {
        width: wp('100%'),
        height: hp('14%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#F5F5F5',
        borderBottomWidth: 1,
    },
    SingleMenuHolder: {
        width: wp('90%'),
        height: hp('12%'),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    SingleMenuImageHolder: {
        width: wp('25%'),
        height: hp('10%'),
        justifyContent: 'center',
    },
    SingleMenuInfoHolder: {
        width: wp('65%'),
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: wp('3%')
    },
    SingleMenuNameTextInfo: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 13,
        color: '#000',
        letterSpacing: 0.04,
    },
    cartTile: {
        width: wp('100%'),
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        // backgroundColor:'#f5f5f5'
    },
    cartTile_holder: {
        width: wp('90%'),
        height: hp('8%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#a5a6a5',
        borderRadius: 5,
        flexDirection: 'row'
    },
    cartTile_info_holder: {
        width: wp('60%'),
        height: hp('8%'),
        justifyContent: 'center',
    },
    cartTile_tesxts_holder: {
        width: wp('50%'),
        height: hp('3%'),
        justifyContent: 'center',
        marginLeft: 10,
    },
    cartTile_btn_holder: {
        width: wp('30%'),
        height: hp('8%'),
        justifyContent: 'center',
    },
    itemText: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#fff',
        letterSpacing: 0.04,
    },
    totalText: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 14,
        color: '#fff',
        letterSpacing: 0.04,
    },
    btn_holder: {
        width: wp('28%'),
        height: hp('7%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: 'red'
    },
    NotItemHolder: {
        width: wp('100%%'),
        height: hp('50%'),
        justifyContent: 'center',
        alignItems:'center'
    },
    NotItemContainer: {
        width: wp('90%%'),
        height: hp('22%'),
        justifyContent: 'center',
        alignItems:'center'
    },
    NoItemTextTextInfo: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 18,
        color: 'red',
        letterSpacing: 0.04,
        textAlign:"center"
    },
});

export default MenuList_Screen;