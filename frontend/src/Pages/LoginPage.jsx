import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { BACKEND_URL } from '../utils/utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from "js-cookies"
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();


    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          `${BACKEND_URL}/api/user/login`,
          {
            email: email,
            password: password
          },
        );
        Cookies.setItem("token", data.token, {
                expires: 15,
                secure: false,
                path: "/",
            });
        window.location.href = "/admin/dashboard";
        
        toast.success(data.message);
        // navigate();
      } catch (e) {
        toast.error(e.response.data.message);
        console.log(e);
      }
    };
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-xl mb-4 shadow-lg shadow-blue-900/20">
            <img src="logo.png" alt="" />
            {/* <LogIn className="text-white w-8 h-8" /> */}
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-slate-500 mt-2">Please enter your details to sign in</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="email" 
                onChange={(e) => setemail(e.target.value)}
                value={email}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all outline-none"
                placeholder="email"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="password" 
                onChange={(e) => setpassword(e.target.value)}
                value={password}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all outline-none"
                placeholder="••••••••"
              />
            </div>
          </motion.div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-slate-600 cursor-pointer">
              <input type="checkbox" className="mr-2 rounded border-slate-300 text-blue-900 focus:ring-blue-900" />
              Remember me
            </label>
            <a href="#" className="text-blue-900 font-semibold hover:underline">Forgot password?</a>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            type='submit'
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold shadow-lg shadow-blue-900/30 hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
          >
            Sign In <ArrowRight className="w-4 h-4" />
          </motion.button>
        </form>

        <p className="text-center mt-8 text-slate-600 text-sm">
          Don't have an account? <a href="/signup" className="text-blue-900 font-bold hover:underline">Sign up for free</a>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;