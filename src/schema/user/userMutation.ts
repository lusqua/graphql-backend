import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFieldConfigMap,
  GraphQLNonNull,
  GraphQLFieldConfig,
} from "graphql";
import { userType } from "../../modules/users/type";
import { createUser } from "../../modules/users/createUser";

export const CreateUserInputType = new GraphQLInputObjectType({
  name: "CreateUserInput",
  fields: () => ({
    name: {
      type: GraphQLString,
    },
  }),
});

export const CreateUserPayloadType = new GraphQLObjectType({
  name: "CreateUserPayload",
  fields: () => ({
    user: {
      type: userType,
    },
  }),
});

export const CreateUser: GraphQLFieldConfig<null, null> = {
  type: CreateUserPayloadType,
  description: "Create a new user",
  args: {
    input: {
      type: CreateUserInputType,
    },
  },
  resolve: async (_, args) => {
    const user = await createUser(args.input.name);

    return {
      user,
    };
  },
};
