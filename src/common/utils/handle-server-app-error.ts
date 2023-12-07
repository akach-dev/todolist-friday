import { Dispatch } from "redux";
import { appActions } from "app/app.reducer";
import { BaseResponseType } from "common/types/common.types";

/**
 * Handles server errors.
 * @template D
 * @param {BaseResponseType<D>} data - Server response data error message
 * @param {Dispatch} dispatch - Dispatch function.
 * @param {boolean} [showGlobalError=true] - Whether to show a global error.
 * @returns {void} - return void
 */

export const handleServerAppError = <D>(
  data: BaseResponseType<D>,
  dispatch: Dispatch,
  showGlobalError: boolean = true,
): void => {
  if (showGlobalError) {
    dispatch(appActions.setAppError({ error: data.messages.length ? data.messages[0] : "Some error occurred" }));
  }
  dispatch(appActions.setAppStatus({ status: "failed" }));
};
