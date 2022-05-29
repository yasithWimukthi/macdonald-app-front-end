import React, { PropTypes, Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import { Container, } from 'native-base';
import ToggleBtn from '../../componet/toggleBtn';



const OderHeader = () => {

    const onSelectSwitch = index => {
        alert('Selected index: ' + index);
    };

    return (
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
                            selectionColor={'#FFD800'}
                        />
                    </View>
                    <View style={Styles.toggleSectionHolder2}>

                    </View>
                </View>
                <View style={Styles.LocationHederHolder}>
                    <View style={Styles.LocationIconHolder}>
                        <Icon color="red" name="enviroment" size={25} />
                    </View>
                    <View style={Styles.LocationTextHolder}>
                        <Text style={Styles.titelTextBold}>2 BELLFIELD EXCHANGE</Text>
                        <Text style={Styles.titelTextLight}>Now serving Breakfast untill</Text>
                    </View>
                    <View style={Styles.LocationUnderLineHolder}>
                        <Text style={Styles.underLineTextBold}>Change Location</Text>
                    </View>
                </View>
            </View>
        </View>
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

const ExpolourMenu = () => {
    return (
        <View style={Styles.ExpolurMenuContent}>
            <View style={Styles.ExpolurMenuHolder}>
                <View style={Styles.ExpolurMenuImageHolder}>
                    <Image resizeMode='cover' style={{ width: '100%', height: '100%', borderRadius: wp('2%') }} source={{ uri: 'https://www.mashed.com/img/gallery/what-you-dont-know-about-mcdonalds-hotcakes/intro-1553105326.jpg' }} />
                </View>
                <View style={Styles.ExpolurMenuTextHolder}>
                    <Text style={Styles.MenuTextBold}>RcMuffine</Text>
                </View>
                <View style={Styles.ExpolurMenuIconHolder}>
                    <Icon color="#000" name="right" size={25} />
                </View>
            </View>
        </View>
    );
}


function order_tab_screen() {
    return (
        <View style={Styles.main}>
            <OderHeader />
            <ScrollView style={{ marginTop:hp('0.5%') }}>
                <ScrolleTitle />
                <ExpoureMenuText />
                <ExpolourMenu />
                <ExpolourMenu />
                <ExpolourMenu />
                <ExpolourMenu />
            </ScrollView>
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
        fontSize: 12,
        color: '#000',
        letterSpacing: 0.25,
    },
    underLineTextBold: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 13,
        color: 'blue',
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
        color: 'blue',
        letterSpacing: 0.25,
        textDecorationLine: 'underline',

    },
    ExpolurMenuContent: {
        width: wp('100%'),
        height: hp('10%'),
        justifyContent: 'center',
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        alignItems: 'center',
        backgroundColor: "#FFFFFF",
    },
    ExpolurMenuHolder: {
        width: wp('90%'),
        height: hp('8%'),
        justifyContent: 'center',
        flexDirection: 'row'
    },
    ExpolurMenuImageHolder: {
        width: wp('20%'),
        height: hp('7%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    ExpolurMenuTextHolder: {
        width: wp('60%'),
        height: hp('7%'),
        justifyContent: 'center',
        marginLeft:wp('2%')
    },
    ExpolurMenuIconHolder: {
        width: wp('10%'),
        height: hp('7%'),
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
        fontSize: 15,
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
});

export default order_tab_screen;