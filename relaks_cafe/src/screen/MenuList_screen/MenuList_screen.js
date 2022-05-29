import React, { PropTypes, Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity,ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';


const FeaturesMenuItem = ({imageUrl,MenuName,singleInfo,mealInfo}) => {
    return(
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
    );
}

const SingleMenuItem = ({imageUrl,MenuName,singleInfo,mealInfo}) => {
    return(
        <View style={Styles.SingleMenuContainer}>
            <View style={Styles.SingleMenuHolder}>
                <View style={Styles.SingleMenuImageHolder}>
                    <Image resizeMode='cover' style={{ width: '95%', height: '95%', borderRadius: wp('2%') }} source={{ uri: imageUrl }} />
                </View>
                <View style={Styles.SingleMenuInfoHolder}>
                    <View style={Styles.MenuName}>
                        <Text style={Styles.SingleMenuNameTextInfo}>{MenuName}</Text>
                    </View>
                    <View style={Styles.FetureText}>
                        <Text style={Styles.MenuInfoTextInfo}>{singleInfo}</Text>
                    </View>
                    <View style={Styles.FetureText}>
                        <Text style={Styles.SingleMenuNameTextInfo}>Meal</Text>
                        <Text style={Styles.MenuInfoTextInfo}>{mealInfo}</Text>
                    </View>
                    
                </View>
            </View>
        </View>
    );
}   

const MenuList_Screen  = () => {
    return(
        <View style={Styles.main}>
            <ScrollView>
                <FeaturesMenuItem MenuName={"Double Sasuage and Egg Muffin"} singleInfo={"€ 2.89 2301 KJ/ 551 kcal "} mealInfo={"€ 4.39 2301 KJ/ 551 kcal"} imageUrl={"https://st4.depositphotos.com/14582236/22073/v/950/depositphotos_220731050-stock-illustration-cold-brewed-coffee-banner-ads.jpg"}/>
            
                <SingleMenuItem MenuName={"Sasuage and Egg Muffin"} singleInfo={"€ 2.89 2301 KJ/ 551 kcal "} mealInfo={"€ 3.99 2301 KJ/ 551 kcal"} imageUrl={"https://st4.depositphotos.com/14582236/22073/v/950/depositphotos_220731050-stock-illustration-cold-brewed-coffee-banner-ads.jpg"} />

                <SingleMenuItem MenuName={"Double Baccon and Egg Muffin"} singleInfo={"€ 2.89 2301 KJ/ 551 kcal "} mealInfo={"€ 3.99 2301 KJ/ 551 kcal"} imageUrl={"https://st4.depositphotos.com/14582236/22073/v/950/depositphotos_220731050-stock-illustration-cold-brewed-coffee-banner-ads.jpg"} />

                <SingleMenuItem MenuName={"Baccon and Egg Muffin"} singleInfo={"€ 2.89 2301 KJ/ 551 kcal "} mealInfo={"€ 3.99 2301 KJ/ 551 kcal"} imageUrl={"https://st4.depositphotos.com/14582236/22073/v/950/depositphotos_220731050-stock-illustration-cold-brewed-coffee-banner-ads.jpg"} />

                <SingleMenuItem MenuName={"Cheese and Egg Muffin"} singleInfo={"€ 2.89 2301 KJ/ 551 kcal "} mealInfo={"€ 3.99 2301 KJ/ 551 kcal"} imageUrl={"https://st4.depositphotos.com/14582236/22073/v/950/depositphotos_220731050-stock-illustration-cold-brewed-coffee-banner-ads.jpg"} />
            
            </ScrollView>
        </View>
    );
}

const Styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignContent: 'center',
    },
    FeatureMenuContainer : {
        width: wp('100%'),
        height: hp('20%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor : '#F5F5F5',
        borderBottomWidth:1,
    },
    FeatureMenuHolder : {
        width: wp('90%'),
        height: hp('18%'),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row'
    },
    FeatureMenuImageHolder : {
        width: wp('25%'),
        height: hp('15%'),
        justifyContent: 'center',
    },
    FeatureMenuInfoHolder : {
        width: wp('65%'),
        height: hp('15%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:wp('3%')
    },
    FetureText : {
        width: wp('65%'),
        justifyContent: 'center',
        marginBottom:5
    },
    MenuName : {
        width: wp('65%'),
        justifyContent: 'center',
        marginBottom:5
    },
    FeatureTextInfo : {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 13,
        color: 'red',
        letterSpacing: 0.04,
    },
    MenuNameTextInfo : {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 15,
        color: '#000',
        letterSpacing: 0.04,
    },
    MenuTextInfo : {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 12,
        color: '#000',
        letterSpacing: 0.04,
    },
    MenuInfoTextInfo : {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 13,
        color: '#000',
        letterSpacing: 0.04,
    },
    SingleMenuContainer : {
        width: wp('100%'),
        height: hp('12%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor : '#F5F5F5',
        borderBottomWidth:1,
    },
    SingleMenuHolder : {
        width: wp('90%'),
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row'
    },
    SingleMenuImageHolder : {
        width: wp('25%'),
        height: hp('8%'),
        justifyContent: 'center',
    },
    SingleMenuInfoHolder : {
        width: wp('65%'),
        height: hp('8%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:wp('3%')
    },
    SingleMenuNameTextInfo : {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 13,
        color: '#000',
        letterSpacing: 0.04,
    },


});

export default MenuList_Screen;