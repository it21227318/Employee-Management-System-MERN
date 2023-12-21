const mongoose = require ('mongoose')
const bcrypt = require ('bcryptjs')
const Schema = mongoose.Schema;

const AdminSchema = new Schema({

    Admin_ID:{
        type:String,
        required: true
        
    },
    Full_Name:{
        type: String,
        required: true
    },
    Admin_Email:{
        type:String,
        lowercase:true,
        required: true 
    },
    Contact_no:{
        type:String,
        required: true
    },
    Hash_password:{
        type:String,
        required: true
    }

},{timestamps:true})

AdminSchema.virtual('password').set(function(Password){
    this.Hash_password =bcrypt.hashSync(Password, 8)
});

AdminSchema.methods ={
    authenticate: function(){
        return bcrypt.compareSync(password , this.Hash_password);
    }
}

module.exports = mongoose.model("Admin",AdminSchema);