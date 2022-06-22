
import {check,PERMISSIONS,RESULTS} from 'react-native-permissions';
import { Platform } from 'react-native';

const PLATFORM_LOCATION_WHENUSE = {
    ios : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    android : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
}

const REQUEST_PERMISSION_TYPE = {
    location_when_use : PLATFORM_LOCATION_WHENUSE,
}

const PERMISSIONS_TYPE = {
    location_when_use : 'location_when_use'
}

// class AppPermission {

//     checkPermission = async (type): Promise<boolean> => {
//         const permission = REQUEST_PERMISSION_TYPE[type][Platform.OS];
//         if(!permission){
//             return true;
//         }
//         try {
            
//             const result = await check(permission);
//             if(result === RESULTS.GRANTED) return true;
//             return
//         } catch (error) {
//             return false;
//         }
//     }

// }