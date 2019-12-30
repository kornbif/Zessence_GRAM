const { addCategory, updateCategory, deleteCategory } = require("./category");
const { addService, updateService } = require("./service");

const Mutation = {
  addCategory,
  deleteCategory,
  updateCategory,
  addService,
  updateService
};

module.exports = Mutation;
