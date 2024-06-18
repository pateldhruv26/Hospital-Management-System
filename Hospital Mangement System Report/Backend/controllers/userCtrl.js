import userModel from '../models/userModels.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import doctorModel from '../models/doctorModels.js';
import appointmentModel from '../models/appointmentModel.js';
import moment from 'moment';

//register callback
const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(200).send({ message: 'User already exist', success: false });
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).send({ message: 'Register Sucessfully', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Register Controller ${error.message}` })
    }
}

//login callback
const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ username: req.body.username })
        if (!user) {
            return res.status(200).send({ message: 'User not found', success: false })
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) {
            return res.status(200).send({ message: 'Invalid Username or Password', success: false })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(200).send({ message: 'Login Success', success: true, token })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error in Logic CTRL ${error.message}` })
    }
}

const authController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId })
        user.password = undefined;
        if (!user) {
            return res.status(200).send({
                message: 'User not found',
                success: false
            })
        } else {
            res.status(200).send({
                success: true,
                data: user,
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Auth Error',
            success: false,
            error
        })
    }
}
// const ty = async(req,res) => {
//     console.log("heloo");
//     res.status(200).send("hi kartik");
// }


//apply doctor controller
const applyDoctorController = async (req, res) => {
    try {
        const newDoctor = await doctorModel({ ...req.body , status: 'pending' })
        // console.log(req.body);
        await newDoctor.save()
        const adminUser = await userModel.findOne({ isAdmin: true })
        const notification = adminUser.notification
        notification.push({
            type: 'apply-doctor-request',
            message: `${newDoctor.firstName} ${newDoctor.lastName} has Applied For A Doctor Account.`,
            data: {
                doctorId: newDoctor._id,
                name: newDoctor.firstName + " " + newDoctor.lastName,
                onClickPath: '/admin/doctors'
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id, { notification })
        res.status(200).send({
            success: true,
            message:'Doctor Account Applied Successfully.'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while Applying Doctor"
        })
    }
}


// notification ctrl
const getAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId })
        const seenNotification = user.seenNotification;
        const notification = user.notification;
        seenNotification.push(...notification)
        user.notification = [];
        user.seenNotification = notification;
        const updatedUser = await user.save();
        res.status(200).send({
            success: true,
            message: "All notification Marked as Read",
            data: updatedUser,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error in notification',
            success : false,
            error
        })
    }
}


// delete notifications
const deleteAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id : req.body.userId })
        user.notification = [];
        user.seenNotification = [];
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: "Notification Deleted Successfully",
            data: updatedUser,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Unable to delete all notification',
            error
        })
    }
}

//get all doctors
const getAllDoctorsController = async (req, res) => {
    try {
        const doctors = await doctorModel.find({ status: "approved" })
        res.status(200).send({
            success: true,
            message: "Doctor lists fetched Successfully",
            data: doctors,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while fetching doctor list',
            error
        })
    }
}

//BOOK APPOINTMENT
const bookAppointmentController = async (req, res) => {
    try {
        req.body.status = "pending";
        const newAppointment = new appointmentModel(req.body);

        await newAppointment.save();
        const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
        user.notification.push({
            type: "New-Appointment-request",
            message: `A new Appointment Request from ${req.body.userInfo.name}`,
            onCLickPath: "/user/appointments",
        });
        await user.save();
        res.status(200).send({
            success: true,
            message: "Appointment Book succesfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error While Booking Appointment",
        });
    }
};

// booking bookingAvailabilityController
const bookingAvailabilityController = async (req, res) => {
    try {
        const date = req.body.date;
        const doctorId = req.body.doctorId;
        const time = req.body.time;
        const st = req.body.st;
        const et = req.body.et;

        if(time < st || time >= et){
            return res.status(200).send({
                message: "Please Select Valid Time",
                success: false,
            });
        }

        const appointments = await appointmentModel.find({
            doctorId,
            date,
            time,
        })
        if (appointments.length > 0) {
            return res.status(200).send({
                message: "Appointments Not Available At This time",
                success: true,
            });
        } else {
            return res.status(200).send({
                success: true,
                message: "Appointments Available",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error In Booking",
        });
    }
};

const userAppointmentsController = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({});
        res.status(200).send({
            success: true,
            message: "Users Appointments Fetch Successfully",
            data: appointments,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error In User Appointments",
        });
    }
};

export  { loginController, 
    registerController, 
    authController, 
    applyDoctorController, 
    getAllNotificationController, 
    deleteAllNotificationController, 
    getAllDoctorsController, 
    bookAppointmentController, 
    bookingAvailabilityController,
    userAppointmentsController };