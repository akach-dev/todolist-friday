import React, { useEffect } from "react";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import {
  TodolistDomainType,
  todolistsActions,
  todolistsThunks,
} from "features/todolists-list/model/todolists/todolistsSlice";
import { tasksThunks } from "features/todolists-list/model/tasks/tasksSlice";
import { useActions } from "common/hooks";
import { AddItemForm, EditableSpan } from "common/components";
import { TaskType } from "features/todolists-list/api/tasks/tasksApi.types";
import { FilterTasksButton } from "features/todolists-list/ui/Tasks/Task/FilterTasksButton/FilterTasksButton";
import { Tasks } from "features/todolists-list/ui/Tasks/Tasks";

export const Todolist = React.memo(({ todolist }: { todolist: TodolistDomainType }) => {
  const { id, entityStatus, title } = todolist;

  const { fetchTasks, addTask } = useActions(tasksThunks);
  const { removeTodolist, changeTodolistTitle, changeTodolistFilter } = useActions({
    ...todolistsThunks,
    ...todolistsActions,
  });

  useEffect(() => {
    fetchTasks(id);
  }, []);

  const addTaskHandler = (title: string) => addTask({ todolistId: id, title });

  const removeTodolistHandler = () => removeTodolist(id);

  const changeTodolistTitleHandler = (title: string) => changeTodolistTitle({ title, id });

  return (
    <div>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
        <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskHandler} disabled={entityStatus === "loading"} />
      <div>
        <Tasks todolist={todolist} />
      </div>
      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButton todolist={todolist} />
      </div>
    </div>
  );
});
