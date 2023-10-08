import { ActionTypes } from "../constants/actionTypes";

export const loginSuccess = (user) => ({
  type: ActionTypes.LOGIN_SUCCESS,
  payload: user,
});

export const logout = () => ({
  type: ActionTypes.LOGOUT,
});
