import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusCircle, 
  Trash2, 
  Edit3, 
  Users, 
  Mail, 
  Briefcase, 
  Save,
  Loader2,
  Phone,
  GraduationCap,
  MapPin,
  Hash
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';
import { BACKEND_URL } from '../utils/utils';
import { toast } from 'react-toastify';

const ManageStaffByAdmin = ({ token }) => {
  const { staffs, user } = useAppContext(); // Assuming staff is in context
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [loading, setLoading] = useState(false);

  // Auto-select first staff member on load
  useEffect(() => {
    if (staffs && staffs.length > 0 && !selectedStaff) {
      setSelectedStaff(staffs[0]);
    }
  }, [staffs]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this staff member?")) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/staff/staffdelete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Staff member deleted successfully");
      window.location.reload();
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete staff member");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStaff?._id) return;

    setLoading(true);
    try {
      const updatedData = {
        name: selectedStaff.name,
        email: selectedStaff.email,
        designation: selectedStaff.designation,
        phonenumber: selectedStaff.phonenumber,
        qualification: selectedStaff.qualification,
        spetialization: selectedStaff.spetialization,
        address: selectedStaff.address,
        department: selectedStaff.department,
        creatorId: user?._id
      };

      const { data } = await axios.put(
        `${BACKEND_URL}/api/staff/staffupdate/${selectedStaff._id}`, 
        updatedData, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
        toast.success("Staff profile updated successfully!");
      if (data.success) {
        toast.success("Staff profile updated successfully!");
      }
    } catch (err) {
      console.error("Update failed:", err);
      toast.error(err.response?.data?.message || "Failed to update staff");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border-2 border-slate-100 border-dashed rounded-3xl h-full p-6 text-slate-600 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Users className="text-indigo-500" size={24} />
        <h1 className="text-xl font-bold text-slate-800">Manage Staff</h1>
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-6">
        
        {/* LEFT: Edit/Form Section */}
        <div className="border border-slate-200 w-full lg:w-1/2 p-5 rounded-2xl bg-slate-50/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold flex items-center gap-2 text-slate-700">
              <Edit3 size={18} /> {selectedStaff ? `Editing: ${selectedStaff.name}` : "Select Staff"}
            </h2>
            <Link 
              to='/admin/staffs/add'
              className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <PlusCircle size={14} /> New Staff
            </Link>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" required
                  value={selectedStaff?.name || ""}
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white transition-all"
                  onChange={(e) => setSelectedStaff({...selectedStaff, name: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wider">Email</label>
                <input 
                  type="email" required
                  value={selectedStaff?.email || ""}
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                  onChange={(e) => setSelectedStaff({...selectedStaff, email: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wider">Designation</label>
                <input 
                  type="text" required
                  value={selectedStaff?.designation || ""}
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                  onChange={(e) => setSelectedStaff({...selectedStaff, designation: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wider">Phone</label>
                <input 
                  type="text"
                  value={selectedStaff?.phonenumber || ""}
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                  onChange={(e) => setSelectedStaff({...selectedStaff, phonenumber: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wider">Qualification</label>
                <input 
                  type="text"
                  value={selectedStaff?.qualification || ""}
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                  onChange={(e) => setSelectedStaff({...selectedStaff, qualification: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wider">Specialization</label>
                <input 
                  type="text"
                  value={selectedStaff?.spetialization || ""}
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                  onChange={(e) => setSelectedStaff({...selectedStaff, spetialization: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wider">Address</label>
              <textarea 
                rows="2"
                value={selectedStaff?.address || ""}
                className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                onChange={(e) => setSelectedStaff({...selectedStaff, address: e.target.value})}
              />
            </div>

            <button 
              type='submit' 
              disabled={loading || !selectedStaff}
              className="cursor-pointer w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-100 mt-2"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              {selectedStaff ? "Update Staff Profile" : "Save Changes"}
            </button>
          </form>
        </div>

        {/* RIGHT: List Section */}
        <div className="border border-slate-200 w-full lg:w-1/2 p-5 rounded-2xl bg-white max-h-125 overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-4 top-0 bg-white pb-2 z-10">
            <h2 className="font-semibold flex items-center gap-2 text-slate-700">
              <Hash size={18} /> Staff Directory ({staffs?.length || 0})
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {staffs?.map((member, index) => (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    selectedStaff?._id === member._id 
                    ? "border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500" 
                    : "border-slate-100 bg-slate-50 hover:border-slate-300 hover:bg-slate-100"
                  }`}
                  onClick={() => setSelectedStaff(member)}
                >
                  <div className="flex-1">
                    <h3 className={`font-bold transition-colors ${selectedStaff?._id === member._id ? "text-indigo-700" : "text-slate-800"}`}>
                        {member.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Briefcase size={12} className="text-indigo-400" /> {member.designation}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Mail size={12} /> {member.email}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(member._id); }} 
                    className="p-2 cursor-pointer hover:bg-red-50 rounded-full text-slate-400 hover:text-red-500 transition-colors"
                  >
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

export default ManageStaffByAdmin;