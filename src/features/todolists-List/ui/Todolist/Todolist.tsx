import React, { useCallback, useEffect } from "react";
import { TodolistDomainType } from "features/todolists-List/model/todoLists/todolistsSlice";
import { tasksThunks } from "features/todolists-List/model/tasks/tasksSlice";
import { useActions } from "common/hooks";
import { AddItemForm } from "common/components";
import { FilterTasksButtons } from "features/todolists-List/ui/Todolist/FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "features/todolists-List/ui/Todolist/Tasks/Tasks";
import { TodolistTitle } from "features/todolists-List/ui/Todolist/TodolistTitle/TodolistTitle";

type Props = {
  todolist: TodolistDomainType;
};

export const Todolist = React.memo(function ({ todolist }: Props) {
  const { id } = todolist;

  const { fetchTasks, addTask } = useActions(tasksThunks);

  useEffect(() => {
    fetchTasks(id);
  }, [fetchTasks, id]);

  const addTaskHandler = useCallback(
    (title: string) => {
      return addTask({ title, todolistId: id }).unwrap();
    },
    [addTask, id],
  );

  return (
    <>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskHandler} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButtons todolist={todolist} />
      </div>
    </>
  );
});
