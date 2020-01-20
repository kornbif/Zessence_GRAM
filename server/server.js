const { ApolloServer, makeExecutableSchema } = require("apollo-server");
const mongoose = require("mongoose");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
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

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  cors: true,
  schema,
  context: ({ req }) => ({ req })
});

const PORT = process.env.PORT || 5000;

server.listen(PORT).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
