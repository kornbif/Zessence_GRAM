require("dotenv").config({ path: "../env" });
const { UserInputError, ForbiddenError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const {
  validateUserCreateInput,
  validateUserLoginInput
} = require("../util/validators");

module.exports = {
  Query: {},
  Mutation: {
    register: async (
      _,
      {
        userInput: {
          firstName,
          lastName,
          contact,
          email,
          password,
          confirmPassword
        }
      }
    ) => {
      //Validating Inputs
      const { valid, errors } = validateUserCreateInput(
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Input Error", { errors });
      }

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new UserInputError("Error", {
          erros: {
            email: "This email already taken"
          }
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        firstName,
        lastName,
        contact,
        email,
        password: hashedPassword
      });

      const result = await newUser.save();
      return {
        ...result._doc,
        password: null,
        createdAt: new Date(result._doc.createdAt).toLocaleString()
      };
    },
    userLogin: async (_, { email, password }) => {
      try {
        const { errors, valid } = validateUserLoginInput(email, password);
        const user = await User.findOne({ email });

        if (!user) {
          errors.userX = "Email not found";
          throw new UserInputError("Email does not exist", { errors });
        }

        if (!valid) {
          throw new UserInputError("Input Error", { errors });
        }
        //Check if password is incorrect return an error
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
          errors.general = "Email/Password not correct";
          throw new UserInputError("Error", { errors });
        }
        //* Token
        const token = await jwt.sign(
          { _id: user.id, email: user.email },

          process.env.SECRET_KEY,
          {
            expiresIn: "1h"
          }
        );

        return { _id: user.id, token: token, tokenExpiration: 1 };
      } catch (err) {
        throw err;
      }
    }
  }
};
