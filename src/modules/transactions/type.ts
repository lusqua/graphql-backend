import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from "graphql";
import { GraphQLContext } from "../../context";
import { accountType } from "../accounts/type";

export const transactionType = new GraphQLObjectType<
  Record<string, unknown>,
  GraphQLContext
>({
  name: "Transactions",
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    account: { type: accountType },
    targetAccount: { type: accountType },
    amount: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

export type Transaction = {
  _id: string;
  account: string;
  targetAccount: string;
  amount: number;
  code: string;
};
