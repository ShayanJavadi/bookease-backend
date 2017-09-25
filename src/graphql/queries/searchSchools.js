import {GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString} from "graphql";
import B from "bluebird";
import get from "lodash/get";
import map from "lodash/map";
import take from "lodash/take";
import SchoolType from "../types/School";
import CoordinatesInput from "../inputs/CoordinatesInput";
import googleMapClient from "../../libs/googlemaps/client";
import saveSchools from "../../db/models/School/saveSchools";

export default {
  type: new GraphQLList(SchoolType),
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    limit: {
      type: GraphQLInt,
    },
    location: {
      type: new GraphQLNonNull(CoordinatesInput),
    },
  },
  resolve: (req, {name, location, limit = 10}) =>
    B.promisify(googleMapClient.placesNearby, googleMapClient)({
      name,
      location: `${location.latitude},${location.longitude}`,
      rankby: "distance",
      type: "school,university",
    })
      .then((response) => {
        const status = get(response, "json.status");
        if (status === "OK") {
          const results = get(response, "json.results");

          const numberOfRecordsToTake = Math.min(20, limit);
          const places = take(results, numberOfRecordsToTake);
          const schools = map(places, result => ({
            id: result.id,
            name: result.name,
            address: result.vicinity,
          }));

          return saveSchools({schools})
            .then(() => schools);
        }
        return null;
      }),
};
