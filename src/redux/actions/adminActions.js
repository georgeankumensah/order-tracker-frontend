import { ActionTypes } from "../constants/actionTypes";


export const deleteAdmin = (id) => {
    return {
        type : ActionTypes.DELETE_ADMIN,
        payload : id,
    }
}

export const addAdmin = (admin) => {
    return {
        type : ActionTypes.ADD_ADMIN,
        payload : admin,
    }
}

export const editAdmin = (admin) => {
    return {
        type : ActionTypes.EDIT_ADMIN,
        payload : admin,
    }
}

export const setAdmins = (admins) => {
    return {
        type : ActionTypes.SET_ADMINS,
        payload : admins,   
    }
}

export const selectedAdmin = (admin) => {
    return {
        type : ActionTypes.SELECTED_ADMIN,
        payload : admin,
    }
}
