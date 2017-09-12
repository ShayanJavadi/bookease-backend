import Chance from "chance";

export default (user) => {
  const verificationCode = new Chance().string({
    length: 6,
    pool: "0123456789",
  });

  const attributes = {
    verificationCode,
  };

  return user.update(attributes);
};
