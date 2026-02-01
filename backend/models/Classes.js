import mongoose from "mongoose";
const classSchema = new mongoose.Schema({
    className: {
        type: String,
        required: true,
    },
    classCode: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Classes = mongoose.model('Class', classSchema);
export default Classes;