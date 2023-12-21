import React from "react";
import { Task } from "features/todolists-list/ui/TodoList/Tasks/Task/Task";
import { TodolistDomainType } from "features/todolists-list/model";
import { filteredTasksByTodoListId } from "features/todolists-list/model/tasks/tasksSelectors";
import { useSelector } from "react-redux";

export const Tasks = ({ todolist }: { todolist: TodolistDomainType }) => {
  const tasks = useSelector(filteredTasksByTodoListId(todolist.id, todolist.filter));

  return (
    <>
      {tasks.map((t) => (
        <Task key={t.id} task={t} todolistId={todolist.id} />
      ))}
    </>
  );
};
