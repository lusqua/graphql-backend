import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFieldConfig,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
} from "graphql";
import { userType } from "../../modules/users/type";
import { createTransaction } from "../../modules/transactions/createTransaction";
import { transactionType } from "../../modules/transactions/type";
import { findUser } from "../../modules/users/findUser";

export const CreateTransactionInputType = new GraphQLInputObjectType({
  name: "CreateTransactionInput",
  fields: () => ({
    account: {
      type: new GraphQLNonNull(GraphQLString),
    },
    amount: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    toAccount: {
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
      type: userType,
    },
    transaction: {
      type: transactionType,
    },
    toAccount: {
      type: userType,
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

    if (transaction.success) {
      const account = await findUser(args.input.account);
      const toAccount = await findUser(args.input.toAccount);

      return {
        success: true,
        transaction,
        account,
        toAccount,
      };
    }

    return {
      sucess: false,
      transaction,
      account: null,
      toAccount: null,
      error: transaction.error,
    };
  },
};
