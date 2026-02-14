import React, { useState, useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { User, Search, Filter } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const AddAllowed = () => {
  const { staffs } = useAppContext();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedStaffIds, setSelectedStaffIds] = useState([]);

  // Extract unique departments for the filter dropdown
  const departments = useMemo(() => {
    const depts = staffs.map((s) => s.department).filter(Boolean);
    return [...new Set(depts)];
  }, [staffs]);

  // Search and Filter logic
  const filteredStaffs = useMemo(() => {
    return staffs.filter((staff) => {
      const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = selectedDept === "" || staff.department === selectedDept;
      return matchesSearch && matchesDept;
    });
  }, [staffs, searchTerm, selectedDept]);

  const handleCheckboxChange = (id) => {
    setSelectedStaffIds((prev) =>
      prev.includes(id) ? prev.filter((staffId) => staffId !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedDept("");
    setSelectedStaffIds([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // VALIDATION
    if (selectedStaffIds.length === 0) {
      return toast.warn("Please select a staff member first.");
    }

    if (selectedStaffIds.length > 1) {
      return toast.error("Please select only ONE staff member for individual updates.");
    }

    // Find the specific staff object to get full details
    const staffToUpdate = staffs.find((s) => s._id === selectedStaffIds[0]);

    if (staffToUpdate) {
      // 1. Store the ID, Name, and Department in localStorage
      localStorage.setItem(
        "pendingPermissionStaff",
        JSON.stringify({
          id: staffToUpdate._id,
          name: staffToUpdate.name,
          department: staffToUpdate.department,
          email: staffToUpdate.email,
        })
      );

      // 2. Navigate to the form page
      navigate("/add-permissions-form");
    }
  };

  return (
    <div className="p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full min-h-screen border-2 border-slate-400 rounded-lg border-dashed bg-white">
        <div className="p-6 text-gray-700 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white border border-dashed border-gray-300 p-3 rounded-2xl">
              <User size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Allowed Staffs Individually!</h2>
              <p className="text-slate-400 text-sm">Manage staff organization access</p>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="px-10 py-4 flex flex-wrap gap-4 bg-slate-50 border-y border-slate-200">
          <div className="relative flex-1 min-w-50">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search staff name..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative min-w-50">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select
              className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none appearance-none bg-white focus:ring-2 focus:ring-blue-300"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="min-h-100 overflow-y-auto m-5 rounded-xl px-5">
            <div className="border rounded border-gray-400 overflow-hidden">
              <div className="grid grid-cols-[10%_60%_30%] gap-2 px-5 py-3 text-[16px] font-bold bg-blue-300 text-slate-600">
                <div>S.NO</div>
                <div>Staff Name / Department</div>
                <div className="text-center">Allowed Access</div>
              </div>

              {filteredStaffs.length > 0 ? (
                filteredStaffs.map((item, index) => (
                  <div
                    key={item._id}
                    className={`grid grid-cols-[10%_60%_30%] items-center gap-2 px-5 py-3 border-t border-gray-200 ${
                      selectedStaffIds.includes(item._id) ? "bg-blue-50" : "bg-gray-50"
                    }`}
                  >
                    <div className="font-medium text-gray-600">{index + 1}</div>
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.department} | {item.designation}</p>
                    </div>
                    <div className="flex justify-center">
                      <input
                        type="checkbox"
                        className="w-5 h-5 accent-green-600 cursor-pointer"
                        checked={selectedStaffIds.includes(item._id)}
                        onChange={() => handleCheckboxChange(item._id)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-10 text-center text-gray-400">No staff found matching those filters.</div>
              )}
            </div>

            <div className="flex gap-3 mt-6 pb-10">
              <button
                type="button"
                onClick={handleReset}
                className="py-2 px-6 rounded-lg bg-gray-200 cursor-pointer hover:bg-gray-300 transition-colors text-gray-700 font-semibold"
              >
                Reset Filters
              </button>
              <button
                type="submit"
                className="py-2 px-8 rounded-lg bg-gray-600 hover:bg-gray-700 cursor-pointer transition-colors text-white font-semibold shadow-md"
              >
                Update Permissions ({selectedStaffIds.length})
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAllowed;

// import React, { useState } from "react";
// import {
//   ShieldCheck,
//   UserCheck,
//   Building2,
//   BookOpen,
//   BookText,
//   Layers,
//   Save,
//   XCircle,
//   ChevronDown,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { useAppContext } from "../context/AppContext";

// const AddAllowed = () => {
//   const [formData, setFormData] = useState({
//     StaffId: "",
//     StaffName: "",
//     AllowedDepartment: "",
//     AllowedClass: "",
//     AllowedSubject: "",
//     AllowedSemester: "",
//   });

//   const { department, setdepartment } = useAppContext();

//   // Mock Data - In production, these would be fetched from your respective collections
//   const staffList = [
//     { id: "S101", name: "Dr. Jane Smith" },
//     { id: "S102", name: "Prof. Mark Johnson" },
//   ];

//   const departments = ["Computer Science", "Mechanical Engineering", "Physics"];
//   const classes = ["First Year", "Second Year", "Third Year", "Final Year"];
//   const semesters = ["Semester 1", "Semester 2", "Semester 3", "Semester 4"];

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Auto-fill StaffName if StaffId is selected (common UX pattern)
//     if (name === "StaffId") {
//       const selectedStaff = staffList.find((s) => s.id === value);
//       setFormData({
//         ...formData,
//         StaffId: value,
//         StaffName: selectedStaff ? selectedStaff.name : "",
//       });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Submitting Permissions:", formData);
//     // axios.post('/api/allowed-things', formData)
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
//     >
//       {/* Form Header */}
//       <div className="bg-emerald-600 p-6 text-white flex items-center gap-4">
//         <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
//           <ShieldCheck size={24} />
//         </div>
//         <div>
//           <h2 className="text-xl font-bold">Assign Staff Permissions</h2>
//           <p className="text-emerald-100 text-sm">
//             Grant access to specific departments, classes, and subjects
//           </p>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="p-8 space-y-8">
//         {/* Row 1: Staff Info */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
//           <div className="space-y-2">
//             <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
//               <UserCheck size={16} className="text-emerald-500" /> Select Staff
//               ID
//             </label>
//             <div className="relative">
//               <select
//                 name="StaffId"
//                 required
//                 value={formData.StaffId}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all bg-white appearance-none cursor-pointer"
//               >
//                 <option value="">Select Staff Member</option>
//                 {staffList.map((staff) => (
//                   <option key={staff.id} value={staff.id}>
//                     {staff.id} - {staff.name}
//                   </option>
//                 ))}
//               </select>
//               <ChevronDown
//                 size={16}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
//               <UserCheck size={16} className="text-emerald-500" /> Staff Name
//             </label>
//             <input
//               name="StaffName"
//               type="text"
//               readOnly
//               placeholder="Auto-filled from ID"
//               value={formData.StaffName}
//               className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 outline-none cursor-not-allowed"
//             />
//           </div>
//         </div>

//         {/* Row 2: Access Configuration */}
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           {/* Department */}
//           <div className="space-y-2">
//             <label className="text-[13px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
//               <Building2 size={14} className="text-emerald-500" /> Department
//             </label>
//             <div className="relative">
//               <select
//                 name="AllowedDepartment"
//                 required
//                 value={formData.AllowedDepartment}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all bg-slate-50/50 appearance-none cursor-pointer"
//               >
//                 <option value="">Select Dept</option>
//                 {department.map((dept) => (
//                   <option key={dept._id} value={dept._id}>
//                     {dept.departmentName}
//                   </option>
//                 ))}
//               </select>
//               <ChevronDown
//                 size={14}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
//               />
//             </div>
//           </div>

//           {/* Class */}
//           <div className="space-y-2">
//             <label className="text-[13px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
//               <BookOpen size={14} className="text-emerald-500" /> Class
//             </label>
//             <div className="relative">
//               <select
//                 name="AllowedClass"
//                 required
//                 value={formData.AllowedClass}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all bg-slate-50/50 appearance-none cursor-pointer"
//               >
//                 <option value="">Select Class</option>
//                 {classes.map((cls) => (
//                   <option key={cls} value={cls}>
//                     {cls}
//                   </option>
//                 ))}
//               </select>
//               <ChevronDown
//                 size={14}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
//               />
//             </div>
//           </div>

//           {/* Subject */}
//           <div className="space-y-2">
//             <label className="text-[13px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
//               <BookText size={14} className="text-emerald-500" /> Subject
//             </label>
//             <input
//               name="AllowedSubject"
//               type="text"
//               required
//               placeholder="e.g. Mathematics"
//               value={formData.AllowedSubject}
//               onChange={handleChange}
//               className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all bg-slate-50/50 placeholder:text-slate-400"
//             />
//           </div>

//           {/* Semester */}
//           <div className="space-y-2">
//             <label className="text-[13px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
//               <Layers size={14} className="text-emerald-500" /> Semester
//             </label>
//             <div className="relative">
//               <select
//                 name="AllowedSemester"
//                 required
//                 value={formData.AllowedSemester}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all bg-slate-50/50 appearance-none cursor-pointer"
//               >
//                 <option value="">Select Sem</option>
//                 {semesters.map((sem) => (
//                   <option key={sem} value={sem}>
//                     {sem}
//                   </option>
//                 ))}
//               </select>
//               <ChevronDown
//                 size={14}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Form Actions */}
//         <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
//           <button
//             type="button"
//             className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors font-semibold text-sm"
//           >
//             <XCircle size={18} /> Cancel
//           </button>
//           <button
//             type="submit"
//             className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all font-semibold text-sm active:scale-95"
//           >
//             <Save size={18} /> Save Permissions
//           </button>
//         </div>
//       </form>
//     </motion.div>
//   );
// };

// export default AddAllowed;
