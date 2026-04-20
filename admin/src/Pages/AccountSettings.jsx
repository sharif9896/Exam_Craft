import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  User, 
  Mail, 
  Lock, 
  Bell, 
  Trash2, 
  Save, 
  CheckCircle,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaved, setIsSaved] = useState(false);

  // Initial data from your image
  const [formData, setFormData] = useState({
    username: "Rayan",
    email: "rayan345@gmail.com",
    id: "696fd9a85e81c14152cdedc2", // From image: _id: ObjectId('696fd9a85e81c14152cdedc2')
    createdAt: "2026-01-20T19:38:16.067+00:00" // From image: createdAt
  });

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Settings className="text-indigo-600" /> Account Settings
          </h1>
          <p className="text-slate-500 mt-2">Manage your profile information and security preferences.</p>
        </header>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === tab.id 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                    : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                <tab.icon size={18} />
                <span className="font-medium">{tab.label}</span>
                {activeTab === tab.id && <ChevronRight size={16} className="ml-auto" />}
              </button>
            ))}
            <div className="pt-4 mt-4 border-t border-slate-200">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all">
                <Trash2 size={18} />
                <span className="font-medium">Delete Account</span>
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="p-8"
              >
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold border-b pb-4">Profile Information</h2>
                    
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-600">Username</label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 text-slate-400" size={18} />
                          <input 
                            type="text" 
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-600">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                          <input 
                            type="email" 
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="p-4 bg-indigo-50 rounded-2xl flex items-center gap-4 border border-indigo-100">
                        <div className="bg-white p-2 rounded-lg text-indigo-600 shadow-sm">
                          <ShieldAlert size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-indigo-400 font-bold uppercase tracking-tight">Account ID</p>
                          <p className="text-indigo-900 font-mono text-sm">{formData.id}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold border-b pb-4">Security Settings</h2>
                    <p className="text-sm text-slate-500 italic">
                      Your password is currently encrypted using Bcrypt (10 rounds).
                    </p>
                    
                    <div className="space-y-4">
                      <button className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all flex justify-between items-center group">
                        <div>
                          <p className="font-semibold">Change Password</p>
                          <p className="text-sm text-slate-500">Update your account password regularly</p>
                        </div>
                        <ChevronRight className="text-slate-300 group-hover:text-indigo-600" />
                      </button>

                      <button className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all flex justify-between items-center group">
                        <div>
                          <p className="font-semibold">Two-Factor Authentication</p>
                          <p className="text-sm text-slate-500">Add an extra layer of security</p>
                        </div>
                        <div className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-400">OFF</div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Footer Save Section */}
                <div className="mt-12 pt-6 border-t flex items-center justify-between">
                  <p className="text-xs text-slate-400">Created on: {new Date(formData.createdAt).toLocaleDateString()}</p>
                  <button 
                    onClick={handleSave}
                    disabled={isSaved}
                    className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all shadow-lg ${
                      isSaved 
                        ? 'bg-green-500 text-white' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {isSaved ? <CheckCircle size={18} /> : <Save size={18} />}
                    {isSaved ? 'Changes Saved' : 'Save Changes'}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;