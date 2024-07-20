import { GraphQLID, GraphQLList, GraphQLString } from "graphql";
import { accountType } from "../../modules/accounts/type";
import { listAccounts } from "../../modules/accounts/listAccounts";
import { findAccount } from "../../modules/accounts/findAccount";

export const accounts = {
  type: new GraphQLList(accountType),
  description: "List of all accounts",
  resolve: () => listAccounts(),
};

export const account = {
  type: accountType,
  description: "Get a account by ID",
  args: {
    id: { type: GraphQLID },
  },
  resolve: (_: any, args: any) => {
    return findAccount(args.id);
  },
};
