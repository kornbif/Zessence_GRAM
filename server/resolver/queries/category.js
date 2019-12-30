const Category = require("../../models/Category");

const categories = async () => {
  try {
    const getAllCategories = await Category.find();
    return getAllCategories;
  } catch (err) {
    throw err;
  }
};
const category = async (_, { id }) => {
  try {
    const getCategory = await Category.findById(id);

    return getCategory;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  category,
  categories
};
