import React, { useState } from 'react';
import { 
  FileText, User, Building2, BookOpen, 
  Layers, Upload, Save, XCircle, Info,
  Type, ChevronDown, FileCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AddSyllabusForm = () => {
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

  const [dragActive, setDragActive] = useState(false);

  // Mock staff permission data - normally fetched from your 'AllowedThings' collection
  const staffPermissions = [
    { 
      id: 'staff_01', 
      name: 'Dr. Sarah Connor', 
      dept: 'Computer Science', 
      class: 'Third Year', 
      subject: 'React Development', 
      sem: 'Semester 5' 
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'staffId') {
      const selected = staffPermissions.find(s => s.id === value);
      if (selected) {
        setFormData({
          ...formData,
          staffId: value,
          staffName: selected.name,
          staffAllowedDepartment: selected.dept,
          staffAllowedClass: selected.class,
          staffAllowedSubject: selected.subject,
          staffAllowedSemester: selected.sem
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFormData({ ...formData, syllabysPDF: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Uploading Syllabus:", formData);
    // In MERN, use FormData() for file uploads via axios
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-amber-500 p-6 text-white flex items-center gap-4">
        <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
          <FileText size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold">Upload Syllabus</h2>
          <p className="text-amber-50 text-sm">Assign curriculum documents to staff members</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        {/* Section 1: Staff Linkage */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Staff Assignment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <User size={16} className="text-amber-500" /> Staff ID
              </label>
              <div className="relative">
                <select
                  name="staffId"
                  required
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all bg-slate-50/50 appearance-none cursor-pointer"
                >
                  <option value="">Select Staff Member</option>
                  {staffPermissions.map(s => <option key={s.id} value={s.id}>{s.id} - {s.name}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Department</label>
              <input readOnly value={formData.staffAllowedDepartment} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed" placeholder="Auto-filled" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Subject</label>
              <input readOnly value={formData.staffAllowedSubject} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed" placeholder="Auto-filled" />
            </div>
          </div>
        </div>

        {/* Section 2: Content Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Syllabus Details</h3>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Type size={16} className="text-amber-500" /> Syllabus Title
              </label>
              <input
                name="title"
                required
                placeholder="e.g., Q3 React Advanced Curriculum"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all bg-slate-50/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Info size={16} className="text-amber-500" /> Description
              </label>
              <textarea
                name="description"
                required
                rows="3"
                placeholder="Briefly describe the syllabus content..."
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all bg-slate-50/50 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: File Upload */}
        <div className="space-y-4">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Upload size={16} className="text-amber-500" /> PDF Document
          </label>
          <div 
            className={`relative group border-2 border-dashed rounded-3xl p-8 transition-all flex flex-col items-center justify-center gap-3 ${
              dragActive ? 'border-amber-500 bg-amber-50/50' : 'border-slate-200 bg-slate-50/30'
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => { e.preventDefault(); setDragActive(false); handleFileChange({ target: { files: e.dataTransfer.files } }); }}
          >
            <input 
              type="file" 
              accept=".pdf" 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              onChange={handleFileChange}
            />
            <div className="bg-amber-100 p-4 rounded-full text-amber-600 group-hover:scale-110 transition-transform">
              <FileCheck size={32} />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-slate-700">
                {formData.syllabysPDF ? formData.syllabysPDF.name : 'Click or Drag Syllabus PDF here'}
              </p>
              <p className="text-xs text-slate-400 mt-1">Maximum file size: 10MB</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
          <button type="button" className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-slate-500 hover:bg-slate-100 font-semibold text-sm transition-all">
            <XCircle size={18} /> Discard
          </button>
          <button type="submit" className="flex items-center gap-2 px-10 py-2.5 rounded-xl bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/20 font-semibold text-sm transition-all active:scale-95">
            <Save size={18} /> Save Syllabus
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddSyllabusForm;