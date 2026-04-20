import { motion } from "framer-motion";
import {
  Menu,
  User,
  Settings,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  UserRoundKey, 
  ArrowRight,
  UserRoundCheck,
  NotebookText, 
  SquareChartGantt,
  FileCog
} from "lucide-react";

import { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar_2({ sidebarOpen, setSidebarOpen }) {

  const [submenu, setSubmenu] = useState(false);

  return (
    <motion.div
      animate={{ width: sidebarOpen ? 240 : 70 }}
      className="bg-white shadow-lg h-screen flex flex-col"
    >

      {/* Top toggle */}

      <div className="p-4 flex justify-between items-center">

        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="cursor-pointer">
          <Menu />
        </button>

      </div>

      {/* Menu */}

      <div className="flex flex-col gap-2 p-2">

        <Link to={"/verify"} className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded">

          <LayoutDashboard size={18} />

          {sidebarOpen && "Dashboard"}

        </Link>


        {/* Submenu */}

        <button
          onClick={() => setSubmenu(!submenu)}
          className="flex cursor-pointer items-center justify-between p-3 hover:bg-gray-100 rounded"
        >

          <div className="flex gap-3">

            <UserRoundKey size={18} />

            {sidebarOpen && "Permissions"}

          </div>

          {sidebarOpen && <ChevronDown size={16} />}

        </button>
        {submenu && sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-8 flex flex-col"
          >

            <Link to={"/staffaccess"} className="p-2 flex justify-between hover:text-blue-600 cursor-pointer text-left hover:bg-slate-300 rounded">
              <b style={{fontWeight: "200"}} className="flex gap-1 text-slate-600 hover:text-blue-600"><UserRoundCheck className="w-5 text-slate-600 hover:text-blue-600 hover:scale-110"/> Allowed </b> <ArrowRight className="w-5 text-slate-600 hover:text-blue-600 hover:scale-110" />
            </Link>

            <Link to={'/assignment'} className="p-2 flex justify-between hover:text-blue-600 cursor-pointer text-left hover:bg-slate-300 rounded">
              <b style={{fontWeight: "200"}} className="flex gap-1 text-slate-600 hover:text-blue-600"><NotebookText className="w-5 text-slate-600 hover:text-blue-600 hover:scale-110"/> Syllabus </b> <ArrowRight className="w-5 text-slate-600 hover:text-blue-600 hover:scale-110" />
            </Link>

          </motion.div>
        )}

<Link to={"/editor"}
          className="flex items-center cursor-pointer justify-between p-3 hover:bg-gray-100 rounded"
        >

          <div className="flex gap-3">

            <FileCog size={18} />

            {sidebarOpen && "Paper Settings"}

          </div>

          {/* {sidebarOpen && <ChevronDown size={16} />} */}

        </Link>


        
<button
          
          className="flex items-center cursor-pointer justify-between p-3 hover:bg-gray-100 rounded"
        >

          <div className="flex gap-3">

            <SquareChartGantt  size={18} />

            {sidebarOpen && "Manage Paper Settings"}

          </div>

          {/* {sidebarOpen && <ChevronDown size={16} />} */}

        </button>

        

      </div>


      {/* Bottom icons */}

      <div className="mt-auto p-4 flex flex-col gap-4">

        <Link to="/profile" className="flex items-center gap-3">
          <User size={20} />
          {sidebarOpen && "Profile"}
        </Link>

        <button className="flex items-center gap-3">
          <Settings size={20} />
          {sidebarOpen && "Settings"}
        </button>

        <button className="flex items-center cursor-pointer gap-3 hover:bg-red-400 rounded hover:text-white p-2 text-red-500">
          <LogOut size={20} />
          {sidebarOpen && "Logout"}
        </button>

      </div>

    </motion.div>
  );
}