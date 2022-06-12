import axios from 'axios';

let BASE_URL = "https://cafe-app-352118.el.r.appspot.com/";

const Funtion_Register = async (user) => {

    var data = JSON.stringify({
        "firstName": user.f_name,
        "lastName": user.l_name,
        "email": user.email,
        "password": user.password,
        "mobile": user.contact
    });

    var url = BASE_URL + "api/v1/auth/customer/register";
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
        let responce_Values = await responce.json();
        return responce_Values;

    } catch (error) {
        console.log("error on funtion_register : " + error);
    }
}

const Funtion_FaceBook_Register = async () => {
    try {
        var url = BASE_URL + "api/v1/auth/facebook";
        var config = {
            method: 'get',
            url:url ,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        axios.get(
            config
        ).then((response) => {
            return response;
        }).catch((err) => {
            return err;
        });
        
    } catch (error) {
        console.log("error on funtion_facebook_register : " + error);
    }
}

const Funtion_Google_Register = async () => {
    try {

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
        let responce_Values = await responce.json();
        return responce_Values;


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
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRpbmVzaG1hZHVzaGFzYW5rYWdzczIwMTVAZ21haWwuY29tIiwiaWF0IjoxNjU0ODUyNjI3LCJleHAiOjE2NTU0NTc0Mjd9.yoo09mURK_WrWgucjjSf8pseTzR5CxTA-uGEMgpgDps",
                'Content-Type': 'application/json',
            },
        });
        let responce_Values = await responce.json();
        return responce_Values;
    
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
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRpbmVzaG1hZHVzaGFzYW5rYWdzczIwMTVAZ21haWwuY29tIiwiaWF0IjoxNjU0ODUyNjI3LCJleHAiOjE2NTU0NTc0Mjd9.yoo09mURK_WrWgucjjSf8pseTzR5CxTA-uGEMgpgDps",
                'Content-Type': 'application/json',
            },
        });
        let responce_Values = await responce.json();
        return responce_Values;

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
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRpbmVzaG1hZHVzaGFzYW5rYWdzczIwMTVAZ21haWwuY29tIiwiaWF0IjoxNjU0ODUyNjI3LCJleHAiOjE2NTU0NTc0Mjd9.yoo09mURK_WrWgucjjSf8pseTzR5CxTA-uGEMgpgDps",
                'Content-Type': 'application/json',
            },
        });
        let responce_Values = await responce.json();
        return responce_Values;

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
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRpbmVzaG1hZHVzaGFzYW5rYWdzczIwMTVAZ21haWwuY29tIiwiaWF0IjoxNjU0ODUyNjI3LCJleHAiOjE2NTU0NTc0Mjd9.yoo09mURK_WrWgucjjSf8pseTzR5CxTA-uGEMgpgDps",
                'Content-Type': 'application/json',
            },
        });
        let responce_Values = await responce.json();
        return responce_Values;

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
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRpbmVzaG1hZHVzaGFzYW5rYWdzczIwMTVAZ21haWwuY29tIiwiaWF0IjoxNjU0ODUyNjI3LCJleHAiOjE2NTU0NTc0Mjd9.yoo09mURK_WrWgucjjSf8pseTzR5CxTA-uGEMgpgDps",
                'Content-Type': 'application/json',
            },
        });
        let responce_Values = await responce.json();
        return responce_Values;

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
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRpbmVzaG1hZHVzaGFzYW5rYWdzczIwMTVAZ21haWwuY29tIiwiaWF0IjoxNjU0ODUyNjI3LCJleHAiOjE2NTU0NTc0Mjd9.yoo09mURK_WrWgucjjSf8pseTzR5CxTA-uGEMgpgDps",
                'Content-Type': 'application/json',
            },
        });
        let responce_Values = await responce.json();
        return responce_Values;


    } catch (error) {
        console.log("error on funtion_get_deals_list : " + error);
    }
}

const Funtion_Place_Foods_Order = async (order) => {
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

       // console.log("url "+url);
        let responce = await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRpbmVzaG1hZHVzaGFzYW5rYWdzczIwMTVAZ21haWwuY29tIiwiaWF0IjoxNjU0ODUyNjI3LCJleHAiOjE2NTU0NTc0Mjd9.yoo09mURK_WrWgucjjSf8pseTzR5CxTA-uGEMgpgDps",
                'Content-Type': 'application/json',
            },
            body: raw
        });
        let responce_Values = await responce.json();
        return responce_Values;


    } catch (error) {
        console.log("error on funtion_get_deals_list : " + error);
    }
}

const Funtion_Single_Foods_Info = async (id) => {
    try {
        var url = BASE_URL + "api/v1/food-items/"+id;
       // console.log("url "+url);
        let responce = await fetch(url, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRpbmVzaG1hZHVzaGFzYW5rYWdzczIwMTVAZ21haWwuY29tIiwiaWF0IjoxNjU0ODUyNjI3LCJleHAiOjE2NTU0NTc0Mjd9.yoo09mURK_WrWgucjjSf8pseTzR5CxTA-uGEMgpgDps",
                'Content-Type': 'application/json',
            },
        });
        let responce_Values = await responce.json();
        return responce_Values;


    } catch (error) {
        console.log("error on funtion_get_deals_list : " + error);
    }
}
const Funtion_Check_Avalible_tabel = async (times) => {

   // console.log("pass parm "+JSON.stringify(times));

    try {
        var url = BASE_URL + "api/v1/tables/available-tables";

        var raw = JSON.stringify({
            'checkIn': times.checkIn,
            'checkOut': times.checkOut
          });
       //console.log("check "+raw);
        let responce = await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRpbmVzaG1hZHVzaGFua2Fnc3MyMDE1QGdtYWlsLmNvbSIsImlhdCI6MTY1NTAzMzk5NCwiZXhwIjoxNjU1NjM4Nzk0fQ.s7RCF400GObJiqV-vk2qynaIUkq0W9RbyxcONss0wNQ",
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

const Funtion_Reservation_tabel = async (table) => {

    //console.log("bookings "+JSON.stringify(table));

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
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRpbmVzaG1hZHVzaGFua2Fnc3MyMDE1QGdtYWlsLmNvbSIsImlhdCI6MTY1NTAzMzk5NCwiZXhwIjoxNjU1NjM4Nzk0fQ.s7RCF400GObJiqV-vk2qynaIUkq0W9RbyxcONss0wNQ",
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

