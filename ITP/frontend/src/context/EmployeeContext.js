import { createContext , useReducer } from "react"

export const EmployeesContext = createContext()


export const employeesReducer = (state, action) => {
    switch (action.type) {
      case 'SET_EMPLOYEES':
        return { 
            employees: action.payload 
        }
      case 'CREATE_EMPLOYEE':
        return { 
            employees: [action.payload, ...state.employees] 
        }
      case 'DELETE_EMPLOYEE':
        return { 
            employees: state.employees.filter(e => e._id !== action.payload._id) 
        }
      //
      case 'UPDATE_EMPLOYEE':
        return {
            employees: state.employees.filter(e => {
                if (e._id === action.payload._id) {
                    return action.payload
                } else {
                    return e
                }
            })
      }

      case 'SET_SELECTED_EMPLOYEE':
        return {
            ...state,
            selectedEmployee: action.payload
      }

      //
      default:
        return state
    }
  }


export const EmployeesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(employeesReducer, { 
      employees: null ,
      selectedEmployee: null 
    })
    
    return (
      <EmployeesContext.Provider value={{ ...state, dispatch }}>
        { children }
      </EmployeesContext.Provider>
    )
  }