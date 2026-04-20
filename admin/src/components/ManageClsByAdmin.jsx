import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle,
  Trash2,
  Edit3,
  Layers,
  Calendar,
  Hash,
  Save,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { BACKEND_URL } from "../utils/utils";
import { toast } from "react-toastify";

const ManageClsByAdmin = ({ token }) => {
  // Assuming 'classes' is available in your AppContext based on your fetch log
  const { classes, user } = useAppContext();
//   console.log(classes, "from")
  const [selectedClass, setSelectedClass] = useState(null);
  const [loading, setLoading] = useState(false);

  // Auto-select first class when data loads
  useEffect(() => {
    if (classes && classes.length > 0 && !selectedClass) {
      setSelectedClass(classes[0]);
    }
  }, [classes]);

  const handledelete = async (id) => {
      try{
        const {data} = await axios.delete(`${BACKEND_URL}/api/classes/del/${id}`, {
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
    if (!selectedClass?._id) return;

    setLoading(true);
    try {
      const updatedData = {
        className: selectedClass.className,
        classCode: selectedClass.classCode,
        description: selectedClass.description,
        departmentId: selectedClass.departmentId, // Maintaining relation
        creatorId: user?._id,
      };

      const { data } = await axios.put(
        `${BACKEND_URL}/api/classes/editById/${selectedClass._id}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log(data);
      toast.success("Class updated successfully!");
      if (data.success) {
        toast.success("Class updated successfully!");
      }
    } catch (err) {
      console.error("Update failed:", err);
      toast.error(err.response?.data?.message || "Failed to update class");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border-2 border-slate-100 rounded-3xl h-full p-6 text-slate-600 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Layers className="text-indigo-500" size={24} />
        <h1 className="text-xl font-bold text-slate-800">Manage Classes</h1>
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-6">
        {/* LEFT: Edit/Form Section */}
        <div className="border border-slate-200 w-full lg:w-1/2 p-5 rounded-2xl bg-slate-50/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold flex items-center gap-2 text-slate-700">
              <Edit3 size={18} />{" "}
              {selectedClass
                ? `Editing: ${selectedClass.className}`
                : "Select a Class"}
            </h2>
            <Link
              to="/admin/classes/add"
              className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <PlusCircle size={14} /> New Class
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wider">
                Class Name
              </label>
              <input
                type="text"
                required
                value={selectedClass?.className || ""}
                placeholder="e.g. I Year"
                className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white transition-all"
                onChange={(e) =>
                  setSelectedClass({
                    ...selectedClass,
                    className: e.target.value,
                  })
                }
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wider">
                  Class Code
                </label>
                <input
                  type="text"
                  required
                  value={selectedClass?.classCode || ""}
                  placeholder="IU001"
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                  onChange={(e) =>
                    setSelectedClass({
                      ...selectedClass,
                      classCode: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wider">
                Description
              </label>
              <textarea
                rows="3"
                value={selectedClass?.description || ""}
                placeholder="Details about this class..."
                className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                onChange={(e) =>
                  setSelectedClass({
                    ...selectedClass,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <button
              type="submit"
              disabled={loading || !selectedClass}
              className="cursor-pointer w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-100 mt-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Save size={18} />
              )}
              {selectedClass ? "Update Class" : "Save Changes"}
            </button>
          </form>
        </div>

        {/* RIGHT: List Section */}
        <div className="border border-slate-200 w-full lg:w-1/2 p-5 rounded-2xl bg-white max-h-125 overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-4  bg-white pb-2 z-10">
            <h2 className="font-semibold flex items-center gap-2 text-slate-700">
              <Hash size={18} /> Available Classes ({classes?.length || 0})
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {classes?.map((cls, index) => (
                <motion.div
                  key={cls._id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    selectedClass?._id === cls._id
                      ? "border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500"
                      : "border-slate-100 bg-slate-50 hover:border-slate-300 hover:bg-slate-100"
                  }`}
                  onClick={() => setSelectedClass(cls)}
                >
                  <div className="flex-1">
                    <h3
                      className={`font-bold transition-colors ${selectedClass?._id === cls._id ? "text-indigo-700" : "text-slate-800"}`}
                    >
                      {cls.className}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span
                        className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-bold ${selectedClass?._id === cls._id ? "bg-indigo-200 text-indigo-700" : "bg-slate-200 text-slate-600"}`}
                      >
                        {cls.classCode}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => handledelete(cls._id)} className="p-2 hover:bg-red-50 rounded-full text-slate-400 hover:text-red-500 transition-colors">
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
};

export default ManageClsByAdmin;
