import { Button } from "@mui/material";
import React from "react";
import { TodolistDomainType, todolistsActions } from "features/todolists-List/model/todoLists/todolistsSlice";
import { useActions } from "common/hooks";

type Props = {
  todolist: TodolistDomainType;
};

export const FilterTasksButtons = ({ todolist }: Props) => {
  const { filter, id } = todolist;

  const { changeTodolistFilter } = useActions(todolistsActions);

  const onAllClickHandler = () => changeTodolistFilter({ filter: "all", id });
  const onActiveClickHandler = () => changeTodolistFilter({ filter: "active", id });
  const onCompletedClickHandler = () => changeTodolistFilter({ filter: "completed", id });

  return (
    <>
      <Button variant={filter === "all" ? "outlined" : "text"} onClick={onAllClickHandler} color={"inherit"}>
        All
      </Button>
      <Button variant={filter === "active" ? "outlined" : "text"} onClick={onActiveClickHandler} color={"primary"}>
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        onClick={onCompletedClickHandler}
        color={"secondary"}
      >
        Completed
      </Button>
    </>
  );
};

FilterTasksButtons.displayName = "FilterTasksButtons";
