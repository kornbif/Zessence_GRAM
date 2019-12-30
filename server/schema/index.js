const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    category(id: ID!): Category
    categories: [Category]
    service(id: ID!): Service
    services: [Service]
  }

  type Category {
    id: ID!
    name: String!
    description: String
    photo: String!
    services: [Service]! #list of services
  }

  type Service {
    id: ID!
    name: String!
    price: Float!
    duration: Int!
    description: String
    photo: String
    category: Category #parent: Category type
  }
  # Inputs
  input CategoryInput {
    name: String
    description: String
    photo: String
  }

  input ServiceInput {
    name: String
    price: Float
    duration: Int
    description: String
    photo: String
    categoryId: ID
  }

  type Mutation {
    addCategory(categoryInput: CategoryInput): Category
    updateCategory(id: ID!, categoryInput: CategoryInput): Category
    deleteCategory(id: ID!): Category
    addService(serviceInput: ServiceInput): Service
    updateService(id: ID!, serviceInput: ServiceInput): Service
    deleteService(id: ID!): Service
  }
`;

module.exports = typeDefs;
