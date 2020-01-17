const Service = require("../models/Service");
const Category = require("../models/Category");
const Employee = require("../models/Employee");
const Auth = require("../util/check-auth");
const { UserInputError } = require("apollo-server");
module.exports = {
  Query: {
    services: async () => {
      try {
        const getAllServices = await Service.find();
        return getAllServices;
      } catch (err) {
        throw err;
      }
    },

    service: async (_, { _id }) => {
      try {
        const getService = await Service.findById(_id);

        if (getService) {
          return getService;
        } else {
          throw new Error("Category Not Found");
        }
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    createService: async (_, { serviceInput }, context) => {
      try {
        const admin = Auth(context);
        const newService = new Service({
          name: serviceInput.name,
          price: serviceInput.price,
          duration: serviceInput.duration, //MINUTES
          description: serviceInput.description,
          photo: serviceInput.photo,
          category: serviceInput.category
        });

        const category = await Category.findById(serviceInput.category);
        const serviceExist = await Service.findOne({ name: serviceInput.name });

        if (!category) {
          throw new Error("Category not exist");
        }

        if (!serviceExist) {
          const savedService = await newService.save();

          let createdService = { ...savedService._doc };
          category.services.push(newService);
          await category.save();
          return createdService;
        } else {
          throw new UserInputError("Service already exist", {
            error: "Service exist already"
          });
        }
      } catch (err) {
        throw err;
      }
    },

    updateService: async (
      _,
      { _id, name, price, duration, description, photo, category },
      context
    ) => {
      const admin = Auth(context);
      try {
        let updateService = {};
        if (name) {
          updateService.name = name;
        }
        if (price) {
          updateService.price = price;
        }
        if (duration) {
          updateService.duration = duration;
        }
        if (description) {
          updateService.description = description;
        }
        if (photo) {
          updateService.photo = photo;
        }
        if (category) {
          updateService.category = category;
        }

        const updated = await Service.findByIdAndUpdate(_id);

        return updated;
      } catch (err) {
        throw err;
      }
    },

    deleteService: async (_, { _id }, context) => {
      const admin = authAdmin(context);
      try {
        await Employee.updateMany({}, { $pull: { services: _id } });
        await Category.updateMany({}, { $pull: { services: _id } });
        const deleted = await Service.findByIdAndDelete(id);
        return deleted;
      } catch (err) {
        throw err;
      }
    }
  }
};
