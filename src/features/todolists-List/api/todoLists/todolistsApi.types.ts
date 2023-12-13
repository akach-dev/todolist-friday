import { UpdateDomainTaskModelType } from "features/todolists-List/model/tasks/tasksSlice";

export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type UpdateTaskArgType = {
  taskId: string;
  domainModel: UpdateDomainTaskModelType;
  todolistId: string;
};

export type UpdateTodolistTitleArgType = {
  id: string;
  title: string;
};
