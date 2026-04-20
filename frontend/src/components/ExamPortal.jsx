
//   return (
//     <div className="min-h-screen bg-gray-50 font-sans selection:bg-blue-200">
//       <AnimatePresence mode="wait">
//         {loading ? (
//           <motion.div
//             key="loader"
//             exit={{ opacity: 0, scale: 1.1 }}
//             className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-blue-900 text-white"
//           >
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
//               <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4" />
//               <h1 className="text-2xl font-bold tracking-widest uppercase">DIYA PRO SOFT</h1>
//             </motion.div>
//           </motion.div>
//         ) : (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col min-h-screen">
//             {/* Header */}
//             <header className="p-4 bg-white border-b flex items-center gap-3">
//               <div className="w-12 h-12 bg-blue-50 rounded flex items-center justify-center">
//                 <img src="HM.png" alt="Logo" className="w-10 h-10 object-contain" />
//               </div>
//               <div>
//                 <h2 className="text-sm font-bold text-gray-800 uppercase">Mazharul Uloom College (Autonomous)</h2>
//                 <p className="text-[10px] text-gray-500 uppercase tracking-wider">Ambur, Tirupathur District, Tamil Nadu</p>
//               </div>
//             </header>

//             <main className="flex flex-1 flex-col md:flex-row overflow-hidden">
//               {/* Left Panel */}
//               <section className="w-full md:w-7/12 bg-gradient-to-br from-blue-900 to-blue-950 text-white p-8 md:p-12 flex flex-col justify-center">
//                 <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
//                   <p className="text-blue-300 font-bold text-xs tracking-widest uppercase mb-2">DIYA PRO SOFT</p>
//                   <h1 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
//                     Exam Question <br /><span className="text-blue-400">Paper Setter</span>
//                   </h1>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {features.map((f, i) => (
//                       <div key={i} className="flex gap-3">
//                         <div className="text-blue-400 mt-1">{f.icon}</div>
//                         <div>
//                           <h3 className="font-bold text-sm">{f.title}:</h3>
//                           <p className="text-xs text-blue-100/60">{f.desc}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </motion.div>
//               </section>

             
//             </main>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ExamPortal;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';
import { 
  ShieldCheck, 
  UserPlus, 
  Layout, 
  Zap, 
  FileSearch, 
  Edit3, 
  ClipboardCheck, 
  Monitor,
  ArrowRight, 
  ChevronLeft, Loader2, Lock
} from 'lucide-react';
import { useRef } from 'react';
import { BACKEND_URL } from '../utils/utils';
import { useNavigate } from 'react-router-dom';

