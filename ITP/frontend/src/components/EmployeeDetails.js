import React, { useEffect, useState } from 'react'
import { useEmployeesContext } from "../hooks/useEmployeesContext"
import { useDispatch, useSelector } from 'react-redux';
import { DeleteEmploye, UpdateEmploye } from '../actions/employeeAction'
import Swal from 'sweetalert2'
import { MDBBtn, MDBModal, MDBTextArea, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody} from 'mdb-react-ui-kit';
import { Col, Container, Row, Table, Button, Nav, Form } from 'react-bootstrap'


const EmployeeDetails = (employee) => {

    const dispatch = useDispatch()
    // const { dispatch } = useEmployeesContext()
    const [uid,setUid] = useState('')
    const [name, setName] = useState('')
    const [designation, setDesignation] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [email, setEmail] = useState('')
    const [salary, setSalary] = useState('')

    console.log(uid,name, designation, age, gender, email, salary)



    // const handleClick = async () => {
    //     const response = await fetch('/api/employees/' + employee._id, {
    //         method: 'DELETE'
    //     })
    //     const json = await response.json()

    //     if (response.ok) {
    //         dispatch({ type: 'DELETE_EMPLOYEE', payload: json })
    //     }
    // }



    const [newEmployee, setNewEmployee] = useState(employee)


    // const handleEditClick = async (employee) => {
    //     console.log("hellow" + employee._id)
    //     const response = await fetch('/api/employees/' + employee._id, {
    //         method: 'PATCH'
    //         /*headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(employee)*/
    //     })
    //     const json = await response.json()

    //     if (response.ok) {
    //         dispatch({ type: 'UPDATE_EMPLOYEE', payload: json })
    //     }
    // }

    const deleteEmp = (id) => {
        console.log("profile eke" + id)
        Swal.fire({
            title: 'Are you sure want to Delete this Employee?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#008000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
            cancelButtonText: 'No!'

        }).then(async (result) => {
            if (result.isConfirmed) {
                dispatch(DeleteEmploye(id))
            }
        })
    }
    //update function
    const [shUpdateModel, setShUpdateModel] = useState(false);
    const showUpdateModel = (data) => {
        setShUpdateModel(true);
        setUid(data._id)
        setName(data.name)
        setDesignation(data.designation)
        setAge(data.age)
        setGender(data.gender)
        setEmail(data.email)
        setSalary(data.salary)
    }

    const closeUpdateModel = () => {
        setShUpdateModel(false);
        setUid(undefined)
        setName(undefined)
        setDesignation(undefined)
        setAge(undefined)
        setGender(undefined)
        setEmail(undefined)
        setSalary(undefined)

    }

    const updateData = () => {
        const form = {
            uid,
            name,
            designation,
            age,
            email,
            gender,
            salary
        }


        dispatch(UpdateEmploye(form));
        setUid(undefined)
        setName(undefined)
        setDesignation(undefined)
        setAge(undefined)
        setGender(undefined)
        setEmail(undefined)
        setSalary(undefined)
        setShUpdateModel(false);
    }


    const inquiryupdateModel = () => {
        return (
            <MDBModal show={shUpdateModel} setShow={setShUpdateModel} tabIndex='-1'>
                <MDBModalDialog centered className="modal-dialog modal-dialog-scrollable">
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>UPDATE EMPLOYEE</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={closeUpdateModel}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>

                            <Form encType='multipart/form-data'>
                                <Form.Group className="mb-1" controlId="formBasicEmail" >
                                    <Form.Label>Employee ID</Form.Label>
                                    <Form.Control
                                        type='text'
                                        value={uid}
                                        disabled
                                    />

                                </Form.Group>
                                <Form.Group className="mb-1" controlId="formBasicEmail" >
                                    <Form.Label  >Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter name'
                                        value={name}
                                        onChange={(e) => { setName(e.target.value) }}
                                    />

                                </Form.Group>
                                <Form.Group className="mb-1" controlId="formBasicEmail" >
                                    <Form.Label  >Designation</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Model Number'
                                        value={designation}
                                        onChange={(e) => { setDesignation(e.target.value) }}
                                    />

                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
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
                                <Form.Group className="mb-1" controlId="formBasicEmail" >
                                    <Form.Label  >Email</Form.Label>
                                    <Form.Control
                                        type='email'
                                        placeholder='Enter email'
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                    />

                                </Form.Group>
                                <Form.Group className="mb-1" controlId="formBasicEmail" >
                                    <Form.Label  >Salary</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter salary'
                                        value={salary}
                                        onChange={(e) => { setSalary(e.target.value) }}
                                    />

                                </Form.Group>
    

                            </Form>
                        </MDBModalBody>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal" onClick={closeUpdateModel}>Close</button>
                            <button type="button" class="btn btn-primary" onClick={updateData}>Update Employee</button>
                        </div>

                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        )
    }




    // const handleChange = (e) => {
    //     setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value })
    // }



    return (
        <>
            <div className="employee-details">
                <h4>{employee.employee.name}</h4>
                <p><strong>Name : </strong><input type="text" name="name" value={employee.employee.name} disabled /></p>
                <p><strong>Designation : </strong><input type="text" name="designation" value={employee.employee.designation} disabled /></p>
                <p><strong>Email : </strong><input type="text" name="designation" value={employee.employee.email} disabled /></p>
                <p><strong>Age : </strong><input type="number" name="age" value={employee.employee.age} disabled /></p>
                <p><strong>Gender : </strong><input type="text" name="gender" value={employee.employee.gender} disabled /></p>
                <p><strong>Salary : </strong><input type="number" name="salary" value={employee.employee.salary} disabled /></p>
                <span onClick={(e) => deleteEmp(employee.employee._id)} >delete</span>
                <button type="submit" onClick={(e) => showUpdateModel(employee.employee)} >Update</button>

            </div>
            {inquiryupdateModel()}
        </>
    )
}

export default EmployeeDetails
