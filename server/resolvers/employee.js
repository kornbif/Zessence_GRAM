const Employee = require("../models/Employee");
const Service = require("../models/Service");
const { UserInputError } = require("apollo-server");
const { authAdmin } = require("../util/check-auth");
const { validateEmployeeCreateInput } = require("../util/validators");

module.exports = {
  Query: {
    employees: async () => {
      try {
        const getAllEmployee = await Employee.find();

        return getAllEmployee;
      } catch (err) {
        throw err;
      }
    },
    employee: async (_, { id }) => {
      try {
        const getEmployee = await Employee.findById(id);

        return getEmployee;
      } catch (err) {
        throw err;
      }
    },
    aestheticians: async (_, { role }) => {
      try {
        const aestheticians = await Employee.find({ role });
        return aestheticians;
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    createEmployee: async (
      _,
      { empInput: { empId, firstName, lastName, contact, email, photo, role } }
    ) => {
      // const admin = authAdmin(context);
      try {
        const { errors, valid } = validateEmployeeCreateInput(
          empId,
          firstName,
          lastName,
          email
        );

        if (!valid) {
          throw new UserInputError("Input Error", { errors });
        }

        const checkEmployee = await Employee.findOne({ empId });

        if (checkEmployee) {
          throw new UserInputError("Employee already exist", {
            errors: {
              empId: "This employee ID already exist"
            }
          });
        }

        const newEmployee = new Employee({
          empId,
          firstName,
          lastName,
          contact,
          email,
          photo,
          role
        });

        const result = await newEmployee.save();

        return result;
      } catch (err) {
        throw err;
      }
    },
    updateEmployee: async (
      _,
      { id, empId, firstName, lastName, contact, email, photo, role },
      context
    ) => {
      const admin = authAdmin(context);
      try {
        let updateEmployee = {};

        if (empId) {
          updateEmployee.empId = empId;
        }

        if (firstName) {
          updateEmployee.firstName = firstName;
        }

        if (lastName) {
          updateEmployee.lastName = lastName;
        }

        if (contact) {
          updateEmployee.contact = contact;
        }

        if (email) {
          updateEmployee.email = email;
        }

        if (photo) {
          updateEmployee.photo = photo;
        }

        if (role) {
          updateEmployee.role = role;
        }

        const updated = await Employee.findByIdAndUpdate(id, updateEmployee, {
          new: true
        });

        return updated;
      } catch (err) {}
    },
    addService: async (_, { employeeId, serviceId }, context) => {
      const admin = authAdmin(context);
      try {
        const employee = await Employee.findById(employeeId);
        const service = await Service.findById(serviceId);
        if (!employee) {
          throw new Error("Employee does not exist");
        } else if (!service) {
          throw new Error("Service not found");
        }

        await Employee.updateOne(
          { _id: employeeId },
          { $addToSet: { services: serviceId } }
        );

        await Service.updateOne(
          { _id: serviceId },
          { $addToSet: { employees: employeeId } }
        );
        // employee.services.push(serviceId);
        // service.employees.push(employeeId);
        // await employee.save();
        // await service.save();
        return employee;
      } catch (err) {
        throw err;
      }
    },
    addDate: async (_, { id, date }) => {
      try {
        const employee = await Employee.findById(id);

        if (employee) {
          employee.schedule.push({
            date: new Date(date).toLocaleDateString()
          });
          await employee.save();
          return employee;
        }
      } catch (err) {
        throw err;
      }
    }
  }
};
