import * as Notifications from "expo-notifications";

import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";


export default function Notification() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);

      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return null;
}

export async function schedulePushNotification(
  className,
  slot,
  type,
  time,
  day,
  instant
) {
  time = new Date(time.getTime() - 5 * 60000);
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weekday = day;
  const hours = time.getHours();
  const minutes = time.getMinutes();
  console.log("WEEKDAY:", {
    weekday: weekday,
    hour: hours,
    minute: minutes,
    repeats: true,
  });
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: className + " " + type,
      body: slot,
      // sound: 'default',
    },
    trigger: instant? {seconds:4}: {
      weekday: weekday,
      hour: hours,
      minute: minutes,
      repeats: true,
    },
  });

  console.log("notif id on scheduling", id);
  return id;
}
