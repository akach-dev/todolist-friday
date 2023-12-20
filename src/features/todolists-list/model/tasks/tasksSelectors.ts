import { AppRootStateType } from "app/store";
import { FilterValuesType } from "features/todolists-list/model/todolists/todolistsSlice";
import { createSelector } from "@reduxjs/toolkit";
import { TaskStatuses } from "common/enums";

export const selectTasks = (state: AppRootStateType) => state.tasks;

export const filteredTasksByTodoListId = (id: string, filter: FilterValuesType) =>
  createSelector([selectTasks], (tasks) => {
    let tasksForTodolist = tasks[id];

    if (filter === "active") {
      tasksForTodolist = tasksForTodolist.filter((t) => t.status === TaskStatuses.New);
    }
    if (filter === "completed") {
      tasksForTodolist = tasksForTodolist.filter((t) => t.status === TaskStatuses.Completed);
    }

    return tasksForTodolist;
  });
