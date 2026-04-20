import { useState, useRef, useEffect } from "react";
import { Bell, User, Settings, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from 'js-cookie';
import {toast} from "react-toastify";
import { Link } from "react-router-dom";


export default function Navbar_2() {

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
//   const navigate = useNavigate();
  const user = localStorage.getItem("user") || "Admin";

  useEffect(() => {
    if(!user) return window.location.href = "/";
  }, [])
  // close when clicked outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    const handleLogout = () => {
      Cookies.remove("token");
      localStorage.removeItem("user");
      toast.success("Logout Successfully");
      window.location.href = "/";
    };
  

  return (
    <>
    <div className="flex bg-white px-6 py-1 justify-between">
      <img src="HM.png" alt="Logo" className="w-25 h-15" />
    
    <div className="flex justify-end items-center ">
      
      {/* <span className=""> */}
      {/* Notification */}
      <button className="relative mr-6 cursor-pointer">
        <Bell size={20} />
        <span className="absolute -top-1.5 -right-1 w-4 h-4 text-white text-sm bg-red-500 rounded-full flex justify-center items-center p-1">1</span>
      </button>


      {/* Profile */}
      <div className="relative cursor-pointer" ref={dropdownRef}>

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center cursor-pointer gap-3 bg-gray-100 px-3 py-2 rounded-xl hover:bg-gray-200"
        >

          {/* Avatar */}
          <div className="w-8 h-8 rounded-md bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
            {user.slice(0, 2).toUpperCase()}
          </div>

          {/* Name */}
          <div className="text-left leading-tight hidden md:block">
            <p className="text-sm font-semibold">{user.slice(0, 6)}</p>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>

        </button>


        {/* Dropdown */}
        <AnimatePresence>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-1 w-64 bg-white rounded-2xl shadow-xl"
          >

            {/* Header */}
            <div className="px-5 py-1 border-b border-gray-300">
              <p className="font-semibold text-gray-600 text-sm">
                Administrator
              </p>
                <p className="text-xs text-gray-500 py-1">
                    {user ? user : "admin@gmail.com"}
                </p>
            </div>


            {/* Menu */}
            <div className="py-2">

              <Link to={"/profile"} className="flex items-center gap-3 w-full px-5 py-3 hover:bg-gray-100 text-gray-700">

                <User size={18} />

                My Profile

              </Link>

              <button className="flex items-center gap-3 w-full px-5 py-3 hover:bg-gray-100 text-gray-700">

                <Settings size={18} />

                Account Settings

              </button>

            </div>


            {/* Logout */}
            <div className="border-t border-gray-300 py-2 cursor-pointer">

              <button onClick={handleLogout} className="flex items-center gap-3 w-full cursor-pointer px-5 py-3 text-red-500 hover:bg-red-50">

                <LogOut size={18} />

                Logout

              </button>

            </div>

          </motion.div>
        )}

        </AnimatePresence>

      </div>
      {/* </span> */}
</div>
    </div>
    </>
  );
}