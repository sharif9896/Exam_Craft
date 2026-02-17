import Syllabus from "../models/Syllabusmodel.js";

const addsyllabus = async (req, res) => {
    const {
        staffId, // Added this
        staffName, 
        staffAllowedDepartment, 
        staffAllowedClass, 
        staffAllowedSubject, 
        staffAllowedSemester, 
        title, 
        description,
    } = req.body;

    const file = req.file;
    const { adminid } = req;

    try {
        if (!staffId || !staffName || !staffAllowedDepartment || !staffAllowedClass || !title || !description) {
            return res.status(400).json({ message: "Required fields are missing!" });
        }

        if (!file) {
            return res.status(400).json({ message: "Syllabus PDF file is required!" });
        }

        const newSyllabus = new Syllabus({
            staffId,
            staffName,
            staffAllowedDepartment,
            staffAllowedClass,
            staffAllowedSubject,
            staffAllowedSemester,
            title,
            description,
            syllabysPDF: file.path,
            creatorId: adminid
        });

        await newSyllabus.save();

        return res.status(201).json({ 
            message: "Syllabus added successfully!", 
            data: newSyllabus 
        });

    } catch (e) {
        console.error("Database Error:", e);
        return res.status(500).json({ 
            message: "Internal Server Error! Error in adding syllabus",
            error: e.message 
        });
    }
};


const getSyllabus = async (req, res) => {

    // const { UserId } = req;
    const { adminId } = req;
    try {
        const syllabus = await Syllabus.find({ creatorId: adminId });
        return res.status(200).json({ message: "Syllabus fetched successfully!", data: syllabus });
    } catch (e) {
        return res.status(500).json({ message: "Internal Server Error! Error in fetching syllabus" });
    }   
}

const getSyllabusById = async (req, res) => {
    const { id } = req.params;
    const { UserId } = req;
    const { adminId } = req;
    try {
        const syllabus = await Syllabus.findById({_id: id, $or: [{ staffId: UserId }, { creatorId: adminId }]});
        if (!syllabus) {
            return res.status(404).json({ message: "Syllabus not found" });
        }
        return res.status(200).json({ message: "Syllabus fetched successfully!", data: syllabus });
    } catch (e) {
        return res.status(500).json({ message: "Internal Server Error! Error in fetching syllabus by ID" });
    }
}

const updateSyllabus = async (req, res) => {
    const {
        staffName, 
        staffAllowedDepartment, 
        staffAllowedClass, 
        staffAllowedSubject, 
        staffAllowedSemester, 
        title, 
        description,
    } = req.body;
    const file = req.file;
    const {UserId} = req;
    const { id } = req.params;
    const {adminId} = req;
    try {   
        const updatedSyllabus = await Syllabus.findByIdAndUpdate(id, {creatorId: adminId}, {
            staffId: UserId,
            staffName,
            staffAllowedDepartment,
            staffAllowedClass,
            staffAllowedSubject,
            staffAllowedSemester,
            title,
            description,
            syllabysPDF: file.path,
            creatorId: adminId
        }, { new: true });
        return res.status(200).json({ message: "Syllabus updated successfully!", data: updatedSyllabus });
    } catch (e) {
        return res.status(500).json({ message: "Internal Server Error! Error in updating syllabus" });
    }
}
const deleteSyllabus = async (req, res) => {
    const { id } = req.params;
    const {adminId} = req; 
    try {
        await Syllabus.findByIdAndDelete({id, creatorId: adminId});
        return res.status(200).json({ message: "Syllabus deleted successfully!" });
    }
    catch (e) {
        return res.status(500).json({ message: "Internal Server Error! Error in deleting syllabus" });
    }
}

const deleteSyllabusById = async (req, res) => {
    const {adminId} = req;
    try {
        await Syllabus.deleteMany({creatorId: adminId});
        return res.status(200).json({ message: "Syllabus deleted successfully!" });
    }
    catch (e) {
        return res.status(500).json({ message: "Internal Server Error! Error in deleting syllabus by ID" });
    }
}

export { addsyllabus, getSyllabus, getSyllabusById, updateSyllabus, deleteSyllabus, deleteSyllabusById };