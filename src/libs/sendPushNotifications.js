import Expo from "expo-server-sdk";

export default (messages) => {
  const expo = new Expo();
  const chunks = expo.chunkPushNotifications(messages);

  return Promise.all(chunks.reduce((promises, chunk) => {
    promises.push(expo.sendPushNotificationsAsync(chunk));
    return promises;
  }, []));
};
