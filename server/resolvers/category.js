const Category = require("../models/Category");
const { authAdmin } = require("../util/check-auth");

module.exports = {
  Query: {
    categories: async () => {
      try {
        const getAllCategories = await Category.find();
        return getAllCategories;
      } catch (err) {
        throw err;
      }
    },
    category: async (_, { id }) => {
      try {
        const getCategory = await Category.findById(id);
        if (getCategory) {
          return getCategory;
        } else {
          throw new Error("Category Not Found");
        }
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    createCategory: async (_, { categoryInput }, context) => {
      const admin = authAdmin(context);
      try {
        const newCategory = new Category({
          name: categoryInput.name,
          description: categoryInput.description,
          photo: categoryInput.photo
        });

        const saved = await newCategory.save();

        return saved;
      } catch (err) {
        throw err;
      }
    },

    updateCategory: async (_, { id, name, description, photo }, context) => {
      const admin = authAdmin(context);
      try {
        let updateCateg = {};

        if (name) {
          updateCateg.name = name;
        }
        if (description) {
          updateCateg.description = description;
        }
        if (photo) {
          updateCateg.photo = photo;
        }

        const updated = await Category.findByIdAndUpdate(id, updateCateg, {
          new: true
        });

        return updated;
      } catch (err) {
        throw err;
      }
    },

    deleteCategory: async (_, { id }, context) => {
      const admin = authAdmin(context);
      try {
        const deletedCategory = await Category.findByIdAndDelete(id);

        return deletedCategory;
      } catch (err) {
        throw err;
      }
    }
  }
};
