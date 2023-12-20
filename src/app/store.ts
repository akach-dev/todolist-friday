import { configureStore } from "@reduxjs/toolkit";
import { tasksSlice } from "features/todolists-list/model/tasks/tasksSlice";
import { todolistsSlice } from "features/todolists-list/model/todolists/todolistsSlice";
import { appSlice } from "app/appSlice";
import { authSlice } from "features/auth/model/auth.slice";

export const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    todolists: todolistsSlice,
    app: appSlice,
    auth: authSlice,
  },
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// @ts-ignore
window.store = store;
