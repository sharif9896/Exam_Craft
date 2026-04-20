import mongoose from 'mongoose';
const PostSchema = new mongoose.Schema({
  content:String
});

const Document = mongoose.model("Document", PostSchema);
export default Document;
// import mongoose from 'mongoose';
// const DocumentSchema = new mongoose.Schema({

//   content: {
//     type: String,
//     required: true
//   },

//   createdAt: {
//     type: Date,
//     default: Date.now
//   }

// });

// const Document = mongoose.model("Document", DocumentSchema);
// export default Document;