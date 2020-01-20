const Category = require("../models/Category");
const Auth = require("../util/check-auth");
const { createWriteStream } = require("fs");
const path = require("path");

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
    category: async (_, { _id }) => {
      try {
        const getCategory = await Category.findById(_id);
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
      const admin = Auth(context);
      try {
        const newCategory = new Category({
          name: categoryInput.name,
          description: categoryInput.description
        });

        const saved = await newCategory.save();

        return saved;
      } catch (err) {
        throw err;
      }
    },

    updateCategory: async (_, { _id, name, description }, context) => {
      const admin = Auth(context);
      try {
        let updateCateg = {};

        if (name) {
          updateCateg.name = name;
        }
        if (description) {
          updateCateg.description = description;
        }

        const updated = await Category.findByIdAndUpdate(_id, updateCateg, {
          new: true
        });

        return updated;
      } catch (err) {
        throw err;
      }
    },

    deleteCategory: async (_, { _id }, context) => {
      const admin = Auth(context);
      try {
        await Category.findByIdAndDelete(_id);

        return "SUCCESS";
      } catch (err) {
        throw err;
      }
    },
    uploadCategoryPhoto: async (_, { _id, file }) => {
      try {
        const category = await Category.findById(_id);
        const { stream, filename, mimetype, encoding } = file;

        console.log(stream);
        // await new Promise(res =>
        //   createReadStream()
        //     .pipe(createWriteStream(path.join(__dirname, "../image", filename)))
        //     .on("close", res)
        // );

        // await Category.updateOne({ _id }, { $set: { photo: filename } });

        // return { filename };
      } catch (err) {
        throw err;
      }
    }
  }
};
