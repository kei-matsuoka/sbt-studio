import { gql } from '@apollo/client';

export const GET_CREATED_TOKENS = gql`
  query GetCreatedTokens($creatorId: ID!) {
    creator(id: $creatorId) {
      tokens {
        id
        name
        imageURI
        description
        mintedTokens {
          tokenId
          minter {
            id
          }
          isBurned
          mintedAtTimestamp
        }
      }
    }
  }
`;

export const GET_CREATED_TOKEN = gql`
  query GetCreatedToken($tokenId: ID!) {
    createdToken(id: $tokenId) {
      id
      name
      imageURI
      description
      maxSupply
      burnAuth
      createdAtTimestamp
      mintedTokens {
        tokenId
        minter {
          id
        }
        isBurned
        mintedAtTimestamp
      }
    }
  }
`;
