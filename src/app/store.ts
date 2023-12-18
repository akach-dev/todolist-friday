import { tasksReducer } from "features/todolistsList/tasks.reducer";
import { todolistsReducer } from "features/todolistsList/todolists.reducer";
import { appReducer } from "app/app.reducer";
import { authReducer } from "features/auth/auth.reducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
  },
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
