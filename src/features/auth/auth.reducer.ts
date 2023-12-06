import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "app/store";
import { appActions } from "app/app.reducer";
import { authAPI, LoginParamsType } from "features/auth/auth.api";
import { clearTasksAndTodolists } from "common/actions";
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from "common/utils";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authThunks.logout.fulfilled, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(authThunks.login.fulfilled, (state) => {
        state.isLoggedIn = true;
      });
  },
});

// thunks

const login = createAppAsyncThunk<undefined, LoginParamsType>(`${slice.name}/login`, async (data, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await authAPI.login(data);
    if (res.data.resultCode === 0) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return undefined;
    } else {
      handleServerAppError(res.data, dispatch);
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    rejectWithValue(null);
  }
});
const logout = createAppAsyncThunk<undefined, undefined>(`${slice.name}/logout`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await authAPI.logout();
    if (res.data.resultCode === 0) {
      dispatch(clearTasksAndTodolists());
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return undefined;
    } else {
      handleServerAppError(res.data, dispatch);
      rejectWithValue(null);
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    rejectWithValue(null);
  }
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { login, logout };
