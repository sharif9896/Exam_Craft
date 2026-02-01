import TryCatch from "../middlewares/TryCatch.js";
import Classes from "../models/Classes.js";

const addClasses = TryCatch(async (req, res) => {
    const {ClassName, ClassCode, description} = req.body;
    const {adminId} = req;
    const {dptId} = req;
        const newClasses = new Classes({
            className: ClassName,
            classCode: ClassCode,
            description,
            creatorId: adminId,
            departmentId: dptId
        });
        await newClasses.save();
        return res.status(201).json({ message: "Classes added successfully!", data: newClasses });
});

const getClasseses = TryCatch(async (req, res) => {
    const {adminId} = req;
    const Classeses = await Classes.find({creatorId: adminId});
    return res.status(200).json({ message: "Classeses fetched successfully!", data: Classeses });
});
const getClassesById = TryCatch(async (req, res) => {
    const { id } = req.params;
    const {adminId} = req;
    const ClassesItem = await Classes.findOne({ _id: id, creatorId: adminId });
    if (!ClassesItem) {
        return res.status(404).json({ message: "Classes not found" });
    }
    return res.status(200).json({ message: "Classes fetched successfully!", data: ClassesItem });
});

const updateClasses = TryCatch(async (req, res) => {
    const { id } = req.params;
    const {ClassesName, ClassesCode, description} = req.body;
    const {adminId} = req;
    const updatedClasses = await Classes.findOneAndUpdate(
        { _id: id, creatorId: adminId },
        {
            ClassesName,
            ClassesCode,
            description
        },
        { new: true }
    );
    if (!updatedClasses) {
        return res.status(404).json({ message: "Classes not found or not authorized to update" });
    }
    return res.status(200).json({ message: "Classes updated successfully!", data: updatedClasses });
});

const deleteClasses = TryCatch(async (req, res) => {
    const { id } = req.params;
    const {adminId} = req;
    const deletedClasses = await Classes.findOneAndDelete({ _id: id, creatorId: adminId });
    if (!deletedClasses) {
        return res.status(404).json({ message: "Classes not found or not authorized to delete" });
    }
    return res.status(200).json({ message: "Classes deleted successfully!" });
}); 

export { addClasses, getClasseses, getClassesById, updateClasses, deleteClasses };