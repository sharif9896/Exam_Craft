import React from "react";
import { motion } from "framer-motion";
import { User, BookOpen, Building, Layers, Calendar } from "lucide-react";
import DashboardLayout from "./DashboardLayout";
import { toast } from 'react-toastify';
import { useAppContext } from '../context/AppContext';
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/utils";

const staffDatas = {
  _id: "6973d1012cc8fe105981c852",
  StaffId: "6973caeadab5fafad0402d35",
  StaffName: "Nawaz",
  AllowedDepartment: "Computer Science",
  AllowedClass: "II Year",
  AllowedSubject: "DBMS",
  AllowedSemester: "5",
  createdAt: "2026-01-23T19:50:25.022+00:00",
};

export default function StaffAccessCard() {
const {staffId, staffs} = useAppContext();
const [staffData, setStaffData] = useState([]);
    // console.log(staffId)
    useEffect(() => {   
        const fetch = async () => {
            if (!staffId) {
            toast.error("No staff member selected. Redirecting...");
        }
        try{
            const {data} = await axios.get(`${BACKEND_URL}/api/allowedthings/getsaffthing/${staffId}`);
            // console.log(data);
            setStaffData(data.data);
        }catch(e){
            toast.error("Error fetching staff access data. Please try again.");
            console.log(e)
        }
        }
        fetch();
    }, [])

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-slate-100 flex items-center justify-center gap-5 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        {/* Card */}
        <div className="rounded-2xl shadow-xl border border-slate-200 bg-white">
          <div className="p-6 space-y-5">

            {/* Header */}
            <div className="flex items-center gap-4">
              <div className="bg-slate-200 p-3 rounded-full">
                <User className="text-slate-700" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-800">
                  {staffData.StaffName}
                </h2>
                <p className="text-sm text-slate-500">Staff ID: {staffData.StaffId}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-200" />

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 text-sm">

              <InfoItem icon={<Building size={16} />} label="Department" value={staffData.AllowedDepartment} />
              <InfoItem icon={<Layers size={16} />} label="Class" value={staffData.AllowedClass} />
              <InfoItem icon={<BookOpen size={16} />} label="Subject" value={staffData.AllowedSubject} />
              <InfoItem icon={<Calendar size={16} />} label="Semester" value={staffData.AllowedSemester} />

            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4">
              <span className="px-3 py-1 text-sm bg-slate-800 text-white rounded-full">
                Active Access
              </span>

              <button
                onClick={() => toast.warn("You are not allowed to edit. Contact admin.")}
                className="border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-100 transition"
              >
                Edit
              </button>
            </div>

            {/* Date */}
            <p className="text-xs text-slate-400 text-center pt-2">
              Created: {new Date(staffData.createdAt).toLocaleString()}
            </p>

          </div>
        </div>

      </motion.div>
    </div>
    </DashboardLayout>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-col gap-1"
    >
      <div className="flex items-center gap-2 text-slate-500">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <p className="font-medium text-slate-800">{value}</p>
    </motion.div>
  );
}
