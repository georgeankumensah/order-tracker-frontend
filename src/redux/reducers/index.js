import { combineReducers } from "redux";

import authReducer from "./authReducer";
import { productReducer, selectedProductReducer } from "./productReducers";

export const reducers = combineReducers({
  allProducts: productReducer,
  product: selectedProductReducer,
  auth: authReducer,
});
