import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    institutionName: {type: String, required: true},
    insttitueAddress: {type: String, required: true},
      
});