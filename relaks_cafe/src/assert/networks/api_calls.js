import axios from 'axios';

import GET_TOKEN from '../../assert/networks/dataAccess';

let BASE_URL = "http://cafeappapi-env.eba-5w53m5sm.eu-west-2.elasticbeanstalk.com/"; // https://cafe-app-352118.el.r.appspot.com/

const TokenVal = GET_TOKEN;


const Funtion_Register = async (user) => {

    var data = JSON.stringify({
        "firstName": user.f_name,
        "lastName": user.l_name,
        "email": user.email,
        "password": user.password,
        "mobile": user.contact,
    });

    var url = BASE_URL + "api/v1/auth/customer/register";
    try {
        let responce = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer token',
                'Content-Type': 'application/json',
            },
            body: data
        });
        // let responce_Values = await responce.json();
        // return responce_Values;
        let code = responce.status;
        let responce_Values = await responce.json();
        var data = {
            "code" : code,
            "responce" : responce_Values
        }
        return data;

    } catch (error) {
        console.log("error on funtion_register : " + error);
    }
}

const Funtion_FaceBook_Register = async () => {
    try {
        var url = BASE_URL + "api/v1/auth/facebook";
        let responce = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        let code = responce.status;
        //let responce_Values = await responce.json();
        let responce_Values = await responce.text();
        console.log("fbs "+responce_Values);
        var data = {
            "code" : code,
            "responce" : responce_Values
        }
        return data;
        
    } catch (error) {
        console.log("error on funtion_facebook_register : " + error);
    }
}

const Funtion_Google_Register = async () => {
    console.log("calling api side");
    try {
        //var url = BASE_URL + "api/v1/auth/google"; 
        var url = "https://api.relaksradiocafe.com/api/v1/auth/google"; 
        let responce = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        let code = responce.status;
        //let responce_Values = await responce.json();
        let responce_Values = await responce.text();
        console.log("google "+responce_Values);
        var data = {
            "code" : code,
            "responce" : responce_Values
        }
        return data;
    } catch (error) {
        console.log("error on funtion_google_register : " + error);
    }
}

const Funtion_Auth = async (user) => {

    var data = JSON.stringify({
        "email": user.email,
        "password": user.password
    });

    console.log("pass auth "+JSON.stringify(data));

    var url = BASE_URL + "api/v1/auth/login";
    // var config = {
    //     method: 'post',
    //     url: url,
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     data: data
    // };
    try {
        let responce = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer token',
                'Content-Type': 'application/json',
            },
            body: data
        });
        // let responce_Values = await responce.json();
        // return responce_Values;
        let code = responce.status;
        console.log("return "+responce.status);
        let responce_Values = await responce.json();
        var data = {
            "code" : code,
            "responce" : responce_Values
        }
        console.log("response value  "+responce_Values);
        console.log("datas "+JSON.stringify(data));

        return data;


    } catch (error) {
        console.log("error on funtion_auth : " + error);
    }
}

const Funtion_Get_Home_Menu_List = async () => {
    try {
        var url = BASE_URL + "api/v1/categories";

        let responce = await fetch(url, {
            method: 'GET',
            headers: {
                // "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRpbmVzaG1hZHVzaGFzYW5rYWdzczIwMTVAZ21haWwuY29tIiwiaWF0IjoxNjU0ODUyNjI3LCJleHAiOjE2NTU0NTc0Mjd9.yoo09mURK_WrWgucjjSf8pseTzR5CxTA-uGEMgpgDps",
                Authorization: `Bearer ${TokenVal}`,
                'Content-Type': 'application/json',
            },
        });
        // let responce_Values = await responce.json();
        // return responce_Values;
        let code = responce.status;
        let responce_Values = await responce.json();
        var data = {
            "code" : code,
            "responce" : responce_Values
        }
        return data;
    
    } catch (error) {
        console.log("error on funtion_get_home_menu_list : " + error);
    }
}

