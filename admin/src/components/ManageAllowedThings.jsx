import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle,
  Trash2,
  Edit3,
  BookOpen, // Changed icon for Syllabus
  Hash,
  Save,
  Loader2,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { BACKEND_URL } from "../utils/utils";
import { toast } from "react-toastify";

const ManageAllowedThings = ({ token }) => {
  // Assuming 'syllabuses' is available in your AppContext
  const { allowedthings, user } = useAppContext();
  const [selectedSyllabus, setSelectedSyllabus] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(allowedthings, "Allowed Things in ManageAllowedThings component");
  useEffect(() => {
    if (allowedthings && allowedthings.length > 0 && !selectedSyllabus) {
      setSelectedSyllabus(allowedthings[0]);
    }
  }, [allowedthings]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this syllabus?"))
      return;
    try {
      await axios.delete(`${BACKEND_URL}/api/allowedthings/deletethings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Allowed Things Deleted Successfully");
      window.location.reload();
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete allowed things");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSyllabus?._id) return;

    setLoading(true);
    try {
      const updatedData = {
        StaffName: selectedSyllabus.StaffName,
        AllowedDepartment: selectedSyllabus.AllowedDepartment,
        AllowedClass: selectedSyllabus.AllowedClass,
        AllowedSubject: selectedSyllabus.AllowedSubject,
        AllowedSemester: selectedSyllabus.AllowedSemester,
        creatorId: user?._id,
      };

      await axios.put(
        `${BACKEND_URL}/api/allowedthings/updatethings/${selectedSyllabus._id}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success("Allowed Things updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error(err.response?.data?.message || "Failed to update allowed things");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border-2 border-slate-100 rounded-3xl h-full p-6 text-slate-600 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="text-indigo-500" size={24} />
        <h1 className="text-xl font-bold text-slate-800">Manage Allowed Things</h1>
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-6">
        {/* LEFT: Edit/Form Section */}
        <div className="border border-slate-200 w-full lg:w-1/2 p-5 rounded-2xl bg-slate-50/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold flex items-center gap-2 text-slate-700">
              <Edit3 size={18} />{" "}
              {selectedSyllabus
                ? `Editing: ${selectedSyllabus.StaffName}`
                : "Select Syllabus"}
            </h2>
            <Link
              to="/admin/syllabus/add"
              className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <PlusCircle size={14} /> New Syllabus
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wider">
                  Staff Name
                </label>
                <input
                  type="text"
                  required
                  readOnly
                  class="
      w-full
      px-4 py-2
      text-gray-800
      border border-gray-300
      rounded-lg
      shadow-sm
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
      focus:border-blue-500
      placeholder:text-gray-400
      transition duration-150 ease-in-out
    "
                  value={selectedSyllabus?.StaffName || ""}
                  onChange={(e) =>
                    setSelectedSyllabus({
                      ...selectedSyllabus,
                      StaffName: e.target.value,
                    })
                  }
                />
              </div>
              {/* className="w-full mt-1 p-2.5 rounded-xl border border-slate-200
              focus:ring-2 focus:ring-indigo-500 outline-none bg-white" */}
              <div>
                <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wider">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                  value={selectedSyllabus?.AllowedSubject || ""}
                  onChange={(e) =>
                    setSelectedSyllabus({
                      ...selectedSyllabus,
                      AllowedSubject: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wider">
                  Department
                </label>
                <input
                  type="text"
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                  value={selectedSyllabus?.AllowedDepartment || ""}
                  onChange={(e) =>
                    setSelectedSyllabus({
                      ...selectedSyllabus,
                      AllowedDepartment: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wider">
                  Class
                </label>
                <input
                  type="text"
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                  value={selectedSyllabus?.AllowedClass || ""}
                  onChange={(e) =>
                    setSelectedSyllabus({
                      ...selectedSyllabus,
                      AllowedClass: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wider">
                  Semester
                </label>
                <input
                  type="text"
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                  value={selectedSyllabus?.AllowedSemester || ""}
                  onChange={(e) =>
                    setSelectedSyllabus({
                      ...selectedSyllabus,
                      AllowedSemester: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {selectedSyllabus?.syllabysPDF && (
              <div className="flex items-center gap-2 p-3 bg-indigo-50 rounded-xl text-indigo-600 text-sm">
                <FileText size={16} />
                <span className="truncate">
                  {selectedSyllabus.syllabysPDF.split("\\").pop()}
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !selectedSyllabus}
              className="cursor-pointer w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-100 mt-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Save size={18} />
              )}
              Update AllowedThings
            </button>
          </form>
        </div>

        {/* RIGHT: List Section */}
        <div className="border border-slate-200 w-full lg:w-1/2 p-5 rounded-2xl bg-white max-h-[500px] overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-4 bg-white pb-2 sticky top-0 z-10">
            <h2 className="font-semibold flex items-center gap-2 text-slate-700">
              <Hash size={18} /> Available AllowedThings (
              {allowedthings?.length || 0})
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {allowedthings?.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    selectedSyllabus?._id === item._id
                      ? "border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500"
                      : "border-slate-100 bg-slate-50 hover:border-slate-300 hover:bg-slate-100"
                  }`}
                  onClick={() => setSelectedSyllabus(item)}
                >
                  <div className="flex-1">
                    <h3
                      className={`font-bold ${selectedSyllabus?._id === item._id ? "text-indigo-700" : "text-slate-800"}`}
                    >
                      {item.StaffId ? item.staffName : "No Title"}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-slate-400 font-medium">
                        By: {item.StaffName}
                      </span>
                      <span className="text-[10px] uppercase bg-slate-200 px-1.5 py-0.5 rounded font-bold text-slate-600">
                        {`Dept: ${item.AllowedDepartment}`}{" "}
                        {`| Class: ${item.AllowedClass}`}{" "}
                        {`| Subject: ${item.AllowedSubject}`}{" "}
                        {`| Sem: ${item.AllowedSemester}`}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item._id);
                    }}
                    className="p-2 hover:bg-red-50 rounded-full text-slate-400 hover:text-red-500 transition-colors"
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
};

export default ManageAllowedThings;
