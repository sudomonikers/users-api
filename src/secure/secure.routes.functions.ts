import * as AWS from "aws-sdk";
import bcrypt from "bcrypt";
import moment from "moment";
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

export const getToDosForUser = async (user: string) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      user,
    },
  };
  return await dynamoClient.scan(params).promise();
};

// PUT
export const putToDos = async (user: string, toDo: any) => {
  let id = await bcrypt.hash(toDo.note, 3);
  id = id.replace(/\W/g, `${Math.floor(Math.random() * 1000)}`);
  const params = {
    TableName: TABLE_NAME,
    Item: {
      id,
      user,
      toDo,
      date: moment().format(),
    },
  };
  await dynamoClient.put(params).promise();
  return params.Item;
};

// DELETE
export const delToDo = async (user: string, id: string) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id,
      user,
    },
  };
  return await dynamoClient.delete(params).promise();
};
