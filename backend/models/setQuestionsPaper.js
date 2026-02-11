import mongoose from 'mongoose';

const setQueSchema = new mongoose.Schema({
    StaffId: {type: mongoose.Types.ObjectId, ref: "Staff"},
    StaffName: {type: String, required: true},
    syllabusTitle: {type: String, required: true},
    syllabusdescription: {type: String, required: true},
    StaffCreatorId : {type: String, required: true},
    staffOccupation: {type: String, required: true},
});

const setQuestion = mongoose.model("Question", setQueSchema);

export default setQuestion;