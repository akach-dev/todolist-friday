import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { todolistsThunks } from "features/todolists-list/model/todolists/todolistsSlice";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "common/components";
import { Todolist } from "features/todolists-list/ui/TodoList/Todolist";
import { Navigate } from "react-router-dom";
import { useActions } from "common/hooks";
import { selectIsLoggedIn } from "features/auth/model/authSelectors";
import { selectTodolists } from "features/todolists-list/model";

export const TodolistsList = () => {
  const todolists = useSelector(selectTodolists);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { addTodolist: addTodolistThunk, fetchTodolists } = useActions(todolistsThunks);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    fetchTodolists();
  }, [isLoggedIn, fetchTodolists]);

  const addTodolist = useCallback(
    (title: string) => {
      return addTodolistThunk(title).unwrap();
    },
    [addTodolistThunk],
  );

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist todolist={tl} />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