const Funtion_Get_Home_Tranding_List = async () => {
    try {
        var url = BASE_URL + "api/v1/trending";
        let responce = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${TokenVal}`,
                'Content-Type': 'application/json',
            },
        });
        // let responce_Values = await responce.json();
        // return responce_Values;
        let code = responce.status;
        let responce_Values = await responce.json();
        var data = {
            "code" : code,
            "responce" : responce_Values
        }
        return data;

    } catch (error) {
        console.log("error on funtion_get_home_tranding_list : " + error);
    }
}

const Funtion_Get_Home_Deals_List = async () => {
    try {
        var url = BASE_URL + "api/v1/promotions";
        let responce = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${TokenVal}`,
                'Content-Type': 'application/json',
            },
        });
        // let responce_Values = await responce.json();
        // return responce_Values;
        let code = responce.status;
        let responce_Values = await responce.json();
        var data = {
            "code" : code,
            "responce" : responce_Values
        }
        return data;

    } catch (error) {
        console.log("error on funtion_get_home_deals_list : " + error);
    }
}

const Funtion_Order_Menu_List = async () => {
    try {
        var url = BASE_URL + "api/v1/categories";

        let responce = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${TokenVal}`,
                'Content-Type': 'application/json',
            },
        });
        // let responce_Values = await responce.json();
        // return responce_Values;
        let code = responce.status;
        let responce_Values = await responce.json();
        var data = {
            "code" : code,
            "responce" : responce_Values
        }
        return data;

    } catch (error) {
        console.log("error on funtion_get_oder_menu_list : " + error);
    }
}

const Funtion_Get_Deals_Info_List = async () => {
    try {
        var url = BASE_URL + "api/v1/promotions";
        let responce = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${TokenVal}`,
                'Content-Type': 'application/json',
            },
        });
        // let responce_Values = await responce.json();
        // return responce_Values;
        let code = responce.status;
        let responce_Values = await responce.json();
        var data = {
            "code" : code,
            "responce" : responce_Values
        }
        return data;

    } catch (error) {
        console.log("error on funtion_get_deals_list : " + error);
    }
}

const Funtion_Get_Foods_List = async (id) => {
    try {
        var url = BASE_URL + "api/v1/food-items?categoryId="+id;
       // console.log("url "+url);
        let responce = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${TokenVal}`,
                'Content-Type': 'application/json',
            },
        });
        // let responce_Values = await responce.json();
        // return responce_Values;
        let code = responce.status;
        let responce_Values = await responce.json();
        var data = {
            "code" : code,
            "responce" : responce_Values
        }
        return data;


    } catch (error) {
        console.log("error on funtion_get_deals_list : " + error);
    }
}

const Funtion_Place_Foods_Order = async (order, tokens) => {
    console.log("calling apis");
    try {
        var url = BASE_URL + "api/v1/orders";

        var raw = JSON.stringify({
            "noOfItems": order.noOfItems,
            "totalPrice": order.totalPrice,
            "promotionId": order.promotionId,
            "isDelivery": order.isDelivery,
            "refId": order.refId,
            "location": {
              "latitude": order.location.latitude,
              "longitude": order.location.longitude,
            },
            "foodItems": order.foodItems,
          });

        console.log("token "+tokens);
       // console.log("url "+url);
        let responce = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${tokens}`,
                'Content-Type': 'application/json',
            },
            body: raw
        });
        // let responce_Values = await responce.json();
        // return responce_Values;
        let code = responce.status;
        let responce_Values = await responce.json();
        var data = {
            "code" : code,
            "responce" : responce_Values
        }
        return data;


    } catch (error) {
        console.log("error on funtion_order_place : " + error);
    }
}

