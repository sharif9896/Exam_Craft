import React from "react";
import { motion } from "framer-motion";
import { User, BookOpen, Building, Layers, Calendar, FileText, Download } from "lucide-react";
import DashboardLayout from "./DashboardLayout";
import { toast } from 'react-toastify';
import { useAppContext } from '../context/AppContext';
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/utils";

const assignmentDatas = {
  _id: "69a86d2c762f2bf4cc16cfd3",
  staffId: "6982f491b438f1517890619b",
  staffName: "SHARIF RAYAN",
  staffAllowedDepartment: "Computer Science",
  staffAllowedClass: "I Year",
  staffAllowedSubject: "DBMS",
  staffAllowedSemester: "Semester 1",
  title: "Assignment",
  description: "Sending a Demo Staff Assignment",
  syllabysPDF: "uploads/1772645676362-SHARIF RAYANS_Full_Stack_Engineer.pdf",
  createdAt: "2026-03-04T17:34:36.370+00:00",
};

export default function AssignmentCard() {

    const {staffId, staffs} = useAppContext();
    const [assignmentData, setStaffData] = useState([]);
        // console.log(staffId)
        useEffect(() => {   
            const fetch = async () => {
                if (!staffId) {
                toast.error("No staff member selected. Redirecting...");
            }
            try{
                const {data} = await axios.get(`${BACKEND_URL}/api/syllabus/staffget/${staffId}`);
                console.log(data);
                setStaffData(data.data);
            }catch(e){
                toast.error("Error fetching staff access data. Please try again.");
                console.log(e)
            }
            }
            fetch();
        }, [])

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `http://localhost:3095/${assignmentData.syllabysPDF}`; // change base URL if needed
    link.download = "Assignment.pdf";
    link.click();
  };

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <div className="rounded-2xl shadow-xl border border-slate-200 bg-white">
          <div className="p-6 space-y-5">

            {/* Header */}
            <div className="flex items-center gap-4">
              <div className="bg-slate-200 p-3 rounded-full">
                <User className="text-slate-700" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-800">
                  {assignmentData.staffName}
                </h2>
                <p className="text-sm text-slate-500">Staff ID: {assignmentData.staffId}</p>
              </div>
            </div>

            {/* Title */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                <FileText size={18} /> {assignmentData.title}
              </h3>
              <p className="text-sm text-slate-500 mt-1">{assignmentData.description}</p>
            </motion.div>

            {/* Divider */}
            <div className="border-t border-slate-200" />

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <InfoItem icon={<Building size={16} />} label="Department" value={assignmentData.staffAllowedDepartment} />
              <InfoItem icon={<Layers size={16} />} label="Class" value={assignmentData.staffAllowedClass} />
              <InfoItem icon={<BookOpen size={16} />} label="Subject" value={assignmentData.staffAllowedSubject} />
              <InfoItem icon={<Calendar size={16} />} label="Semester" value={assignmentData.staffAllowedSemester} />
            </div>

            {/* Download Section */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <FileText className="text-slate-600" />
                <span className="text-sm text-slate-700">Syllabus PDF</span>
              </div>
              <button
                onClick={handleDownload}
                target="_blank"
                className="flex items-center gap-2 bg-slate-800 text-white px-3 py-2 rounded-lg hover:bg-slate-700 transition"
              >
                <Download size={16} /> Download
              </button>
            </motion.div>

            {/* Footer */}
            <p className="text-xs text-slate-400 text-center pt-2">
              Created: {new Date(assignmentData.createdAt).toLocaleString()}
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
