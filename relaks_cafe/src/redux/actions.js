export const SET_USER_TOKEN = "SET_USER_TOKEN";
export const SET_USER_INFO = "SET_USER_INFO";
export const SET_CART_ITEMS = "SET_CART_ITEMS";
export const SET_ADDRESS_INFO = "SET_ADDRESS_INFO";


export const setToken = token => dispatch =>{
    dispatch({
        type : SET_USER_TOKEN,
        payload : token,
    })
};

export const setUserInfo = user => dispatch =>{
    dispatch({
        type : SET_USER_INFO,
        payload : user,
    })
};

export const setCartItems = items => dispatch =>{
    dispatch({
        type : SET_CART_ITEMS,
        payload : items,
    })
};

export const setAddressInfo = address => dispatch => {
    dispatch({
        type : SET_ADDRESS_INFO,
        payload : address,
    })
}