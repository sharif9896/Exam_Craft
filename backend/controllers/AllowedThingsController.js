import AllowedThings from "../models/AllowedThingsmodel.js";

const AddallowedThings = async (req, res) => {
    const {adminId} = req;
    const {StaffId, StaffName, AllowedDepartment, AllowedClass, AllowedSubject, AllowedSemester} = req.body;
    try{
        if(!AllowedDepartment || !AllowedClass || !AllowedSubject || !AllowedSemester){
            return res.status(400).json({message: "All fields are required!"});
        }

        const newAllowedThing = AllowedThings({
            StaffId,
            StaffName,
            AllowedDepartment,
            AllowedClass,
            AllowedSubject,
            AllowedSemester,
            creatorId: adminId
        });
        await newAllowedThing.save();
        return res.status(200).json({message: "Allowed Things added successfully!"});
    }catch(e){
        return res.status(500).json({message: "Internal Server Error! Error in adding allowed things"});
    }
}

const GetAllowedThings = async (req, res) => {
    const {adminId} = req;
    try{
        const allowedThings = await AllowedThings.find({ creatorId: adminId });
        return res.status(200).json({message: "Allowed Things fetched successfully!", data: allowedThings});
    }catch(e){
        return res.status(500).json({message: "Internal Server Error! Error in fetching allowed things"});
    }
}

const UpdateAllowedThings = async (req, res) => {
    const {id, StaffId, StaffName, AllowedDepartment, AllowedClass, AllowedSubject, AllowedSemester} = req.body;
    const {adminId} = req;
    try{
        const updatedAllowedThing = await AllowedThings.findByIdAndUpdate({_id: id}, {creatorId: adminId}, {
            id,
            StaffId,
            StaffName,
            AllowedDepartment,
            AllowedClass,
            AllowedSubject,
            AllowedSemester,
            creatorId: adminId
        }, {new: true});
        return res.status(200).json({message: "Allowed Things updated successfully!", data: updatedAllowedThing});
    }catch(e){
        return res.status(500).json({message: "Internal Server Error! Error in updating allowed things"});
    }
}

const DeleteAllowedThings = async (req, res) => {
    const {adminId} = req;
    const {id} = req.params;
    try{
        await AllowedThings.findByIdAndDelete({id, creatorId: adminId});
        return res.status(200).json({message: "Allowed Things deleted successfully!"});
    }catch(e){
        return res.status(500).json({message: "Internal Server Error! Error in deleting allowed things"});
    }
}

export { AddallowedThings, GetAllowedThings, UpdateAllowedThings, DeleteAllowedThings };