import React, { useEffect } from "react";
import { TodolistDomainType } from "features/todolists-list/model/todolists/todolistsSlice";
import { tasksThunks } from "features/todolists-list/model/tasks/tasksSlice";
import { useActions } from "common/hooks";
import { AddItemForm } from "common/components";
import { FilterTasksButton } from "features/todolists-list/ui/TodoList/FilterTasksButton/FilterTasksButton";
import { Tasks } from "features/todolists-list/ui/TodoList/Tasks/Tasks";
import { TodoListTitle } from "features/todolists-list/ui/TodoList/TodoListTitle/TodoListTitle";

export const Todolist = React.memo(({ todolist }: { todolist: TodolistDomainType }) => {
  const { id, entityStatus } = todolist;

  const { fetchTasks, addTask } = useActions(tasksThunks);

  useEffect(() => {
    fetchTasks(id);
  }, []);

  const addTaskHandler = (title: string) => addTask({ todolistId: id, title }).unwrap();

  return (
    <>
      <TodoListTitle todolist={todolist} />
      <AddItemForm addItem={addTaskHandler} disabled={entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButton todolist={todolist} />
      </div>
    </>
  );
});
