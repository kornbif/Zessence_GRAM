const { gql } = require("apollo-server");

const typeDefs = gql`
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
    appointment: [Appointment]!
  }

  type Appointment {
    _id: ID!
    user: User
    service: Service
    aesthetician: Employee
    date: String!
    time: String!
    duration: Int
    message: String
    status: String
  }

  type Admin {
    _id: ID!
    empId: String!
    firstName: String!
    lastName: String!
    contact: String
    email: String!
    password: String
  }

  type Employee {
    _id: ID!
    empId: String!
    firstName: String!
    lastName: String!
    contact: String
    email: String!
    photo: String
    role: String
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

  # enum Role {
  #   RECEPTIONIST
  #   AESTHETICIAN
  # }

  # Inputs

  input UserInput {
    firstName: String!
    lastName: String!
    contact: String
    email: String!
    password: String!
    confirmPassword: String!
  }

  input AppointmentInput {
    serviceId: ID
    employeeId: ID
    date: String
    time: String
    message: String
  }

  input AdminInput {
    empId: String!
    firstName: String!
    lastName: String!
    contact: String
    email: String!
    password: String!
  }

  input EmployeeInput {
    empId: String!
    firstName: String!
    lastName: String!
    contact: String
    email: String!
    photo: String
    role: String
  }

  input TimeInput {
    startTime: String
    timeLength: Int
  }

  input BreakTimeInput {
    startOfBreak: String
    breakLength: Int
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
    appointments: [Appointment]
    appointment(_id: ID!): Appointment
    admin(_id: ID!): Admin!
    admins: [Admin]!
    category(_id: ID!): Category
    categories: [Category]
    service(_id: ID!): Service
    services: [Service]!
    employees: [Employee]!
    employee(_id: ID!): Employee!
  }

  type Mutation {
    # User
    register(userInput: UserInput): User
    userLogin(email: String!, password: String!): AuthData

    #Appointment
    createAppointment(inputAppointment: AppointmentInput): Appointment
    cancelAppointment(_id: ID!): Appointment

    # Admin
    createAdmin(adminInput: AdminInput): Admin
    adminLogin(empId: String!, password: String!): AuthData
    # Employee
    """
    Not yet include the deleteEmployee Mutation
    """
    createEmployee(empInput: EmployeeInput): Employee
    updateEmployee(
      _id: ID!
      empId: String
      firstName: String
      lastName: String
      contact: String
      email: String
      photo: String
      role: String
    ): Employee
    """
    Add Services to Employee
    """
    addService(employeeId: ID!, serviceId: ID!): Employee
    # SCHEDULE
    addDate(id: ID!, date: String!): Employee
    addTime(
      _id: ID!
      schedId: ID!
      timeInput: TimeInput
      breakTimeInput: BreakTimeInput
    ): Employee

    #Category
    createCategory(categoryInput: CategoryInput): Category
    updateCategory(
      _id: ID!
      name: String
      description: String
      photo: String
    ): Category
    deleteCategory(_id: ID!): String!

    #Service
    createService(serviceInput: ServiceInput): Service
    updateService(
      _id: ID!
      name: String
      price: Float
      duration: Int
      description: String
      photo: String
      category: ID
    ): Service
    deleteService(_id: ID!): Service
  }
`;

module.exports = typeDefs;
