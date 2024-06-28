import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { GraphQLContext } from "../../context";

export const transactionType = new GraphQLObjectType<
  Record<string, unknown>,
  GraphQLContext
>({
  name: "Transactions",
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    account: { type: new GraphQLNonNull(GraphQLString) },
    toAccount: { type: new GraphQLNonNull(GraphQLString) },
    amount: { type: new GraphQLNonNull(GraphQLInt) },
  },
});
