const Service = require("../../models/Service");

const addService = async (_, { serviceInput }) => {
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
};

const updateService = async (_, { id, serviceInput }) => {
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
};

const deleteService = async (_, { id }) => {
  try {
    const deleted = await Service.findByIdAndDelete(id);

    return deleted;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addService,
  updateService
};
