import React, { PropTypes, Component } from 'react';
import { View, Image, StyleSheet, Text} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


//import fils
import app_logo from '../../assert/images/splash_app_logo.png';




class splashscreeen extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <View style={Styles.main}>
                <Image source={app_logo} style={Styles.app_logs}/>
            </View>
        );
    }

}

const Styles = StyleSheet.create({
    main : {
        flex : 1,
        backgroundColor : "#FFFFFF",
        flexDirection:'row',
        alignContent:'center',
        alignItems:'center'    
    },
    app_logs : {
        flex : 1,
        width:wp('40%'),
        height:hp('30%'),
        alignContent:'center',
        alignItems:'center',
        resizeMode: "contain",
    }
});

export default splashscreeen;
