import React, { PropTypes, Component, useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import { Container } from 'native-base';
import ZigzagView from "react-native-zigzag-view";
import { useSelector, useDispatch } from 'react-redux';

import { Funtion_Get_All_Orders, Funtion_Get_Tabels_Info } from '../../assert/networks/api_calls';

const TitelComponet = () => {
    return (
        <ZigzagView
            backgroundColor="#E9E9E9"
            surfaceColor="#FFF"
            bottom={true}
            top={false}
        >
            <View style={Styles.titel_holder}>
                <View style={Styles.titel_content}>
                    <View style={Styles.titel_hold}>
                        <Text style={Styles.titel_heder}>Strat an Order</Text>
                    </View>
                    <View style={Styles.titel_discription_holder}>
                        <Text style={Styles.titel_description}>product pricing and avalibility may change depend upon {"\n"}your location.</Text>
                    </View>
                </View>
            </View>
        </ZigzagView>
    );
}

const PicupTiles = () => {
    return (
        <View style={Styles.tileHolder}>
            <View style={Styles.tileContent}>
                <View style={Styles.tile_row}>
                    {/* add picup icon */}
                    <Image source={{ uri: 'pickup' }} style={Styles.app_logs} />
                </View>
                <View style={Styles.tile_row_text}>
                    <Text style={Styles.titel_description_hed}>PickUp</Text>
                    <Text style={Styles.titel_description}>2 BELLFIELD INTERCHANGE SERVICE {"\n"}KILMARNROCK,</Text>
                </View>
                <View style={Styles.tile_row}>
                    <Icon color="#000" name="right" size={30} />
                </View>
            </View>
        </View>
    );
}

const DelivaryTile = () => {
    return (
        <View style={Styles.tileHolder}>
            <View style={Styles.tileContent}>
                <View style={Styles.tile_row}>
                    {/* add picup icon */}
                    <Image source={{ uri: 'delivary' }} style={Styles.app_logs} />
                </View>
                <View style={Styles.tile_row_text}>
                    <Text style={Styles.titel_description_hed}>RcDelivery</Text>
                    <Text style={Styles.titel_description}>Delivery/service fee will apply.</Text>
                </View>
                <View style={Styles.tile_row}>
                    <Icon color="#000" name="right" size={30} />
                </View>
            </View>
        </View>
    );
}

const BottomDescriptionTile = () => {
    return (
        <View style={Styles.bottomDescription}>
            <View style={Styles.bottomDescriptionContent}>
                <View>
                    <Text style={Styles.titel_botttom_titel}>RcDelivery</Text>
                </View>
                <View>
                    <Text style={Styles.titel_botttom_description}>Available at parcitipating Relaks Delivery prices may be higher than {"\n"} resturents, Price promtion may not apply, Uber Eats delivery/service {"\n"} frees will apply. </Text>
                </View>
            </View>
        </View>
    );
}


const OderListView = ({ orderList }) => {
    return (
        <View style={Styles.orderListContainer}>
            <View style={Styles.orderListHoler}>
                <View style={Styles.titel_hold}>
                    <Text style={Styles.titel_heder}>Order History</Text>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    <FlatList
                        data={orderList}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item }) => {
                            // console.log("single order id " + item.id);
                            var dte = item.updatedAt;
                            dte = dte.split("T");
                            return (
                                <TouchableOpacity style={Styles.orderListTileContainer} onPress={() => { }}>
                                    <View style={[Styles.orderListTileContainer, { backgroundColor: (item.status == "cancelled") ? "#FFCCCB" : "#ADD8E6" }]}>
                                        <View style={Styles.orderTileViews1}>
                                            <View style={Styles.orderInfoView}>
                                                <Text style={Styles.orderInfoText}>{"Order Number " + item.id}</Text>
                                            </View>
                                            <View style={Styles.orderInfoView}>
                                                <Text style={Styles.orderInfoText}>{"Total : " + item.totalPrice}</Text>
                                            </View>
                                            <View style={Styles.orderInfoView}>
                                                <Text style={Styles.orderInfoText}>{"Date : " + dte[0]}</Text>
                                            </View>
                                            <View style={Styles.orderInfoView}>
                                                <Text style={Styles.orderInfoText}>{"Delivery Type " + (item.isDelivery == "0") ? "PICKUP" : "RC-DELIVERY"}</Text>
                                            </View>
                                        </View>
                                        <View style={Styles.orderTileViews2}>
                                            <Text style={[Styles.orderInfoTextBold, { color: (item.status == "cancelled") ? "red" : "blue" }]}>{"" + ((item.status == "cancelled") ? "Cancelled" : "Pending")}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </ScrollView>
            </View>
        </View>
    )
}

const RecentBookTabelList = ({ bookList }) => {
    return (
        <View style={Styles.orderListContainer}>
            <View style={Styles.orderListHoler}>
            <View style={Styles.titel_hold}>
                    <Text style={Styles.titel_heder}>Reservation History</Text>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    <FlatList
                        data={bookList}
                        keyExtractor={(item, index) => index}
                        style={{ marginBottom:30, }}
                        renderItem={({ item }) => {
                            // console.log("single order id " + item.id);
                            var dte = item.checkOut;
                            dte = dte.split("T");
                            var checking = item.checkIn;
                            var checkut = item.checkOut;
                            checking = checking.split("T");
                            checkut = checkut.split("T");
                            return (
                                <TouchableOpacity style={Styles.orderListTileContainer} onPress={() => { }}>
                                    <View style={[Styles.orderListTileContainer, { backgroundColor: (item.status == "cancelled") ? "#FFCCCB" : "#ADD8E6" }]}>
                                        <View style={Styles.orderTileViews1}>
                                            <View style={Styles.orderInfoView}>
                                                <Text style={Styles.orderInfoText}>{"Check-In :" + checking[1] + " "}</Text>
                                            </View>
                                            <View style={Styles.orderInfoView}>
                                                <Text style={Styles.orderInfoText}>{"Check-Out : " + checkut[1]}</Text>
                                            </View>
                                            <View style={Styles.orderInfoView}>
                                                <Text style={Styles.orderInfoText}>{"Date : " + dte[0]}</Text>
                                            </View>
                                            <View style={Styles.orderInfoView}>
                                                <Text style={Styles.orderInfoText}>{"Reservation Note " + item.note}</Text>
                                            </View>
                                        </View>
                                        <View style={Styles.orderTileViews2}>
                                            <Text style={[Styles.orderInfoTextBold]}>{"Tabel Number " + item.tableId}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </ScrollView>
            </View>
        </View>
    );
}


function Resent_Tab_Screen() {

    const [recentOderList, setRecentOrderList] = useState([]);
    const [recentTbelBookList, setRecentTbelBookList] = useState([]);
    const { user } = useSelector(state => state.userReducer);


    useEffect(() => {
        getAllOrderList();
        getRecentTabelInfos();
    }, [recentOderList]);


    function getRecentTabelInfos() {
        Funtion_Get_Tabels_Info(user.token).then((response) => {
            if (response.code == '201') {
                setRecentTbelBookList(response.responce.data);
            }
        }).catch((err) => {
            console.log("error happen on get all reveration tables infos" + err);
        });
    }

    function getAllOrderList() {

        var userid = user.ids;

        Funtion_Get_All_Orders(user.token).then((response) => {
            //console.log("order list "+JSON.stringify(response.responce));
            var tempList = [];
            if (response.code == "200") {
                var fullList = response.responce.data;
                // fullList.forEach((order) => {
                //     if (order.userId == userid) {
                //         tempList.push(order);
                //     }
                // });

                setRecentOrderList(fullList);

                console.log("filer list by userid length " + tempList.length);
                // console.log("state list by userid data  " + JSON.stringify(recentOderList));

            } else {
                setRecentOrderList([]);
            }

        }).catch((error) => {
            console.log("error happen load recent order list " + error);
        });

    }

    return (
        <View style={Styles.main}>
            <View style={Styles.titel_holder}>
                <TitelComponet />
            </View>
            <ScrollView>
                {
                    (recentOderList.length > 0) ?
                        <OderListView orderList={recentOderList} />
                        :
                        <View>
                            <View style={Styles.titel_holder}>
                                <PicupTiles />
                            </View>
                            <View style={Styles.titel_holder}>
                                <DelivaryTile />
                            </View>
                            <View style={Styles.titel_holder}>
                                <BottomDescriptionTile />
                            </View>
                        </View>
                }

                <RecentBookTabelList bookList={recentTbelBookList} />
            </ScrollView>
        </View>
    );
}

const Styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        //flexDirection: 'row',
        alignContent: 'center',
        //alignItems: 'center'
    },
    titel_holder: {
        width: wp('100%'),
        height: hp('25%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    titel_content: {
        width: wp('90%'),
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    titel_hold: {
        width: wp('90%'),
        height: hp('5%'),
        justifyContent: 'center'
    },
    titel_discription_holder: {
        width: wp('90%'),
        height: hp('5%'),
        justifyContent: 'center'
    },
    titel_heder: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 20,
        color: '#000',
        letterSpacing: 0.25,
    },
    titel_description: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#000',
        letterSpacing: 0.25,
    },
    titel_description_hed: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 16,
        color: '#000',
        letterSpacing: 0.25,
    },
    tileHolder: {
        width: wp('100%'),
        height: hp('20%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    tileContent: {
        width: wp('90%'),
        height: hp('18%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp('5%'),
        backgroundColor: '#FFF',
        flexDirection: 'row'
    },
    bottomDescription: {
        width: wp('100%'),
        height: hp('20%'),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0
    },
    bottomDescriptionContent: {
        width: wp('90%'),
        height: hp('15%'),
        //alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0
    },
    titel_botttom_description: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 12,
        color: '#000',
        letterSpacing: 0.1,
    },
    titel_botttom_titel: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 13,
        color: '#000',
        letterSpacing: 0.25,
    },
    tile_row: {
        width: wp('15%'),
        height: hp('15%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    app_logs: {
        width: wp('8%'),
        height: hp('6%'),
        alignContent: 'center',
        alignItems: 'center',
        resizeMode: "contain",
    },
    tile_row_text: {
        width: wp('60%'),
        height: hp('15%'),
        // alignItems: 'center',
        justifyContent: 'center',
    },
    orderListContainer: {
        width: wp('100%'),
        height: hp('80%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,

    },
    orderListHoler: {
        width: wp('95%'),
        height: hp('80%'),
        justifyContent: 'center',
        
    },
    orderListTileContainer: {
        width: wp('95%'),
        height: hp('12%'),
        //alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp('4%'),
        flexDirection: 'row',
        marginTop: 2,
        marginBottom: 1,
    },
    orderTileViews1: {
        width: wp('60%'),
        height: hp('10%'),
        //alignItems: 'center',
        justifyContent: 'center',

    },
    orderTileViews2: {
        width: wp('35%'),
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    orderInfoView: {
        width: wp('58%'),
        //alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
        marginTop: 2,
    },
    orderInfoText: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 13,
        color: '#000',
        letterSpacing: 0.1,
    },
    orderInfoTextBold: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 16,
        color: '#000',
        letterSpacing: 0.1,
    },

});

export default Resent_Tab_Screen;