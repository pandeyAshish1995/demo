const Mongo = require("mongodb").MongoClient;

module.exports = async ({ credentials }) => {
  const dbConnection = async () => {
    let { host, port, dbName } = credentials;
    //username , password not used for time being.  can be secured if needed.
    let URL = "mongodb://" + host + ":" + port;
    const client = await Mongo.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);
    return { db, client };
  };
  const find = async (table, query, options) => {
    let { db, client } = await dbConnection();
      let result = await db
        .collection(table)
        .find(query)
        .toArray();
      client.close();
      return result;
    
  };
  const insert = async (table, data, options) => {
    let { db, client } = await dbConnection();
    let dataInsert;
    if (Array.isArray(data)) {
      dataInsert = data;
    } else if (typeof data == "object") {
      dataInsert = [data];
    }
    if (dataInsert && dataInsert.length) {
      let result = await db.collection(table).insertMany(dataInsert);
      client.close();

      let dataToReturn = {
        status: "Error in inserting records",
        error: result
      };
      if (result && result.insertedCount) {
        dataToReturn = {
          status: "success !!",
          insertedRecordsCount: result.insertedCount,
          insertedData: result.ops
        };
      }
      return dataToReturn;
    }
  };

  const updateOne = async (table, query, update, options) => {
    let { db, client } = await dbConnection();
    if (!query || !update) {
      return [];
    }
    let result = await db.collection(table).updateOne(query, update);
    client.close();

    return result;
  };

  return {
    find,
    insert,
    updateOne
  };
};
