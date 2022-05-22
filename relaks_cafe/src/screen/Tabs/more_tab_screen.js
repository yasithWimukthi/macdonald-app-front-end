import React, { PropTypes, Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import {Container} from 'native-base';

function more_tab_screen () {
    return(
        <Container style={Styles.main}>
            <View>
                <Text>More Tabs</Text>
            </View>
        </Container>
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
});

export default more_tab_screen;