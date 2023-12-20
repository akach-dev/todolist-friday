import React, { useCallback, useEffect } from "react";
import { Delete } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { Task } from "features/todolists-list/ui/Task/Task";
import {
  FilterValuesType,
  TodolistDomainType,
  todolistsActions,
  todolistsThunks,
} from "features/todolists-list/model/todolists/todolistsSlice";
import { tasksThunks } from "features/todolists-list/model/tasks/tasksSlice";
import { TaskStatuses } from "common/enums";
import { useActions } from "common/hooks";
import { AddItemForm, EditableSpan } from "common/components";
import { TaskType } from "features/todolists-list/api/tasks/tasksApi.types";
import { FilterTasksButton } from "features/todolists-list/ui/Task/FilterTasksButton/FilterTasksButton";

export const Todolist = React.memo(({ todolist, tasks }: { todolist: TodolistDomainType; tasks: TaskType[] }) => {
  const { fetchTasks, addTask } = useActions(tasksThunks);
  const { removeTodolist, changeTodolistTitle, changeTodolistFilter } = useActions({
    ...todolistsThunks,
    ...todolistsActions,
  });

  useEffect(() => {
    fetchTasks(todolist.id);
  }, []);

  const addTaskHandler = (title: string) => addTask({ todolistId: todolist.id, title });

  const removeTodolistHandler = () => removeTodolist(todolist.id);

  const changeTodolistTitleHandler = (title: string) => changeTodolistTitle({ title, id: todolist.id });

  let tasksForTodolist = tasks;

  if (todolist.filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <div>
      <h3>
        <EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler} />
        <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskHandler} disabled={todolist.entityStatus === "loading"} />
      <div>
        {tasksForTodolist.map((t) => (
          <Task key={t.id} task={t} todolistId={todolist.id} />
        ))}
      </div>
      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButton todolist={todolist} />
      </div>
    </div>
  );
});
