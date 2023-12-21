const Emp = require('../models/employee')
const mongoose = require('mongoose')


//get all employees
const getEmployees = async (req,res) => {
    const employees = await Emp.find({})

    res.status(200).json(employees)
}




//get a single employee
const getEmployee = async (req,res) => {
    const {id} = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No such employee'})
    }

    const employee = await Emp.findById(id)

    if (!employee){
        return res.status(400).json({error : "No such employee"})
    }

    res.status(200).json(employee)
}






//add new employee

const addEmployee = async (req,res) => {
  console.log(req.body)
    const {name,designation,age,gender,email,salary} = req.body
    
    //add document to database
    try{
      const newemp = new Emp({
        name,
        designation,
        gender,
        email,
        salary,
        age
      })
        const employee = await newemp.save()
      console.log(employee)
        if(employee){
          const newdata = await Emp.find()
          res.status(200).json({
            message:"added..",
            payload:newdata
          })

        }
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

//delete an employee
const deleteEmployee = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No such employee'})
    }

    const employee = await Emp.findOneAndDelete({_id: id})

    if (!employee){
        return res.status(400).json({error : "No such employee"})
    }

    res.status(200).json(employee)
}

//update an employee
const updateEmployee = async (req,res) => {

    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No such employee'})
    }

    const employee = await Emp.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!employee){
        return res.status(400).json({error : "No such employee"})
    }
    res.status(200).json(employee)
}

// new get all
const fetchEmployees = async (req, res) => {
    try {
      const allemployee = await Emp.find();
      console.log(allemployee)
      if(allemployee.length > 0){
        res.status(200).json({
          message:"Fetched successfully..!",
          payload:allemployee
        });
      } else {
        res.status(404).json({
          message:"No employees found..!"
        });
      }
    } catch(error) {
      console.log(error);
      res.status(500).json({
        message:"Server error..!"
      });
    }
  };
const fetchbyId = async (req, res) => {
    try {
      const {id} = req.params
      const employee = await Emp.findById(id);
      console.log(employee)
      if(employee){
        res.status(200).json({
          message:"Fetched successfully..!",
          payload:employee
        });
      } else {
        res.status(404).json({
          message:"No employees found..!"
        });
      }
    } catch(error) {
      console.log(error);
      res.status(500).json({
        message:"Server error..!"
      });
    }
  };

const updateEmp = async (req, res) => {
    try {
      const {id} = req.params
      const {name,designation,age,gender,email,salary} = req.body

      const updateEmp ={
        name,
        designation,
        age,
        gender,
        email,
        salary
      }
     const update = await Emp.findByIdAndUpdate(id, updateEmp)

      if(update){
        const newEmployees = await Emp.find()

        res.status(200).json({
          message:"Update successfully..!",
          payload:newEmployees
        });
      } else {
        res.status(404).json({
          message:"Update failed..!"
        });
      }
    } catch(error) {
      console.log(error);
      res.status(500).json({
        message:"Server error..!"
      });
    }
  };
  const deleteEmp = async (req, res) => {
    try {
      console.log(req.params)
      const {id} = req.params
      const employee = await Emp.findByIdAndDelete(id);
      if(employee){
        const newEmployees = await Emp.find()
        
        res.status(200).json({
          message:"Delete successfully..!",
          payload:newEmployees
        });
      } else {
        res.status(404).json({
          message:"Delete failed..!"
        });
      }
    } catch(error) {
      console.log(error);
      res.status(500).json({
        message:"Server error..!"
      });
    }
  };


module.exports = {
    getEmployees,
    getEmployee,
    addEmployee,
    deleteEmployee,
    updateEmployee,
    fetchEmployees,
    fetchbyId,
    updateEmp,
    deleteEmp
}