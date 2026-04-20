import express from "express";
import {
  createPaper,
  getAllPapers,
  getPaperById,
  updatePaper,
  deletePaper,
} from "../controllers/questionPaperController.js";
import QuestionPaper from "../models/QuestionPaper.js";

const router = express.Router();
router.get("/latest/:valid", async (req, res) => {
  const {valid} = req.params;
  console.log(valid)
  const paper = await QuestionPaper.findOne({ StaffEmail:valid }).sort({ createdAt: -1 });
  console.log(paper);
  return res.json(paper);
});
router.post("/", createPaper);
router.get("/get", getAllPapers);
router.get("/:id", getPaperById);
router.put("/:id", updatePaper);
router.delete("/:id", deletePaper);

// router.post("/api/papers", async (req, res) => {
  
// });

export default router;