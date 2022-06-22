import React, { PropTypes, Component, useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, Platform, TextInput, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import ZigzagView from "react-native-zigzag-view"
import { Actions } from 'react-native-router-flux';

import NetInfo from "@react-native-community/netinfo";

import DatePicker from 'react-native-date-picker';

import { Funtion_Reservation_tabel, Funtion_Check_Avalible_tabel,  } from '../../assert/networks/api_calls';

import AwesomeAlert from 'react-native-awesome-alerts';

import { useSelector, useDispatch } from 'react-redux';

const CheckTabelList = ({ updateTabelList, updateCheckin, updateCheckout, updateModelVisible, updateModelTitel, updateModelMessage }) => {

    var tempdate = new Date();
    var timeZoneFromDB = +5.30;
    var tzDifference = timeZoneFromDB * 60 + tempdate.getTimezoneOffset();
    var offsetTime = new Date(tempdate.getTime() + tzDifference * 60 * 1000);

    const { user } = useSelector(state => state.userReducer);

    const [checkindate, setCheckinDate] = useState(offsetTime);
    const [checkoutdate, setCheckoutDate] = useState(offsetTime);
    const [openCheckout, setOpenCheckout] = useState(false);
    const [openChecking, setOpenChecking] = useState(false);

    function checkAvalibleTable() {

        console.log("calling");

        var tims = {
            "checkIn": checkindate.toISOString(),
            "checkOut": checkoutdate.toISOString()
        }

        Funtion_Check_Avalible_tabel(tims, user.token).then((response) => {
            console.log("response " + JSON.stringify(response));
            if (response.code == '200') {
                // setModelTitel("SuccessFully");
                // setModelMessage("Table reservation successfully");
                // setShow(true);
                var dt = response.responce;
                if (dt.data.availableTableIds.length == '0') {
                    updateModelTitel("Sorry");
                    updateModelMessage("All of table are fully booked, try another time slot");
                    updateModelVisible(true);
                } else {

                    var lists = [];
                    dt.data.availableTableIds.forEach(tabels => {
                        var teblObj = {
                            "id": tabels.id,
                            "tableName": tabels.tableName,
                            "seatingCapacity": tabels.seatingCapacity,
                            "isIndoor": tabels.isIndoor,
                            "isSelected": false,
                        }

                        lists.push(teblObj);
                    });

                    updateTabelList(lists);
                }

            } else if (response.code == '401') {
                updateModelTitel("Error");
                updateModelMessage("Authentication Fail, Plase login again");
                updateModelVisible(true);
                //redirct to login page
                //show eorr
            } else if (response.code == '500') {
                //server error
                updateModelTitel("Error");
                updateModelMessage("Something went wrong, try again later");
                updateModelVisible(true);
            }

            // if (response.code == "200") {
            //     var dt = response.responce;
            //     updateTabelList(dt.data.availableTableIds);
            // } else {
            //     alert("tables getting error " + JSON.stringify(response));
            // }


        }).catch((error) => {
            console.log("error happen on avlaibe data fetching " + error);
        });
    }


    return (
        <View style={Styles.TabelChecking_Container}>
            <View style={Styles.TabelChecking_holder}>
                <View style={Styles.TabelChecking_Layer}>
                    <View style={Styles.datePicker_Layer}>
                        <TouchableOpacity onPress={() => setOpenChecking(true)}>
                            <View style={Styles.single_Checking_Input_Container}>
                                <View style={Styles.Input_label_Container}>
                                    {/* <Text>Checking</Text> */}
                                    <DatePicker
                                        modal
                                        open={openChecking}
                                        date={checkindate}
                                        onConfirm={(date) => {
                                            console.log("dates " + date.toISOString());
                                            setOpenChecking(false);
                                            setCheckinDate(date);
                                            updateCheckin(date);
                                        }}
                                        onCancel={() => {
                                            setOpenChecking(false);
                                        }}
                                        timeZoneOffsetInMinutes={330}
                                    />
                                    <Text style={Styles.timeLabelCont}>{"From"}</Text>
                                    <Text style={Styles.timeLabel}>{checkindate.toUTCString()}</Text>

                                </View>
                                <View style={Styles.Input_Icon_Container}>
                                    <Icon color="red" name="ios-checkmark-circle-sharp" size={30} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setOpenCheckout(true); }}>
                            <View style={Styles.single_Checking_Input_Container}>
                                <View style={Styles.Input_label_Container}>
                                    <DatePicker
                                        modal
                                        open={openCheckout}
                                        date={checkoutdate}
                                        onConfirm={(date) => {
                                            console.log("dates " + date.toISOString());
                                            setOpenCheckout(false);
                                            setCheckoutDate(date);
                                            updateCheckout(date);
                                        }}
                                        onCancel={() => {
                                            setOpenCheckout(false);
                                        }}
                                        timeZoneOffsetInMinutes={330}
                                    />
                                    <Text style={Styles.timeLabelCont}>{"To"}</Text>
                                    <Text style={Styles.timeLabel}>{checkoutdate.toUTCString()}</Text>
                                </View>
                                <View style={Styles.Input_Icon_Container}>
                                    <Icon color="red" name="ios-checkmark-done-circle" size={30} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={Styles.chekingBtn_Layer}>
                        <TouchableOpacity onPress={() => { checkAvalibleTable(); }}>
                            <View style={Styles.btn_Input_Container}>
                                <Text style={Styles.BtnLabel}>Search</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}


