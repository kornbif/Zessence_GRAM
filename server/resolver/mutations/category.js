const Category = require("../../models/Category");

const addCategory = async (_, { categoryInput }) => {
  const newCategory = new Category({
    name: categoryInput.name,
    description: categoryInput.description,
    photo: categoryInput.photo
  });

  try {
    const saved = newCategory.save();

    return saved;
  } catch (err) {
    throw err;
  }
};

const updateCategory = async (_, { id, categoryInput }) => {
  try {
    let updateCateg = {};

    if (categoryInput.name) {
      updateCateg.name = categoryInput.name;
    }
    if (categoryInput.description) {
      updateCateg.description = categoryInput.description;
    }
    if (categoryInput.photo) {
      updateCateg.photo = categoryInput.photo;
    }

    const updated = await Category.findByIdAndUpdate(id, updateCateg, {
      new: true
    });

    return updated;
  } catch (err) {
    throw err;
  }
};

const deleteCategory = async (_, { id }) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);

    return deletedCategory;
  } catch (err) {
    throw err;
  }
};
module.exports = {
  addCategory,
  updateCategory,
  deleteCategory
};