const ExamPortal = () => {
  const [loading, setloading] = useState(true);

  // Simulated Loading Animation (mimicking aevistechnologies.com)
  useEffect(() => {
    const timer = setTimeout(() => setloading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  
  // OTP States
  const [otp, setotp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [error, seterror] = useState("");
  const inputRef = useRef([]);
  const [resentloaing, setresentloading] = useState(false);
  // Initial Loader
  useEffect(() => {
    const timer = setTimeout(() => setloading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // OTP Timer Logic
  useEffect(() => {
    let interval;
    if (showOTP && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [showOTP, timer]);

  const features = [
    { icon: <ShieldCheck size={20} />, title: "Secure Access", desc: "Link sharing via CoE for easy access." },
    { icon: <UserPlus size={20} />, title: "Seamless Registration", desc: "Efficient onboarding for setters." },
    { icon: <Layout size={20} />, title: "Blueprint Alignment", desc: "Crafted based on course blueprints." },
    { icon: <Zap size={20} />, title: "OBE Integration", desc: "Incorporates Bloom's Taxonomy." },
    { icon: <FileSearch size={20} />, title: "Preview & Encryption", desc: "End-to-end data confidentiality." },
    { icon: <Edit3 size={20} />, title: "Advanced Editing", desc: "LaTeX and image integration." },
    { icon: <ClipboardCheck size={20} />, title: "Digital Claim System", desc: "Submit claim forms digitally." },
    { icon: <Monitor size={20} />, title: "User-Friendly Interface", desc: "Intuitive design and data protection." },
  ];

  // OTP Handlers
    const handleInputChange = (index, value) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setotp(newOtp);
        seterror("");

        // Move to next input if value is entered
        if (value && index < 5) {
            inputRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, event) => {
        if (event.key === "Backspace" && !otp[index] && index > 0) {
            inputRef.current[index - 1].focus();
        }
    };


    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text");
        const digits = pasteData.replace(/\D/g, "").slice(0, 6);
        if (digits.length === 6) {
            const newOtp = digits.split("");
            setotp(newOtp);
            inputRef.current[5].focus();
        }
    };

    const handleSubmits = async (e) => {
        e.preventDefault();
        const otpString = otp.join("");
        setLoading(true);
        if (otpString.length !== 6) {
            seterror("Please enter all 6-digits!");
            return;
        }
        seterror("");
        // setloading(true);

        try {
            const { data } = await axios.post(`${BACKEND_URL}/api/users/verify`, {
                email,
                otp: otpString,
            });
            toast.success(data.message);
            localStorage.setItem("user", email);
            Cookies.set("token", data.token, {
                expires: 15,
                secure: false,
                path: "/",
            });
            setotp(["", "", "", "", "", ""]);
            inputRef.current[0].focus();
            
            window.location.href = "/verify";
          
            // setUser(data.user);
            // setIsAuth(true);
            // fetchChats();
            // fetchUsers();
            // navigate("/"); // Navigate to dashboard/home after success
        } catch (e) {
            // Optional chaining to prevent "undefined" errors if server is down
            seterror(e.response?.data?.message || "Connection refused. Is your backend running?");
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setresentloading(true);
        seterror("");
        try {
            const { data } = await axios.post(`${BACKEND_URL}/api/users/login`, { email });
            toast.success(data.message);
            setTimer(60);
        } catch (e) {
            seterror(e.response?.data?.message || "Failed to resend code.");
        } finally {
            setresentloading(false);
        }
    };
  const handleSubmit = async (e) => {
        console.log(email);
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.post(`${BACKEND_URL}/api/users/login`, { email });
            toast.success(data.message);
            setShowOTP(true);
            localStorage.setItem("user", data.email)
        } catch (e) {
            toast.error(e.response.data.message);
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-blue-200">
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-blue-900 text-white"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4" />
              <h1 className="text-2xl font-bold tracking-widest">DIYA PRO SOFT</h1>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="flex flex-col min-h-screen"
          >
            {/* Header */}
            <header className="p-2 bg-white border-b border-gray-300 flex items-center gap-3">
              <div className="w-30 h-10 p-1 rounded flex items-center justify-center font-bold text-xs text-center">
                <img src="HM.png" alt="" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-800 uppercase">Mazharul Uloom College (Autonomous)</h2>
                <p className="text-[10px] text-gray-500">Ambur, Tirupathur District, Tamil Nadu</p>
              </div>
            </header>

            <main className="flex flex-1 flex-col md:flex-row overflow-hidden">
              {/* Left Panel: Info Section */}
              <section className="w-full md:w-7/12 bg-linear-to-br from-blue-800 to-blue-950 text-white p-8 md:p-12 flex flex-col justify-center">
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-blue-300 font-bold text-xs tracking-widest uppercase mb-2">DIYA PRO SOFT</p>
                  <h1 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
                    Exam Question <br />
                    <span className="text-blue-300">Paper Setter</span>
                  </h1>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((f, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (i * 0.1) }}
                        className="flex gap-3"
                      >
                        <div className="text-blue-400 mt-1">{f.icon}</div>
                        <div>
                          <h3 className="font-bold text-sm">{f.title}:</h3>
                          <p className="text-xs text-blue-100/70 leading-relaxed">{f.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </section>

             {/* Right Panel with Animated Switch */}
              <section className="w-full md:w-5/12 bg-white p-8 flex flex-col justify-center relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {!showOTP ? (
                    /* LOGIN FORM */
                    <motion.div
                      key="login-form"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      className="max-w-md mx-auto w-full"
                    >
                      <h2 className="text-xl font-bold text-gray-800 mb-2">Welcome to the Question Paper Creation Portal!</h2>
                  <p className="text-sm text-gray-500 mb-8">
                    We're excited to have you here! You've been selected to create a question paper for 
                    <span className="font-semibold text-gray-700"> 25BSCA24 - Internet Technologies.</span>
                  </p>
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-5">
                        <div>
                          <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-tight">Email Address *</label>
                          <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your registered email"
                            className="w-full p-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
                          />
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-blue-600" />
                          <span className="text-xs text-gray-500">Agree to our <span className="text-blue-600 font-medium">Terms of use</span></span>
                        </label>
                        <button type="submit"
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg cursor-pointer transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                        >
                          {Loading ? "Please Wait Sending..." : "Send Verification Code"}
                          <ArrowRight size={18} />
                        </button>
                      </div>
                      </form>
                    </motion.div>
                  ) : (
                    /* OTP FORM */
                    <motion.div
                      key="otp-form"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      className="max-w-md mx-auto w-full"
                    >
                      <button onClick={() => setShowOTP(false)} className="flex items-center text-gray-400 hover:text-blue-600 mb-6 transition-colors">
                        <ChevronLeft size={20} /> <span className="text-sm font-medium">Back</span>
                      </button>
                      
                      <div className="flex flex-col items-center text-center mb-8">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                          <Lock size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Verify Email</h2>
                        <p className="text-sm text-gray-500 mt-2">We sent a 6-digit code to <br /><span className="font-bold text-gray-700">{email}</span></p>
                      </div>
                    <form onSubmit={handleSubmits}>
                      <div className="flex justify-between gap-2 mb-6">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            ref={(e) => (inputRef.current[index] = e)}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={index === 0 ? handlePaste : undefined}
                            className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-xl bg-gray-50 text-blue-900 focus:border-blue-500 focus:bg-white outline-none transition-all"
                          />
                        ))}
                      </div>

                      {error && <p className="text-red-500 text-xs text-center mb-4 font-medium">{error}</p>}

                      <button 
                        disabled={isVerifying}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isVerifying ? <Loader2 className="animate-spin" /> : "Verify & Continue"}
                      </button>
                        </form>
                      <div className="mt-8 text-center">
                        <p className="text-sm text-gray-400 mb-2">Didn't receive the code?</p>
                        {timer > 0 ? (
                          <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Resend in {timer}s</span>
                        ) : (
                          <button onClick={handleResend} className="text-sm cursor-pointer font-bold text-blue-600 hover:underline" disabled={resentloaing}>
                            {resentloaing ? "Sending..." : "Resend Code"}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExamPortal;



