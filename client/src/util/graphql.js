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
export { FETCH_EMPLOYEES_QUERY };
