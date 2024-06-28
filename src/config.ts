export const config = {
  mongo: {
    uri: process.env.MONGO_URI || "mongodb://root:example@localhost:27017",
  },
  port: process.env.PORT || 4000,
};
