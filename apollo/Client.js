import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:80/graphql",
  //uri: 'http://localhost:4000/'
  credentials: "same-origin",
});

const authLink = setContext((_, { headers }) => {
  const Authorization = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      Authorization: Authorization ? Authorization : "",
    },
  };
});

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default client;
