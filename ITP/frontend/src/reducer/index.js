import { combineReducers } from "redux";
import authReducer from "./authReducer";
import employeeReducer from "./employeeReducer";

const Reducer = combineReducers({
    auth:authReducer,
    employee: employeeReducer,
})
export default Reducer;