const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    admin(id: ID!): Admin!
    admins: [Admin]!
    category(id: ID!): Category
    categories: [Category]
    service(id: ID!): Service
    services: [Service]!
  }
  type Admin {
    id: ID!
    empId: String!
    firstName: String!
    lastName: String!
    contact: String
    email: String!
    password: String!
  }

  # adminAuth
  type AuthData {
    id: ID!
    token: String!
    tokenExpiration: Int!
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
  input AdminInput {
    empId: String
    firstName: String
    lastName: String
    contact: String
    email: String
    password: String
  }

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
    # auth
    adminLogin(empId: String!, password: String!): AuthData!
    # Admin
    createAdmin(adminInput: AdminInput): Admin
    # Category
    addCategory(categoryInput: CategoryInput): Category
    updateCategory(id: ID!, categoryInput: CategoryInput): Category
    deleteCategory(id: ID!): String!
    # Service
    addService(serviceInput: ServiceInput): Service
    updateService(id: ID!, serviceInput: ServiceInput): Service
    deleteService(id: ID!): String!
  }
`;

module.exports = typeDefs;
