import React from 'react';

import { StyleSheet, Text, DeviceEventEmitter } from 'react-native';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

import Animated, {useAnimatedStyle,useSharedValue,} from 'react-native-reanimated';

import { SUBBTN_BACKGROUND_COLOR, SUBBTN_BORDER_RADIUS, SUBBTN_HEIGHT, SUBBTN_WIDTH } from './Fab_Contstain';

const SubButton = props => {
    const { label, onPress } = props;

    function _onTapHandlerStateChange({ nativeEvent }) { }

    return (
        <TapGestureHandler onHandlerStateChange={_onTapHandlerStateChange}>
            <Animated.View style={styles.subButton}>
                <Text style={styles.label}>{label}</Text>
            </Animated.View>
        </TapGestureHandler>
    );
};

export default SubButton;

const styles = StyleSheet.create({
    subButton: {
        width: SUBBTN_WIDTH,
        height: SUBBTN_HEIGHT,
        borderRadius: SUBBTN_BORDER_RADIUS,
        backgroundColor: SUBBTN_BACKGROUND_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    label: {
        color: '#EFFBFA',
        fontSize: 24,
    },
});