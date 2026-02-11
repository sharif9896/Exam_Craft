import React from "react";
import { useAppContext } from "../context/AppContext";

const AddAllowed = () => {
  const {staffs} = useAppContext();

  console.log(staffs);
  return (
    <div>
      <div className="w-full min-h-screen  ">
        <div className="min-h-screen overflow-y-auto m-5 rounded-xl px-5">
          <div className="border rounded border-gray-500">
            <div className="flex justify-between items-center gap-2 px-5 text-[18px]  bg-pink-300 text-gray-700">
              <div className="">
                S.NO
              </div>
              <div className="">
                Staffs Name
              </div>
              <div className="">
                Staff's Allowed to
              </div>
            </div>
          </div>
          <div className="flex bg-gray-200 min-h-fit rounded justify-between gap-2 px-10 py-3 pr-30">
            <div className="">
              <h4>1.</h4>
            </div>
            <div className="">
              <p>Sharif Rayan</p>
            </div>
            <div className="">
              <form>
                <label htmlFor="staffs">
                  <input className="accent-gray-500 cursor-pointer" type="checkbox" name="saffs" id="staffs" />
                </label>
              </form>
            </div>
          </div>
        </div>
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
