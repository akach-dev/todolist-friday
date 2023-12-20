import { Button } from "@mui/material";
import React from "react";
import { FilterValuesType, TodolistDomainType, todolistsActions } from "features/todolists-list/model";
import { useActions } from "common/hooks";

export const FilterTasksButton = ({ todolist }: { todolist: TodolistDomainType }) => {
  const { id, filter } = todolist;

  const { changeTodolistFilter } = useActions(todolistsActions);

  const filterTasksHandler = (filter: FilterValuesType) => () => changeTodolistFilter({ filter, id });

  return (
    <>
      <Button variant={filter === "all" ? "outlined" : "text"} onClick={filterTasksHandler("all")} color={"inherit"}>
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        onClick={filterTasksHandler("active")}
        color={"primary"}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        onClick={filterTasksHandler("completed")}
        color={"secondary"}
      >
        Completed
      </Button>
    </>
  );
};
