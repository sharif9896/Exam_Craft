// controllers/dashboardController.js
// import AllowedThings from "../models/AllowedThings.js";
// import Syllabus from "../models/Syllabus.js";

import AllowedThings from "../models/AllowedThingsmodel.js";
import Syllabus from "../models/Syllabusmodel.js";

const getDashboardStats = async (req, res) => {
  try {
    const totalAllowed = await AllowedThings.countDocuments();
    const totalSyllabus = await Syllabus.countDocuments();

    // Demo values (replace later with real models)
    const totalPaperSettings = 45;
    const totalPaperSending = 32;

    res.json({
      totalAllowed,
      totalSyllabus,
      totalPaperSettings,
      totalPaperSending
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getDashboardStats
};