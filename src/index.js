/**
 * Require dotenv first so you can keep some config variables secret,
 * and you can use them in the rest of this file.
 */
require('dotenv').config();

/** Imports */

/**
 * Import cross-fetch since we are not in the brawser and apollo-client needs a fetch global.
 */
import 'cross-fetch/polyfill';

// Import ApolloClient and gql for the boilerplate
import ApolloClient, { gql } from 'apollo-boost';

/** Queries */

/**
 * Example query to get the Github organization and a paginated list of repositories by org login.
 */
const GET_REPOSITORIES_FOR_ORGANIZATION = gql`
  query($organization: String!, $cursor: String) {
    organization(login: $organization) {
      name
      url
      repositories(first: 5, orderBy: { field: STARGAZERS, direction: DESC }, after: $cursor) {
        edges {
          node {
            name
            url
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

/**
 * Example mutation to add a star to a Github repository
 *
 * Question: Is the mutation name our choice?
 * Answer: Yes, by wrapping GitHub's addStar method,
 * we can call variable what we want and input object can be handled here,
 * instead of whne calling addStar().
 */
const ADD_FAVORITE = gql`
  mutation AddFavorite($repositoryId: ID!) {
    addStar(input: { starrableId: $repositoryId }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

/**
 * Example mutation to remove a star to a Github repository
 *
 * Question: is the mutation name our choice?
 * Answer: Yes, by wrapping GitHub's addStar method,
 * we can call variable what we want and input object can be handled here,
 * instead of whne calling addStar().
 */
const REMOVE_FAVORITE = gql`
  mutation RemoveFavorite($favoritingId: ID!) {
    removeStar(input: { starrableId: $favoritingId }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

/** Apollo Client */

/**
 * Create the apollo client.
 * The placeholder uri is the Github graphql endpoint.
 */
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

/** ApolloClient Queries and Results */

/**
 * Making a GraphQL query with ApolloClient
 * Under the hood it is still using an HTTP POST request.
 * It makes the request, and logs the result of the query on the command line,
 * or it logs the error.
 */
// client
//   .query({
//     query: GET_REPOSITORIES_FOR_ORGANIZATION,
//     variables: {
//       organization: 'the-road-to-learn-react',
//     },
//   })
//   .then(console.log)
//   .catch((e) => {
//     console.log(e);
//   });

/** ApolloClient Mutations and Results */

/**
 * Making a GraphQL mutation with ApolloClient
 * Under the hood it is still using an HTTP POST request.
 * It makes the request, and logs the result of the mutation on the command line,
 * or it logs the error.
 *
 * Adds star to a Github repository
 */
// client
//   .mutate({
//     mutation: ADD_FAVORITE,
//     variables: {
//       favoritingId: 'MDEwOlJlcG9zaXRvcnk2MzM1MjkwNw==',
//     },
//   })
//   .then(console.log)
//   .catch((e) => {
//     console.log(e);
//   });

/**
 * Making a GraphQL mutation with ApolloClient
 * Under the hood it is still using an HTTP POST request.
 * It makes the request, and logs the result of the mutation on the command line,
 * or it logs the error.
 *
 * Removes star to a Github repository
 */
client
.mutate({
  mutation: REMOVE_FAVORITE,
  variables: {
    favoritingId: 'MDEwOlJlcG9zaXRvcnk2MzM1MjkwNw==',
  },
})
.then(console.log)
.catch((e) => {
  console.log(e);
});
