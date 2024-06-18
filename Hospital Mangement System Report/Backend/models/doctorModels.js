import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    userId : {
        type : String,
    },
    firstName : {
        type : String,
        require : [true, 'First name is required']
    },
    lastName : {
        type : String,
        require : [true, 'Last name is required']
    },
    mobile : {
        type : String,
        require : [true, 'Phone no is required']
    },
    email : {
        type : String,
        require : [true, 'Email  is required']
    },
    website : {
        type : String,
    },
    address : {
        type : String,
        require : [true, 'Address  is required']
    },
    specialization : {
        type : String,
        require : [true, 'Specialization  is required']
    },
    experience : {
        type : String,
        require : [true, 'Experience is required']
    },
    feesPerCunsaltation : {
        type : String,
        require : [true, 'Fee is required']
    },
    status : {
        type : String,
        default : 'pending'
    },
    timings: {
        type:Object,
        require:[true,'Work timing is Required']
    },
},
{ timestamps : true }
);

const doctorModel = mongoose.model("doctors",doctorSchema);
export default doctorModel;