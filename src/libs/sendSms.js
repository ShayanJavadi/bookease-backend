import Twilio from "twilio";
import extend from "lodash/extend";
import getVariable from "../config/getVariable";

const client = new Twilio(getVariable("TWILIO_ACCOUNT_SID"), getVariable("TWILIO_AUTH_TOKEN"));

export default options => client.messages.create(extend({ from: getVariable("TWILIO_PHONE_NUMBER") }, options));
