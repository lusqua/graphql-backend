import { GraphQLObjectType } from "graphql";
import { CreateUser } from "./user/userMutation";

export const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    CreateUser,
  }),
});
