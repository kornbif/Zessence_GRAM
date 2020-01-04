const { gql } = require("apollo-server");

const typeDefs = gql`
  type Admin {
    _id: ID!
    empId: String!
    firstName: String!
    lastName: String!
    contact: String
    email: String!
    password: String
  }

  # adminAuth
  type AuthData {
    _id: ID!
    token: String!
    tokenExpiration: Int!
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    contact: String
    email: String!
    password: String
    createdAt: String
    updatedAt: String
  }

  type Category {
    _id: ID!
    name: String!
    description: String
    photo: String!
    services: [Service!] #list of services
  }

  type Service {
    _id: ID!
    name: String!
    price: Float!
    duration: Int!
    description: String
    photo: String
    category: Category! #parent: Category type
    employees: [Employee]!
  }

  type Employee {
    _id: ID!
    empId: String!
    firstName: String!
    lastName: String!
    contact: String
    email: String!
    photo: String
    role: Role
    services: [Service]!
    certificates: [Certificate!]!
    schedule: [Date]!
    createdAt: String
  }

  type Date {
    id: ID!
    date: String!
    start: [String]!
    break: [String]!
  }


  type Certificate {
    id: ID!
    name: String!
    photo: String
  }

  enum Role {
    RECEPTIONIST
    AESTHETICIAN
  }

  # Inputs
  input AdminInput {
    empId: String!
    firstName: String!
    lastName: String!
    contact: String
    email: String!
    password: String!
  }
  input UserInput {
    firstName: String!
    lastName: String!
    contact: String
    email: String!
    password: String!
    confirmPassword: String!
  }

  input EmployeeInput {
    empId: String!
    firstName: String!
    lastName: String!
    contact: String
    email: String!
    photo: String
    role: Role
  }

  input CategoryInput {
    name: String!
    description: String
    photo: String
  }

  input ServiceInput {
    name: String!
    price: Float!
    duration: Int!
    description: String
    photo: String
    category: ID!
  }

  type Query {
    admin(id: ID!): Admin!
    admins: [Admin]!
    category(id: ID!): Category
    categories: [Category]
    service(id: ID!): Service
    services: [Service]!
    employees: [Employee]!
    employee(id: ID!): Employee!
    aestheticians(role: Role): [Employee]
  }

  type Mutation {
    # auth
    adminLogin(empId: String!, password: String!): AuthData
    # Admin
    createAdmin(adminInput: AdminInput): Admin
    # User
    createUser(userInput: UserInput): User
    userLogin(email: String!, password: String!): AuthData
    # Employee
    """
    Not yet include the deleteEmployee Mutation
    """
    createEmployee(empInput: EmployeeInput!): Employee
    updateEmployee(
      id: ID!
      empId: String
      firstName: String
      lastName: String
      contact: String
      email: String
      photo: String
      role: Role
    ): Employee
    """
    Add Services that employee are capable of doing
    """
    addService(employeeId: ID!, serviceId: ID!): Employee
    # SCHEDULE
    addDate(id: ID!, date: String!): Employee

   

    #  Category
    createCategory(categoryInput: CategoryInput): Category
    updateCategory(
      id: ID!
      name: String
      description: String
      photo: String
    ): Category
    deleteCategory(id: ID!): String!
    # Service
    createService(serviceInput: ServiceInput): Service
    updateService(
      id: ID!
      name: String
      price: Float
      duration: Int
      description: String
      photo: String
      category: ID
    ): Service
    deleteService(id: ID!): Service
  }
`;

module.exports = typeDefs;
