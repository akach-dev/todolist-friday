import React from "react";
import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { TodolistsList } from "features/todolists-list/ui";
import { Login } from "features/auth/ui/login/Login";

export const AppMain = () => {
  return (
    <Container fixed>
      <Routes>
        <Route path={"/"} element={<TodolistsList />} />
        <Route path={"/login"} element={<Login />} />
      </Routes>
    </Container>
  );
};
