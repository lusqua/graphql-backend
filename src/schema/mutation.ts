import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import {
  CreateUser,
  CreateUserInputType,
  CreateUserPayloadType,
} from "./user/userMutation";

export const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    CreateUser,
  }),
});
