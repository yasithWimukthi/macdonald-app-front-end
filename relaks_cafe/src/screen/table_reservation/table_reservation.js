import React, { PropTypes, Component, useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput, Button } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import {FONT_BOLD,FONT_LIGHT} from '../../assert/key/key';


const Tabel_Titel = () => {
    return (
        <View style={Styles.titel_Container}>
            <View style={Styles.titelHolder}>
                <View style={Styles.holder_text}>
                    <Text style={Styles.textTitel}>Avalibale Tables</Text>
                </View>
            </View>
        </View>
    );
}


const TabelHolder = () => {
    return (
        <View style={Styles.table_Container}>
            <View style={Styles.tableHolder}>
                <View style={Styles.tableRow}>
                    <View style={Styles.tableTileHolder}>
                        <View style={Styles.tabel_infoHolder}>
                            <Text style={Styles.table_text_content}>Tabel Number</Text>
                        </View>
                        <View style={Styles.tabel_infoHolder}>
                            <Text style={Styles.table_text_content}>Number of seats</Text>
                        </View>
                    </View>
                    <View style={Styles.tableTileHolder}>
                        <View style={Styles.tabel_infoHolder}>
                            <Text style={Styles.table_text_content}>Tabel Number</Text>
                        </View>
                        <View style={Styles.tabel_infoHolder}>
                            <Text style={Styles.table_text_content}>Number of seats</Text>
                        </View>
                    </View>
                    <View style={Styles.tableTileHolder}>
                        <View style={Styles.tabel_infoHolder}>
                            <Text style={Styles.table_text_content}>Tabel Number</Text>
                        </View>
                        <View style={Styles.tabel_infoHolder}>
                            <Text style={Styles.table_text_content}>Number of seats</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const SelectonHolder = ({ upddateTypes, updateModel, selectDate, selectTime }) => {
    const [pickerMode, setPickerMode] = useState(null);
    const [inline, setInline] = useState(false);
    // const [type, setType] = useState(null);
    // const [selectDate, setSelectDate] = useState("Select Reservation Date");
    // const [selectTime, setSelectTime] = useState("Select Reservation Time");

    const showDatePicker = () => {
        updateModel("date");
        upddateTypes("Date");
    };

    const showTimePicker = () => {
        updateModel("time");
        upddateTypes("Time");
    };

    const showDateTimePicker = () => {
        setPickerMode("datetime");
    };


    return (
        <View style={Styles.selecton_Container}>
            <View style={Styles.selectonHolder}>
                <TouchableOpacity style={Styles.selectonTouchView} onPress={showDatePicker}>
                    <View style={Styles.selectonView}>
                        <Text>{selectDate}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.selectonTouchView} onPress={showTimePicker}>
                    <View style={Styles.selectonView}>
                        <Text>{selectTime}</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const Pickers = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };

    return (
        <View>
            <Button title="Show Date Picker" onPress={showDatePicker} />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );

}

const NoteHolder = () => {

    return (
        <View style={Styles.note_Container}>
            <View style={Styles.noteHolder}>
                <View style={Styles.noteInputs}>
                    <TextInput style={Styles.defulatTextInput}  placeholder="Special Note" />
                </View>
            </View>
        </View>
    );
}


const BottomButton = () => {
    return (
        <View style={Styles.btnContainer}>
            <TouchableOpacity onPress={funtions}>
                <View style={[Styles.btnBorder, { backgroundColor: 'yellow', borderWidth: 0 }]}>
                    <View style={Styles.btn_icon_holder}>
                        {/* <Icon color="#4285F4" name="google" size={30} /> */}
                    </View>
                    <View style={Styles.btn_text_holder_login}>
                        <Text style={Styles.brtn_text_content}>Submit</Text>
                    </View>
                    <View style={Styles.btn_icon_holder}>
                        {/* <Icon color="#000" name="right" size={30} /> */}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const Tabel_Reservation_Screen = () => {

    const [pickerMode, setPickerMode] = useState(null);
    const [inline, setInline] = useState(false);
    const [type, setType] = useState(null);
    const [selectDate, setSelectDate] = useState("Select Reservation Date");
    const [selectTime, setSelectTime] = useState("Select Reservation Time");

    const hidePicker = () => {
        setPickerMode(null);
    };

    const handleConfirm = (date) => {
        // In order to prevent the double-shown popup bug on Android, picker has to be hidden first (https://github.com/react-native-datetimepicker/datetimepicker/issues/54#issuecomment-618776550)
        hidePicker();
        if (type == "Date") {
            setSelectDate(date);
        } else {
            setSelectTime(date);
        }
        console.warn("A date has been picked: ", date);
    };

    return (
        <View style={Styles.main}>
            <Tabel_Titel />
            <TabelHolder />
            {/* <SelectonHolder upddateTypes={setType} updateModel={setPickerMode} selectDate={selectDate} selectTime={selectTime} /> */}
            <Pickers/>
            <DateTimePickerModal
                isVisible={pickerMode !== null}
                mode={pickerMode}
                onConfirm={handleConfirm}
                onCancel={hidePicker}
                display={inline ? "inline" : undefined}
            />
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
    titel_Container: {
        width: wp('100%'),
        height: hp('15%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    titelHolder: {
        width: wp('90%'),
        height: hp('12%'),
        justifyContent: 'center'
    },
    holder_text: {
        width: wp('90%'),
        height: hp('6%'),
        justifyContent: 'center'
    },
    textTitel: {
        fontFamily: FONT_LIGHT,// 'NexaTextDemo-Light',
        fontSize: 18,
        color: '#000',
    },
    table_Container: {
        width: wp('100%'),
        height: hp('40%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    tableHolder: {
        width: wp('90%'),
        height: hp('38%'),
        justifyContent: 'center'
    },
    tableRow: {
        width: wp('90%'),
        height: hp('15%'),
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    tableTileHolder: {
        width: wp('28%'),
        height: hp('15%'),
        margin: 5,
        justifyContent: 'center',
        backgroundColor: 'pink',
        borderRadius: wp('5%'),
    },
    tabel_infoHolder: {
        width: wp('25%'),
        height: hp('5%'),
        margin: 5,
        justifyContent: 'center',
    },
    selecton_Container: {
        width: wp('100%'),
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectonHolder: {
        width: wp('90%'),
        height: hp('8%'),
        justifyContent: 'center'
    },
    selectonTouchView: {
        width: wp('90%'),
        height: hp('3%'),
        justifyContent: 'center'
    },
    selectonView: {
        width: wp('90%'),
        height: hp('3%'),
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
    },
    note_Container: {
        width: wp('100%'),
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    noteHolder: {
        width: wp('90%'),
        height: hp('8%'),
        justifyContent: 'center'
    },
    noteInputs: {
        width: wp('90%'),
        height: hp('6%'),
        justifyContent: 'center'
    },
    btnContainer: {
        //flex: 1,
        width: wp('100%'),
        height: hp('8%'),
        // backgroundColor:'pink',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0

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
        alignItems: 'center'
        , justifyContent: 'center'
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
        fontFamily: FONT_BOLD, // 'NexaTextDemo-Bold',
        fontSize: 18,
        color: '#000'
    },
    table_text_content: {
        fontFamily: FONT_BOLD, // 'NexaTextDemo-Bold',
        fontSize: 14,
        color: '#000'
    },
    defulatTextInput:{
        fontFamily: FONT_LIGHT,// 'NexaTextDemo-Light',
        color: '#000'
    },

});

export default Tabel_Reservation_Screen;