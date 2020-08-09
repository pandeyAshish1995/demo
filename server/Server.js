const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoUtility = require("./MongoUtility");
const { MONGO_CREDENTIALS } = require("./Config");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const port = 5000;
const insert = async params => {
  const mongoInstance = await mongoUtility({ credentials: MONGO_CREDENTIALS });
  let table = params.table;
  // insert sample
  let insertData = { ...params.data };
  let insertedResult = await mongoInstance.insert(table, insertData);
  console.log("inserted new user data ", insertedResult && JSON.stringify(insertedResult.insertedData));
  return insertedResult;
};

const find = async params => {
  const mongoInstance = await mongoUtility({ credentials: MONGO_CREDENTIALS });
  let table = params.table;

  // find sample
  let userFilter = params.data ? { ...params.data } : {};
console.log("userFilter", userFilter)
  let findResult = await mongoInstance.find(table, userFilter);
  console.log("find result == ", JSON.stringify(findResult));
  return findResult;
};

const updateSample = async () => {
  const mongoInstance = await mongoUtility({ credentials: MONGO_CREDENTIALS });
  //update sample
  let updateFilter = { email: "xyz@gmail.com" };
  let updates = {
    $set: { name: "New Name" }
  };
  let updateResult = await mongoInstance.updateOne("user", updateFilter, updates);
  console.log("update result == ", JSON.stringify(updateResult));
};

app.all("/insert", async (req, res) => {
  try {
    let { params } = req.body;
    console.log("insert body == ", params);
    let result = await insert(params);
    res.send({ result });
  } catch (error) {
    console.log("err1 ==", error);
    res.send(JSON.stringify(error));
  }
});

app.all("/find", async (req, res) => {
  try {
    let { params } = req.body;
    console.log("find body == ", params);

    let result = await find(params);
    res.send({ result });
  } catch (error) {
    console.log("err2 ==", error);
    res.send(JSON.stringify(error));
  }
});

app.listen(port, () => {
  console.log("db server running on", port);
});
