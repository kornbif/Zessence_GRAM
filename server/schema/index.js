const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar Upload
  # adminAuth
  type AuthData {
    _id: ID!
    token: String!
    tokenExpiration: Int!
  }
  type UserAuthData {
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
    employee: Employee
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
    photo: String
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

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
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
  }

  input ServiceInput {
    name: String!
    price: Float!
    duration: Int!
    description: String
    # photo: Upload
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
    userLogin(email: String!, password: String!): UserAuthData

    #Appointment
    createAppointment(inputAppointment: AppointmentInput): Appointment
    cancelAppointment(_id: ID!): Appointment

    # Admin
    createAdmin(adminInput: AdminInput): Admin
    adminLogin(empId: String!, password: String!): AuthData
    # Employee
    createEmployee(empInput: EmployeeInput): Employee
    updateEmployee(
      _id: ID!
      empId: String
      firstName: String
      lastName: String
      contact: String
      email: String
      role: String
    ): Employee
    deleteEmployee(_id: ID!): String
    """
    Services to Employee
    """
    addService(employeeId: ID!, serviceId: ID!): Service
    removeService(employeeId: ID!, serviceId: ID!): Employee
    # SCHEDULE
    addSchedule(
      employeeId: ID!
      date: String!
      timeInput: TimeInput
      breakTimeInput: BreakTimeInput
    ): Employee
    deleteSchedule(employeeId: ID!, scheduleId: ID!): Employee

    updateDate(employeeId: ID!, scheduleId: ID!, date: String!): Employee

    updateTime(
      employeeId: ID!
      scheduleId: ID!
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
    deleteCategory(_id: ID!): String
    uploadCategoryPhoto(_id: ID!, file: Upload!): File

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
