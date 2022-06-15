import { Actions } from "react-native-router-flux";
import PushNotification from "react-native-push-notification";
class NotificationHandler {
  onNotification(notification) {
    console.log('NotificationHandler:', notification);

    console.log("params " + JSON.stringify(notification.data));

    var parm = notification.data;

    if (parm.type == "tabel") {
      PushNotification.cancelLocalNotifications({ id: '1995' });
    } else {
      if (parm.status == "accept") {
        PushNotification.cancelLocalNotifications({ id: '1995' });
        Actions.OrderSt({ "orderStatus": "Confimed" });
      } else {
        PushNotification.cancelLocalNotifications({ id: '1995' });
        Actions.OrderSt({ "orderStatus": "Cancel" });
      }
    }
    if (typeof this._onNotification === 'function') {
      this._onNotification(notification);
    }
  }

  onRegister(token) {
    console.log('NotificationHandler:', token);

    if (typeof this._onRegister === 'function') {
      this._onRegister(token);
    }
  }

  onAction(notification) {
    console.log('Notification action received:');
    console.log(notification.action);
    console.log(notification);
    console.log("inside Action");

    if (notification.action === 'Yes') {
      PushNotification.invokeApp(notification);
      console.log("inside yes");
      //navigate to order confirm screen with status
      PushNotification.cancelLocalNotifications({ id: '1995' });
    } else {
      //hide notification
      console.log("inside no");
      PushNotification.cancelLocalNotifications({ id: '1995' });
    }
  }

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError(err) {
    console.log(err);
  }

  attachRegister(handler) {
    this._onRegister = handler;
  }

  attachNotification(handler) {
    this._onNotification = handler;
  }
}

export default NotificationHandler;