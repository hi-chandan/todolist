import mongoose from "mongoose";

export const DBconnection = () => {
  mongoose
    .connect(process.env.MONGO_DB, { dbName: "Todotask" })
    .then((c) =>
      console.log(`database is connected success to ${c.connection.host}`)
    )
    .catch((e) => console.log(e));
};
