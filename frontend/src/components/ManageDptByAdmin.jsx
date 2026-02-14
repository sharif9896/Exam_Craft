import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusCircle, 
  Trash2, 
  Edit3, 
  School, 
  Calendar, 
  Hash, 
  Save,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';
import { BACKEND_URL } from '../utils/utils';
import { toast } from 'react-toastify'; // Recommended for feedback

const ManageDptByAdmin = ({ token }) => {
  const { department, user } = useAppContext();
  const [selectedDept, setSelectedDept] = useState(null);
  const [loading, setLoading] = useState(false);

  // Auto-select first department when data loads or component mounts
  useEffect(() => {
    if (department && department.length > 0 && !selectedDept) {
      setSelectedDept(department[0]);
    }
  }, [department]);

  const handledelete = async (id) => {
    try{
      const {data} = await axios.delete(`${BACKEND_URL}/api/departments/deletedepartment/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      window.location.reload();
      toast.success("Department Deleted Successfully");
    }catch(e){
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDept?._id) return;

    setLoading(true);
    try {
      const updatedData = {
        academicYear: selectedDept.academicYear,
        departmentName: selectedDept.departmentName,
        departmentCode: selectedDept.departmentCode,
        description: selectedDept.description,
        creatorId: user?._id
      };

      const { data } = await axios.put(
        `${BACKEND_URL}/api/departments/updatedepartment/${selectedDept._id}`, 
        updatedData, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // console.log(data);
       toast.success("Department updated successfully!");
       
      if (data.success) {
        toast.success("Department updated successfully!");
        // Optional: Refresh your context data here if needed
      }
    } catch (err) {
      console.error("Update failed:", err);
      toast.error(err.response?.data?.message || "Failed to update department");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border-2 border-slate-100 rounded-3xl h-full p-6 text-slate-600 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <School className="text-indigo-500" size={24} />
        <h1 className="text-xl font-bold text-slate-800">Manage Departments</h1>
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-6">
        
        {/* LEFT: Edit/Form Section */}
        <div className="border border-slate-200 w-full lg:w-1/2 p-5 rounded-2xl bg-slate-50/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold flex items-center gap-2 text-slate-700">
              <Edit3 size={18} /> {selectedDept ? `Editing: ${selectedDept.departmentName}` : "Select a Department"}
            </h2>
            <Link 
              to='/admin/departments/add'
              className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <PlusCircle size={14} /> New Department
            </Link>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wider">Department Name</label>
              <input 
                type="text" 
                required
                value={selectedDept?.departmentName || ""}
                className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white transition-all"
                onChange={(e) => setSelectedDept({...selectedDept, departmentName: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wider">Code</label>
                <input 
                  type="text" 
                  required
                  value={selectedDept?.departmentCode || ""}
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                  onChange={(e) => setSelectedDept({...selectedDept, departmentCode: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wider">Academic Year</label>
                <input 
                  type="text" 
                  required
                  value={selectedDept?.academicYear || ""}
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                  onChange={(e) => setSelectedDept({...selectedDept, academicYear: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wider">Description</label>
              <textarea 
                rows="3"
                value={selectedDept?.description || ""}
                className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                onChange={(e) => setSelectedDept({...selectedDept, description: e.target.value})}
              />
            </div>

            <button 
              type='submit' 
              disabled={loading || !selectedDept}
              className="cursor-pointer w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-100 mt-2"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              {selectedDept ? "Update Department" : "Save Changes"}
            </button>
          </form>
        </div>

        {/* RIGHT: List Section */}
        <div className="border border-slate-200 w-full lg:w-1/2 p-5 rounded-2xl bg-white max-h-125 overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-4  bg-white pb-2 z-10">
            <h2 className="font-semibold flex items-center gap-2 text-slate-700">
              <Hash size={18} /> Departments ({department?.length || 0})
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {department?.map((dept, index) => (
                <motion.div
                  key={dept._id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    selectedDept?._id === dept._id 
                    ? "border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500" 
                    : "border-slate-100 bg-slate-50 hover:border-slate-300 hover:bg-slate-100"
                  }`}
                  onClick={() => setSelectedDept(dept)}
                >
                  <div className="flex-1">
                    <h3 className={`font-bold transition-colors ${selectedDept?._id === dept._id ? "text-indigo-700" : "text-slate-800"}`}>
                        {dept.departmentName}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-bold ${selectedDept?._id === dept._id ? "bg-indigo-200 text-indigo-700" : "bg-slate-200 text-slate-600"}`}>
                        {dept.departmentCode}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Calendar size={12} /> {dept.academicYear}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => handledelete(dept._id)} className="p-2 cursor-pointer hover:bg-red-50 rounded-full text-slate-400 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageDptByAdmin;