import { AnyAction, createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit";
import { elGR } from "@mui/material/locale";
import { tasksThunks } from "features/todolists-list/model/tasks/tasksSlice";
import { todolistsThunks } from "features/todolists-list/model";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as string | null,
  isInitialized: false,
};

export type AppInitialStateType = typeof initialState;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "idle";
      })
      .addMatcher(isRejected, (state, action: AnyAction) => {
        state.status = "failed";

        if (action.payload) {
          if (
            action.type === tasksThunks.addTask.rejected.type ||
            action.type === todolistsThunks.addTodolist.rejected.type
          )
            return;
          state.error = action.payload.messages[0];
        } else {
          state.error = action.error.message ? action.error.message : "Some error occurred";
        }
      });
  },
});

export const appSlice = slice.reducer;
export const appActions = slice.actions;
