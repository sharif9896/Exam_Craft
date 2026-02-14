import React, { useState, useEffect } from "react";
import {
  ShieldCheck, UserCheck, Building2, BookOpen,
  BookText, Layers, Save, XCircle, ChevronDown, Mail,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { BACKEND_URL } from "../utils/utils";

const AddAllowedForm = ({ token }) => {
  const navigate = useNavigate();
  const { classes } = useAppContext();

  const [formData, setFormData] = useState({
    StaffId: "",
    StaffName: "",
    StaffEmail: "",
    AllowedDepartment: "",
    AllowedClass: "",
    AllowedSubject: "",
    AllowedSemester: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedStaffData = localStorage.getItem("pendingPermissionStaff");
    if (savedStaffData) {
      try {
        const staff = JSON.parse(savedStaffData);
        setFormData((prev) => ({
          ...prev,
          StaffId: staff.id || staff.StaffId || "",
          StaffName: staff.name || staff.StaffName || "",
          StaffEmail: staff.email || staff.StaffEmail || "",
          AllowedDepartment: staff.department || staff.AllowedDepartment || "",
        }));
      } catch (error) {
        console.error("Data parsing error:", error);
        toast.error("Error loading selection data.");
      }
    } else {
      toast.error("No staff member selected. Redirecting...");
      navigate(-1);
    }
  }, [navigate]);

  const semesters = ["Semester 1", "Semester 2", "Semester 3", "Semester 4"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Save Permissions to Database
      await axios.post(
        `${BACKEND_URL}/api/allowedthings/addthings`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 2. Send Email
      if (formData.StaffEmail) {
        try {
          await axios.post(
            `${BACKEND_URL}/api/notifications/send-email`,
            {
              to: formData.StaffEmail,
              subject: "New Academic Permissions Assigned",
              message: `Hello ${formData.StaffName}, you have been granted access to ${formData.AllowedSubject} for ${formData.AllowedClass}.`,
              details: formData,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (mailErr) {
          console.error("Mail Error:", mailErr);
        }
      }

      localStorage.setItem("pendingPermissionStaff", JSON.stringify(formData));

      toast.success("Permissions saved. Proceeding to Syllabus upload...", formData.StaffName);
      
      setTimeout(() => {
        window.location.href = "/admin/syllabus/add";
      }, 2500);
      
      toast.success("Permissions saved. Proceeding to Syllabus upload...", formData.StaffName);
      
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to save permissions");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    localStorage.removeItem("pendingPermissionStaff");
    navigate(-1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden m-4"
    >
      <div className="bg-emerald-600 p-6 text-white flex items-center gap-4">
        <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
          <ShieldCheck size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold">Assign Staff Permissions</h2>
          <p className="text-emerald-100 text-sm">Configuring access for <strong>{formData.StaffName}</strong></p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Staff ID</label>
            <input readOnly value={formData.StaffId} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Staff Name</label>
            <input readOnly value={formData.StaffName} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Staff Email</label>
            <input readOnly value={formData.StaffEmail} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-600 uppercase">Department</label>
            <input readOnly value={formData.AllowedDepartment} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed outline-none" />
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-600 uppercase">Class</label>
            <div className="relative">
              <select name="AllowedClass" required value={formData.AllowedClass} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none transition-all bg-white appearance-none cursor-pointer">
                <option value="">Select Class</option>
                {classes?.map((cls) => (
                  <option key={cls._id} value={cls.className}>{cls.className}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-600 uppercase">Subject</label>
            <input name="AllowedSubject" type="text" required placeholder="e.g. Mathematics" value={formData.AllowedSubject} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none bg-white" />
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-600 uppercase">Semester</label>
            <div className="relative">
              <select name="AllowedSemester" required value={formData.AllowedSemester} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none bg-white appearance-none cursor-pointer">
                <option value="">Select Sem</option>
                {semesters.map((sem) => (
                  <option key={sem} value={sem}>{sem}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
          <button type="button" onClick={handleCancel} disabled={isSubmitting} className="px-6 py-2.5 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors font-semibold text-sm">
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg font-semibold text-sm disabled:bg-emerald-400">
            <Save size={18} /> {isSubmitting ? "Processing..." : "Save & Notify Staff"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddAllowedForm;