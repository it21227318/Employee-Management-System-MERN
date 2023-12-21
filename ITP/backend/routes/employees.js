const express = require('express')
const router = express.Router()
const {
    addEmployee,
    getEmployee,
    getEmployees,
    deleteEmployee,
    updateEmployee,
    fetchEmployees,
    fetchbyId,
    updateEmp,
    deleteEmp

} = require('../controllers/employeeController')


//get all employees

router.get('/', getEmployees)

//get a single employee
router.get('/get/:id', getEmployee)

//add new employee
router.post('/add',addEmployee)

//delete an employee
router.delete('/:id',deleteEmployee)

//update an employee
router.patch('/:id',updateEmployee)

//gett all employees new
router.get('/getall', fetchEmployees)

//gett employe by id new
router.get('/getbyId/:id', fetchbyId)

//update new
router.post('/update/:id', updateEmp)

//delete new
router.delete('/deleteEMp/:id', deleteEmp)



module.exports = router