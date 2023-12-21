import React from "react";
import { EditableSpan } from "common/components";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useActions } from "common/hooks";
import { TodolistDomainType, todolistsActions, todolistsThunks } from "features/todolists-list/model";

export const TodoListTitle = ({ todolist }: { todolist: TodolistDomainType }) => {
  const { id, entityStatus, title } = todolist;

  const { removeTodolist, changeTodolistTitle } = useActions({
    ...todolistsThunks,
    ...todolistsActions,
  });

  const removeTodolistHandler = () => removeTodolist(id);

  const changeTodolistTitleHandler = (title: string) => changeTodolistTitle({ title, id });

  return (
    <h3>
      <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
      <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </h3>
  );
};
