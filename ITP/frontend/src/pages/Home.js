import { useEffect, useState } from "react"
import { useEmployeesContext } from "../hooks/useEmployeesContext"
import { useDispatch, useSelector } from 'react-redux';
import EmployeeDetails from '../components/EmployeeDetails'
import EmployeeForm from '../components/EmployeeForm'
import { Link, Navigate } from 'react-router-dom'
import { getAll } from "../actions/employeeAction";
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import DownloadIcon from '@mui/icons-material/Download';
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const Home = () => {
  // const {employees,/*selectedEmployee ,*/ dispatch} =useEmployeesContext()
  const authenticated = useSelector(state => state.auth.authenticated);

  // useEffect(() => {
  //   const fetchEmployees = async () => {
  //     const response = await fetch('/api/employees')
  //     const json = await response.json()

  //     if(response.ok){
  //         dispatch({type:'SET_EMPLOYEES',payload : json})
  //     }
  //   }

  //   fetchEmployees()
  // }, [])

  // new function 
  const employees = useSelector(state => state.employee.employees)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAll())
  }, []);

  //search function
  const [serQuary, setSerQuary] = useState("");

  const SearchEmp = (event) => {
    setSerQuary(event.target.value);
  }

  const filteredEmployees = employees.filter(data => (
    data.name.toLowerCase().includes(serQuary.toLowerCase()) ||
    data.designation.toLowerCase().includes(serQuary.toLowerCase()) ||
    data.email.toLowerCase().includes(serQuary.toLowerCase()) ||
    data.gender.toLowerCase().includes(serQuary.toLowerCase())
  ));

  //pdf generation;
  function generatePDF() {
    const today = new Date();
    const curr_date = today.getDate();
    const curr_month = today.getMonth();
    const curr_year = today.getFullYear();
  
    const formatted_date = `${curr_month + 1}/${curr_date}/${curr_year}`;
  
    const doc = new jsPDF('landscape');
    doc.setFontSize(18);
    doc.text("Serendip", 15, 5);
    doc.setFontSize(9);
    doc.text(formatted_date, 255, 5);
    doc.setFontSize(22);
    doc.text("Employees", 120, 12);
  
    const filteredEmployees = employees.filter(data => (
      data.name.toLowerCase().includes(serQuary.toLowerCase()) ||
      data.designation.toLowerCase().includes(serQuary.toLowerCase()) ||
      data.email.toLowerCase().includes(serQuary.toLowerCase()) ||
      data.gender.toLowerCase().includes(serQuary.toLowerCase())
    ));
  
    const tableHeaders = [['No', 'ID', 'Name', 'Designation', 'Age', 'Email', 'Gender', 'Salary']];
    const tableData = filteredEmployees.map((employee, index) => [
      index + 1,
      employee._id,
      employee.name,
      employee.designation,
      employee.age,
      employee.email,
      employee.gender,
      employee.salary
    ]);
  
    doc.autoTable({
      head: tableHeaders,
      body: tableData,
    });
  
    const fileName = `Employees_${formatted_date}.pdf`;
    doc.save(fileName);
  }

  if (!authenticated) {
    return <Navigate to='/login' />
  };


  return (
    <>
      <div>
        <br></br>
        <input
          onChange={SearchEmp}
          className='form-control'
          type='search'
          placeholder='search'
          value={serQuary}
          name='searchQuery'>
        </input>
        <br></br>
        <div className='generatebutton'><button onClick={generatePDF} type="button2"
          class="btn btn-info" style={{ backgroundColor: "#2E2EFF" }} ><DownloadIcon />Generate Report</button></div>

        <br />
      </div>

      <div className="home">
        <div className="employees">
          {filteredEmployees.map((data, index) => (
            <EmployeeDetails key={index} employee={data} />
          ))}
        </div>
        <EmployeeForm />

      </div>
    </>
  )
}

export default Home