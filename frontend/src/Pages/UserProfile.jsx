import React from 'react';
import { 
  User, 
  Mail, 
  Calendar, 
  ShieldCheck, 
  LogOut, 
  Edit3,
  Fingerprint
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const userData = {
    username: "Rayan",
    email: "rayan345@gmail.com",
    id: "696fd9a85e81c14152cdedc2",
    createdAt: "January 20, 2026",
    status: "Active"
  };

  const handleNavigate = () => {
    navigate("/admin/settings")
  } 

  
    const handleLogout = () => {
      Cookies.removeItem("token");
      toast.success("Logout Successfully");
      navigate("/");
      window.location.reload();
    };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100"
      >
        {/* Header/Banner Section */}
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
          <div className="absolute -bottom-12 left-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-lg border-4 border-white"
            >
              <User size={48} className="text-indigo-600" />
            </motion.div>
          </div>
        </div>

        {/* Content Section */}
        <div className="pt-16 pb-8 px-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{userData.username}</h1>
              <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                <Fingerprint size={14} /> ID: {userData.id.slice(0, 8)}...
              </p>
            </div>
            <button onClick={() => handleNavigate()} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
              <Edit3 size={20} />
            </button>
          </div>

          <hr className="my-6 border-slate-100" />

          {/* Info Grid */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 transition-colors group">
              <div className="p-2 bg-white rounded-lg shadow-sm group-hover:text-indigo-600">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Email Address</p>
                <p className="text-slate-700 font-medium">{userData.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 transition-colors group">
              <div className="p-2 bg-white rounded-lg shadow-sm group-hover:text-indigo-600">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Member Since</p>
                <p className="text-slate-700 font-medium">{userData.createdAt}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 transition-colors group">
              <div className="p-2 bg-white rounded-lg shadow-sm group-hover:text-indigo-600">
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Account Security</p>
                <p className="text-slate-700 font-medium">Bcrypt Encrypted</p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-8 flex gap-3">
            <button onClick={() => handleNavigate()} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-all shadow-md shadow-indigo-200">
              Settings
            </button>
            <button onClick={() => handleLogout()} className="px-4 border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-100 rounded-xl transition-all text-slate-500">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfile;