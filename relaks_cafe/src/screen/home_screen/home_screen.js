import React, { PropTypes, Component } from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';

import { Footer, FooterTab, Tab, Container, Button } from 'native-base';

import {Home_Tab_Screen} from '../Tabs/home_tab_screen';
import {Order_Tab_Screen} from '../Tabs/order_tab_screen';
import {More_Tab_Screen} from '../Tabs/more_tab_screen';
import {Deals_Tab_Screen} from '../Tabs/deals_tab_screen';
import {Resent_Tab_Screen} from '../Tabs/resent_tab_screen';

const home_screen = () => {
    const [selectTab, setSelectTab] = React.useState(0);

    function renderTabsView(){
        switch (selectTab) {
            case "order":
                return (<Tab><Order_Tab_Screen /></Tab>);
                break;
            case "deals":
                return (<Tab><Deals_Tab_Screen /></Tab>);
                break;
            case "recent":
                return (<Tab><Resent_Tab_Screen /></Tab>);
                break;
            case "more":
                return (<Tab><More_Tab_Screen /></Tab>);
                break;
            default:
                return (<Tab><Home_Tab_Screen /></Tab>);
                break;
        }
    }

    return (
        <View style={Styles.main}>
            <Container>
               {renderTabsView()}
            </Container>

            <Footer>
                <FooterTab>
                    <Button active={selectTab === 'home'} onPress={() => {setSelectTab(selectTab == "home")}}>
                        <Icon name={'assignment-ind'}  size={20} />
                        <Text >Home</Text>
                    </Button>
                    <Button active={selectTab === 'order'}  onPress={() => {setSelectTab(selectTab == "order")}}>
                        <Icon name={'assignment-ind'}  size={20} />
                        <Text >Order</Text>
                    </Button>
                    <Button active={selectTab === 'deals'} onPress={() => {setSelectTab(selectTab == "deals")}}>
                        <Icon name={'assignment-ind'}  size={20} />
                        <Text >Deals</Text>
                    </Button>
                    <Button active={selectTab === 'recent'} onPress={() => {setSelectTab(selectTab == "recent")}}>
                        <Icon name={'assignment-ind'}  size={20} />
                        <Text >Recent</Text>
                    </Button>
                    <Button active={selectTab === 'more'} onPress={() => {setSelectTab(selectTab == "more")}}>
                        <Icon name={'assignment-ind'}  size={20} />
                        <Text >More</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </View>
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

export default home_screen;