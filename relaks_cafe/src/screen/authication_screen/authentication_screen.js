import React, { PropTypes, Component } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';

import { TabView, SceneMap } from 'react-native-tab-view';


import AuthScreen from '../auth_screen/auth_screen';
import SignupScreen from '../signup_screen/signup_screen';

const renderScene = SceneMap({
    first: AuthScreen,
    second: SignupScreen,
});

function TabViews ()  {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'auth', title: 'First' },
        { key: 'signup', title: 'Second' },
    ]);

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: widthPercentageToDP('100%') }}
        />
    );
}

class authenticationscreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index : 1,
        }
    }

    render() {

        return (
            <View style={Styles.main}>
                <TabView
                    navigationState={(index, routes)=>{alert("ind "+index+" roye"+routes)}}
                    renderScene={{ 
                        first: AuthScreen,
                        second: SignupScreen,
                     }}
                    nIndexChange={(inde)=>{this.setState(this.state.index = inde)}}
                    initialLayout={{ width: widthPercentageToDP('100%') }}
        />
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center'
    }
});


export default authenticationscreen;