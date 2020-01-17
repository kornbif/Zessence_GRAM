import React from "react";
import App from "./App";

import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "apollo-link-context";

const httpLink = new HttpLink({ uri: "http://localhost:5000/graphql" });

// const authMiddleware = new ApolloLink((operation, forward) => {
//   const token = localStorage.getItem("jwtToken");
//   //add authorization to the headers
//   operation.setContext(({ headers = {} }) => ({
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : ""
//     }
//   }));

//   return forward(operation);
// });

// const client = new ApolloClient({
//   link: concat(authMiddleware, httpLink),
//   cache: new InMemoryCache()
// });

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
