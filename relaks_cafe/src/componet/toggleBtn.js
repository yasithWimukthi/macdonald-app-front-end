import React, { PropTypes, Component,useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import {FONT_BOLD,FONT_LIGHT} from '../assert/key/key';

const ToggleBtn = ({
    navigation,
    selectionMode,
    roundCorner,
    option1,
    option2,
    onSelectSwitch,
    selectionColor
}) => {
    const [getSelectionMode, setSelectionMode] = useState(selectionMode);
    const [getRoundCorner, setRoundCorner] = useState(roundCorner);

    const updateSelectdValue = val => {
        setSelectionMode(val);
        onSelectSwitch(val);
    }

    return (
        <View style={[Styles.toggleContainer,{borderRadius: getRoundCorner ? 25 : 0,borderColor: selectionColor,}]}>
            <TouchableOpacity activeOpacity={1} onPress={() => updateSelectdValue(1)} style={[Styles.tochableStyle1,{backgroundColor: getSelectionMode == 1 ? selectionColor : 'white',borderRadius: getRoundCorner ? 25 : 0,}]}>
                <Text style={[Styles.optionText1,{color: getSelectionMode == 1 ? 'white' : selectionColor,}]}>{option1}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={() => updateSelectdValue(2)} style={[Styles.tochableStyle2,{backgroundColor: getSelectionMode == 2 ? selectionColor : 'white',borderRadius: getRoundCorner ? 25 : 0,}]}>
                <Text style={[Styles.optionText2,{color: getSelectionMode == 2 ? 'white' : selectionColor,}]}>{option2}</Text>
            </TouchableOpacity>
        </View>
    );
}

const Styles = StyleSheet.create({
    toggleContainer: {
        height: "100%",
        width: "100%",
        backgroundColor: 'white',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 2,
    },
    tochableStyle1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tochableStyle2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionText1 : {
        fontFamily: FONT_LIGHT, // 'NexaTextDemo-Light',
        fontSize: 15,
        letterSpacing: 0.25,
    },
    optionText2 : {
        fontFamily: FONT_LIGHT, //'NexaTextDemo-Light',
        fontSize: 15,
        letterSpacing: 0.25,
    }
});

export default ToggleBtn;