require("dotenv").config({ path: "../env" });
const { UserInputError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Auth = require("../util/check-auth");

const {
  validateAdminCreateInput,
  validateAdminLoginInput
} = require("../util/validators");

module.exports = {
  Query: {
    admin: async (_, { _id }) => {
      try {
        const getAdmin = await Admin.findById(_id);

        return getAdmin;
      } catch (err) {
        throw err;
      }
    },

    admins: async () => {
      try {
        const getAllAdmins = await Admin.find();

        return getAllAdmins;
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    //* Authentication
    adminLogin: async (_, { empId, password }) => {
      // Validate
      const { errors, valid } = validateAdminLoginInput(empId, password);

      if (!valid) {
        throw new UserInputError("Input Error", { errors });
      }
      //Check admin if exist
      const admin = await Admin.findOne({ empId });

      if (!admin) {
        errors.general = "Admin not found";
        throw new UserInputError("Admin not found", { errors });
      }

      //Check if password is correct return an error
      const isEqual = await bcrypt.compare(password, admin.password);

      if (!isEqual) {
        errors.isNotEqual = "Invalid Credentials";
        throw new UserInputError("Invalid Credentials", { errors });
      }

      //* Token
      const token = await jwt.sign(
        { _id: admin.id, empId: admin.empId },
        process.env.SECRET_KEY,
        {
          expiresIn: "8h"
        }
      );

      return { _id: admin.id, token: token, tokenExpiration: 8 };
    },

    // CREATE NEW ADMIN
    createAdmin: async (
      _,
      { adminInput: { empId, firstName, lastName, contact, email, password } },
      context
    ) => {
      const admin = Auth(context);
      try {
        //Validating Inputs
        const { valid, errors } = validateAdminCreateInput(
          empId,
          firstName,
          lastName,
          email,
          password
        );

        if (!valid) {
          throw new UserInputError("Input Error", { errors });
        }

        const checkAdmin = await Admin.findOne({
          $or: [{ empId }, { email }]
        });
        if (checkAdmin) {
          throw new UserInputError("Employee already exist", {
            errors: {
              empId: "This employee ID already exist"
            }
          });
        }

        //! Hashing and Salting
        const hashedPassword = await bcrypt.hash(password, 12);
        //* save new admin
        const newAdmin = new Admin({
          empId,
          firstName,
          lastName,
          contact,
          email,
          password: hashedPassword
        });

        const result = await newAdmin.save();
        return result;
      } catch (err) {
        throw err;
      }
    }
  }
};
