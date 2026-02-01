import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    academicYear: {
        type: String,
        required: true
    },
    departmentName: {
        type: String,
        required: true,
        unique: true
    },
    departmentCode: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    creatorId: {
        type: String,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Department = mongoose.model('Department', departmentSchema);
export default Department;