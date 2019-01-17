// Require dotenv first so you can keep some config variables secret,
// and you can use them in the rest of this file.
require('dotenv').config();

// Import cross-fetch since we are not in the brawser and apollo-client needs a fetch global.
import 'cross-fetch/polyfill';

// Import ApolloClient and gql for the boilerplate
import ApolloClient, { gql } from 'apollo-boost';

/** Queries */

// This is an example to get the Github organization by login.
const GET_ORGANIZATION = gql`
  {
    organization(login: "the-road-to-learn-react") {
      name
      url
    }
  }
`;

// Create the apollo client.
// The placeholder uri is the Github graphql endpoint.
const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    });
  },
});

// ApolloClient makes the graphql query.
// Under the hood it is still using an HTTP POST request.
// It makes the request, and logs the result of the query on the command line,
// or it logs the error.
client
  .query({
    query: GET_ORGANIZATION,
  })
  .then(console.log)
  .catch((e) => {
    console.log(e);
  });
