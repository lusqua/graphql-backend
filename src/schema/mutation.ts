import { GraphQLObjectType } from "graphql";
import { CreateUser } from "./user/userMutation";
import { CreateTransaction } from "./transactions/transactionMutation";

export const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    CreateUser,
    CreateTransaction,
  }),
});
