import Expo from "expo-server-sdk";
import B from "bluebird";

export default (messages) => {
  const expo = new Expo();
  const chunks = expo.chunkPushNotifications(messages);

  return B.mapSeries(chunks, chunk => expo.sendPushNotificationsAsync(chunk));
};
