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

const query = new GraphQLObjectType<Record<string, unknown>, GraphQLContext>({
  name: "Query",
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => "Hello, world!",
    },
    users: {
      type: new GraphQLList(userType),
      resolve: () => listUsers(),
    },
  },
});

export const schema = new GraphQLSchema({
  query,
});
