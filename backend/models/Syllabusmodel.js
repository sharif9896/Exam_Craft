import mongoose from "mongoose";
const syllabusSchema = new mongoose.Schema({
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
    },
    staffName: {
        type: String,
        required: true
    },
    staffAllowedDepartment: {
        type: String,
        required: true
    },
    staffAllowedClass: {
        type: String,
        required: true
    },
    staffAllowedSubject: {
        type: String,
        required: true
    },
    staffAllowedSemester: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    syllabysPDF: {
        type: String,
        required: true
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
const Syllabus = mongoose.model('Syllabus', syllabusSchema);
export default Syllabus;