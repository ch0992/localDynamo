let AWS = require("aws-sdk");
let fs = require("fs");

AWS.config.update({
  region: "ap-northeast-2",
  endpoint: "http://localhost:8000"
});

let docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing Cars into DynamoDB. Please Wait.");

let cars = JSON.parse(fs.readFileSync("./carData.json", "utf8"));

cars.forEach(car => {
  console.log(car);

  let params = {
    TableName: "Cars",
    Item: {
      id: car.id,
      type: car.type,
      name: car.name,
      manufacturer: car.manufacturer,
      fuel_type: car.fuel_type,
      description: car.description
    }
  };
  docClient.put(params, (err, data) => {
    if (err) {
      console.error(
        "Unable to add Car.",
        car.name,
        "Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("PutItem succeeded: ", car.name);
    }
  });
});
