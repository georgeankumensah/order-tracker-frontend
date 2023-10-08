import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  admins: [],
  selectedAdmin: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_ADMINS:
      return {
        ...state,
        admins: action.payload,
      };
    case ActionTypes.ADD_ADMIN:
      return {
        ...state,
        admins: [...state.admins, action.payload],
      };
    case ActionTypes.EDIT_ADMIN:
      return {
        ...state,
        admins: state.admins.map((admin) =>
          admin.id === action.payload.id ? action.payload : admin
        ),
      };
    case ActionTypes.DELETE_ADMIN:
      return {
        ...state,
        admins: state.admins.filter((admin) => admin._id !== action.payload),
      };
    case ActionTypes.SELECTED_ADMIN:
      return {
        ...state,
        selectedAdmin: state.admins.filter(
          (admin) => admin._id == action.payload
        ),
      };
    default:
      return state;
  }
};

export default adminReducer;
