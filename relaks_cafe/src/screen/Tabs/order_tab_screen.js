import React, { PropTypes, Component, useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView,FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import { Container, } from 'native-base';
import ToggleBtn from '../../componet/toggleBtn';
import { Actions } from 'react-native-router-flux';

import ZigzagView from "react-native-zigzag-view";

import { Funtion_Order_Menu_List } from '../../assert/networks/api_calls';
import NetInfo from "@react-native-community/netinfo";

import { useSelector, useDispatch } from 'react-redux';
import AwesomeAlert from 'react-native-awesome-alerts';
import { setCartItems } from '../../redux/actions';

const OderHeader = () => {

    const { address,items } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const [isDelivary, setIsDelivery] = useState(1);

    const onSelectSwitch = index => {
        //alert('Selected index: ' + index);
        setIsDelivery(index);
        var oders = items;
        oders.isDelivery = (index == 1) ? false : true;
        dispatch(setCartItems(oders));
    };

    return (
        <ZigzagView
            backgroundColor="#E9E9E9"
            surfaceColor="#FFF"
            bottom={true}
            top={false}
        >
            <View elevation={5} style={Styles.orderHederContent}>
                <View style={Styles.orderHederHolder}>
                    <View style={Styles.titelHederHolder}>
                        <View style={Styles.titelHederTextContent}>
                            <Text style={Styles.titelText}>Order</Text>
                        </View>
                        <View style={Styles.titelHederIconContent}>
                            <Icon color="#000" name="search1" size={25} />
                        </View>
                    </View>
                    <View style={Styles.toggleHederHolder}>
                        {/* make toogle button */}
                        <View style={Styles.toggleSectionHolder1}>
                            <ToggleBtn
                                selectionMode={1}
                                roundCorner={true}
                                option1={'Pickup'}
                                option2={'RcDelivery'}
                                onSelectSwitch={onSelectSwitch}
                                selectionColor={'#EB1F25'}
                            />
                        </View>
                        <View style={Styles.toggleSectionHolder2}>

                        </View>
                    </View>
                    <View style={Styles.LocationHederHolder}>
                        <View style={Styles.LocationIconHolder}>
                            {/* <Icon color="red" name="enviroment" size={25} /> */}
                            <Image source={{ uri: 'pickup' }} style={Styles.pickup} />
                        </View>
                        <View style={Styles.LocationTextHolder}>
                            <Text style={[Styles.titelTextBold, { fontSize: 12, }]}>{address.mainAddress}</Text>
                            <Text style={Styles.titelTextLight}>{address.subAddress}</Text>
                        </View>
                        <View style={Styles.LocationUnderLineHolder}>
                            <TouchableOpacity onPress={()=>{Actions.Location();}}>
                                <Text style={Styles.underLineTextBold}>Change Location</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ZigzagView>
    );
}

const ScrolleTitle = () => {


    return (
        <View style={Styles.scrolleTitelContainer}>
            <View style={Styles.scrolleTitelHolder}>
                <View style={Styles.scrolleViewTitelTextHolder}>
                    <View style={Styles.scrolleViewTitelTextContent}>
                        <Text style={Styles.titelTextScrolle}>Order anytime, {"\n"}anywhere</Text>
                    </View>
                    <View style={Styles.scrolleViewTitelImageContent}>

                    </View>
                </View>
                <View style={Styles.scrolleViewTitelTextUnderHolder}>
                    <View style={Styles.scrolleViewTitelScrollTextContent}>
                        <Text style={Styles.titelTextScrolleUnder}>Learn about pickup and RcDelivery</Text>
                    </View>
                </View>



            </View>
        </View>
    );
}

const ExpoureMenuText = () => {
    return (
        <View style={Styles.ExpolurMenuTextsContent}>
            <View style={Styles.ExpolurTextsMenuHolder}>
                <View style={Styles.ExpolurMenuTitelConainer}>
                    <Text style={Styles.titelTextBold}>Explore our menu</Text>
                </View>
            </View>
        </View>
    );
}

const ExpolourMenu = ({ menuList }) => {
    return (

        <FlatList
            data={menuList}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity onPress={() => { Actions.MenuList({ cat_id: item.id }); }}>
                        <View style={Styles.ExpolurMenuContent}>
                            <View style={Styles.ExpolurMenuHolder}>
                                <View style={Styles.ExpolurMenuImageHolder}>
                                    <Image resizeMode='cover' style={{ width: '90%', height: '100%', borderRadius: wp('2%') }} source={{ uri: item.imgUrl }} />
                                </View>
                                <View style={Styles.ExpolurMenuTextHolder}>
                                    <Text style={Styles.MenuTextBold}>{item.name}</Text>
                                </View>
                                <View style={Styles.ExpolurMenuIconHolder}>
                                    <Icon color="#000" name="right" size={25} />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            }}

        />


    );
}


