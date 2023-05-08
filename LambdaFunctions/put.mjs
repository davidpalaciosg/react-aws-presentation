import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "http-crud-personas-arquitectura";

export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };
  
  try {
    switch (event.routeKey) {
      case "PUT /personas":
        let requestJSON = JSON.parse(event.body);
        const Item = {
            id: requestJSON.id,
            name: requestJSON.name,
            lastName: requestJSON.lastName,
            age: requestJSON.age,
        }
        await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: Item,
          })
        );
        body = Item;
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};
