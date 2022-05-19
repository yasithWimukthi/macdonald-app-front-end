import React, { PropTypes, Component } from 'react';
import { View, Image, StyleSheet, Text} from 'react-native';

class signupscreen extends Component {

    constructor(props){
        super(props);
    }

    render(){

        return(
            <View style={Styles.main}>
                <Text>Sign up screen</Text>
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
        
    }

});


export default signupscreen;