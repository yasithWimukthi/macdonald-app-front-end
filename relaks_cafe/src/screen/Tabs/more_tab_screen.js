import React, { PropTypes, Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/Fontisto';

import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';

function More_Tab_Screen() {
    return (
        <View style={Styles.main}>
            <View>

            </View>

            <TouchableOpacity onPress={() => { Actions.Profile(); }}>
                <View style={Styles.tileMian}>
                    <View style={Styles.tileHolder}>
                        <View style={Styles.tileIconHolder}>
                            <Icon color="#000" name="user" size={20} />
                        </View>
                        <View style={Styles.tileTextHolder}>
                            <Text style={Styles.titelUI}>Profile</Text>
                        </View>
                        <View style={Styles.tileIconHolder}>
                            <Icon color="#000" name="right" size={20} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={() => {  }}>
                <View style={Styles.tileMian}>
                    <View style={Styles.tileHolder}>
                        <View style={Styles.tileIconHolder}>
                            <Icon4 color="#000" name="history" size={20} />
                        </View>
                        <View style={Styles.tileTextHolder}>
                            <Text style={Styles.titelUI}>Recents & Fav</Text>
                        </View>
                        <View style={Styles.tileIconHolder}>
                            <Icon color="#000" name="right" size={20} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity> */}

            {/* <TouchableOpacity onPress={() => {  }}>
                <View style={Styles.tileMian}>
                    <View style={Styles.tileHolder}>
                        <View style={Styles.tileIconHolder}>
                        <Icon color="#000" name="enviromento" size={20} />
                        </View>
                        <View style={Styles.tileTextHolder}>
                            <Text style={Styles.titelUI}>Locations</Text>
                        </View>
                        <View style={Styles.tileIconHolder}>
                            <Icon color="#000" name="right" size={20} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity> */}


            {/* <TouchableOpacity onPress={() => {  }}>
                <View style={Styles.tileMian}>
                    <View style={Styles.tileHolder}>
                        <View style={Styles.tileIconHolder}>
                        <Icon3 color="#000" name="fast-food-outline" size={20} />
                        </View>
                        <View style={Styles.tileTextHolder}>
                            <Text style={Styles.titelUI}>Nutrition</Text>
                        </View>
                        <View style={Styles.tileIconHolder}>
                            <Icon color="#000" name="right" size={20} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity> */}

            {/* <TouchableOpacity onPress={() => {  }}>
                <View style={Styles.tileMian}>
                    <View style={Styles.tileHolder}>
                        <View style={Styles.tileIconHolder}>
                        <Icon color="#000" name="appstore-o" size={20} />
                        </View>
                        <View style={Styles.tileTextHolder}>
                            <Text></Text>
                        </View>
                        <View style={Styles.tileIconHolder}>
                            <Icon color="#000" name="right" size={20} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity> */}

            <TouchableOpacity onPress={() => { Actions.FAQ();}}>
                <View style={Styles.tileMian}>
                    <View style={Styles.tileHolder}>
                        <View style={Styles.tileIconHolder}>
                        <Icon color="#000" name="home" size={20} />
                        </View>
                        <View style={Styles.tileTextHolder}>
                            <Text style={Styles.titelUI}>Frequently Asks Questions</Text>
                        </View>
                        <View style={Styles.tileIconHolder}>
                            <Icon color="#000" name="right" size={20} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={() => {  }}>
                <View style={Styles.tileMian}>
                    <View style={Styles.tileHolder}>
                        <View style={Styles.tileIconHolder}>
                        <Icon color="#000" name="home" size={20} />
                        </View>
                        <View style={Styles.tileTextHolder}>
                            <Text style={Styles.titelUI}>NOT USED IN DAP US</Text>
                        </View>
                        <View style={Styles.tileIconHolder}>
                            <Icon color="#000" name="right" size={20} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity> */}

            {/* <TouchableOpacity onPress={() => {  }}>
                <View style={Styles.tileMian}>
                    <View style={Styles.tileHolder}>
                        <View style={Styles.tileIconHolder}>
                        <Icon color="#000" name="home" size={20} />
                        </View>
                        <View style={Styles.tileTextHolder}>
                            <Text style={Styles.titelUI}>NOT USED IN DAP US</Text>
                        </View>
                        <View style={Styles.tileIconHolder}>
                            <Icon color="#000" name="right" size={20} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity> */}

            <TouchableOpacity onPress={() => { Actions.Legal(); }}>
                <View style={Styles.tileMian}>
                    <View style={Styles.tileHolder}>
                        <View style={Styles.tileIconHolder}>
                        <Icon color="#000" name="solution1" size={20} />
                        </View>
                        <View style={Styles.tileTextHolder}>
                            <Text style={Styles.titelUI}>Careers, Contact & Legal</Text>
                        </View>
                        <View style={Styles.tileIconHolder}>
                            <Icon color="#000" name="right" size={20} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

        </View>
    );
}

const Styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        //backgroundColor: "#F5F5F5",
        //flexDirection: 'row',
        alignContent: 'center',
        //alignItems: 'center'
    },
    tileMian: {
        width: wp('100%'),
        height: hp('9%'),
        alignItems: 'center',
        justifyContent: 'center'

    },
    tileHolder: {
        width: wp('90%'),
        height: hp('7%'),
        flexDirection: 'row',
        justifyContent: 'center'
    },
    tileIconHolder: {
        width: wp('10%'),
        height: hp('5%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    tileTextHolder: {
        width: wp('70%'),
        height: hp('5%'),
        justifyContent: 'center'
    },
    titelUI : {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#000',
        letterSpacing : 0.25,
    },

});

export default More_Tab_Screen;