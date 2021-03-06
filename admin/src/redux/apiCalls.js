import { publicRequest, userRequest } from "../requestMethods";
import {
    getProductFailure,
    getProductStart,
    getProductSuccess,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    createProductStart,
    createProductSuccess,
    createProductFailure
} from "./productRedux";
import { loginFailure, loginStart, loginSuccess } from "./userRedux"

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post('/auth/login', user)
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginFailure())
    }
}

export const getProducts = async dispatch => {
    dispatch(getProductStart());
    try {
        const res = await publicRequest.get('/products')
        dispatch(getProductSuccess(res.data))
    } catch (error) {
        dispatch(getProductFailure())
    }
}

export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try {
        //const res = await userRequest.delete(`/products/${id}`)
        dispatch(deleteProductSuccess(id))
    } catch (error) {
        dispatch(deleteProductFailure())
    }
}

export const updateProduct = async (id, product, dispatch) => {
    dispatch(updateProductStart());
    try {
        //update
        dispatch(updateProductSuccess({ id, product }))
    } catch (error) {
        dispatch(updateProductFailure())
    }
}

export const createProduct = async (product, dispatch) => {
    dispatch(createProductStart());
    try {
        const res = await userRequest.post(`/products`,product)
        dispatch(createProductSuccess(res.data))
    } catch (error) {
        dispatch(createProductFailure())
    }
}