import { GraphQLFieldConfig, GraphQLList } from "graphql";
import { userType } from "../../modules/users/type";
import { listUsers } from "../../modules/users/listUsers";

export const users = {
  type: new GraphQLList(userType),
  description: "List of all users",
  resolve: () => listUsers(),
};
