import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFieldConfig,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
} from "graphql";
import { accountType } from "../../modules/accounts/type";
import { createTransaction } from "../../modules/transactions/createTransaction";
import { transactionType } from "../../modules/transactions/type";

export const CreateTransactionInputType = new GraphQLInputObjectType({
  name: "CreateTransactionInput",
  fields: () => ({
    account: {
      type: new GraphQLNonNull(GraphQLString),
    },
    amount: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    targetAccount: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});

export const CreateTransactionPayloadType = new GraphQLObjectType({
  name: "CreateTransactionPayload",
  fields: () => ({
    success: {
      type: GraphQLBoolean,
    },
    account: {
      type: accountType,
    },
    transaction: {
      type: transactionType,
    },
    targetAccount: {
      type: accountType,
    },
    error: {
      type: GraphQLString,
    },
  }),
});

export const CreateTransaction: GraphQLFieldConfig<null, null> = {
  type: CreateTransactionPayloadType,
  description: "Create a new transaction",
  args: {
    input: {
      type: CreateTransactionInputType,
    },
  },
  resolve: async (_, args) => {
    const transaction = await createTransaction(args.input);
    return transaction;
  },
};
