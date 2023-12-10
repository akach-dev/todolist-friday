import { Dispatch } from "redux";
import { authActions } from "features/auth/auth.reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "features/auth/auth.api";
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from "common/utils";
import { ResultCode } from "common/enums";
import { thunkTryCatch } from "common/utils/thuns-try-catch";

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
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    },
  },
});

const initializeApp = createAppAsyncThunk<undefined, undefined>(`${slice.name}/initializeApp`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authAPI.me();
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
    } else {
      return rejectWithValue(null);
    }
  }).finally(() => dispatch(appActions.setAppInitialized({ isInitialized: true })));
});
export const appReducer = slice.reducer;
export const appActions = slice.actions;
export const appThunks = { initializeApp };