function Order_Tab_Screen({...props}) {

    const { items } = useSelector(state => state.userReducer);

    const [visbile, setVisible] = useState((items.foodItems.length > 0) ? true : false);

    const [totals, setTolats] = useState(items.totalPrice);

    const [menuList, setMenuList] = useState([]);
    const [show, setShow] = useState(false);
    const [modelTitel, setModelTitel] = useState("");
    const [modelMessage, setModelMessage] = useState("");

    useEffect(() => {
        setVisible((items.foodItems.length > 0) ? true : false);
        setTolats(items.totalPrice);
        getMenuInfos();
    });

    function getMenuInfos() {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                Funtion_Order_Menu_List().then((response) => {
                    if(response.code == '200'){
                        setMenuList(response.responce.data);
                    }else if (response.code == '406'){
                        setModelTitel("Error");
                        setModelMessage("Catogery Limit Invalid!");
                        setShow(true);
                        //show eorr
                    }else if (response.code == '500'){
                        //server error
                        setModelTitel("Error");
                        setModelMessage("Something went wrong, try again later");
                        setShow(true);
                    }
                    //setMenuList(response.data);
                }).catch((error) => {
                    console.log("error on get data in menu screen " + error);
                });

                // if(response.status == '200'){
                //     //sucessfully created
                // }else if (response.status == '401'){
                //     // token expire redirct to login page
                // }else if (response.status == '500') {
                //     // request body validation
                // }

            } else {
                //show error alert for not connect to internet
                setModelTitel("Error");
                setModelMessage("Please check your device connection");
                setShow(true);
            }
        });
    }

    return (
        <View style={Styles.main}>
            <OderHeader />
            <ScrollView style={{ marginTop: hp('0.5%') }}>
                <ScrolleTitle />
                <ExpoureMenuText />
                <ExpolourMenu menuList={menuList} />
                {/* <ExpolourMenu foodName={"Toasted bread "} />
                <ExpolourMenu foodName={"Cheese Toasted sandwich"} />
                <ExpolourMenu foodName={"Halwa sandwich "} />
                <ExpolourMenu foodName={"Pancake"} /> */}
            </ScrollView>
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
                        <TouchableOpacity  onPress={() => { Actions.Cart(); }}>
                            <View style={Styles.cartTile_btn_holder}>
                                <View style={Styles.btn_holder}>
                                    <Text style={[Styles.itemText, { color: '#000', }]}>View Cart</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View> : null
            }
        </View>
    );
}

