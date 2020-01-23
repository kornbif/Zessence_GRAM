require("dotenv").config({ path: "../env" });
const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

module.exports = context => {
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
