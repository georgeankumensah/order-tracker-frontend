
import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
