import { AppRootStateType } from "app/store";
import { createSelector } from "@reduxjs/toolkit";
import { TaskStatuses } from "common/enums";

export const selectTasks = (state: AppRootStateType) => state.tasks;

export const filteredTasksByTodoListId = (id: string, filter: string) =>
  createSelector([selectTasks], (tasks) => {
    let tasksForTodolists = tasks[id];

    if (filter === "active") {
      tasksForTodolists = tasksForTodolists.filter((t) => t.status === TaskStatuses.New);
    }
    if (filter === "completed") {
      tasksForTodolists = tasksForTodolists.filter((t) => t.status === TaskStatuses.Completed);
    }
    return tasksForTodolists;
  });
