export const config = {
  mongo: {
    uri: process.env.MONGO_URI || "mongodb://root:example@localhost:27017",
    database: process.env.MONGO_DB || "test",
  },
  port: process.env.PORT || 4000,
};
