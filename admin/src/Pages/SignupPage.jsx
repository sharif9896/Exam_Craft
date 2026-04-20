import React from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, UserPlus, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/user/signup`,
        {
          username: username,
          email: email,
          password: password
        },
      );
      toast.success(data.message);
      navigate("/login");
    } catch (e) {
      toast.error(e.response.data.message);
      console.log(e);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-lg w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100"
      >
        {/* Decorative Side Panel */}
        <div className="hidden md:flex md:w-3/6 bg-blue-900 p-8 flex-col justify-between text-white">
          <div>
            <UserPlus className="w-15 h-15 mb-6 opacity-80" />
            <h3 className="text-2xl font-bold">Join Us Today.</h3>
            <p className="mt-4 text-blue-100 text-sm leading-relaxed">
              Start building your next big project with our intuitive platform.
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-blue-200">
              <CheckCircle2 className="w-4 h-4" /> Secure Data Encryption
            </div>
            <div className="flex items-center gap-2 text-xs text-blue-200">
              <CheckCircle2 className="w-4 h-4" /> 24/7 Expert Support
            </div>
          </div>
        </div>

        {/* Form Panel */}
        <div className="p-8 md:w-5/6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Create Account
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    onChange={(e) => setusername(e.target.value)}
                    value={username}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none"
                    placeholder="Username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="email"
                    onChange={(e) => setemail(e.target.value)}
                    value={email}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none"
                    placeholder="email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="password"
                    onChange={(e) => setpassword(e.target.value)}
                    value={password}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ y: -2 }}
              type="submit"
              className="w-full bg-blue-900 text-white py-3 rounded-xl font-bold mt-4 shadow-lg hover:shadow-blue-900/20 transition-all"
            >
              Create Account
            </motion.button>
          </form>

          <p className="text-center mt-6 text-slate-500 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-blue-900 font-bold">
              Log In
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
