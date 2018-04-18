import {GraphQLID, GraphQLString} from "graphql";
import isEmpty from "lodash/isEmpty";
import extend from "lodash/extend";
import B from "bluebird";
import db from "../../db";
import acl from "../acl";
import UserType from "../types/User";
import requireAuthenticated from "../acl/requireAuthenticated";
import UserFacebookInput from "../inputs/UserFacebookInput";
import UserGoogleInput from "../inputs/UserGoogleInput";
import encryptPassword from "../../db/models/User/encryptPassword";

export default {
  type: UserType,
  args: {
    email: {
      type: GraphQLString,
    },
    phoneNumber: {
      type: GraphQLString,
    },
    displayName: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
    schoolId: {
      type: GraphQLID,
    },
    facebook: {
      type: UserFacebookInput,
    },
    google: {
      type: UserGoogleInput,
    },
    pushNotificationToken: {
      type: GraphQLString,
    },
    photoURL: {
      type: GraphQLString,
    },
  },
  resolve: (req, args) => {
    const {
      models: {
        User, UserFacebook, UserGoogle, Textbook,
      },
    } = db;
    const {session} = req;
    const {
      schoolId,
      email,
      displayName,
      phoneNumber,
      password,
      facebook,
      google,
      pushNotificationToken,
      photoURL,
    } = args;

    return acl(req, args, requireAuthenticated)
      .then(() => User.findOne({
        where: {
          id: session.userId,
        },
      }))
      .then((user) => {
        if (isEmpty(user)) {
          throw new Error("The requested user is not found!", 404);
        }

        return db.transaction((transaction) => {
          const values = {};

          if (!isEmpty(email)) {
            values.email = email;
          }

          if (!isEmpty(password)) {
            values.password = encryptPassword(password);
          }

          if (!isEmpty(phoneNumber)) {
            values.phoneNumber = phoneNumber;
          }

          if (!isEmpty(displayName)) {
            values.displayName = displayName;
          }

          if (!isEmpty(schoolId)) {
            values.schoolId = schoolId;
          }

          if (!isEmpty(photoURL)) {
            values.photoURL = photoURL;
          }

          if (!isEmpty(pushNotificationToken)) {
            values.pushNotificationToken = pushNotificationToken;
          }

          return user.update(values, {transaction})
            .then(() => {
              const promises = [];
              if (!isEmpty(schoolId)) {
                promises.push(Textbook.update(
                  {schoolId},
                  {where: {userId: session.userId}},
                ));
              }

              if (!isEmpty(facebook)) {
                promises.push(UserFacebook.find({
                  where: {
                    userId: user.id,
                  },
                })
                  .then((userFacebook) => {
                    const valuesToUpdate = extend({}, facebook, {
                      userId: user.id,
                    });

                    if (isEmpty(userFacebook)) {
                      return UserFacebook.build(valuesToUpdate)
                        .save({transaction});
                    }

                    return userFacebook.update(valuesToUpdate, {transaction});
                  }));
              }

              if (!isEmpty(google)) {
                promises.push(UserGoogle.find({
                  where: {
                    userId: user.id,
                  },
                })
                  .then((userGoogle) => {
                    const valuesToUpdate = extend({}, google, {
                      userId: user.id,
                    });

                    if (isEmpty(userGoogle)) {
                      return UserGoogle.build(valuesToUpdate)
                        .save({transaction});
                    }

                    return userGoogle.update(valuesToUpdate, {transaction});
                  }));
              }

              return B.all(promises);
            });
        })
          .then(() => {
            return User.find({
              where: {
                id: session.userId,
              },
            })
            .then((updatedUser) => {
              session.userId = updatedUser.id;
              session.schoolId = updatedUser.schoolId;
              return updatedUser;
            });
          });
      });
  },
};
