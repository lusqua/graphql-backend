import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFieldConfig,
  GraphQLInt,
} from "graphql";
import { accountType } from "../../modules/accounts/type";
import { createAccount } from "../../modules/accounts/createAccount";

export const CreateAccountInputType = new GraphQLInputObjectType({
  name: "CreateAccountInput",
  fields: () => ({
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLInt,
    },
    email: {
      type: GraphQLString,
    },
  }),
});

export const CreateAccountPayloadType = new GraphQLObjectType({
  name: "CreateAccountPayload",
  fields: () => ({
    account: {
      type: accountType,
    },
  }),
});

export const CreateAccount: GraphQLFieldConfig<null, null> = {
  type: CreateAccountPayloadType,
  description: "Create a new account",
  args: {
    input: {
      type: CreateAccountInputType,
    },
  },
  resolve: async (_, args) => {
    const account = await createAccount(args.input);

    return {
      account,
    };
  },
};
