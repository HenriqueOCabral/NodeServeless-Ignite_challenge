import { CreateTodoDTO } from "@/dtos/CreateTodoDto";
import { Todo } from "@/models/Todo";

export interface ITodoRepository {
  create(data: CreateTodoDTO): Promise<Todo>
  findByUser(user_id: string): Promise<Todo[]>;
}