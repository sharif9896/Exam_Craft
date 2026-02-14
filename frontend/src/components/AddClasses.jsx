import React, { useState } from 'react';
import { 
  BookOpen, Hash, Info, Building, 
  Save, XCircle, ChevronDown 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { BACKEND_URL } from '../utils/utils';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddClasses = ({ token }) => {
  const { user, department } = useAppContext();

  const [formData, setFormData] = useState({
    className: '',
    classCode: '',
    description: '',
    departmentId: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/classes/addclass`, formData, {
        headers: {
          Authorization: `Bearer ${token}` // This is where req.adminId comes from!
        }
      });

      toast.success(data.message || "Class added!");
      
      // Clear the form fields but keep the structure
      setFormData({
        className: '',
        classCode: '',
        description: '',
        departmentId: '',
        creatorId: user._id // Keep this for consistency if needed
      });
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Internal Server Error";
      toast.error(errorMsg);
    }
};


  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white border-2 border-dashed border-slate-200 rounded-3xl h-fit p-6 items-center justify-center text-slate-400"
    >
      <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-5">
        <div className="bg-indigo-100 p-3 rounded-2xl text-indigo-600 shadow-sm">
          <BookOpen size={26} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Create New Class</h2>
          <p className="text-slate-500 text-sm">Define a new class and assign it to a department</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="flex flex-col gap-2.5">
            <label className="text-[13px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
              <BookOpen size={14} className="text-indigo-400" />
              Class Name
            </label>
            <input
              type="text"
              name="className"
              placeholder="e.g. Advanced React"
              required
              value={formData.className}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all bg-slate-50/30"
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="text-[13px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
              <Hash size={14} className="text-indigo-400" />
              Class Code
            </label>
            <input
              type="text"
              name="classCode"
              placeholder="e.g. CS-202"
              required
              value={formData.classCode}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all bg-slate-50/30"
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="text-[13px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
              <Building size={14} className="text-indigo-400" />
              Department
            </label>
            <div className="relative">
              <select
                name="departmentId"
                required
                value={formData.departmentId}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all bg-slate-50/30 appearance-none text-slate-700 cursor-pointer"
              >
                <option value="">Select Department</option>
                {department && department.map(dept => (
                  <option key={dept._id} value={dept._id}>{dept.departmentName}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
            <Info size={14} className="text-indigo-400" />
            Class Description
          </label>
          <textarea
            name="description"
            placeholder="Details about syllabus..."
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all bg-slate-50/30 resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setFormData({className: '', classCode: '', description: '', departmentId: '', creatorId: user._id})}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-slate-500 hover:bg-slate-100 transition-all font-semibold text-sm"
          >
            <XCircle size={18} />
            Discard
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-10 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/25 transition-all font-semibold text-sm active:scale-95"
          >
            <Save size={18} />
            Create Class
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddClasses;