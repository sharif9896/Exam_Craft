import React, { useState } from 'react';
import { Building2, Save, XCircle, Info, Calendar, Hash } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { BACKEND_URL } from '../utils/utils';
import { toast } from 'react-toastify';

const AddDepartmentForm = ({token}) => {
  const [formData, setFormData] = useState({
    academicYear: '',
    departmentName: '',
    departmentCode: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Department Data:", formData);

    const {data} = await axios.post(`${BACKEND_URL}/api/departments/addepartment`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    toast.success(data.message);
    console.log(data.message);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-2 border-dashed border-slate-200 rounded-3xl h-fit p-6 items-center justify-center text-slate-400"
    >
      <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
        <div className="bg-blue-100 p-2 rounded-xl text-blue-600">
          <Building2 size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Add New Department</h2>
          <p className="text-sm text-slate-500">Register a new academic department in the system</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Horizontal Input Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Academic Year */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Calendar size={16} className="text-slate-400" />
              Academic Year
            </label>
            <input
              type="text"
              name="academicYear"
              placeholder="e.g. 2025-2026"
              required
              value={formData.academicYear}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-slate-50/50"
            />
          </div>

          {/* Department Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Building2 size={16} className="text-slate-400" />
              Department Name
            </label>
            <input
              type="text"
              name="departmentName"
              placeholder="Computer Science"
              required
              value={formData.departmentName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-slate-50/50"
            />
          </div>

          {/* Department Code */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Hash size={16} className="text-slate-400" />
              Department Code
            </label>
            <input
              type="text"
              name="departmentCode"
              placeholder="CS101"
              required
              value={formData.departmentCode}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-slate-50/50"
            />
          </div>
        </div>

        {/* Description - Full Width */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Info size={16} className="text-slate-400" />
            Description
          </label>
          <textarea
            name="description"
            placeholder="Briefly describe the department's purpose..."
            rows="3"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-slate-50/50 resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors font-medium"
          >
            <XCircle size={18} />
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all font-medium active:scale-95"
          >
            <Save size={18} />
            Save Department
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddDepartmentForm;