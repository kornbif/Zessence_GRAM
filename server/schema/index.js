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
    services: [Service]!
  }

  type Service {
    id: ID!
    name: String!
    description: String
    photo: String
    category: Category
  }
  # Inputs
  input CategoryInput {
    name: String!
    description: String
    photo: String
  }

  type Mutation {
    addCategory(categoryInput: CategoryInput): Category
    updateCategory(id: ID!, categoryInput: CategoryInput): Category
    deleteCategory(id: ID!): Category
  }
`;

module.exports = typeDefs;
