import { useState,useEffect } from "react"
import { useEmployeesContext } from "../hooks/useEmployeesContext"
import { MDBBtn, MDBModal, MDBTextArea, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody } from 'mdb-react-ui-kit';
import { Form } from 'react-bootstrap'
import { Addnew } from "../actions/employeeAction";
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const EmployeeForm = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [designation, setDesignation] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [email, setEmail] = useState('')
  const [salary, setSalary] = useState('')
  const loading = useSelector(state => state.auth.loading)

  
  useEffect(() => {
    if (loading === true) {
        toast.loading('loading...', {
            id: 'loading'
        })
    }
    else if (loading === false) {
        toast.dismiss('loading')
    }

}, [loading]);

  const sendData = (e) => {

    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (name === '') {
        toast.error("Please enter your name..", {
            id: 'name'
        })
    }
    else if (designation === '') {
        toast.error("Please Provide your designation..", {
            id: 'desig'
        })
    }
    else if (email === '') {
        toast.error("Please Provide Your email ..", {
            id: 'pmail'
        })
    }
    else if (!emailRegex.test(email) ) {
        toast.error("Please Provide a valid email..", {
            id: 'valid'
        })
    }

    else if (age === '') {
        toast.error("Please Provide a age..", {
            id: 'age'
        })
    }
    else if (gender === '') {
        toast.error("Please Provide a gender..", {
            id: 'gender'
        })
    }
    else if (salary === '') {
        toast.error("Please Provide a salary..", {
            id: 'sal'
        })
    }


    else if (name !== '' && designation !== '' && age !== '' && email !== '' && salary !== '' && gender !== '') {
        const form ={
          name,
          designation,
          gender,
          email,
          salary,
          age
        }
        dispatch(Addnew(form))
        setName('')
        setAge('')
        setEmail('')
        setDesignation('')
        setGender('')
        setSalary('')

    }

}
  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   const employee = { name, designation, age, gender, salary }

  //   const response = await fetch('/api/employees/add', {
  //     method: 'POST',
  //     body: JSON.stringify(employee),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })

  //   const json = await response.json()

  //   if (!response.ok) {
  //     setError(json.error)
  //   }
  //   if (response.ok) {
  //     setError(null)
  //     setName('')
  //     setDesignation('')
  //     setAge('')
  //     setGender('')
  //     setEmail('')
  //     setSalary('')
  //     console.log('new employee added:', json)
  //     dispatch({ type: 'CREATE_EMPLOYEE', payload: json })
  //   }
  // }



  return (


    // <form className="create" onSubmit={handleSubmit}>
    //   <h3>Add a New Employee</h3>

    //   <label>Employee Name:</label>
    //   <input
    //     type="text"
    //     onChange={(e) => setName(e.target.value)}
    //     value={name}
    //   />

    //   <label>Designation:</label>
    //   <input
    //     type="text"
    //     onChange={(e) => setDesignation(e.target.value)}
    //     value={designation}
    //   />

    //   <label>Age:</label>
    //   <input
    //     type="number"
    //     onChange={(e) => setAge(e.target.value)}
    //     value={age}
    //   />

    //   {/* <label>Gender:</label>
    //   <input
    //     type="text"
    //     onChange={(e) => setGender(e.target.value)}
    //     value={gender}
    //   /> */}
    //   {/* <label>Gender:</label>
    //   <select value={gender} onChange={(e) => setGender(e.target.value)}>
    //     <option value="">Select Gender</option>
    //     <option value="male">Male</option>
    //     <option value="female">Female</option>
    //     <option value="other">Other</option>
    //   </select> */}

    //   <label>Email:</label>
    //   <input
    //     type="email"
    //     onChange={(e) => setEmail(e.target.value)}
    //     value={email}
    //   />


    //   <label>Salary:</label>
    //   <input
    //     type="number"
    //     onChange={(e) => setSalary(e.target.value)}
    //     value={salary}
    //   />



    // <label for="myfile">Image:</label>
    // <label><input type="file" id="myfile" name="myfile" /><br></br></label>
    // <label><input type="submit" value="Submit" /></label>

    // <button >Add Employee</button>
    // {error && <div className="error">{error}</div>}
    // </form>

    <MDBModalBody style={{ marginTop: "4.5rem", paddingTop: "2rem", paddingLeft: "1rem", paddingRight: "1rem"}}>
      <h3>Add a New Employee</h3>
      <Form encType='multipart/form-data' onSubmit={sendData}>
        <Form.Group className="mb-1"  >
          <Form.Label  >Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => { setName(e.target.value) }}
          />

        </Form.Group>
        <Form.Group className="mb-1"  >
          <Form.Label  >Designation</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter designation'
            value={designation}
            onChange={(e) => { setDesignation(e.target.value) }}
          />

        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Age</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter age'
            value={age}
            onChange={(e) => { setAge(e.target.value) }}
          />

        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <Form.Select
            onChange={(e) => { setGender(e.target.value) }}
          >
            <option selected>{gender}</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='Other'>Other</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-1"  >
          <Form.Label  >Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
          />

        </Form.Group>
        <Form.Group className="mb-1"  >
          <Form.Label  >Salary</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter salary'
            value={salary}
            onChange={(e) => { setSalary(e.target.value) }}
          />

        </Form.Group>
        <label for="myfile">Image:</label>
        <label><input type="file" id="myfile" name="myfile" /><br></br></label>
       

        <button type='submit'>Add Employee</button>
       
      </Form>
    </MDBModalBody>
  )
}

/*
<label for="myfile">Image:</label>
<input type="file" id="myfile" name="myfile"/><br></br>
<input type="submit" value="Submit"/> 





                <select name="gender" id="gender">
          <option value={gender}>Male</option>
          <option value={gender}>Female</option>
        </select>
*/

export default EmployeeForm