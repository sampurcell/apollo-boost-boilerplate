import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  url: 'https://api.github.com/graphql',
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer GITHUB_ACCESS_TOKEN`,
      },
    });
  },
});
