import { Dispatch } from "redux";
import { appActions } from "app/app.reducer";
import { BaseResponseType } from "common/types/common.types";

/**
 * Handles server application errors.
 *
 * @template D - The type of the data returned by the server.
 * @param {BaseResponseType<D>} data - The response data from the server.
 * @param {Dispatch} dispatch - The dispatch function from the Redux store.
 * @param {boolean} [showError=true] - Whether to show the error message.
 * @returns {void} - void
 */
export const handleServerAppError = <D>(
  data: BaseResponseType<D>,
  dispatch: Dispatch,
  showError: boolean = true,
): void => {
  if (showError) {
    dispatch(appActions.setAppError({ error: data.messages.length ? data.messages[0] : "Some error occurred" }));
  }
  dispatch(appActions.setAppStatus({ status: "failed" }));
};
