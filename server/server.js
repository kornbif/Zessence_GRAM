const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const typeDefs = require("./schema");
require("dotenv").config();

//MONGODB
const uri = process.env.MONGODB_URI;

//MongoDB connection
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .catch(err => console.log(err));

mongoose.set("useFindAndModify", false);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const server = new ApolloServer({ cors: true, typeDefs });

const PORT = process.env.PORT || 4000;

server.listen(PORT).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
