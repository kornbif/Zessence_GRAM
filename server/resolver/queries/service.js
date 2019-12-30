const Service = require("../../models/Service");

const services = async () => {
  try {
    const getAllServices = await Service.find();
    return getAllServices;
  } catch (err) {
    throw err;
  }
};

const service = async (_, { id }) => {
  try {
    const getService = await Service.findById(id);
    return getService;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  services,
  service
};
