import React from "react";
import { Task } from "features/todolists-List/ui/Todolist/Tasks/Task/Task";
import { filteredTasksByTodoListId } from "features/todolists-List/model/tasks/tasksSelectors";
import { useAppSelector } from "app/store";
import { TodolistDomainType } from "features/todolists-List/model/todoLists/todolistsSlice";

type Props = {
  todolist: TodolistDomainType;
};

export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(filteredTasksByTodoListId(todolist.id, todolist.filter));

  const tasksMap = tasks.map((t) => <Task key={t.id} task={t} todolistId={todolist.id} />);

  return <div>{tasksMap}</div>;
};
