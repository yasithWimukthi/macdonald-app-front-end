import React, { useState } from 'react';
import { StyleSheet, useWindowDimensions, DeviceEventEmitter, } from 'react-native';

import {
    FAB_BACKGROUND_COLOR,
    FAB_BORDER_RADIUS,
    FAB_HEIGHT,
    FAB_WIDTH,
    FAB_MARGIN,
    FAB_CHILDREN_OPACITY_OPEN,
    FAB_CHILDREN_POSITION_Y_OPEN,
    FAB_CHILDREN_OPACITY_CLOSE,
    FAB_CHILDREN_POSITION_Y_CLOSE,
    FAB_ROTATION_CLOSE,
    FAB_ROTATION_OPEN,
    FAB_STARTING_POSITION,
    FAB_PLUS_TRANSLATE_Y_OPEN,
    FAB_PLUS_TRANSLATE_Y_CLOSE,
    SUBBTN_TAP_EVENT

} from './Fab_Contstain';

import { PanGestureHandler, TapGestureHandler, State } from 'react-native-gesture-handler';

import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming, } from 'react-native-reanimated';

const FAB = props => {
    const [opened, setOpened] = useState(false);

    /*
        * Get the width of the screen.
        * This hook dynamically updates
        * when the user rotates the screen too!

    */
    const { width } = useWindowDimensions();

    /*
        * Destructure the children prop for the SubButton(s)  
    */
    const { children } = props;

    /*
        * (X,Y) position of the FAB. We use these
        * for keeping track of the button when dragging it.
    */

    const fabPositionX = useSharedValue(0);
    const fabPositionY = useSharedValue(0);
    const fabRotation = useSharedValue(FAB_ROTATION_CLOSE);
    const fabPlusTranslateY = useSharedValue(FAB_PLUS_TRANSLATE_Y_CLOSE);


    /**
        * The opacity and Y position of the children container for the
        * SubButton(s). We use this to show a sliding fade in/out animation when
        * the user taps the FAB button
    */
    const childrenYPosition = useSharedValue(FAB_CHILDREN_POSITION_Y_CLOSE);
    const childrenOpacity = useSharedValue(FAB_CHILDREN_OPACITY_CLOSE);

    const _onTapHandlerStateChange = ({ nativeEvent }) => { };

    const _onPanHandlerStateChange = useAnimatedGestureHandler({
        onStart: (_, ctx) => { },
        onActive: (event, ctx) => { },
        onEnd: _ => { },
    });

    return (
        <PanGestureHandler onHandlerStateChange={_onPanHandlerStateChange}>
            <Animated.View style={styles.rootStyles}>
                {opened && (
                    <Animated.View style={styles.childrenStyles}>
                        {children}
                    </Animated.View>
                )}
                <TapGestureHandler onHandlerStateChange={_onTapHandlerStateChange}>
                    <Animated.View style={styles.fabButtonStyles}>
                        <Animated.Text style={styles.plus}>+</Animated.Text>
                    </Animated.View>
                </TapGestureHandler>
            </Animated.View>
        </PanGestureHandler>
    );
};

export default FAB;

const styles = StyleSheet.create({
    rootStyles: {
        borderRadius: FAB_BORDER_RADIUS,
        position: 'absolute',
        bottom: FAB_MARGIN,
        right: FAB_MARGIN,
    },
    fabButtonStyles: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: FAB_BACKGROUND_COLOR,
        width: FAB_WIDTH,
        height: FAB_HEIGHT,
        borderRadius: FAB_BORDER_RADIUS,
    },
    childrenStyles: {
        width: FAB_WIDTH,
        alignItems: 'center',
        marginBottom: 20,
    },
    plus: {
        fontSize: 36,
        color: '#EFFBFA',
    },
});