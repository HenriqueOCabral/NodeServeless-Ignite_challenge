import { DynamoDB } from 'aws-sdk';

import { CreateTodoDTO } from "@/dtos/CreateTodoDto";
import { Todo } from "@/models/Todo";
import { ITodoRepository } from "./ITodoRepository";

export class TodoRepository implements ITodoRepository {
  private readonly dynamoDb: DynamoDB.DocumentClient;
  private readonly tableName = process.env.TODOS_TABLE_NAME;
  
  constructor() {
    this.dynamoDb = new DynamoDB.DocumentClient();

    console.log('tablename', JSON.stringify(process.env));
  }

  async create(data: CreateTodoDTO): Promise<Todo> {
    const todo = new Todo();
    
    Object.assign(todo, data)

    await this.dynamoDb.put({
      TableName: this.tableName,
      Item: todo,
    }).promise();

    return todo;
  }

  async findByUser(user_id: string): Promise<Todo[]> {
    const { Items } = await this.dynamoDb.query({
      TableName: this.tableName,
      IndexName: 'userIdAndCreatedAt',
      KeyConditionExpression: '#user_id = :user_id',
      ExpressionAttributeNames: {
        '#user_id': 'user_id'
      },
      ExpressionAttributeValues: {
        ':user_id': user_id
      },
      ScanIndexForward: false,
    }).promise();

    return Items as Todo[] || [];
  }
}