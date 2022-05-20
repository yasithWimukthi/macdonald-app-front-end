import React, { PropTypes, Component } from 'react';
import { View, Image, StyleSheet, Text} from 'react-native';

class authscreen extends Component {

    constructor(props){
        super(props);
    }

    render(){

        return(
            <View style={Styles.main}>
                <Text>Auth screen</Text>
            </View>
        );
    }


}

const Styles = StyleSheet.create({
    main : {
        flex : 1,
        alignContent:'center',
        alignItems :'center',
        backgroundColor : 'red'
    }
});


export default authscreen;