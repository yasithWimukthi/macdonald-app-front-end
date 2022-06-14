import AsyncStorage from '@react-native-async-storage/async-storage';

//create getter and setter for bear token

const StoreToke = async (token) => {
    try {
        await AsyncStorage.setItem('BToken', token);
    } catch (error) {
        console.log("error happen save token " + error);
    }
}


const GetToken = async () => {
    try {
        const value = await AsyncStorage.getItem('BToken');
        if (value !== null) {
            // value previously stored
            return value;
        } else {
            return null;
        }
    } catch (error) {
        console.log("error happen get token " + error);
    }
}

//create getter and setter for user info

const StoreUserInfo = async (userInfo) => {
    try {
        const jsonValue = JSON.stringify(userInfo)
        await AsyncStorage.setItem('UserInfo', jsonValue);
    } catch (error) {
        console.log("error happen save userinfo " + error);
    }
}

const GetUserInfo = () => {
    try {
        const value = AsyncStorage.getItem('UserInfo');
        if (value !== null) {
            // value previously stored
            return JSON.parse(value);
        } else {
            return null;
        }
    } catch (error) {
        console.log("error happen get userinfo " + error);
    }
}

//create getter and setter for order create

const StoreOderInfo = (orderInfo) => {
    try {
        const jsonValue = JSON.stringify(orderInfo)
        AsyncStorage.setItem('OrderInfo', jsonValue);
    } catch (error) {
        console.log("error happen save orderinfo " + error);
    }
}

const GetOrderInfo = () => {
    try {
        const value = AsyncStorage.getItem('OrderInfo');
        if (value !== null) {
            // value previously stored
            return JSON.parse(value);
        } else {
            return null;
        }

    } catch (error) {
        console.log("error happen get orderinfo " + error);
    }
}


export { StoreToke };
export { GetToken };
export { StoreUserInfo };
export { GetUserInfo };
export { StoreOderInfo };
export { GetOrderInfo };