const TableListView = ({ tabelList, updateSelected, updateNote }) => {

    //console.log("pass list "+JSON.stringify(tabelList));
    var ids = 0;

    const [seletcedTile, setSelectedTile] = useState(null);
    const [ItemSelected, setSelectItem] = useState(false);

    return (
        <View style={Styles.List_Container}>
            <View style={Styles.List_holder}>
                <ScrollView>
                    <View style={Styles.List_Titel_holder}>
                        <Text style={Styles.tabelTitel}>Avalible Tables</Text>
                    </View>
                    <View style={Styles.List_Info_holder}>
                        <FlatList
                            data={tabelList}
                            keyExtractor={(item, index) => index}
                            numColumns={3}
                            extraData={ItemSelected}
                            renderItem={({ item }) => {
                                //console.log("datas "+JSON.stringify(item));
                                return (
                                    <TouchableOpacity onPress={() => {
                                        updateSelected(item);
                                        tabelList.forEach(tabels => {

                                            if (tabels.id == item.id) {
                                                tabels.isSelected = true;
                                            } else {
                                                tabels.isSelected = false;
                                            }
                                        });
                                    }}>
                                        <View elevation={2} style={[Styles.singleTable, { backgroundColor: (item.isSelected) ? "red" : "#FFF" }]}>
                                            <View style={Styles.singleTextHolder}>
                                                <Text style={[Styles.table_info, { color: (item.isSelected) ? "#FFF" : "#000" }]}>{"Name : " + item.tableName}</Text>
                                            </View>
                                            <View style={Styles.singleTextHolder}>
                                                <Text style={[Styles.table_info, { color: (item.isSelected) ? "#FFF" : "#000" }]}>{"Seat : " + item.seatingCapacity}</Text>
                                            </View>
                                            <View style={Styles.singleTextHolder}>
                                                <Text style={[Styles.table_info, { color: (item.isSelected) ? "#FFF" : "#000" }]}>{(item.isIndoor == "0") ? "INDOOR" : "OUTDOOR"}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}

                        />
                    </View>

                    <View style={Styles.note_Container}>
                        <View style={Styles.note_holder}>
                            <TextInput style={Styles.note_text} onChangeText={(text) => { updateNote(text); }} placeholder='Please added any spceial note..' />
                        </View>
                    </View>

                </ScrollView>


            </View>
        </View>
    );
}



const Tabel_Reservation_Screen = () => {

    var tempdate = new Date();
    var timeZoneFromDB = +5.30;
    var tzDifference = timeZoneFromDB * 60 + tempdate.getTimezoneOffset();
    var offsetTime = new Date(tempdate.getTime() + tzDifference * 60 * 1000);

    const { user } = useSelector(state => state.userReducer);

    const [tabelsList, setTableList] = useState([]);
    const [selectTabel, setSelectTabel] = useState(null);
    const [checkIN, setCheckIN] = useState(offsetTime);
    const [checkOUT, setCheckOUT] = useState(offsetTime);
    const [note, setNote] = useState("");

    const [show, setShow] = useState(false);
    const [modelTitel, setModelTitel] = useState("");
    const [modelMessage, setModelMessage] = useState("");
    

    function reserveTable() {
        var dts = {
            "tableId": selectTabel.id, //tableNo //tableName
            "note": note,
            "checkIn": checkIN,
            "checkOut": checkOUT
        }

        console.log("tokens " + user.token);

        Funtion_Reservation_tabel(dts, user.token).then((response) => {
            //alert("resever "+JSON.stringify(responce.status));
            console.log("resever " + JSON.stringify(response));
            if (response.code == '200') {
                setModelTitel("SuccessFully");
                setModelMessage("Table reservation successfully");
                setShow(true);
                //redirct to home
                Actions.authenticated();
            } else if (response.code == '401') {
                setModelTitel("Error");
                setModelMessage("Authentication Fail, Plase login again");
                setShow(true);
                //redirct to login page
                //show eorr
            } else if (response.code == '500') {
                //server error
                setModelTitel("Error");
                setModelMessage("Something went wrong, try again later");
                setShow(true);
            } else {
                setModelTitel("Error");
                setModelMessage("Something went wrong, try again later");
                setShow(true);
            }
        }).catch((error) => {
            console.log("error happen on reseve tables" + error);
        });
    }

    return (
        <View style={Styles.main}>
            <CheckTabelList updateTabelList={setTableList} updateCheckin={setCheckIN} updateCheckout={setCheckOUT} updateModelVisible={setShow} updateModelTitel={setModelTitel} updateModelMessage={setModelMessage} />

            {/* <ScrollView> */}
                <TableListView tabelList={tabelsList} updateSelected={setSelectTabel} updateNote={setNote} />
                {/* <RecentBookTabelList bookList={recentTbelBookList} /> */}
            {/* </ScrollView> */}

            <View style={Styles.screenTitel}>
                <View style={Styles.btnContainer}>
                    <TouchableOpacity disabled={(tabelsList.length) != 0 ? false : true} onPress={() => { reserveTable(); }}>
                        <View style={[Styles.btnBorder, { backgroundColor: (tabelsList.length) != 0 ? '#EB1F25' : "#f5f5f5", borderWidth: 0 }]}>
                            <View style={Styles.btn_icon_holder}>
                                {/* <Icon color="#4285F4" name="google" size={30} /> */}
                            </View>
                            <View style={Styles.btn_text_holder_login}>
                                <Text style={Styles.brtn_text_content}>Reserve a table</Text>
                            </View>
                            <View style={Styles.btn_icon_holder}>
                                {/* <Icon color="#000" name="right" size={30} /> */}
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <AwesomeAlert
                show={show}
                showProgress={false}
                title={modelTitel}
                message={modelMessage}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="cancel"
                confirmText="Ok"
                confirmButtonColor="red" //#DD6B55
                onCancelPressed={() => {
                    setShow(false);
                }}
                onConfirmPressed={() => {
                    setShow(false);
                }}
            />
        </View>
    )
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
    TabelChecking_Container: {
        width: wp('100%'),
        height: hp('30%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    TabelChecking_holder: {
        width: wp('90%'),
        height: hp('28%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    TabelChecking_Layer: {
        width: wp('90%'),
        height: hp('26%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    datePicker_Layer: {
        width: wp('90%'),
        height: hp('16%'),
        justifyContent: 'center',
        alignItems: 'center'

    },
    chekingBtn_Layer: {
        width: wp('90%'),
        height: hp('10%'),
        justifyContent: 'center',

    },
    single_Checking_Input_Container: {
        width: wp('85%'),
        height: hp('8%'),
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderRadius: 3,
        borderWidth: 2,
        borderColor: '#f5f5f5',
        flexDirection: 'row'
        // backgroundColor:'pink'
    },
    Input_label_Container: {
        width: wp('65%'),
        height: hp('6%'),
        justifyContent: 'center',

        // backgroundColor:'pink'
    },
    Input_Icon_Container: {
        width: wp('20%'),
        height: hp('6%'),
        justifyContent: 'center',
        alignItems: 'center'

        // backgroundColor:'pink'
    },
    timeLabel: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#000',
        letterSpacing: 0.04,
        marginLeft: 10,
    },
    timeLabelCont: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 12,
        color: '#000',
        letterSpacing: 0.04,
        marginLeft: 10,
    },
    btn_Input_Container: {
        width: wp('85%'),
        height: hp('8%'),
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderRadius: 3,
        borderWidth: 2,
        borderColor: '#f5f5f5',
        backgroundColor: '#EB1F25'
        // backgroundColor:'pink'
    },
    BtnLabel: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 16,
        color: '#000',
        letterSpacing: 0.04,
    },
    List_Container: {
        width: wp('100%'),
        //height: hp('70%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    List_holder: {
        width: wp('90%'),
        // height: hp('68%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    List_Titel_holder: {
        width: wp('90%'),
        height: hp('8%'),
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    List_Info_holder: {
        width: wp('90%'),
        //height: hp('60%'),
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    singleTable: {
        width: wp('25%'),
        height: hp('15%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
        borderColor: '#f5f5f5',
        borderWidth: 1,
        margin: 4,
    },
    tabelTitel: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 18,
        color: '#000',
        letterSpacing: 0.04,
        marginLeft: 10,
    },
    singleTextHolder: {
        width: wp('24%'),
        height: hp('5%'),
        justifyContent: 'center',
    },
    table_info: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#000',
        letterSpacing: 0.04,
        marginLeft: 10,
    },
    screenTitel: {
        marginTop: hp('3%'),
        marginBottom: hp('3%'),
        position: 'absolute',
        bottom: 0
    },
    btnContainer: {
        //flex: 1,
        width: wp('100%'),
        height: hp('8%'),
        // backgroundColor:'pink',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnBorder: {
        width: wp("90%"),
        height: hp('7%'),
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn_icon_holder: {
        width: "20%",
        height: hp('5%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn_text_holder: {
        width: "60%",
        height: hp('5%'),
        justifyContent: 'center'
    },
    btn_text_holder_login: {
        width: "60%",
        height: hp('5%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    brtn_text_content: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 16,
        color: '#000'
    },
    note_Container: {
        width: wp('85%'),
        height: hp('6%'),
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderRadius: 3,
        borderWidth: 2,
        borderColor: '#f5f5f5',
        // backgroundColor:'pink'
    },
    note_holder: {
        width: wp('82%'),
        height: hp('5%'),
        justifyContent: 'center',
    },
    note_text: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#000'
    },
    orderListContainer: {
        width: wp('100%'),
        height: hp('75%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,

    },
    orderListHoler: {
        width: wp('95%'),
        height: hp('75%'),
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

export default Tabel_Reservation_Screen;