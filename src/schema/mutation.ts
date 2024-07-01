import { GraphQLObjectType } from "graphql";
import { CreateAccount } from "./accounts/accountMutation";
import { CreateTransaction } from "./transactions/transactionMutation";

export const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    CreateAccount,
    CreateTransaction,
  }),
});