const Funtion_Single_Foods_Info = async (id) => {
    try {
        var url = BASE_URL + "api/v1/food-items/"+id;
       // console.log("url "+url);
        let responce = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${TokenVal}`,
                'Content-Type': 'application/json',
            },
        });
        // let responce_Values = await responce.json();
        // return responce_Values;
        let code = responce.status;
        let responce_Values = await responce.json();

        console.log("response "+JSON.stringify(responce_Values));
        var data = {
            "code" : code,
            "responce" : responce_Values
        }
        return data;


    } catch (error) {
        console.log("error on funtion_get_deals_list : " + error);
    }
}
const Funtion_Check_Avalible_tabel = async (times, token) => {

   // console.log("pass parm "+JSON.stringify(times));

    try {
        var url = BASE_URL + "api/v1/tables/available-tables";
        //console.log("token "+TokenVal);
        var raw = JSON.stringify({
            'checkIn': times.checkIn,
            'checkOut': times.checkOut
          });
       //console.log("check "+raw);
        let responce = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body : raw,
        });
        // let responce_Values = await responce.json();
        // return responce_Values;
        let code = responce.status;
        let responce_Values = await responce.json();
        var data = {
            "code" : code,
            "responce" : responce_Values
        }
        return data;


    } catch (error) {
        console.log("error on funtion_get_deals_list : " + error);
    }
}

const Funtion_Reservation_tabel = async (table, token) => {

    console.log("bookings "+JSON.stringify(table));

    try {
        var url = BASE_URL + "api/v1/tables/reserve-table";

        var data = JSON.stringify({
            "tableId": table.tableId,
            "note" : table.note,
            "checkIn": table.checkIn,
            "checkOut": table.checkOut
        });
       // console.log("url "+url);
       //console.log("pass "+JSON.stringify(data));
        let responce = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body : data,
        });
        let code = responce.status;
        let responce_Values = await responce.json();
        var data = {
            "code" : code,
            "responce" : responce_Values
        }
        return data;
        


    } catch (error) {
        console.log("error on funtion_get_deals_list : " + error);
    }
}

const Funtion_Request_ForgetPasword = async (email) => {

    try {
        var url = BASE_URL + "api/v1/auth/password-reset?email="+email;
        let responce = await fetch(url, {
            method: 'GET',
            headers: {
                //"Authorization": "Bearer "+token,
                'Content-Type': 'application/json',
            },
        });
        let code = responce.status;
        let responce_Values = await responce.json();
        var data = {
            "code" : code,
            "responce" : responce_Values
        }
        return data;
    } catch (error) {
        console.log("error on funtion_get_deals_list : " + error);
    }
}

const Funtion_Reset_Pasword = async (passObj,token) => {
    try {
        var url = BASE_URL + "/api/v1/auth/password-reset";

        var raw = JSON.stringify({
                "token": passObj.token,
                "email": passObj.email,
                "password": passObj.password
        });

        let responce = await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer "+token,
                'Content-Type': 'application/json',
            },
            body : raw,
        });
        let code = responce.status;
        let responce_Values = await responce.json();
        var data = {
            "code" : code,
            "responce" : responce_Values
        }
        return data;
    } catch (error) {
        console.log("error on funtion_get_deals_list : " + error);
    }
}

const Funtion_Get_All_Orders = async (token) => {
    try {
        var url = BASE_URL + "api/v1/orders";


        let responce = await fetch(url, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer "+token,
                'Content-Type': 'application/json',
            }
        });
        let code = responce.status;
        let responce_Values = await responce.json();
        var data = {
            "code" : code,
            "responce" : responce_Values
        }
        return data;
    } catch (error) {
        console.log("error on funtion_get_all_order_list : " + error);
    }
}

const Funtion_Update_Profile_Info = async (userInfo,token) => {
    try {
        var url = BASE_URL + "api/v1/auth/me";

        var raw = JSON.stringify(userInfo);

        let responce = await fetch(url, {
            method: 'PATCH',
            headers: {
                "Authorization": "Bearer "+token,
                'Content-Type': 'application/json',
            },
            body : raw,
        });
        let code = responce.status;
        let responce_Values = await responce.json();
        var data = {
            "code" : code,
            "responce" : responce_Values
        }
        return data;
    } catch (error) {
        console.log("error on funtion_update_profile_info : " + error);
    }
}

const Funtion_Get_Tabels_Info = async (token) => {
    try {
        var url = BASE_URL + "api/v1/tables/reservations";


        let responce = await fetch(url, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer "+token,
                'Content-Type': 'application/json',
            }
        });
        let code = responce.status;
        let responce_Values = await responce.json();
        var data = {
            "code" : code,
            "responce" : responce_Values
        }
        return data;
    } catch (error) {
        console.log("error on funtion_get_tabel_reservation_info : " + error);
    }
}

export {Funtion_FaceBook_Register};
export {Funtion_Google_Register};  
export {Funtion_Auth};      
export {Funtion_Register};     
export {Funtion_Get_Home_Menu_List};      
export {Funtion_Get_Home_Tranding_List};      
export {Funtion_Get_Home_Deals_List};      
export {Funtion_Order_Menu_List};      
export {Funtion_Get_Deals_Info_List};      
export {Funtion_Get_Foods_List};
export {Funtion_Place_Foods_Order};
export {Funtion_Single_Foods_Info};
export {Funtion_Check_Avalible_tabel};
export {Funtion_Reservation_tabel};
export {Funtion_Request_ForgetPasword};
export {Funtion_Reset_Pasword};
export {Funtion_Get_All_Orders};
export {Funtion_Update_Profile_Info};
export {Funtion_Get_Tabels_Info};

