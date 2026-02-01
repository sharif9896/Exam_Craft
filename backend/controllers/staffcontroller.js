import Staff from "../models/staffmodels.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const StaffRegister = async (req, res) => {
    const { adminId } = req;
    const { name, email, password, qualification, designation, spetialization, department, phonenumber, address } = req.body;
    try {
        const existingStaff = await Staff.findOne({ email });
        if (existingStaff) {
            return res.status(400).json({ message: "Staff already exists!" });
        }
        if (!name && !email && !password && !qualification && !designation && !spetialization && !department && !phonenumber && !address) {
            return res.status(400).json({ message: "All fields are required!" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const registerobj = Staff({
            name,
            email, password: hashedPassword, qualification, designation, spetialization, department, phonenumber, address, creatorId: adminId
        });
        await registerobj.save();
        return res.status(200).json({ message: "Registered Successfully!", staff: registerobj });
    } catch (err) {
        return res.status(402).json({ message: "Error in Registering the Staff Details", err });
    }
};

const stafflogin = async (req, res) => {
   const { email, password } = req.body;
      try{
          const response = await Staff.findOne({ email });
          if(!response){
              return res.status(404).json({ message: "User not found" });
          }
          const isPasswordValid = await bcrypt.compare(password, response.password);
          if(!isPasswordValid){
              return res.status(401).json({ message: "Invalid credentials" });
          }
  
          const token = jwt.sign({ id: response._id }, process.env.JWT_USER, { expiresIn: '1d' });
          const cookieOption = {
              expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
          };
          res.cookie('token', token, cookieOption);
          return res.status(200).json({ message: "Login successful", user: response, token });
  
      }   catch(err){
          return res.status(500).json({ message: "Internal Server Error! Error in login" });
      }
}

const StaffProfileById = async (req, res) => {
    const { id } = req.params;
    try {
        const staff = await Staff.findOne({ _id: id });
        if (!staff) {
            return res.status(400).json({ message: "Staff is not found!" });
        }
        return res.status(200).json({ message: "Fetched Successfully!", staff });
    } catch (e) {
        return res.status().json({ message: "Error in getting staff by his ID!" });
    }
}
const StaffProfileslists = async (req, res) => {
    const {adminId} = req;
    try {
        const staff = await Staff.find({ creatorId: adminId });
        if (staff.length === 0) {
            return res.status(400).json({ message: "Staff is not found!" });
        }
        return res.status(200).json({ message: "Fetched Successfully!", staff });
    } catch (e) {
        return res.status().json({ message: "Error in getting staff by his ID!" });
    }
}

const searchStaffByName = async (req, res) => {
    const { name } = req.params;
    try {
        const staff = await Staff.find({ name: { $regex: name, $options: 'i' } });
        if (staff.length === 0) {
            return res.status(400).json({ message: "Staff is not found!" });
        }
        return res.status(200).json({ message: "Fetched Successfully!", staff });
    } catch (e) {
        return res.status().json({ message: "Error in getting staff by his ID!" });
    }
}

const StaffProfileUpdatedById = async (req, res) => {
    const { id } = req.params;
    const {adminId} = req;
    const { name, email, password, qualification, designation, spetialization, department, phonenumber, address } = req.body;
    try {
        const updatedStaff = Staff.updateOne({ _id: id });
        if (!updatedStaff) {
            return res.status(400).json({ message: "Staff not to Update!" });
        }
        const updateObj = {
            name,
            email, password, qualification, designation, spetialization, department, phonenumber, address
        };
        const result = await Staff.updateOne({ _id: id, creatorId: adminId }, { $set: updateObj });
        if (result) {
            return res.status(200).json({ message: "Updated Successfully!" });
        } else {
            return res.status(400).json({ message: "Staff not to Update!" });
        }
    } catch (e) {
        return res.status(400).json({ message: "Error in Updating the Staff By his ID!" });
    }
}
const StaffProfileDeletById = async (req, res) => {
    const { id } = req.params;
    const {adminId} = req;
    try {
        const deletedStaff = await Staff.deleteOne({ _id: id, creatorId: adminId });
        if (deletedStaff.deletedCount === 0) {
            return res.status(400).json({ message: "Staff not to Delete!" });
        }
        return res.status(200).json({ message: "Deleted Successfully!" });
    } catch (e) {
        return res.status(400).json({ message: "Error in Deleting the Staff By his ID!" });
    }
}
const StaffsDelete = async (req, res) => {
    const {adminId} = req;
    try {
        const deletedStaffs = await Staff.deleteMany({ creatorId: adminId });
        if (deletedStaffs.deletedCount === 0) {
            return res.status(400).json({ message: "Staffs not to Delete!" });
        }
        return res.status(200).json({ message: "Deleted Successfully!" });
    } catch (e) {
        return res.status(400).json({ message: "Error in Deleting the Staffs!" });
    }
}

const StaffProfileByName = async (req, res) => {
    const { name } = req.params;
    try {
        const staff = await Staff.findOne({ name: name });
        if (!staff) {
            return res.status(400).json({ message: "Staff is not found!" });
        }
        return res.status(200).json({ message: "Fetched Successfully!", staff });
    } catch (e) {
        return res.status().json({ message: "Error in getting staff by his Name!" });
    }
}
const allowedStaffTocreateQuestionPaper = async (req, res) => {
    const { id } = req.params;
    try {
        const staff = await Staff.findOne({ _id: id });
        if (!staff) {
            return res.status(400).json({ message: "Staff is not found!" });
        }
        if (staff.designation !== "Professor" && staff.designation !== "Associate Professor") {
            return res.status(400).json({ message: "Staff is not allowed to create question papers!" });
        }
        return res.status(200).json({ message: "Staff is allowed to create question papers!", staff });
    } catch (e) {
        return res.status().json({ message: "Error in getting staff by his ID!" });
    }
}

const SendingSyllabusToAllowedStaff = async (req, res) => {
    const { id } = req.params;
    const { syllabus } = req.file;
    const { originalname, mimetype, size, path } = req.file;
    const { department } = req.params;
    const { classe } = req.params;
    const allowedDepartments = ["Computer Science", "Mechanical", "Civil", "Electrical", "Electronics"];
    const allowedClasses = ["First Year", "Second Year", "Third Year", "Fourth Year"];
    try {
        const staff = await Staff.findOne({ _id: id });
        if (!staff) {
            return res.status(400).json({ message: "Staff is not found!" });
        }
        if (!allowedDepartments.includes(department)) {
            return res.status(400).json({ message: "Department is not allowed to receive syllabus!" });
        }
        if (!allowedClasses.includes(classe)) {
            return res.status(400).json({ message: "Class is not allowed to receive syllabus!" });
        }
        // Logic to send syllabus to staff
        return res.status(200).json({ message: "Syllabus sent successfully to the staff!", staff });
    } catch (e) {
        return res.status().json({ message: "Error in sending syllabus to staff!" });
    }
}

export { StaffRegister, StaffProfileById, StaffsDelete, stafflogin, StaffProfileslists, StaffProfileUpdatedById, StaffProfileDeletById, searchStaffByName };