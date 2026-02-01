import mongoose from "mongoose";

const allowedThingsSchema = new mongoose.Schema({
    StaffId: {
        type: String,
        required: true
    },
    StaffName: {
        type: String,
        required: true
    },
    AllowedDepartment: {
        type: String,
        required: true
    },
    AllowedClass: {
        type: String,
        required: true
    },
    AllowedSubject: {
        type: String,
        required: true
    },
    AllowedSemester: {
        type: String,
        required: true
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const AllowedThings = mongoose.model('AllowedThings', allowedThingsSchema);
export default AllowedThings;