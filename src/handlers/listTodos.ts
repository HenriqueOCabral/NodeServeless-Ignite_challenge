import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { internalServerError, ok } from "@/helpers/http";
import { Todo } from "@/models/Todo";
import { IHandler } from "@/protocols/IHandler";
import { IUseCase } from "@/protocols/IUseCase";
import { ListTodosUseCase } from "@/useCases/listTodos/ListTodosUseCase";
import { TodoRepository } from "@/repositories/TodoRepository";

class ListTodosHandler implements IHandler {
  constructor(private listTodosUseCase: IUseCase<string, Todo[]>) {}

  async handle(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const { user_id } = event.pathParameters;

      const todos = await this.listTodosUseCase.execute(user_id);

      return ok(todos);
    } catch(error) {
      console.error('Error', error);

      return internalServerError();
    }
  }
}

const todosRepository = new TodoRepository();

const listTodosUseCase = new ListTodosUseCase(todosRepository);

const handler = new ListTodosHandler(listTodosUseCase);

export const handle = handler.handle.bind(handler);