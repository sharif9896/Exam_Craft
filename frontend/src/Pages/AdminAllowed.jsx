import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Building2, BookOpen, Users, 
  ShieldCheck, FileText, Settings, ChevronDown, 
  ChevronRight, Menu, X, User, LogOut, Search, Bell,
  PanelLeftClose
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookies'
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import AddAllowed from '../components/AddAllowed';

const AdminAllowed = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState({});
  const [isProfileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const token = Cookies.getItem("token")
  useEffect(() => {
    if(!token) navigate("/login");
  },[])

  

  const toggleSubmenu = (menu) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  // Menu Configuration with Routes
  const menuItems = [
    { 
      title: 'Dashboard', 
      icon: <LayoutDashboard size={20} />, 
      path: '/admin/dashboard',
      submenu: null 
    },
    { 
      title: 'Departments', 
      icon: <Building2 size={20} />, 
      submenu: [
        { name: 'Add Department', path: '/admin/departments/add' },
        { name: 'Manage Departments', path: '/admin/departments/manage' }
      ] 
    },
    { 
      title: 'Classes', 
      icon: <BookOpen size={20} />, 
      submenu: [
        { name: 'Add Class', path: '/admin/classes/add' },
        { name: 'Manage Classes', path: '/admin/classes/manage' }
      ] 
    },
    { 
      title: 'Staffs', 
      icon: <Users size={20} />, 
      submenu: [
        { name: 'Add Staff', path: '/admin/staffs/add' },
        { name: 'Manage Staffs', path: '/admin/staffs/manage' }
      ] 
    },
    { 
      title: 'Allowed Things', 
      icon: <ShieldCheck size={20} />, 
      submenu: [
        { name: 'Add Allowed Things', path: '/admin/allowed-things/add' },
        { name: 'Manage Allowed Things', path: '/admin/allowed-things/manage' }
      ] 
    },
    { 
      title: 'Syllabus', 
      icon: <FileText size={20} />, 
      submenu: [
        { name: 'Add Syllabus', path: '/admin/syllabus/add' },
        { name: 'Manage Syllabus', path: '/admin/syllabus/manage' }
      ] 
    },
    { 
      title: 'Settings', 
      icon: <Settings size={20} />, 
      path: '/admin/settings',
      submenu: null 
    },
  ];

  const handleLogout = async () => {
    try{
      Cookies.removeItem("token");
      toast.success("Logout Successfully");
      navigate("/");
    }catch(e){

    }
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? '260px' : '0px' }}
        className="bg-[#090f18] text-slate-300 overflow-hidden shrink-0 shadow-xl z-20"
      >
        <div className="p-6 flex items-center gap-3 border-b border-slate-700/50">
          <div className="bg-blue-600 p-2 rounded-lg text-white shadow-lg shadow-blue-500/20">
            <LayoutDashboard size={22} />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">AdminPro</span>
        </div>

        <nav className="mt-6 px-4 space-y-1.5 overflow-y-auto h-[calc(100vh-100px)] custom-scrollbar">
          {menuItems.map((item, idx) => (
            <div key={idx} className="outline-none">
              {item.submenu ? (
                // Menu Item with Dropdown
                <>
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                      openMenus[item.title] ? 'bg-slate-800 text-white' : 'hover:bg-slate-800/50 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`${openMenus[item.title] ? 'text-blue-400' : 'text-slate-400 group-hover:text-blue-400'}`}>
                        {item.icon}
                      </span>
                      <span className="font-medium text-[15px]">{item.title}</span>
                    </div>
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform duration-300 ${openMenus[item.title] ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  
                  <AnimatePresence>
                    {openMenus[item.title] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-slate-900/40 rounded-xl mt-1 ml-2"
                      >
                        {item.submenu.map((sub, sIdx) => (
                          <Link 
                            key={sIdx} 
                            to={sub.path} 
                            className={`flex items-center gap-3 p-2.5 pl-6 text-sm transition-all duration-200 hover:text-blue-400 ${
                              location.pathname === sub.path ? 'text-blue-400 font-semibold' : 'text-slate-400'
                            }`}
                          >
                            <ChevronRight size={14} className="opacity-50" />
                            {sub.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                // Single Menu Item
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${
                    location.pathname === item.path ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  <span className={`${location.pathname === item.path ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'}`}>
                    {item.icon}
                  </span>
                  <span className="font-medium text-[15px]">{item.title}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors text-slate-600 active:scale-95"
            >
              {isSidebarOpen ? <PanelLeftClose size={20}/> : <Menu size={20} />}
            </button>
            <div className="hidden lg:flex items-center bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 focus-within:border-blue-400 focus-within:bg-white transition-all">
              <Search size={18} className="text-slate-400" />
              <input type="text" placeholder="Search data..." className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-64 outline-none" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2.5 p-1.5 pr-4 hover:bg-slate-100 rounded-xl transition-all border border-slate-200"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-200">
                  AD
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-bold text-slate-800 leading-none">John Doe</p>
                  <p className="text-[10px] text-slate-500 mt-1">Super Admin</p>
                </div>
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-slate-50 mb-1">
                      <p className="text-sm font-semibold text-slate-800">Administrator</p>
                      <p className="text-xs text-slate-500">admin@example.com</p>
                    </div>
                    <Link to="/admin/profile" className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                      <User size={16} /> My Profile
                    </Link>
                    <Link to="/admin/settings" className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                      <Settings size={16} /> Account Settings
                    </Link>
                    <div className="h-px bg-slate-100 my-1 mx-2"></div>
                    <button onClick={() => handleLogout()} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                      <LogOut size={16} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Dashboard Content Container */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50/50">
          <div className="max-w-7xl mx-auto">
             {/* This is where your Routes (Outlet) would render */}
             {/* <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl h-96 flex items-center justify-center text-slate-400"> */}
                <AddAllowed />
             {/* </div> */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminAllowed;


