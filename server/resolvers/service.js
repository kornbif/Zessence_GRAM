const Service = require("../models/Service");
const checkAuth = require("../util/check-auth");

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
    addService: async (_, { serviceInput }, context) => {
      const admin = checkAuth(context);
      const newService = new Service({
        name: serviceInput.name,
        price: serviceInput.price,
        duration: serviceInput.duration,
        description: serviceInput.description,
        photo: serviceInput.photo,
        categoryId: serviceInput.categoryId
      });

      const savedService = await newService.save();

      return savedService;
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
        if (serviceInput.categoryId) {
          updateService.categoryId = serviceInput.categoryId;
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
        const deleted = await Service.findByIdAndDelete(id);

        return deleted;
      } catch (err) {
        throw err;
      }
    }
  }
};
