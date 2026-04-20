

import { Outlet } from 'react-router-dom';
import Editor from './components/Editor';

const App = () => {
  return (
    <>
    {/* <Editor /> */}
      <Outlet />
    </>
  )
}

export default App;

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ShieldCheck, MailCheck, FileText, Lock } from "lucide-react";

// function Loader() {
//   return (
//     <motion.div
//       className="fixed inset-0 bg-black flex items-center justify-center z-50"
//       initial={{ y: 0 }}
//       animate={{ y: "-100%" }}
//       transition={{ delay: 2.5, duration: 1, ease: "easeInOut" }}
//     >
//       <motion.h1
//         className="text-white text-4xl md:text-6xl font-bold tracking-widest"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//       >
//         EMBASE
//       </motion.h1>
//     </motion.div>
//   );
// }

// export default function App() {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 3000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 relative overflow-hidden">
//       <AnimatePresence>{loading && <Loader />}</AnimatePresence>

//       {/* Main Layout */}
//       <div className="grid md:grid-cols-2 min-h-screen">
        
//         {/* LEFT SECTION */}
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 3 }}
//           className="bg-gradient-to-br from-blue-700 to-indigo-900 text-white p-12 flex flex-col justify-center"
//         >
//           <h1 className="text-4xl md:text-5xl font-bold mb-6">
//             Exam Question <br /> Paper Setter
//           </h1>

//           <div className="space-y-6 text-sm md:text-base">
//             <Feature icon={<ShieldCheck />} text="Secure Access with Link Sharing" />
//             <Feature icon={<MailCheck />} text="Email Verification & Encryption" />
//             <Feature icon={<FileText />} text="Blueprint Alignment & OBE Integration" />
//             <Feature icon={<Lock />} text="Digital Claim & Review System" />
//           </div>
//         </motion.div>

//         {/* RIGHT SECTION */}
//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 3 }}
//           className="bg-white flex items-center justify-center p-10"
//         >
//           <div className="w-full max-w-md space-y-6">
//             <h2 className="text-2xl font-semibold text-gray-800">
//               Welcome to the Question Paper Creation Portal
//             </h2>

//             <p className="text-gray-500 text-sm">
//               Please verify your email address to proceed.
//             </p>

//             <div className="space-y-4">
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
//               />

//               <div className="flex items-center space-x-2 text-sm text-gray-600">
//                 <input type="checkbox" className="accent-blue-600" />
//                 <span>I agree to the Terms of Use</span>
//               </div>

//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="w-full bg-blue-700 text-white py-3 rounded-xl shadow-lg hover:bg-blue-800 transition"
//               >
//                 Send Verification Code
//               </motion.button>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// function Feature({ icon, text }) {
//   return (
//     <motion.div
//       whileHover={{ x: 10 }}
//       className="flex items-center space-x-4"
//     >
//       <div className="bg-white/20 p-2 rounded-lg">{icon}</div>
//       <p>{text}</p>
//     </motion.div>
//   );
// }