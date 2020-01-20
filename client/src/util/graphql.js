import gql from "graphql-tag";

const FETCH_EMPLOYEES_QUERY = gql`
  {
    employees {
      _id
      empId
      firstName
      lastName
      contact
      email
      photo
      role
    }
  }
`;

const FETCH_CATEGORIES_QUERY = gql`
  {
    categories {
      _id
      name
      description
      photo
    }
  }
`;

const FETCH_SERVICES_QUERY = gql`
  {
    services {
      _id
      name
      description
      photo
      price
      duration
    }
  }
`;

export { FETCH_EMPLOYEES_QUERY, FETCH_CATEGORIES_QUERY, FETCH_SERVICES_QUERY };
