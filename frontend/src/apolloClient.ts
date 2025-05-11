import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const API_URL: string = import.meta.env.VITE_API_URL || "http://localhost:8000";
const API_TOKEN: string = import.meta.env.VITE_API_TOKEN || "";

// Create an HTTP link
const httpLink = createHttpLink({
  uri: `${API_URL}/graphql`,
  credentials: 'same-origin',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-internal-access": API_TOKEN,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
