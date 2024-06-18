import userModel from '../models/userModels.js'
import doctorModel from '../models/doctorModels.js';

const getAllUsersController = async (req,res) => {
    try {
        const users = await userModel.find({});
        res.status(200).send({
            success : true,
            message : "user data list",
            data : users,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message : 'error while fetching users',
            error
        })
    }
}

const getAllDoctorController = async (req,res) => {
    try {
        const doctors = await doctorModel.find({});
        res.status(200).send({
            success : true,
            message : "doctor data list",
            data : doctors,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message : 'error while fetching doctors',
            error
        })
    }
}

// doctor account status
const changeAccountStatusController = async(req,res) => {
    try {
        const { doctorId, status } = req.body;
        const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status }, { new: true });
        const user = await userModel.findOne({ _id: doctor.userId });
        const notification = user.notification;
        notification.push({
            type: 'doctor-account-request-updated',
            message: `Your Doctor Account Request has ${status}`,
            onClickPath: '/notificaiton'
        });
        user.isDoctor = status === "approved" ? true : false;
        await user.save();
        res.status(201).send({
            success: true,
            message: "Account Status Updated",
            data: doctor,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error in account status',
            error
        });
    }
};
// doctor account status


export { getAllUsersController, getAllDoctorController, changeAccountStatusController }