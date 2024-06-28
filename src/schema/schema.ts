import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
} from "graphql";
import { listUsers } from "../modules/users/listUsers";
import { GraphQLContext } from "../context";
import { userType } from "../modules/users/type";
import { Mutation } from "./mutation";
import { users } from "./user/userSchema";

const query = new GraphQLObjectType<Record<string, unknown>, GraphQLContext>({
  name: "Query",
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => "Hello, world!",
    },
    users,
  },
});

export const schema = new GraphQLSchema({
  query,
  mutation: Mutation,
});
