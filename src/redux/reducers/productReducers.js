import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  products: [
   
  ],
};

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: payload };
      break;
    case ActionTypes.SELECTED_PRODUCT:
      return { ...state, ...payload };
      break;
    case ActionTypes.REMOVE_SELECTED_PRODUCT:
      return {};
      break;
    default:
         return initialState
      break;
  }
};

export const selectedProductReducer = (state={},{type,payload})=>{
  switch (type) {
    case ActionTypes.SELECTED_PRODUCT:
      return {...state,...payload}
      break;
  
    default:
      return state
      break;
  }
}