const Styles = StyleSheet.create({
    main: {
        flex: 1,
        // backgroundColor: "#FFFFFF",
        backgroundColor: "#F5F5F5",
        //flexDirection: 'row',
        alignContent: 'center',
        //alignItems: 'center'
    },
    orderHederContent: {
        width: wp('100%'),
        height: hp('25%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#FFFFFF",
    },
    orderHederHolder: {
        width: wp('90%'),
        height: hp('20%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    titelHederHolder: {
        width: wp('90%'),
        height: hp('8%'),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    toggleHederHolder: {
        width: wp('90%'),
        height: hp('5%'),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: hp('2%')
    },
    toggleSectionHolder1: {
        width: wp('50%'),
        height: hp('5%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    toggleSectionHolder2: {
        width: wp('40%'),
        height: hp('5%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    LocationHederHolder: {
        width: wp('90%'),
        height: hp('5%'),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    titelHederTextContent: {
        width: wp('45%'),
        height: hp('5%'),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    titelHederIconContent: {
        width: wp('45%'),
        height: hp('5%'),
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    titelText: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 18,
        color: '#000',
        letterSpacing: 0.25,
    },
    LocationIconHolder: {
        width: wp('10%'),
        height: hp('5%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    LocationTextHolder: {
        width: wp('45%'),
        height: hp('5%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    LocationUnderLineHolder: {
        width: wp('30%'),
        height: hp('5%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    titelTextLight: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 11,
        color: '#000',
        letterSpacing: 0.35,
    },
    titelTextBold: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 14,
        color: '#000',
        letterSpacing: 0.25,
    },
    underLineTextBold: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 13,
        color: '#EB1F25',
        textDecorationLine: 'underline',
        letterSpacing: 0.25,
    },
    scrolleTitelContainer: {
        width: wp('100%'),
        height: hp('18%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#FFFFFF",
    },
    scrolleTitelHolder: {
        width: wp('90%'),
        height: hp('16%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrolleViewTitelTextHolder: {
        width: wp('90%'),
        height: hp('14%'),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    scrolleViewTitelTextContent: {
        width: wp('50%'),
        height: hp('14%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrolleViewTitelImageContent: {
        width: wp('40%'),
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    titelTextScrolle: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 21,
        color: '#000',
        letterSpacing: 0.25,
    },
    scrolleViewTitelTextUnderHolder: {
        width: wp('90%'),
        height: hp('3%'),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    scrolleViewTitelScrollTextContent: {
        width: wp('90%'),
        height: hp('2%'),
        justifyContent: 'center',
    },
    titelTextScrolleUnder: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 15,
        color: '#EB1F25',
        letterSpacing: 0.25,
        textDecorationLine: 'underline',

    },
    ExpolurMenuContent: {
        width: wp('100%'),
        height: hp('15%'),
        justifyContent: 'center',
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        alignItems: 'center',
        backgroundColor: "#FFFFFF",
    },
    ExpolurMenuHolder: {
        width: wp('90%'),
        height: hp('12%'),
        justifyContent: 'center',
        flexDirection: 'row'
    },
    ExpolurMenuImageHolder: {
        width: wp('20%'),
        height: hp('10%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    ExpolurMenuTextHolder: {
        width: wp('60%'),
        height: hp('10%'),
        justifyContent: 'center',
        marginLeft: wp('2%')
    },
    ExpolurMenuIconHolder: {
        width: wp('10%'),
        height: hp('10%'),
        justifyContent: 'center',
        alignItems: 'center'
    },

    ExpolurMenuTitelConainer: {
        width: wp('90%'),
        height: hp('3%'),
        justifyContent: 'center',
    },
    MenuTextBold: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 24,
        color: '#000',
        letterSpacing: 0.25,
    },
    ExpolurMenuTextsContent: {
        width: wp('100%'),
        height: hp('5%'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFFFFF",
    },
    ExpolurTextsMenuHolder: {
        width: wp('90%'),
        height: hp('3%'),
        justifyContent: 'center',
        flexDirection: 'row'
    },
    pickup: {
        width: wp('8%'),
        height: hp('4%'),
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain'
    },
    cartTile: {
        width: wp('100%'),
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: hp('1%'),
        // backgroundColor:'#f5f5f5'
    },
    cartTile_holder: {
        width: wp('90%'),
        height: hp('8%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#a5a6a5',
        borderRadius: 5,
        flexDirection: 'row',
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
        //backgroundColor:'#EB1F25'
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
});

export default Order_Tab_Screen;