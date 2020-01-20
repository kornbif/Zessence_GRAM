const validateAdminCreateInput = (
  empId,
  firstName,
  lastName,
  email,
  password
) => {
  const errors = {};

  if (empId.trim() === "") {
    errors.empId = "Employee ID must not be empty";
  }

  if (firstName.trim() === "") {
    errors.firstName = "First name must not be empty";
  }

  if (lastName.trim() === "") {
    errors.lastName = "Last name must not be empty";
  }

  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regex)) {
      errors.email = "Email must be a valid Address";
    }
  }

  if (password === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

const validateAdminLoginInput = (empId, password) => {
  const errors = {};

  if (empId.trim() === "") {
    errors.empId = "Employee ID must not be empty";
  }

  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

const validateEmployeeCreateInput = (empId, firstName, lastName, email) => {
  const errors = {};

  if (empId.trim() === "") {
    errors.empId = "Employee ID must not be empty";
  }

  if (firstName.trim() === "") {
    errors.firstName = "First name must not be empty";
  }

  if (lastName.trim() === "") {
    errors.lastName = "Last name must not be empty";
  }

  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regex)) {
      errors.emailx = "Email must be a valid Address";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

const validateUserCreateInput = (
  firstName,
  lastName,
  email,
  password,
  confirmPassword
) => {
  const errors = {};

  if (firstName.trim() === "") {
    errors.firstName = "First name must not be empty";
  }

  if (lastName.trim() === "") {
    errors.lastName = "Last name must not be empty";
  }

  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regex)) {
      errors.email = "Email must be a valid Address";
    }
  }

  if (password === "" || confirmPassword === "") {
    errors.password = "Password must not be empty";
  } else {
    if (password !== confirmPassword) {
      errors.confirmPassword = "Password do not match";
    }
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

const validateUserLoginInput = (email, password) => {
  const errors = {};

  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  }

  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports = {
  validateAdminCreateInput,
  validateAdminLoginInput,
  validateUserCreateInput,
  validateUserLoginInput,
  validateEmployeeCreateInput
};
