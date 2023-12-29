import { gql } from '@apollo/client';

export const GET_CREATED_TOKENS = gql`
  query GetCreatedTokens($creatorId: ID!) {
    creator(id: $creatorId) {
      tokens {
        id
        name
        symbol
        imageURI
        description
        createdAtTimestamp
      }
    }
  }
`;
