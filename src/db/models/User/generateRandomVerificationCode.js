import Chance from "chance";
import isDevelopment from "../../../config/isDevelopment";

export default (user) => {
  const verificationCode = isDevelopment() ?
    "111111" :
    new Chance().string({
      length: 6,
      pool: "0123456789",
    });

  const attributes = {
    verificationCode,
  };

  return user.update(attributes);
};
