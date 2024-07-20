import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { GraphQLContext } from "../../context";
import { AccountType, accountType } from "../accounts/type";

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
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export type Transaction = {
  _id: string;
  account: () => Promise<AccountType>;
  targetAccount: () => Promise<AccountType>;
  amount: number;
  code: string;
  createdAt: string;
};

export type TransactionType = {
  _id: string;
  account: string;
  targetAccount: string;
  amount: number;
  code: string;
  createdAt: string;
};
