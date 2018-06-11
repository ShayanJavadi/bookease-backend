import { GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import sendPushNotifications from "../../libs/sendPushNotifications";

export default {
  type: GraphQLInt,
  args: {
    token: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (req, args) => {
    sendPushNotifications([{
      to: args.token,
      sound: "default",
      title: "Testing",
      body: "Good test",
      data: {
        notificationType: "BUY_REQUEST",
        title: "Testing",
        body: "Good test",
        notificationId: "1",
      },
    }]);
    return 200;
  },
};
