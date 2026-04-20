import QuestionPaper from "../models/QuestionPaper.js";

// CREATE
export const createPaper = async (req, res) => {
  // const {adminid} = req;
  // const {staffId} = req;
  try {
    let paper = await QuestionPaper.findOne({ regNo: req.body.regNo });

    if (paper) {
      paper.sections = req.body.sections;
      await paper.save();
    } else {
      paper = await QuestionPaper.create(req.body);
    }
    // console.log(paper);
    res.json(paper);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL
export const getAllPapers = async (req, res) => {
  const {staffId} = req.params;
  try {
    const papers = await QuestionPaper.find({ staffId }).sort({ createdAt: -1 });
    res.json(papers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE
export const getPaperById = async (req, res) => {
  try {
    const paper = await QuestionPaper.findById(req.params.id);
    if (!paper) return res.status(404).json({ message: "Not found" });

    res.json(paper);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updatePaper = async (req, res) => {
  try {
    const updated = await QuestionPaper.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deletePaper = async (req, res) => {
  try {
    await QuestionPaper.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getquestionpperByStaff = async (req, res) => {
  const { staffId } = req.params;
  const {adminid} =req;
  try{
    const paper = await QuestionPaper.find({staffId, creatorId: adminid}).sort({ createdAt: -1 });
    if (!paper) return res.status(404).json({ message: "Not found" });
    console.log(paper);
    return res.status(200).json(paper);
  }catch(e){
    console.log(e);
    return res.status(500).json({message: "Error in fetching question paper by staff id!", e});
  }
}

const getlatestpaper = async (req, res) => {
  const {adminid} = req;
  const {staffId} = req.params;
  try{
    const paper = await QuestionPaper.findOne({staffId, creatorId: adminid}).sort({ createdAt: -1 });
    if (!paper) return res.status(404).json({ message: "Not found" });
    console.log(paper);
    return res.status(200).json(paper);
  }
  catch(e){
    console.log(e);
    return res.status(500).json({message: "Error in fetching latest question paper by staff id!", e});
  }
}
export {getquestionpperByStaff, getlatestpaper};