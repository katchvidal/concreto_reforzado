import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String, $password: String) {
    LoginUser(email: $email, password: $password) {
      message
      status
      user {
        id
        name
        lastname
      }
      token
    }
  }
`;

export const GETME = gql`
  query meAuth {
    me {
      message
      status
      user {
        id
        name
        lastname
        email
      }
    }
  }
`;
