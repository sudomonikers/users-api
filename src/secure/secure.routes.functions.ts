import * as AWS from "aws-sdk";
import Logger from "../logger";

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "to-do";

// GET
export const getToDos = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  return await dynamoClient.scan(params).promise();
};

// PUT
export const putToDos = async (toDo: any) => {
  const params = {
    TableName: TABLE_NAME,
    Item: toDo,
  };
  return await dynamoClient.put(params).promise();
};

// DELETE
