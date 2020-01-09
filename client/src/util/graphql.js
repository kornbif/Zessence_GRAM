import gql from "graphql-tag";

export const FETCH_EMPLOYEES_QUERY = gql`
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
