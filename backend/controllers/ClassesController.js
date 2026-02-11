import TryCatch from "../middlewares/TryCatch.js";
import Classes from "../models/Classes.js";

const addClasses = TryCatch(async (req, res) => {
    // Standardize to camelCase to match the frontend state
    const { className, classCode, description, departmentId } = req.body;
    
    // console.log("Received data:", { className, classCode, description, departmentId });
    
    const { adminId } = req;

    const newClasses = new Classes({
        className, // Short-hand for className: className
        classCode,
        description,
        creatorId: adminId,
        departmentId: departmentId
    });

    await newClasses.save();
    return res.status(201).json({ 
        message: "Classes added successfully!", 
        data: newClasses 
    });
});

const getClasseses = TryCatch(async (req, res) => {
    const { adminId } = req;
    const classes = await Classes.find({ creatorId: adminId });
    return res.status(200).json({ message: "Classes fetched successfully!", data: classes });
});

const getClassesById = TryCatch(async (req, res) => {
    const { id } = req.params;
    const { adminId } = req;
    const ClassesItem = await Classes.findOne({ _id: id, creatorId: adminId });
    
    if (!ClassesItem) {
        return res.status(404).json({ message: "Classes not found" });
    }
    return res.status(200).json({ message: "Classes fetched successfully!", data: ClassesItem });
});

const updateClasses = TryCatch(async (req, res) => {
    const { id } = req.params;
    const { className, classCode, description } = req.body;
    const { adminId } = req;
    
    const updatedClasses = await Classes.findOneAndUpdate(
        { _id: id, creatorId: adminId },
        { className, classCode, description },
        { new: true }
    );

    if (!updatedClasses) {
        return res.status(404).json({ message: "Classes not found or not authorized to update" });
    }
    return res.status(200).json({ message: "Classes updated successfully!", data: updatedClasses });
});

const deleteClasses = TryCatch(async (req, res) => {
    const { id } = req.params;
    const { adminId } = req;
    const deletedClasses = await Classes.findOneAndDelete({ _id: id, creatorId: adminId });
    
    if (!deletedClasses) {
        return res.status(404).json({ message: "Classes not found or not authorized to delete" });
    }
    return res.status(200).json({ message: "Classes deleted successfully!" });
});

export { addClasses, getClasseses, getClassesById, updateClasses, deleteClasses };