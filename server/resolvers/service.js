const Service = require("../models/Service");
const Category = require("../models/Category");
const Employee = require("../models/Employee");
const checkAuth = require("../util/check-auth");
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

    service: async (_, { id }) => {
      try {
        const getService = await Service.findById(id);

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
        const admin = checkAuth(context);
        const newService = new Service({
          name: serviceInput.name,
          price: serviceInput.price,
          duration: serviceInput.duration,
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

    updateService: async (_, { id, serviceInput }, context) => {
      const admin = checkAuth(context);
      try {
        let updateService = {};
        if (serviceInput.name) {
          updateService.name = serviceInput.name;
        }
        if (serviceInput.price) {
          updateService.price = serviceInput.price;
        }
        if (serviceInput.duration) {
          updateService.duration = serviceInput.duration;
        }
        if (serviceInput.description) {
          updateService.description = serviceInput.description;
        }
        if (serviceInput.photo) {
          updateService.photo = serviceInput.photo;
        }
        if (serviceInput.category) {
          updateService.category = serviceInput.category;
        }

        const updated = await Service.findByIdAndUpdate(id);

        return updated;
      } catch (err) {
        throw err;
      }
    },

    deleteService: async (_, { id }, context) => {
      const admin = checkAuth(context);
      try {
        await Employee.updateMany({}, { $pull: { services: id } });
        await Category.updateMany({}, { $pull: { services: id } });
        const deleted = await Service.findByIdAndDelete(id);
        return deleted;
      } catch (err) {
        throw err;
      }
    }
  }
};
