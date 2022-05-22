import React, { PropTypes, Component } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// import { TabView, SceneMap } from 'react-native-tab-view';


// import {AuthScreen} from '../auth_screen/auth_screen';
// import {SignupScreen} from '../signup_screen/signup_screen';

// const renderScene = SceneMap({
//     auth: AuthScreen,
//     signup: SignupScreen,
// });

// function TabViews() {
//     const [index, setIndex] = React.useState(0);
//     const [routes] = React.useState([
//         { key: 'auth', title: 'SignIn' },
//         { key: 'signup', title: 'SignUp' },
//     ]);

//     return (
//         <TabView
//             navigationState={{ index, routes }}
//             renderScene={renderScene}
//             onIndexChange={setIndex}
//             initialLayout={{ width: wp('100%') }}
//         />
//     );
// }


const authenticationscreen = () => {
    return (
        <View style={Styles.main}>
            
        </View>
    );
}



const Styles = StyleSheet.create({
    main: {
        flex: 1,
        //backgroundColor: "#FFFFFF",
        backgroundColor: 'white',
        alignItems: 'center'
    }
});


export default authenticationscreen;