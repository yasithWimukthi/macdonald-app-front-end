import React, { PropTypes, Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity,ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';


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

const MenuListTile = () => {
    return (
        <View style={Styles.menuTileConatiner}>
            <View style={Styles.menuTileHolder}>
                <View style={Styles.menuTileTextContainer}>
                    <Text style={Styles.menuItemTextName}>Breakfast</Text>
                </View>
                <View style={Styles.menuTileImageContainer}>
                    <Image resizeMode='cover' style={{ width: '90%', height: '100%', borderRadius: wp('2%'), marginRight: wp('2%') }} source={{ uri: 'https://www.mashed.com/img/gallery/what-you-dont-know-about-mcdonalds-hotcakes/intro-1553105326.jpg' }} />
                </View>
            </View>
        </View>
    );
}


const Menu_Screen = () => {
    return (
        <View style={Styles.main}>
            <MenuTitel />
            <ScrollView style={{ flex:1 }}>
                <View style={{ marginTop: hp('5%') }}>
                    <MenuListTile />
                    <MenuListTile />
                    <MenuListTile />
                    <MenuListTile />
                    <MenuListTile />
                    <MenuListTile />
                    <MenuListTile />
                </View>
            </ScrollView>
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
        borderRadius:wp('3%')
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

});

export default Menu_Screen;