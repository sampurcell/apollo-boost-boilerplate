// Reqire dotenv first so you can keep some config variables secret
// And you can use them in the rest of this file.
require('dotenv').config();

// Import cross-fetch since we are not in the brawser and apollo-client needs a fetch global.
import 'cross-fetch/polyfill';

// Import ApolloClient for the playground
import ApolloClient from 'apollo-boost';

// Create the apollo client with the placeholder url being the Github graphql endpoint.
const client = new ApolloClient({
  url: 'https://api.github.com/graphql',
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    });
  },
});
