import mongoose from 'mongoose';
const Schema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: [true, 'Email address is required.'],
    unique: true, 
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^\S+@\S+\.\S+$/.test(v); 
      },
      message: props => `${props.value} is not a valid email address!`
    }},
    password: {type: String, required: true},
    qualification: {type: String, required: true},
    designation: {type: String, required: true},
    spetialization: {type: String, required: true},
    department: {type: String, required: true},
    phonenumber: {type: Number, required: true},
    address: {type: String, required: true},
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Staff = mongoose.model("Staff", Schema);
export default Staff;

