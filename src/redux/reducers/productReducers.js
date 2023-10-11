import { ActionTypes } from "../constants/actionTypes";

const initialState = {
	products: [],
	selectedProduct:[]
};

export const productReducer = (state = initialState,{ type, payload }) => {
	if (type === ActionTypes.SET_PRODUCTS) return { ...state, products: payload };
	if (type === ActionTypes.SELECTED_PRODUCT) return { ...state, ...payload };
	if (type === ActionTypes.REMOVE_SELECTED_PRODUCT) return {};

	return initialState;
};

export const selectedProductReducer = (state = {}, { type, payload }) => {
	if (type === ActionTypes.SELECTED_PRODUCT) return { ...state, selectedProduct:payload };
	return state;
};
