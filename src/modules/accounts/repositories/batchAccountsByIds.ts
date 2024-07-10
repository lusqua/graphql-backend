import { Collection, ObjectId } from "mongodb";
import { database } from "../../../config/mongo";

// Função para carregar contas em lote
export const batchAccountsByIds = async (
  ids: readonly string[],
  accounts: Collection = database.collection("accounts")
) => {
  const objectIds = ids.map((id) => new ObjectId(id));

  const accountList = await accounts
    .find({
      _id: {
        $in: objectIds,
      },
    })
    .toArray();

  const accountMap = new Map(
    accountList.map((account) => [account._id.toHexString(), account])
  );

  const result = ids.map((id) => accountMap.get(id.toString()));

  return result;
};
