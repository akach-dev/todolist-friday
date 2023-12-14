import React from "react";
import { Task } from "features/todolists-List/ui/Todolist/Tasks/Task/Task";
import { TaskStatuses } from "common/enums";
import { selectTasks } from "features/todolists-List/model/tasks/tasksSelectors";
import { useAppSelector } from "app/store";
import { TodolistDomainType } from "features/todolists-List/model/todoLists/todolistsSlice";

type Props = {
  todolist: TodolistDomainType;
};

export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(selectTasks);
  let tasksForTodolist = tasks[todolist.id];

  if (todolist.filter === "active") {
    tasksForTodolist = tasksForTodolist.filter((t) => t.status === TaskStatuses.New);
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasksForTodolist.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <div>
      {tasksForTodolist.map((t) => (
        <Task key={t.id} task={t} todolistId={todolist.id} />
      ))}
    </div>
  );
};
