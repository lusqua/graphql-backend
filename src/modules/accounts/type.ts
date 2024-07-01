import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from "graphql";
import { GraphQLContext } from "../../context";

export const accountType = new GraphQLObjectType<
  Record<string, unknown>,
  GraphQLContext
>({
  name: "Account",
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: GraphQLInt },
  },
});

export type AccountType = {
  _id: string;
  name: string;
  balance?: number;
};
