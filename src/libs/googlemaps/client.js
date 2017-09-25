import maps from "@google/maps";
import getVariable from "../../config/getVariable";

const key = getVariable("GOOGLE_API_KEY");
export default maps.createClient({
  key,
});
