import { GraphQLID, GraphQLList } from "graphql";
import { accountType } from "../../modules/accounts/type";
import { listAccounts } from "../../modules/accounts/listAccounts";
import { findAccount } from "../../modules/accounts/findAccount";

export const accounts = {
  type: new GraphQLList(accountType),
  description: "List of all users",
  resolve: () => listAccounts(),
};

export const account = {
  type: accountType,
  description: "Get a user by ID",
  args: {
    id: { type: GraphQLID },
  },
  resolve: (_: any, args: any) => {
    return findAccount(args.id);
  },
};
