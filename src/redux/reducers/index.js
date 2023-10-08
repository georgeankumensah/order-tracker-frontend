import { combineReducers } from "redux";

import authReducer from "./authReducer";
import { productReducer, selectedProductReducer } from "./productReducers";
import adminReducer from "./adminReducer";

export const reducers = combineReducers({
  allProducts: productReducer,
  product: selectedProductReducer,
  auth: authReducer,
  admins: adminReducer,
});
