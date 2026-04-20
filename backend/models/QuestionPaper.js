import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  label: String, // a, b (optional)
  questionCount: Number
});

const sectionSchema = new mongoose.Schema({
  sectionName: String, // Part-A, Part-B
  questions: [questionSchema]
});

const paperSchema = new mongoose.Schema(
  {
    collegeName: String,
    examName: String,
    regNo: String,
    session: String,
    date: String,
    monthYear: String,
    duration: String,
    maxMarks: String,
    sections: [sectionSchema],
    staffId: String,
    staffName: String,
    staffAllowedDepartment: String,
    StaffEmail: String,
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("QuestionPaper", paperSchema);


// import mongoose from "mongoose";

// const questionSchema = new mongoose.Schema({
//   label: {
//     type: String, // "a", "b", or null
//     default: null,
//   },
//   questionNumber: Number,
// });

// const sectionSchema = new mongoose.Schema({
//   sectionName: {
//     type: String,
//     enum: ["A", "B", "C", "D"],
//     required: true,
//   },
//   heading: String,
//   marks: String,
//   questions: [questionSchema],
// });

// const questionPaperSchema = new mongoose.Schema(
//   {
//     collegeName: String,
//     examName: String,
//     regNo: String,
//     session: String,
//     date: String,
//     monthYear: String,
//     duration: String,
//     maxMarks: String,

//     sections: [sectionSchema],
//   },
//   { timestamps: true }
// );

// export default mongoose.model("QuestionPaper", questionPaperSchema);