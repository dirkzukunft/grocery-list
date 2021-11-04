import { gql } from 'apollo-server-core';

export const typeDefs = gql`
  type productClass {
    id: ID!
    name: String!
  }

  type product {
    id: ID!
    productClass: productClass!
    name: String!
  }

  type productVariant {
    id: ID!
    product: product
    name: String!
    amount: Float
    amountIsVolume: Boolean
    price: Float
  }

  type groceryList {
    id: ID!
    timestamp: Int
    items: [GroceryItems]
  }

  type GroceryItems {
    productVariant: productVariant!
    count: Int!
    comment: String
  }
`;
