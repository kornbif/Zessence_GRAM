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

  # type EmployeeService {
  #   id: ID!
  #   service: [Service]
  #   employee: [Employee]
  # }

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
    # credentials: [Credential]!
    schedule: [Schedule]!
  }

  type Schedule {
    id: ID!
    date: String
    slot: [Time]
  }

  type Time {
    id: ID!
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

  input EmployeeInput {
    empId: String
    firstName: String!
    lastName: String!
    contact: String
    email: String!
    photo: String
    role: Role
  }

  input CategoryInput {
    name: String
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
    createAdmin(adminInput: AdminInput): Admin!
    # Category
    createCategory(categoryInput: CategoryInput): Category
    updateCategory(id: ID!, categoryInput: CategoryInput): Category
    deleteCategory(id: ID!): String!
    # Service
    createService(serviceInput: ServiceInput): Service
    updateService(id: ID!, serviceInput: ServiceInput): Service
    deleteService(id: ID!): Service

    # Employee
    createEmployee(empInput: EmployeeInput): Employee

    addService(employeeId: ID!, serviceId: ID!): Employee
    #EmployeeServiceRelation
    # createEmployeeService(employeeId: ID!, serviceId: ID!): EmployeeService!
  }
`;

module.exports = typeDefs;
