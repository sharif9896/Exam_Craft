import React, { useState, useEffect } from 'react';
import { 
  FileText, Upload, Save, Info, Type, FileCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../utils/utils";

const AddSyllabus = ({ token }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const [formData, setFormData] = useState({
    staffId: '',
    staffName: '',
    staffAllowedDepartment: '',
    staffAllowedClass: '',
    staffAllowedSubject: '',
    staffAllowedSemester: '',
    title: '',
    description: '',
    syllabysPDF: null
  });

  useEffect(() => {
    const savedData = localStorage.getItem("pendingPermissionStaff");
    if (savedData) {
      try {
        const staff = JSON.parse(savedData);
        setFormData((prev) => ({
          ...prev,
          staffId: staff.StaffId || "",
          staffName: staff.StaffName || "",
          staffAllowedDepartment: staff.AllowedDepartment || "",
          staffAllowedClass: staff.AllowedClass || "",
          staffAllowedSubject: staff.AllowedSubject || "",
          staffAllowedSemester: staff.AllowedSemester || "",
        }));
      } catch (error) {
        console.error("Error loading staff data", error);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData({ ...formData, syllabysPDF: file });
    } else {
      toast.error("Please upload a valid PDF file");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validate Token exists
    if (!token) {
      return toast.error("Authentication session expired. Please log in again.");
    }

    if (!formData.syllabysPDF) return toast.error("Please upload a PDF");
    
    setIsSubmitting(true);

    const data = new FormData();
    data.append("staffId", formData.staffId);
    data.append("staffName", formData.staffName);
    data.append("staffAllowedDepartment", formData.staffAllowedDepartment);
    data.append("staffAllowedClass", formData.staffAllowedClass);
    data.append("staffAllowedSubject", formData.staffAllowedSubject);
    data.append("staffAllowedSemester", formData.staffAllowedSemester);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("syllabusFile", formData.syllabysPDF); 

    try {
      await axios.post(`${BACKEND_URL}/api/syllabus/addsyllabus`, data, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });

      toast.success("Syllabus Saved Successfully!");
      localStorage.removeItem("pendingPermissionStaff");
      
      setTimeout(() => {
        window.location.href = "/admin/syllabus/manage";
      }, 1500);
    } catch (err) {
      // Improved error logging
      const errorMsg = err.response?.data?.message || "Failed to save syllabus";
      toast.error(errorMsg);
      if (err.response?.status === 401) {
        console.error("Auth Error Detail:", err.response.data);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="shadow-sm border-2 border-slate-400 rounded-lg border-dashed bg-white overflow-hidden m-4"
    >
      <div className="p-6 text-gray-700 flex items-center gap-4 border border-gray-400 rounded">
        <div className="bg-white/20 p-3 border border-slate-500 border-dashed rounded-2xl">
          <FileText size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold">Upload Syllabus</h2>
          <p className="text-gray-800 text-sm">Confirming details for {formData.staffName || "Staff"}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b pb-2">Staff Assignment (Verified)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Staff ID</label>
              <input readOnly value={formData.staffId} className="w-full px-4 py-2 rounded-lg bg-slate-100 border text-slate-500 outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Department</label>
              <input readOnly value={formData.staffAllowedDepartment} className="w-full px-4 py-2 rounded-lg bg-slate-100 border text-slate-500 outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Subject</label>
              <input readOnly value={formData.staffAllowedSubject} className="w-full px-4 py-2 rounded-lg bg-slate-100 border text-slate-500 outline-none" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b pb-2">Syllabus Content</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2"><Type size={16} className="text-amber-500" /> Title</label>
              <input name="title" required value={formData.title} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 outline-none" placeholder="Enter syllabus title..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2"><Info size={16} className="text-amber-500" /> Description</label>
              <textarea name="description" required rows="3" value={formData.description} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 outline-none resize-none" placeholder="Enter details..." />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-semibold flex items-center gap-2"><Upload size={16} className="text-amber-500" /> PDF Document</label>
          <div 
            className={`relative border-2 border-dashed rounded-3xl p-8 transition-all flex flex-col items-center justify-center gap-3 ${dragActive ? 'border-amber-500 bg-amber-50' : 'border-slate-200 bg-slate-50'}`}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => { e.preventDefault(); setDragActive(false); handleFileChange({ target: { files: e.dataTransfer.files } }); }}
          >
            <input type="file" accept=".pdf" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
            <div className="bg-amber-100 p-4 rounded-full text-amber-600"><FileCheck size={32} /></div>
            <p className="text-sm font-bold text-slate-700">{formData.syllabysPDF ? formData.syllabysPDF.name : 'Click or Drag PDF here'}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-6 border-t">
          <button type="button" onClick={() => navigate(-1)} className="px-6 py-2.5 rounded-xl text-slate-500 hover:bg-slate-100 font-semibold text-sm">Discard</button>
          <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-10 py-2.5 rounded-xl bg-amber-500 text-white hover:bg-amber-600 shadow-lg font-semibold text-sm active:scale-95 disabled:bg-slate-300">
            <Save size={18} /> {isSubmitting ? "Uploading..." : "Save Syllabus"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddSyllabus;