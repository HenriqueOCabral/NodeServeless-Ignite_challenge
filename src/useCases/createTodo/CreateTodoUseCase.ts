import { CreateTodoDTO } from "@/dtos/CreateTodoDto";
import { Todo } from "@/models/Todo";
import { IUseCase } from "@/protocols/IUseCase";
import { ITodoRepository } from "@/repositories/ITodoRepository";

export class CreateTodoUseCase implements IUseCase<CreateTodoDTO, Todo> {
  constructor(private todosRepository: ITodoRepository) {}
  
  async execute(data: CreateTodoDTO): Promise<Todo> {
    const todo = await this.todosRepository.create(data);

    return todo;
  }
}