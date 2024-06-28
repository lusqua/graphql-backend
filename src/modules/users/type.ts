import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
} from "graphql";
import { GraphQLContext } from "../../context";

export const userType = new GraphQLObjectType<
  Record<string, unknown>,
  GraphQLContext
>({
  name: "User",
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLInt) },
  },
});
