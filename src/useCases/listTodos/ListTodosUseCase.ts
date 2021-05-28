import { Todo } from "@/models/Todo";
import { IUseCase } from "@/protocols/IUseCase";
import { ITodoRepository } from "@/repositories/ITodoRepository";

export class ListTodosUseCase implements IUseCase<string, Todo[]> {
  constructor(private readonly todosRepository: ITodoRepository) {}
  
  async execute(user_id: string): Promise<Todo[]> {
    const todos = await this.todosRepository.findByUser(user_id);

    return todos;
  }
}