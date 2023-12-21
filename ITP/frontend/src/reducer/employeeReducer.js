import {authConstants} from '../actions/constants'
import { employeeConstants } from '../actions/constants'

const initiateState ={
    employees:[],
    loading: false,

}

export default(state = initiateState,action)=> {
    switch(action.type){
        case employeeConstants.GET_ALL_REQUEST:
            state={
                ...state,
                loading:true
            }
            break

        case employeeConstants.GET_ALL_SUCCESS:
            state={
                ...state,
                employees: action.payload,
                loading:false,
            }
            break

        case employeeConstants.GET_ALL_FAILURE:
            state={
                ...state,
                loading:false
            }
            break

        case employeeConstants.UPDATE_REQUEST:
            state={
                ...state,
                loading:true
            }
            break

        case employeeConstants.UPDATE_SUCCESS:
            state={
                ...state,
                loading:false,
                employees:action.payload
            }
            break
        case employeeConstants.UPDATE_FAILURE:
            state={
                ...state,
                loading:false,
            }
            break
        case employeeConstants.DELETE_REQUEST:
            state={
                ...state,
                loading:true
            }
            break

        case employeeConstants.DELETE_SUCCESS:
            state={
                ...state,
                loading:false,
                employees:action.payload
            }
            break
        case employeeConstants.DELETE_FAILURE:
            state={
                ...state,
                loading:false,
            }
            break
        case employeeConstants.ADD_REQUEST:
            state={
                ...state,
                loading:true
            }
            break

        case employeeConstants.ADD_SUCCESS:
            state={
                ...state,
                loading:false,
                employees:action.payload
            }
            break
        case employeeConstants.ADD_FAILURE:
            state={
                ...state,
                loading:false,
            }
            break
       
    }
    return state
}