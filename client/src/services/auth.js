import gql from 'graphql-tag';

import client from 'client';

// eslint-disable-next-line import/prefer-default-export
export function socialSigninProvider({ token, provider }) {
  return client
    .mutate({
      mutation: gql`
        mutation verificationUserLoginOrSignup($provider: String!, $token: String!) {
          verificationUserLoginOrSignup(provider: $provider, token: $token) {
            token
            
            user {
              id
              imageUrl
              gravatarHash
            }
          }
        }
      `,
      variables: {
        provider,
        token
      }
    });
}
