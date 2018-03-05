import {isEmpty, reduce} from "lodash";
import db from "../../db";
import acl from "../acl";
import requireAuthenticated from "../acl/requireAuthenticated";
import BuyRequestType from "../types/BuyRequest";
import BuyRequestInput from "../inputs/BuyRequestInput";
import isValueEmpty from "../../libs/isValueEmpty";

export default {
  type: BuyRequestType,
  args: {
    buyRequest: {
      type: BuyRequestInput,
    },
  },
  resolve: (req, args) => acl(req, args, requireAuthenticated)
    .then(() => {
      const {
        models: {
          BuyRequest,
        },
      } = db;

      const {buyRequest} = args;

      return BuyRequest.findOne({
        where: {
          id: buyRequest.id,
        },
      })
        .then((buyRequestToUpdate) => {
          if (isEmpty(buyRequestToUpdate)) {
            throw new Error("The requested buy request was not found!", 404);
          }

          return db.transaction((transaction) => {
            const values = reduce(buyRequest, (result, value, key) => {
              if (!isValueEmpty(value)) {
                result[key] = value; // eslint-disable-line no-param-reassign
              }
              return result;
            }, {});

            return buyRequestToUpdate.update(values, {transaction});
          })
            .then(() => BuyRequest.findOne({
              where: {
                id: buyRequest.id,
              },
            }));
        });
    }),
};
