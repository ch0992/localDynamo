let AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-northeast-2",
  endpoint: "http://localhost:8000"
});

let dynamoDB = new AWS.DynamoDB();

let params = {
  TableName: "TestLocal",
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" } //Partition Key
  ],
  AttributeDefinitions: [{ AttributeName: "id", AttributeType: "N" }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
};

dynamoDB.createTable(params, (err, data) => {
  if (err) {
    console.error(
      "Unable to create table. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      "Create table. Table description JSON:",
      JSON.stringify(data, null, 2)
    );
  }
});
