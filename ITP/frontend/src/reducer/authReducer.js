import {authConstants} from '../actions/constants'

const initiateState ={
    user: {},
    employees:[],
    authenticated: false,
    authenticating: false,
    loading: false,

}

export default(state = initiateState,action)=> {
    switch(action.type){
        case authConstants.LOGIN_REQUEST:
            state={
                ...state,
                authenticating:true
            }
            break

        case authConstants.LOGIN_SUCCESS:
            state={
                ...state,
                user: action.payload.user,
                authenticating:false,
                authenticated:true,
            }
            break

        case authConstants.LOGIN_FALIURE:
            state={
                ...state,
                authenticating:false
            }
            break

        case authConstants.SIGN_UP_REQUEST:
            state={
                ...state,
                loading:true
            }
            break

        case authConstants.SIGN_UP_SUCCESS:
            state={
                ...state,
                loading:false,
                user:action.payload
            }
            break
        case authConstants.SIGN_UP_FAILURE:
            state={
                ...state,
                loading:false,
                payload:action.payload.message
            }
            break
        case authConstants.LOGOUT_REQUEST:
            state={
                ...state,
                loading:true
            }
            break

        case authConstants.LOGOUT_SUCCESS:
            state={
                ...initiateState
  
            }
            break
        case authConstants.LOGOUT_FAILED:
            state={
                ...state,
                loading:false
            }
            break
    }
    return state
}