import {check,request,RESULTS,requestMultiple} from 'react-native-permissions';

export async function checkMultiplePermission (permissionList) {
    let permissionGranted = false;

    const permiossionStatus = checkMultiplePermission(permissionList);
    
    for(var index in permissionList){
        if(permiossionStatus[permissionList[index]] === RESULTS.GRANTED){
            permissionGranted = true;
        }else{
            permissionGranted = false;
            break;
        }
    }

    return permissionGranted;
}   

export async function checkSinglePermission (permission) {
    let permissionGranted = false;

    const permiossionStatus = check(permission);

    switch(permiossionStatus) {
        case RESULTS.GRANTED :
            permissionGranted = true;
            break;
        case RESULTS.BLOCKED :
            permissionGranted = false;
            break;
        case RESULTS.DENIED : 
            permiossionStatus = false;
            break;
        case RESULTS.UNAVAILABLE : 
            permiossionStatus = false;
            break;
    }

    return permissionGranted;
}

