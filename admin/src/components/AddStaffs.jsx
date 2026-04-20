import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  GraduationCap,
  Briefcase,
  Stethoscope,
  Building,
  Phone,
  MapPin,
  Save,
  XCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { BACKEND_URL } from "../utils/utils";
import { toast } from "react-toastify";

const AddStaffs = ({ token }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    qualification: "",
    designation: "",
    spetialization: "",
    department: "",
    phonenumber: "",
    address: "",
  });

  const { department, setdepartment } = useAppContext();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Registering Staff Member:", formData);
    console.log("Saving Class Data:", formData);

    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/staff/register`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(data.message || "Staff added!");

      // Reset form after successful save
      setFormData({
        name: "",
        email: "",
        password: "",
        qualification: "",
        designation: "",
        spetialization: "",
        department: "",
        phonenumber: "",
        address: "",
      });
      window.location.reload();
    } catch (error) {
      console.error("Submission error:", error);
      const errorMsg = error.response?.data?.message || "Internal Server Error";
      toast.error(errorMsg);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-dashed rounded-3xl shadow-sm border-2 border-slate-400 overflow-hidden"
    >
      {/* Header Section */}
      <div className=" p-6 text-gray-700 flex items-center gap-4">
        <div className="bg-white border border-dashed border-gray-300 p-3 rounded-2xl">
          <User size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold">Staff Registration</h2>
          <p className="text-slate-400 text-sm">
            Add a new staff member to the organization
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <User size={16} className="text-blue-500" /> Full Name
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-slate-50/50"
            />
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Mail size={16} className="text-blue-500" /> Email Address
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-slate-50/50"
            />
          </div>

          {/* Password with Toggle */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Lock size={16} className="text-blue-500" /> Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-slate-50/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Phone size={16} className="text-blue-500" /> Phone Number
            </label>
            <input
              name="phonenumber"
              type="number"
              required
              placeholder="1234567890"
              value={formData.phonenumber}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-slate-50/50"
            />
          </div>

          {/* Qualification */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <GraduationCap size={16} className="text-blue-500" />{" "}
              Qualification
            </label>
            <input
              name="qualification"
              type="text"
              required
              placeholder="e.g. M.Tech in CS"
              value={formData.qualification}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-slate-50/50"
            />
          </div>

          {/* Designation */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Briefcase size={16} className="text-blue-500" /> Designation
            </label>
            <input
              name="designation"
              type="text"
              required
              placeholder="e.g. Senior Lecturer"
              value={formData.designation}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-slate-50/50"
            />
          </div>

          {/* Specialization */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Stethoscope size={16} className="text-blue-500" /> Specialization
            </label>
            <input
              name="spetialization"
              type="text"
              required
              placeholder="e.g. Data Science"
              value={formData.spetialization}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-slate-50/50"
            />
          </div>

          {/* Department */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Building size={16} className="text-blue-500" /> Department
            </label>
            <select
              name="department"
              required
              value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all bg-slate-50/30 appearance-none text-slate-700 cursor-pointer"
            >
              <option value="">Select Department</option>
              {department.map((dept) => (
                <option key={dept._id} value={dept.departmentName}>
                  {dept.departmentName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Address - Full Width */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <MapPin size={16} className="text-blue-500" /> Residential Address
          </label>
          <textarea
            name="address"
            required
            placeholder="Enter full residential address..."
            rows="3"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-slate-50/50 resize-none"
          />
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
          <button
            type="button"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors font-medium"
          >
            <XCircle size={18} /> Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all font-medium active:scale-95"
          >
            <Save size={18} /> Save Staff Member
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddStaffs;
