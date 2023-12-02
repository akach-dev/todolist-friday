import { ResponseType } from "api/todolists-api";
import { Dispatch } from "redux";
import { isAxiosError } from "axios";
import { appActions } from "app/app-reducer";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(appActions.setAppError({ error: data.messages[0] }));
  } else {
    dispatch(appActions.setAppError({ error: "Some error occurred" }));
  }
  dispatch(appActions.setAppStatus({ status: "failed" }));
};

export const handleServerNetworkError = (error: unknown, dispatch: Dispatch) => {
  let errorMessage: string;
  if (isAxiosError(error)) {
    errorMessage = error.response ? error.response.data.messages[0] : error.message;
  } else {
    errorMessage = (error as Error).message;
  }
  dispatch(appActions.setAppError({ error: errorMessage }));
  dispatch(appActions.setAppStatus({ status: "failed" }));
};
