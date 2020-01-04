require("dotenv").config({ path: "../env" });
const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

const authAdmin = context => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    // Bearer ....token

    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired Token");
      }
    }
    throw new Error("Authentication must be Bearer [token]");
  }
  throw new Error("Authorization Header not provided");
};

const authUser = context => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    // Bearer ....token

    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SIKRETONG_SUSI);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired Token");
      }
    }
    throw new Error("Authentication must be Bearer [token]");
  }
  throw new Error("Authorization Header not provided");
};

module.exports = {
  authAdmin,
  authUser
};
