import { GraphQLObjectType } from "graphql";
import { CreateTransaction } from "./transactions/transactionMutation";
import { CreateAccount } from "../modules/accounts/resolvers/createAccount";

export const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    CreateAccount,
    CreateTransaction,
  }),
});
