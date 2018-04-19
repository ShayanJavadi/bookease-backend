import {
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from "graphql";
import GraphQLDate from "graphql-date";
import {map, isEmpty} from "lodash";
import TextbookIndustryIdentifier from "./TextbookIndustryIdentifier";
import TextbookImage from "./TextbookImage";
import TextbookSale from "./TextbookSale";
import User from "./User";
import getImages from "../../db/models/Textbook/getImages";
import getAuthors from "../../db/models/Textbook/getAuthors";
import getIndustryIdentifiers from "../../db/models/Textbook/getIndustryIdentifiers";
import getBuyRequestNotifications from "../../db/models/Textbook/getBuyRequestNotifications";
import getTextbookSale from "../../db/models/Textbook/getTextbookSale";
import getTextbookUser from "../../db/models/Textbook/getTextbookUser";
import getIsTextbookSold from "../../db/models/Textbook/getIsTextbookSold";
import getBookmarkCount from "../../db/models/Textbook/getBookmarkCount";

export default new GraphQLObjectType({
  name: "Textbook",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    uid: {
      type: new GraphQLNonNull(GraphQLID),
    },
    schoolId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    description: {
      type: GraphQLString,
    },
    industryIdentifiers: {
      type: new GraphQLList(TextbookIndustryIdentifier),
      resolve: textbook => textbook.industryIdentifiers || getIndustryIdentifiers({textbook}),
    },
    authors: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
      resolve: textbook => textbook.authors || getAuthors({textbook})
        .then(authors => map(authors, "name")),
    },
    edition: {
      type: GraphQLString,
    },
    images: {
      type: new GraphQLNonNull(new GraphQLList(TextbookImage)),
      resolve: textbook => textbook.images || getImages({textbook}),
    },
    userId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    user: {
      type: new GraphQLNonNull(User),
      resolve: textbook => textbook.user || getTextbookUser({textbook}),
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLDate),
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLDate),
    },
    publishedAt: {
      type: GraphQLDate,
    },
    condition: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    price: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    isSold: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: textbook => textbook.isSold || getIsTextbookSold({textbook}),
    },
    sale: {
      type: TextbookSale,
      resolve: textbook => textbook.sale || getTextbookSale({textbook}),
    },
    isArchived: {
      type: GraphQLBoolean,
    },
    isDeleted: {
      type: GraphQLBoolean,
    },
    buyRequestNotifications: {
      type: new GraphQLList(require("./Notification").default), // eslint-disable-line
      resolve: textbook => textbook.BuyRequestNotifications ||
      getBuyRequestNotifications({textbook}),
    },
    bookmarkCount: {
      type: GraphQLInt,
      resolve: textbook => textbook.bookmarkCount || getBookmarkCount({textbook}),
    },
    isBookmarkedByCurrentUser: {
      type: GraphQLBoolean,
      resolve: textbook => textbook.isBookmarkedByCurrentUser || !isEmpty(textbook.Bookmarks),
    },
  }),
});
