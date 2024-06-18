import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name : {type : String, required : [true, 'name is require']},
    mobile : {type : String, required : [true , 'mobile number is require']},
    username : {type : String, required : [true , 'username is require']},
    password : {type : String, required : [true , 'password is require']},
    isAdmin : {type : Boolean, default : false},
    isDoctor : {type : Boolean, default : false},
    notification : {type : Array, default : []},
    seenNotification : {type : Array, default : []},
})

const userModel = mongoose.model("user",userSchema);
export default userModel;