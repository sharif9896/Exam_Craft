import TryCatch from "../middlewares/TryCatch.js";
import Department from "../models/departments.js";

const addepartment = TryCatch(async (req, res) => {
    const {academicYear, departmentName, departmentCode, description} = req.body;
    const {adminid} = req;
        const newDepartment = new Department({
            academicYear,
            departmentName,
            departmentCode,
            description,
            creatorId: adminid
        });
        await newDepartment.save();
        return res.status(201).json({ message: "Department added successfully!", data: newDepartment });
});

const getDepartments = TryCatch(async (req, res) => {
    const {adminid} = req;
    const departments = await Department.find({creatorId: adminid});
    return res.status(200).json({ message: "Departments fetched successfully!", data: departments });
});

const getDepartmentById = TryCatch(async (req, res) => {
    const { id } = req.params;
    const {adminid} = req;
    const department = await Department.findOne({ _id: id, creatorId: adminid });
    if (!department) {
        return res.status(404).json({ message: "Department not found" });
    }
    return res.status(200).json({ message: "Department fetched successfully!", data: department });
});

const updateDepartment = TryCatch(async (req, res) => {
    const { id } = req.params;
    const {academicYear, departmentName, departmentCode, description} = req.body;
    const {adminid} = req;
    const updatedDepartment = await Department.findOneAndUpdate(
        { _id: id, creatorId: adminid },
        {
            academicYear,
            departmentName,
            departmentCode,
            description,
            creatorId: adminid
        },
        { new: true }
    );
    if (!updatedDepartment) {
        return res.status(404).json({ message: "Department not found or not authorized to update" });
    }
    return res.status(200).json({ message: "Department updated successfully!", data: updatedDepartment });
});

const deleteDepartment = TryCatch(async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    const {adminid} = req;
    const deletedDepartment = await Department.findOneAndDelete({ _id: id, creatorId: adminid });
    if (!deletedDepartment) {
        return res.status(404).json({ message: "Department not found or not authorized to delete" });
    }
    return res.status(200).json({ message: "Department deleted successfully!" });
});

const searchByDepartName = TryCatch(async (req, res) => {
    const { departmentName } = req.query;
    const {adminId} = req;
    const departments = await Department.find({ 
        departmentName: { $regex: departmentName, $options: 'i' },
        creatorId: adminId
    });
    if (departments.length === 0) {
        return res.status(404).json({ message: "No departments found matching the search criteria" });
    }
    return res.status(200).json({ message: "Departments fetched successfully!", data: departments });
}
);

export {addepartment, getDepartments, getDepartmentById, updateDepartment, deleteDepartment, searchByDepartName};