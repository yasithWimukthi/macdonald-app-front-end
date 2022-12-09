import React, { PropTypes, Component, useEffect,useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/Fontisto';

import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { useSelector, useDispatch } from 'react-redux';

import { FONT_BOLD, FONT_LIGHT } from '../../assert/key/key';

function More_Tab_Screen({...props}) {
   // alert("props "+JSON.stringify(props));
    console.log("props "+JSON.stringify(props));

    const { items } = useSelector(state => state.userReducer);

    const [visbile, setVisible] = useState((items.foodItems.length > 0) ? true : false);

    const [totals, setTolats] = useState(items.totalPrice);

    useEffect(() => {
        setVisible((items.foodItems.length > 0) ? true : false);
        setTolats(items.totalPrice);
    });

    return (
        <View style={Styles.main}>
            <View>

            </View>

            <TouchableOpacity onPress={() => { Actions.Profile(); }}>
                <View style={Styles.tileMian}>
                    <View style={Styles.tileHolder}>
                        <View style={Styles.tileIconHolder}>
                            <Icon color="#000" name="user" size={20} />
                        </View>
                        <View style={Styles.tileTextHolder}>
                            <Text style={Styles.titelUI}>Profile</Text>
                        </View>
                        <View style={Styles.tileIconHolder}>
                            <Icon color="#000" name="right" size={20} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={() => {  }}>
                <View style={Styles.tileMian}>
                    <View style={Styles.tileHolder}>
                        <View style={Styles.tileIconHolder}>
                            <Icon4 color="#000" name="history" size={20} />
                        </View>
                        <View style={Styles.tileTextHolder}>
                            <Text style={Styles.titelUI}>Recents & Fav</Text>
                        </View>
                        <View style={Styles.tileIconHolder}>
                            <Icon color="#000" name="right" size={20} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity> */}

            {/* <TouchableOpacity onPress={() => {  }}>
                <View style={Styles.tileMian}>
                    <View style={Styles.tileHolder}>
                        <View style={Styles.tileIconHolder}>
                        <Icon color="#000" name="enviromento" size={20} />
                        </View>
                        <View style={Styles.tileTextHolder}>
                            <Text style={Styles.titelUI}>Locations</Text>
                        </View>
                        <View style={Styles.tileIconHolder}>
                            <Icon color="#000" name="right" size={20} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity> */}


            {/* <TouchableOpacity onPress={() => {  }}>
                <View style={Styles.tileMian}>
                    <View style={Styles.tileHolder}>
                        <View style={Styles.tileIconHolder}>
                        <Icon3 color="#000" name="fast-food-outline" size={20} />
                        </View>
                        <View style={Styles.tileTextHolder}>
                            <Text style={Styles.titelUI}>Nutrition</Text>
                        </View>
                        <View style={Styles.tileIconHolder}>
                            <Icon color="#000" name="right" size={20} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity> */}

            {/* <TouchableOpacity onPress={() => {  }}>
                <View style={Styles.tileMian}>
                    <View style={Styles.tileHolder}>
                        <View style={Styles.tileIconHolder}>
                        <Icon color="#000" name="appstore-o" size={20} />
                        </View>
                        <View style={Styles.tileTextHolder}>
                            <Text></Text>
                        </View>
                        <View style={Styles.tileIconHolder}>
                            <Icon color="#000" name="right" size={20} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity> */}

            <TouchableOpacity onPress={() => { Actions.FAQ();}}>
                <View style={Styles.tileMian}>
                    <View style={Styles.tileHolder}>
                        <View style={Styles.tileIconHolder}>
                        <Icon color="#000" name="home" size={20} />
                        </View>
                        <View style={Styles.tileTextHolder}>
                            <Text style={Styles.titelUI}>Frequently Asks Questions</Text>
                        </View>
                        <View style={Styles.tileIconHolder}>
                            <Icon color="#000" name="right" size={20} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={() => {  }}>
                <View style={Styles.tileMian}>
                    <View style={Styles.tileHolder}>
                        <View style={Styles.tileIconHolder}>
                        <Icon color="#000" name="home" size={20} />
                        </View>
                        <View style={Styles.tileTextHolder}>
                            <Text style={Styles.titelUI}>NOT USED IN DAP US</Text>
                        </View>
                        <View style={Styles.tileIconHolder}>
                            <Icon color="#000" name="right" size={20} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity> */}

            {/* <TouchableOpacity onPress={() => {  }}>
                <View style={Styles.tileMian}>
                    <View style={Styles.tileHolder}>
                        <View style={Styles.tileIconHolder}>
                        <Icon color="#000" name="home" size={20} />
                        </View>
                        <View style={Styles.tileTextHolder}>
                            <Text style={Styles.titelUI}>NOT USED IN DAP US</Text>
                        </View>
                        <View style={Styles.tileIconHolder}>
                            <Icon color="#000" name="right" size={20} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity> */}

            <TouchableOpacity onPress={() => { Actions.Legal(); }}>
                <View style={Styles.tileMian}>
                    <View style={Styles.tileHolder}>
                        <View style={Styles.tileIconHolder}>
                        <Icon color="#000" name="solution1" size={20} />
                        </View>
                        <View style={Styles.tileTextHolder}>
                            <Text style={Styles.titelUI}>Careers, Contact & Legal</Text>
                        </View>
                        <View style={Styles.tileIconHolder}>
                            <Icon color="#000" name="right" size={20} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

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
        backgroundColor: "#FFFFFF",
        //backgroundColor: "#F5F5F5",
        //flexDirection: 'row',
        alignContent: 'center',
        //alignItems: 'center'
    },
    tileMian: {
        width: wp('100%'),
        height: hp('9%'),
        alignItems: 'center',
        justifyContent: 'center'

    },
    tileHolder: {
        width: wp('90%'),
        height: hp('7%'),
        flexDirection: 'row',
        justifyContent: 'center'
    },
    tileIconHolder: {
        width: wp('10%'),
        height: hp('5%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    tileTextHolder: {
        width: wp('70%'),
        height: hp('5%'),
        justifyContent: 'center'
    },
    titelUI : {
        fontFamily: FONT_LIGHT, // 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#000',
        letterSpacing : 0.25,
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
        fontFamily: FONT_LIGHT, // 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#fff',
        letterSpacing: 0.04,
    },
    totalText: {
        fontFamily: FONT_BOLD, // 'NexaTextDemo-Bold',
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

export default More_Tab_Screen;