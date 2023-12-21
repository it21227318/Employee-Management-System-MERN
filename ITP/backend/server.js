require('dotenv').config()

const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();


//import routes
const empRoutes = require('./routes/employees');
const admin = require('./routes/adminRouter')


//middleware
app.use(express.json())
app.use(cors())
app.use((req,res,next) => {
    console.log(req.path,req.method)
    next()
}) 

//routes
app.use('/api/employees',empRoutes)
app.use('/api/Admin',admin)


mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Connected to DB & Server started on port",process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })



process.env