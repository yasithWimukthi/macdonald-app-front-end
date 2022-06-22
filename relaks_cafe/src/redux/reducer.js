import { SET_USER_TOKEN, SET_USER_INFO, SET_CART_ITEMS, SET_ADDRESS_INFO, SET_FAV_ADDRESS_INFO } from './actions';

const initialState = {
    token: "",
    user: {
        "ids": "0",
        "firstName": "",
        "lastName": "",
        "loginType": "",
        "email": "",
        "token": "",
        "mobile" : ""
    },
    items: {
        "isDelivery": false,
        "refId": "",
        "noOfItems": 0,
        "totalPrice": 0.00,
        "promotionId": 0,
        "location": {
            "latitude": "34.052235",
            "longitude": "-118.243683"
        },
        "foodItems": []
    },
    address: {
        "mainAddress": "Plase select Location",
        "subAddress": "tap on change location",
        "location": {
            "latitude": "34.052235",
            "longitude": "-118.243683"
        }
    },
    favaddress: {
        "favAdd": []
    }
}

// {
//     "favName": "defult",
//     "mainAddress": "Plase select Location",
//     "subAddress": "tap on change location",
//     "location": {
//         "latitude": "34.052235",
//         "longitude": "-118.243683"
//     }
// }

function userReducer(state = initialState, actions) {
    switch (actions.type) {
        case SET_USER_TOKEN:
            return { ...state, token: actions.payload }
        case SET_USER_INFO:
            return { ...state, user: actions.payload }
        case SET_CART_ITEMS:
            return { ...state, items: actions.payload }
        case SET_ADDRESS_INFO:
            return { ...state, address: actions.payload }
        case SET_FAV_ADDRESS_INFO:
            return { ...state, favaddress: actions.payload }
        default:
            return state;
    }
}

export default userReducer;