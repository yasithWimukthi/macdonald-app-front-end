import React, { PropTypes, Component, useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';


import { Actions } from 'react-native-router-flux';
import { Funtion_Get_Home_Menu_List } from '../../assert/networks/api_calls';

import AwesomeAlert from 'react-native-awesome-alerts';

import { useSelector, useDispatch } from 'react-redux';
import { setCartItems } from '../../redux/actions';

const MenuTitel = () => {
    return (
        <View style={Styles.menuTitel}>
            <View style={Styles.menuHolder}>
                <View style={Styles.menuTitel}>
                    <Text style={Styles.menuTextTitel}>Menu Info</Text>
                </View>
                <View style={Styles.subTitel}>
                    <Text style={Styles.menuTextTitel}>Food Categories</Text>
                </View>
            </View>
        </View>
    );
}

const MenuListTile = ({ menuList }) => {
    return (
        <View style={{ marginTop: hp('5%') }}>
            <FlatList
                data={menuList}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => { Actions.MenuList({ cat_id: item.id }); }}>
                            <View style={Styles.menuTileConatiner}>
                                <View style={Styles.menuTileHolder}>
                                    <View style={Styles.menuTileTextContainer}>
                                        <Text style={Styles.menuItemTextName}>{item.name}</Text>
                                    </View>
                                    <View style={Styles.menuTileImageContainer}>
                                        <Image resizeMode='cover' style={{ width: '90%', height: '100%', borderRadius: wp('2%'), marginRight: wp('2%') }} source={{ uri: item.imgUrl }} />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />

        </View>



    );
}


const Menu_Screen = () => {

    const { items } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const [catogeryList, setCategoryList] = useState([]);

    const [show, setShow] = useState(false);
    const [modelTitel, setModelTitel] = useState("");
    const [modelMessage, setModelMessage] = useState("");

    const [visbile, setVisible] = useState((items.foodItems.length > 0) ? true : false);

    const [totals, setTolats] = useState(items.totalPrice);

    const [spinerVisible, setSpinerVisible] = useState(false);

    // useEffect(() => {

    // });

    useEffect(() => {
        setVisible((items.foodItems.length > 0) ? true : false);
        setTolats(items.totalPrice);
        getCatogeryInfo();
    }, []);

    function getCatogeryInfo() {
        setSpinerVisible(true);
        Funtion_Get_Home_Menu_List().then((response) => {

            if (response.code == '200') {
                setSpinerVisible(false);
                setCategoryList(response.responce.data);
            } else if (response.code == '406') {
                setModelTitel("Error");
                setModelMessage("Catogery Limit Invalid!");
                setSpinerVisible(false);
                setShow(true);
                //show eorr
            } else if (response.code == '500') {
                //server error
                setModelTitel("Error");
                setModelMessage("Something went wrong, try again later");
                setSpinerVisible(false);
                setShow(true);
            }

            // setCategoryList(response.data);
        }).catch((error) => {
            console.log("error happen when loading data to catogery list " + error);
            setSpinerVisible(false);
        });
    }


    return (
        <View style={Styles.main}>
            <MenuTitel />
            <ScrollView style={{ flex: 1 }}>
                <MenuListTile menuList={catogeryList} />
            </ScrollView>

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
                                    <Text style={[Styles.itemText, { color: '#000', }]}>View Cart</Text>
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
                showCancelButton={false}
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

                    <View style={Styles.activityindicator_view}>
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
    );
}

const Styles = StyleSheet.create({
    main: {
        flex: 1,
        //backgroundColor: "#F5F5F5",
        backgroundColor: "#FFFFFF",
        //flexDirection: 'row',
        alignContent: 'center',
        //alignItems: 'center'
    },
    menuTitel: {
        width: wp('100%'),
        height: hp('16%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuHolder: {
        width: wp('90%'),
        height: hp('14%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainTitel: {
        width: wp('90%'),
        height: hp('5%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    subTitel: {
        width: wp('90%'),
        height: hp('5%'),
        justifyContent: 'center',
    },
    menuTextTitel: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 21,
        color: '#000',
        letterSpacing: 0.04,
    },
    menuTileConatiner: {
        width: wp('100%'),
        height: hp('11%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp('3%')
    },
    menuTileHolder: {
        width: wp('90%'),
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#F5F5F5",
        flexDirection: 'row'
    },
    menuTileTextContainer: {
        width: wp('58%'),
        height: hp('8%'),
        justifyContent: 'center',
        marginLeft: hp('4%')
    },
    menuTileImageContainer: {
        width: wp('27%'),
        height: hp('8%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    menuItemTextName: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 15,
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

export default Menu_Screen;