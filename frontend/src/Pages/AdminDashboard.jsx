import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Building2, BookOpen, Users, 
  ShieldCheck, FileText, Settings, ChevronDown, 
  ChevronRight, Menu, User, LogOut, Search, Bell,
  PanelLeftClose, TrendingUp, ArrowUpRight, ArrowDownRight,
  MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import Cookies from 'js-cookies';
import { toast } from 'react-toastify';
import { useAppContext } from '../context/AppContext';

// Mock Data for Visualizations
const statsData = [
  { name: 'Jan', students: 400, staff: 240 },
  { name: 'Feb', students: 300, staff: 139 },
  { name: 'Mar', students: 900, staff: 980 },
  { name: 'Apr', students: 1400, staff: 390 },
  { name: 'May', students: 1100, staff: 480 },
  { name: 'Jun', students: 1800, staff: 380 },
];

const deptData = [
  { name: 'Science', value: 45, color: '#3b82f6' },
  { name: 'Arts', value: 25, color: '#8b5cf6' },
  { name: 'Commerce', value: 30, color: '#10b981' },
];

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState({});
  const [isProfileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {user} = useAppContext();

  const token = Cookies.getItem("token");
  
  useEffect(() => {
    if (!token && process.env.NODE_ENV === 'production') navigate("/login");
  }, [token, navigate]);

  const toggleSubmenu = (menu) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const menuItems = [
    { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard', submenu: null },
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
    { title: 'Settings', icon: <Settings size={20} />, path: '/admin/settings', submenu: null },
  ];

  const handleLogout = () => {
    Cookies.removeItem("token");
    toast.success("Logout Successfully");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans text-slate-900">
      {/* Sidebar - Remains consistent with your design */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? '260px' : '0px' }}
        className="bg-[#090f18] text-slate-300 overflow-hidden shrink-0 shadow-xl z-20"
      >
        <div className="p-6 flex items-center gap-3 border-b border-slate-700/50">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <LayoutDashboard size={22} />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">ExamCraft</span>
        </div>

        <nav className="mt-6 px-4 space-y-1.5 overflow-y-auto h-[calc(100vh-100px)]">
          {menuItems.map((item, idx) => (
            <div key={idx}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                      openMenus[item.title] ? 'bg-slate-800 text-white' : 'hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={openMenus[item.title] ? 'text-blue-400' : 'text-slate-400'}>{item.icon}</span>
                      <span className="font-medium text-[15px]">{item.title}</span>
                    </div>
                    <ChevronDown size={16} className={`transition-transform ${openMenus[item.title] ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openMenus[item.title] && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-slate-900/40 rounded-xl mt-1 ml-2">
                        {item.submenu.map((sub, sIdx) => (
                          <Link key={sIdx} to={sub.path} className="flex items-center gap-3 p-2.5 pl-6 text-sm text-slate-400 hover:text-blue-400 transition-all">
                            <ChevronRight size={14} className="opacity-50" />
                            {sub.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link to={item.path} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${location.pathname === item.path ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'hover:bg-slate-800/50'}`}>
                  <span className={location.pathname === item.path ? 'text-white' : 'text-slate-400'}>{item.icon}</span>
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
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg">
              {isSidebarOpen ? <PanelLeftClose size={20}/> : <Menu size={20} />}
            </button>
            <h1 className="text-lg font-semibold text-slate-800 hidden md:block">Analytics Overview</h1>
          </div>

          <div className="flex items-center gap-4">
             <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type="text" placeholder="Search analytics..." className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm w-64 focus:ring-2 focus:ring-blue-500 transition-all" />
             </div>
             <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
             <div className="h-8 w-px bg-slate-200 mx-1"></div>
             <div className="relative">
                           <button 
                             onClick={() => setProfileOpen(!isProfileOpen)}
                             className="flex items-center gap-2.5 p-1.5 pr-4 hover:bg-slate-100 rounded-xl transition-all border border-slate-200"
                           >
                             <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-200">
                               AD
                             </div>
                             <div className="hidden sm:block text-left">
                               <p className="text-xs font-bold text-slate-800 leading-none">{user?.username || 'Admin'}</p>
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
                                   <p className="text-xs text-slate-500">{user?.email}</p>
                                 </div>
                                 <Link to="/admin/profile" className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                                   <User size={16} /> My Profile
                                 </Link>
                                 <Link to="/admin/settings" className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                                   <Settings size={16} /> Account Settings
                                 </Link>
                                 <div className="h-px bg-slate-100 my-1 mx-2"></div>
                                 <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                                   <LogOut size={16} /> Logout
                                 </button>
                               </motion.div>
                             )}
                           </AnimatePresence>
                         </div>
          </div>
        </header>

        {/* Analytics Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Students', value: '2,840', icon: <Users className="text-blue-600" />, trend: '+12.5%', color: 'bg-blue-50' },
                { label: 'Active Staff', value: '124', icon: <Users className="text-purple-600" />, trend: '+3.2%', color: 'bg-purple-50' },
                { label: 'Departments', value: '12', icon: <Building2 className="text-emerald-600" />, trend: '0%', color: 'bg-emerald-50' },
                { label: 'Exams Sync', value: '98.4%', icon: <ShieldCheck className="text-amber-600" />, trend: '+1.4%', color: 'bg-amber-50' },
              ].map((card, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`${card.color} p-3 rounded-xl`}>{card.icon}</div>
                    <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                      {card.trend} <ArrowUpRight size={12} className="ml-1" />
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">{card.label}</p>
                    <h3 className="text-2xl font-bold text-slate-900 mt-1">{card.value}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Growth Chart */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Enrollment Growth</h3>
                    <p className="text-sm text-slate-500">Monthly student vs staff registration</p>
                  </div>
                  <select className="text-sm border-slate-200 rounded-lg bg-slate-50 px-3 py-1 outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Last 6 Months</option>
                    <option>Last Year</option>
                  </select>
                </div>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={statsData}>
                      <defs>
                        <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                      />
                      <Area type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorStudents)" />
                      <Area type="monotone" dataKey="staff" stroke="#8b5cf6" strokeWidth={3} fill="transparent" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Department Distribution */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Department Split</h3>
                <div className="h-64 flex items-center justify-center relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={deptData}>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                            <Tooltip cursor={{fill: '#f8fafc'}} />
                            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                                {deptData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="space-y-4 mt-4">
                    {deptData.map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div>
                                <span className="text-slate-600">{item.name}</span>
                            </div>
                            <span className="font-bold text-slate-800">{item.value}%</span>
                        </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-800">Recent System Logs</h3>
                    <button className="text-blue-600 text-sm font-semibold hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-semibold">User</th>
                                <th className="px-6 py-4 font-semibold">Action</th>
                                <th className="px-6 py-4 font-semibold">Module</th>
                                <th className="px-6 py-4 font-semibold">Time</th>
                                <th className="px-6 py-4 font-semibold text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {[
                                { user: 'Admin Sarah', action: 'Added New Syllabus', module: 'Syllabus', time: '2 mins ago', status: 'Success' },
                                { user: 'Staff Mike', action: 'Updated Class Schedule', module: 'Classes', time: '15 mins ago', status: 'Success' },
                                { user: 'Admin Sarah', action: 'Modified Permissions', module: 'Settings', time: '1 hour ago', status: 'Warning' },
                                { user: 'System', action: 'Database Backup', module: 'Core', time: '3 hours ago', status: 'Success' },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900">{row.user}</td>
                                    <td className="px-6 py-4 text-slate-600">{row.action}</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs">{row.module}</span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">{row.time}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                            row.status === 'Success' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                        }`}>
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;