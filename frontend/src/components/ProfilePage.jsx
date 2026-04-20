import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Cpu } from "lucide-react";
import DashboardLayout from "./DashboardLayout";
import { toast } from "react-toastify";
import { useAppContext } from '../context/AppContext';

const ProfilePage = () => {
    const {staffId, staffs} = useAppContext();
    // console.log(staffs); 
  const mmmm = {
    name: "SHARIF RAYAN",
    email: "sharifrayann952@gmail.com",
    qualification: "PhD",
    designation: "Assistant",
    specialization: "AI",
    department: "Computer Science",
    phone: "8838612520",
    address: "257/40 PC STREET PERIYAPET VANIYAMBADI",
  };

  const handleEdit = () => {
    toast.warn("You can't change this. You are not allowed to change. Contact admin.")
  };

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full"
      >
        {/* Header */}
        <div className="flex items-center gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center text-white text-3xl font-bold"
          >
            {staffs.name.charAt(0)}
          </motion.div>

          <div>
            <h1 className="text-3xl font-bold text-slate-800">{staffs.name}</h1>
            <p className="text-slate-500">{staffs.designation}</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <motion.div whileHover={{ scale: 1.03 }} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-3 text-slate-600 mb-2">
              <Mail />
              <span className="font-semibold">Email</span>
            </div>
            <p className="text-slate-700">{staffs.email}</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-3 text-slate-600 mb-2">
              <Phone />
              <span className="font-semibold">Phone</span>
            </div>
            <p className="text-slate-700">{staffs.phonenumber}</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-3 text-slate-600 mb-2">
              <GraduationCap />
              <span className="font-semibold">Qualification</span>
            </div>
            <p className="text-slate-700">{staffs.qualification}</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-3 text-slate-600 mb-2">
              <Cpu />
              <span className="font-semibold">Specialization</span>
            </div>
            <p className="text-slate-700">{staffs.spetialization}</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-3 text-slate-600 mb-2">
              <Briefcase />
              <span className="font-semibold">Department</span>
            </div>
            <p className="text-slate-700">{staffs.department}</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} className="bg-slate-50 p-4 rounded-xl border border-slate-200 md:col-span-2">
            <div className="flex items-center gap-3 text-slate-600 mb-2">
              <MapPin />
              <span className="font-semibold">Address</span>
            </div>
            <p className="text-slate-700">{staffs.address}</p>
          </motion.div>
        </div>

        {/* Footer Button */}
        <div className="mt-8 flex justify-center">
          <motion.button
            onClick={handleEdit}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2 rounded-full shadow-md"
          >
            Edit Profile
          </motion.button>
        </div>
      </motion.div>
    </div>
    </DashboardLayout>
  );
};

export default ProfilePage;