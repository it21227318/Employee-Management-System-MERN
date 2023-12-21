import {employeeConstants} from './constants'
import { toast } from 'react-hot-toast'
import axiosInstance from '../axios'



export const getAll = () => {
    return async (dispatch) => {
        dispatch({ type: employeeConstants.GET_ALL_REQUEST })
        const res = await axiosInstance.get("/api/employees/getall")
        console.log("action",res)
        if (res.status === 200) {

            toast.success("Employee data fetched sucessfully..!", {
                id: 'fetched success'
            })
            dispatch({
                type: employeeConstants.GET_ALL_SUCCESS,
                payload: res.data.payload
            })
        }
        else {
            dispatch({ type: employeeConstants.GET_ALL_FAILURE })
            toast.error("Employee data fetch error..!")
        }
    }
}


export const DeleteEmploye = (e) => {

    return async (dispatch) => {
        dispatch({ type: employeeConstants.DELETE_REQUEST })
        const res = await axiosInstance.delete(`/api/employees/deleteEmp/${e}`)

        if (res.status === 200) {
            toast.success("Employee deleted..! ", {
                id: 'del'
            })
            dispatch({
                type: employeeConstants.DELETE_SUCCESS,
                payload: res.data.payload
            })

        } else if (res.status === 400) {
            toast.error("Delete Request failed..!", {
                id: "fail"
            })
            dispatch({
                type: employeeConstants.DELETE_FAILURE,

            })
        } else if (res.status === 500) {
            toast.error("Server error..!", {
                id: 'server'
            })
            dispatch({
                type: employeeConstants.DELETE_FAILURE,

            })
        }
    } 
}
export const UpdateEmploye = (e) => {
console.log(e.uid)
    return async (dispatch) => {
        dispatch({ type: employeeConstants.UPDATE_REQUEST })
        const res = await axiosInstance.post(`/api/employees/update/${e.uid}`,e)

        if (res.status === 200) {
            toast.success("Employee updated..! ", {
                id: 'del'
            })
            dispatch({ 
                type: employeeConstants.UPDATE_SUCCESS,
                payload:res.data.payload
            })

        } else if (res.status === 400) {
            toast.error("Update Request failed..!", {
                id: "fail"
            })
            dispatch({
                type: employeeConstants.UPDATE_FAILURE,

            })
        } else if (res.status === 500) {
            toast.error("Server error..!", {
                id: 'server'
            })
            dispatch({
                type: employeeConstants.UPDATE_FAILURE,

            })
        }
    } 
}


export const Addnew = (employe) => {
    console.log(employe)
    return async (dispatch) => {

        dispatch({ type: employeeConstants.ADD_REQUEST })
        const res = await axiosInstance.post('/api/employees/add', employe)
        console.log(res)
        if (res.status === 200) {
            dispatch({
                type: employeeConstants.ADD_SUCCESS,
                payload: res.data.payload
            })
            toast.success("employee Added successfully..!")
        }

        else if (res.status === 400)  {
        
                toast.error("Somthing Went Wrong In User Adding..!")
                dispatch({
                    type: employeeConstants.ADD_FAILURE,
                })
            
        }
    }
}

