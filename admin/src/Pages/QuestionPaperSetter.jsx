import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function QuestionPaperTemplate() {
  const navigate = useNavigate();

  const [section, setSection] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ STORE ALL SECTIONS
  const [sections, setSections] = useState([]);

  const [formData, setFormData] = useState({
    date: "",
    session: "",
    regNo: "",
    collegeName: "",
    examName: "",
    monthYear: "",
    duration: "",
    maxMarks: "",
    marks: "",
    sectionHeading: "",
    questionA: "",
    questionB: "",
    staffId: "",
    staffName: "",
    staffAllowedDepartment: "",
    StaffEmail: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("pendingPermissionStaff");
    if (savedData) {
      try {
        const staff = JSON.parse(savedData);
        setFormData((prev) => ({
          ...prev,
          staffId: staff.StaffId || "",
          staffName: staff.StaffName || "",
          StaffEmail: staff.StaffEmail || "",
          staffAllowedDepartment: staff.AllowedDepartment || "",
          staffAllowedClass: staff.AllowedClass || "",
          staffAllowedSubject: staff.AllowedSubject || "",
          staffAllowedSemester: staff.AllowedSemester || "",
        }));
      } catch (error) {
        console.error("Error loading staff data", error);
      }
    }
  }, []);
  console.log(formData);
  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ BUILD SECTION (LOGIC FROM SECOND CODE)
  const buildSection = () => {
    if (!section) return null;

    if (section === "A") {
      return {
        sectionName: "Part-A",
        marks: formData.marks,
        heading: formData.sectionHeading,
        questions: [{ questionCount: Number(formData.questionA) || 0 }],
      };
    }

    if (section === "B") {
      return {
        sectionName: "Part-B",
        marks: formData.marks,
        heading: formData.sectionHeading,
        questions: [{ questionCount: Number(formData.questionA) || 0 }],
      };
    }

    if (section === "C") {
      return {
        sectionName: "Part-C",
        marks: formData.marks,
        heading: formData.sectionHeading,
        questions: [
          { label: "a", questionCount: Number(formData.questionA) || 0 },
          { label: "b", questionCount: Number(formData.questionB) || 0 },
        ],
      };
    }

    if (section === "D") {
      return {
        sectionName: "Part-D",
        marks: formData.marks,
        heading: formData.sectionHeading,
        questions: [{ questionCount: Number(formData.questionA) || 0 }],
      };
    }
  };

  // ✅ SUBMIT (ADVANCED LOGIC)
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const newSection = buildSection();
      if (!newSection) return;

      // ✅ REMOVE DUPLICATES + ADD NEW
      const updatedSections = [
        ...sections.filter((s) => s.sectionName !== newSection.sectionName),
        newSection,
      ];

      setSections(updatedSections);

      const payload = {
        date: formData.date,
        session: formData.session,
        regNo: formData.regNo,
        collegeName: formData.collegeName,
        examName: formData.examName,
        monthYear: formData.monthYear,
        duration: formData.duration,
        maxMarks: formData.maxMarks,
        sections: updatedSections,
        staffId: formData.staffId,
        staffName: formData.staffName,
        staffAllowedDepartment: formData.staffAllowedDepartment,
        StaffEmail: formData.StaffEmail,
      };

      await fetch("http://localhost:3095/api/papers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      toast.success("✅ Section Saved Successfully");

      // ✅ CHECK COMPLETION
      const names = updatedSections.map((s) => s.sectionName);

      const isComplete =
        names.includes("Part-A") &&
        names.includes("Part-B") &&
        names.includes("Part-C") &&
        names.includes("Part-D");

      if (isComplete) {
        toast.success("🎉 All Sections Added → Redirecting to Editor...");
        // navigate("/editor");
      }
      localStorage.removeItem("pendingPermissionStaff");
    } catch (err) {
      console.error(err);
      alert("❌ Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 p-6 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-5xl p-6 rounded-xl shadow-xl border border-slate-400"
      >
        {/* HEADER */}
        <div className="space-y-3">
          <div className="flex justify-between gap-2">
            <input
              name="staffId"
              className="input w-1/4"
              value={formData.staffId}
              onChange={handleChange}
              readOnly
            />
            <input
              name="staffName"
              className="input w-1/4"
              value={formData.staffName}
              onChange={handleChange}
              readOnly
            />
            <input
              name="staffAllowedDepartment"
              className="input w-1/4"
              value={formData.staffAllowedDepartment}
              onChange={handleChange}
              readOnly
            />
            <input
              name="StaffEmail"
              className="input w-1/4"
              value={formData.StaffEmail}
              readOnly
            />
          </div>
          <div className="flex justify-between gap-2">
            <input
              name="date"
              className="input w-1/4"
              placeholder="Date"
              onChange={handleChange}
            />
            <input
              name="session"
              className="input w-1/4"
              placeholder="Session"
              onChange={handleChange}
            />
            <input
              name="regNo"
              className="input w-1/4"
              placeholder="Reg No"
              onChange={handleChange}
            />
          </div>

          <input
            name="collegeName"
            className="input w-full"
            placeholder="College Name"
            onChange={handleChange}
          />

          <div className="flex gap-4">
            <input
              name="examName"
              className="input w-1/3"
              placeholder="Exam Name"
              onChange={handleChange}
            />
            <input
              name="monthYear"
              className="input w-1/3"
              placeholder="Month / Year"
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-4">
            <input
              name="duration"
              className="input w-1/3"
              placeholder="Duration"
              onChange={handleChange}
            />
            <input
              name="maxMarks"
              className="input w-1/3"
              placeholder="Max Marks"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* SECTION BLOCK */}
        <div className="mt-8 border-t border-slate-400 pt-6">
          <div className="flex items-center gap-4">
            <label className="font-semibold">Select Section:</label>

            <select
              className="input w-40"
              value={section}
              onChange={(e) => setSection(e.target.value)}
            >
              <option value="">--Select--</option>
              <option value="A">PART-A</option>
              <option value="B">PART-B</option>
              <option value="C">PART-C</option>
              <option value="D">PART-D</option>
            </select>

            <input
              name="marks"
              onChange={handleChange}
              className="input w-1/3"
              placeholder="Marks (e.g. 10x2=20)"
            />
          </div>

          <input
            name="sectionHeading"
            className="input w-full mt-4"
            placeholder="Section Heading"
            onChange={handleChange}
          />

          <AnimatePresence>
            {(section === "A" || section === "B" || section === "D") && (
              <motion.div className="mt-4">
                <label className="text-sm text-slate-600">
                  Question ({section})
                </label>
                <input
                  name="questionA"
                  type="number"
                  onChange={handleChange}
                  className="input mt-1"
                  placeholder="Enter Question Count"
                />
              </motion.div>
            )}

            {section === "C" && (
              <motion.div className="mt-4 space-y-3">
                <input
                  name="questionA"
                  type="number"
                  onChange={handleChange}
                  className="input"
                  placeholder="(a)"
                />
                <input
                  name="questionB"
                  type="number"
                  onChange={handleChange}
                  className="input"
                  placeholder="(b)"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 border-t border-slate-400 pt-6 text-slate-500 text-sm">
          👉 Add sections one by one (A → B → C → D)
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 w-full bg-slate-800 text-white py-2 rounded-lg"
        >
          {loading ? "Saving..." : "Save Section"}
        </button>

        <style>
          {`
            .input {
              border: 1px solid #cbd5e1;
              padding: 8px;
              border-radius: 6px;
              width: 100%;
              outline: none;
            }
          `}
        </style>
      </motion.div>
    </div>
  );
}

// br

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// export default function QuestionPaperTemplate() {
//   const navigate = useNavigate();

//   const [section, setSection] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [sections, setSections] = useState([]);

//   const [formData, setFormData] = useState({
//     date: "",
//     session: "",
//     regNo: "",
//     collegeName: "",
//     examName: "",
//     monthYear: "",
//     duration: "",
//     maxMarks: "",
//     questionA: "",
//     questionB: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const buildSection = () => {
//     if (!section) return null;

//     if (section === "A") {
//       return {
//         sectionName: "Part-A",
//         questions: [{ questionCount: Number(formData.questionA) || 0 }],
//       };
//     }

//     if (section === "B") {
//       return {
//         sectionName: "Part-B",
//         questions: [{ questionCount: Number(formData.questionA) || 0 }],
//       };
//     }

//     if (section === "C") {
//       return {
//         sectionName: "Part-C",
//         questions: [
//           { label: "a", questionCount: Number(formData.questionA) || 0 },
//           { label: "b", questionCount: Number(formData.questionB) || 0 },
//         ],
//       };
//     }

//     if (section === "D") {
//       return {
//         sectionName: "Part-D",
//         questions: [{ questionCount: Number(formData.questionA) || 0 }],
//       };
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);

//       const newSection = buildSection();
//       if (!newSection) return;

//       const updatedSections = [
//         ...sections.filter((s) => s.sectionName !== newSection.sectionName),
//         newSection,
//       ];

//       setSections(updatedSections);

//       const payload = {
//         ...formData,
//         sections: updatedSections,
//       };

//       await fetch("http://localhost:3095/api/papers", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       alert("✅ Section Saved");

//       const names = updatedSections.map((s) => s.sectionName);

//       const isComplete =
//         names.includes("Part-A") &&
//         names.includes("Part-B") &&
//         names.includes("Part-C") &&
//         names.includes("Part-D");

//       if (isComplete) {
//         alert("🎉 All Sections Added → Redirecting...");
//         navigate("/editor");
//       }

//     } catch (err) {
//       console.error(err);
//       alert("❌ Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 flex justify-center items-center p-6">

//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-white/80 backdrop-blur-lg w-full max-w-5xl p-8 rounded-2xl shadow-2xl border"
//       >

//         {/* HEADER */}
//         <h2 className="text-2xl font-bold mb-6 text-slate-700">
//           Create Question Paper
//         </h2>

//         <div className="grid grid-cols-3 gap-4">
//           <input name="date" placeholder="Date" onChange={handleChange} className="input"/>
//           <input name="session" placeholder="Session" onChange={handleChange} className="input"/>
//           <input name="regNo" placeholder="Register No" onChange={handleChange} className="input"/>
//         </div>

//         <input name="collegeName" placeholder="College Name" onChange={handleChange} className="input mt-4"/>

//         <div className="grid grid-cols-2 gap-4 mt-4">
//           <input name="examName" placeholder="Exam Name" onChange={handleChange} className="input"/>
//           <input name="monthYear" placeholder="Month / Year" onChange={handleChange} className="input"/>
//         </div>

//         <div className="grid grid-cols-2 gap-4 mt-4">
//           <input name="duration" placeholder="Duration" onChange={handleChange} className="input"/>
//           <input name="maxMarks" placeholder="Max Marks" onChange={handleChange} className="input"/>
//         </div>

//         {/* SECTION */}
//         <div className="mt-8 border-t pt-6">
//           <h3 className="font-semibold mb-3 text-slate-600">Add Section</h3>

//           <select
//             value={section}
//             onChange={(e) => setSection(e.target.value)}
//             className="input"
//           >
//             <option value="">Select Section</option>
//             <option value="A">Part-A</option>
//             <option value="B">Part-B</option>
//             <option value="C">Part-C</option>
//             <option value="D">Part-D</option>
//           </select>

//           <AnimatePresence mode="wait">
//             {(section === "A" || section === "B" || section === "D") && (
//               <motion.input
//                 key="single"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 type="number"
//                 name="questionA"
//                 placeholder="Number of Questions"
//                 onChange={handleChange}
//                 className="input mt-3"
//               />
//             )}

//             {section === "C" && (
//               <motion.div
//                 key="double"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="mt-3 space-y-2"
//               >
//                 <input name="questionA" placeholder="(a)" onChange={handleChange} className="input"/>
//                 <input name="questionB" placeholder="(b)" onChange={handleChange} className="input"/>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* ADDED SECTIONS PREVIEW 🔥 */}
//           <div className="flex flex-wrap gap-2 mt-4">
//             {sections.map((s, i) => (
//               <span
//                 key={i}
//                 className="bg-slate-800 text-white px-3 py-1 rounded-full text-sm"
//               >
//                 {s.sectionName}
//               </span>
//             ))}
//           </div>
//         </div>

//         <button
//           onClick={handleSubmit}
//           className="mt-8 w-full bg-slate-900 hover:bg-slate-700 text-white py-3 rounded-xl transition"
//         >
//           {loading ? "Saving..." : "Save Section"}
//         </button>

//         <style>
//           {`
//             .input {
//               border: 1px solid #e2e8f0;
//               padding: 10px;
//               border-radius: 10px;
//               width: 100%;
//               outline: none;
//               transition: 0.2s;
//             }
//             .input:focus {
//               border-color: #1e293b;
//               box-shadow: 0 0 0 2px rgba(30,41,59,0.1);
//             }
//           `}
//         </style>

//       </motion.div>
//     </div>
//   );
// }

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// export default function QuestionPaperTemplate() {
//   const navigate = useNavigate();

//   const [section, setSection] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ✅ STORE ALL SECTIONS
//   const [sections, setSections] = useState([]);

//   const [formData, setFormData] = useState({
//     date: "",
//     session: "",
//     regNo: "",
//     collegeName: "",
//     examName: "",
//     monthYear: "",
//     duration: "",
//     maxMarks: "",
//     questionA: "",
//     questionB: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // ✅ BUILD SECTION
//   const buildSection = () => {
//     if (!section) return null;

//     if (section === "A") {
//       return {
//         sectionName: "Part-A",
//         questions: [{ questionCount: Number(formData.questionA) || 0 }],
//       };
//     }

//     if (section === "B") {
//       return {
//         sectionName: "Part-B",
//         questions: [{ questionCount: Number(formData.questionA) || 0 }],
//       };
//     }

//     if (section === "C") {
//       return {
//         sectionName: "Part-C",
//         questions: [
//           { label: "a", questionCount: Number(formData.questionA) || 0 },
//           { label: "b", questionCount: Number(formData.questionB) || 0 },
//         ],
//       };
//     }

//     if (section === "D") {
//       return {
//         sectionName: "Part-D",
//         questions: [{ questionCount: Number(formData.questionA) || 0 }],
//       };
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);

//       const newSection = buildSection();
//       if (!newSection) return;

//       // ✅ REMOVE DUPLICATES + ADD NEW
//       const updatedSections = [
//         ...sections.filter((s) => s.sectionName !== newSection.sectionName),
//         newSection,
//       ];

//       setSections(updatedSections);

//       const payload = {
//         ...formData,
//         sections: updatedSections,
//       };

//       await fetch("http://localhost:3095/api/papers", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       alert("✅ Section Saved");

//       // ✅ CHECK ALL SECTIONS
//       const names = updatedSections.map((s) => s.sectionName);

//       const isComplete =
//         names.includes("Part-A") &&
//         names.includes("Part-B") &&
//         names.includes("Part-C") &&
//         names.includes("Part-D");

//       if (isComplete) {
//         alert("🎉 All Sections Added → Redirecting...");
//         navigate("/editor");
//       }

//     } catch (err) {
//       console.error(err);
//       alert("❌ Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-200 p-6 flex justify-center">
//       <motion.div className="bg-white w-full max-w-5xl p-6 rounded-xl shadow-xl border">

//         {/* HEADER */}
//         <div className="space-y-3">
//           <div className="flex gap-2">
//             <input name="date" placeholder="Date" onChange={handleChange} className="input"/>
//             <input name="session" placeholder="Session" onChange={handleChange} className="input"/>
//             <input name="regNo" placeholder="Reg No" onChange={handleChange} className="input"/>
//           </div>

//           <input name="collegeName" placeholder="College Name" onChange={handleChange} className="input"/>

//           <div className="flex gap-2">
//             <input name="examName" placeholder="Exam Name" onChange={handleChange} className="input"/>
//             <input name="monthYear" placeholder="Month/Year" onChange={handleChange} className="input"/>
//           </div>

//           <div className="flex gap-2">
//             <input name="duration" placeholder="Duration" onChange={handleChange} className="input"/>
//             <input name="maxMarks" placeholder="Max Marks" onChange={handleChange} className="input"/>
//           </div>
//         </div>

//         {/* SECTION */}
//         <div className="mt-6">
//           <select
//             value={section}
//             onChange={(e) => setSection(e.target.value)}
//             className="input"
//           >
//             <option value="">Select Section</option>
//             <option value="A">Part-A</option>
//             <option value="B">Part-B</option>
//             <option value="C">Part-C</option>
//             <option value="D">Part-D</option>
//           </select>

//           <AnimatePresence>
//             {(section === "A" || section === "B" || section === "D") && (
//               <input
//                 type="number"
//                 name="questionA"
//                 placeholder="Number of Questions"
//                 onChange={handleChange}
//                 className="input mt-3"
//               />
//             )}

//             {section === "C" && (
//               <div className="mt-3 space-y-2">
//                 <input name="questionA" placeholder="(a)" onChange={handleChange} className="input"/>
//                 <input name="questionB" placeholder="(b)" onChange={handleChange} className="input"/>
//               </div>
//             )}
//           </AnimatePresence>
//         </div>

//         <button
//           onClick={handleSubmit}
//           className="mt-6 w-full bg-slate-800 text-white py-2 rounded"
//         >
//           {loading ? "Saving..." : "Save Section"}
//         </button>

//         <style>
//           {`
//             .input {
//               border: 1px solid #ccc;
//               padding: 8px;
//               border-radius: 6px;
//               width: 100%;
//             }
//           `}
//         </style>

//       </motion.div>
//     </div>
//   );
// }

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function QuestionPaperTemplate() {
//   const [section, setSection] = useState("");

//   const [formData, setFormData] = useState({
//     date: "",
//     session: "",
//     regNo: "",
//     collegeName: "",
//     examName: "",
//     monthYear: "",
//     duration: "",
//     maxMarks: "",
//     marks: "",
//     sectionHeading: "",
//     questionA: "",
//     questionB: "",
//   });

//   const [loading, setLoading] = useState(false);

//   // ✅ SAME HANDLE CHANGE
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // ✅ UPDATED SUBMIT LOGIC (IMPORTANT)
//   const handleSubmit = async () => {
//     try {
//       setLoading(true);

//       // 👉 Build ALL sections based on current input
//       let sections = [];

//       if (section === "A") {
//         sections.push({
//           sectionName: "Part-A",
//           questions: [{ questionCount: Number(formData.questionA) || 0 }],
//         });
//       }

//       if (section === "B") {
//         sections.push({
//           sectionName: "Part-B",
//           questions: [{ questionCount: Number(formData.questionA) || 0 }],
//         });
//       }

//       if (section === "C") {
//         sections.push({
//           sectionName: "Part-C",
//           questions: [
//             {
//               label: "a",
//               questionCount: Number(formData.questionA) || 0,
//             },
//             {
//               label: "b",
//               questionCount: Number(formData.questionB) || 0,
//             },
//           ],
//         });
//       }

//       if (section === "D") {
//         sections.push({
//           sectionName: "Part-D",
//           questions: [{ questionCount: Number(formData.questionA) || 0 }],
//         });
//       }

//       const payload = {
//         date: formData.date,
//         session: formData.session,
//         regNo: formData.regNo,
//         collegeName: formData.collegeName,
//         examName: formData.examName,
//         monthYear: formData.monthYear,
//         duration: formData.duration,
//         maxMarks: formData.maxMarks,
//         sections: sections, // ✅ FIXED
//       };

//       console.log("Payload:", payload);

//       const res = await fetch("http://localhost:3095/api/papers", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       console.log("Response:", data);

//       alert("✅ Section Saved Successfully (Add next section)");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-200 p-6 flex justify-center">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-white w-full max-w-5xl p-6 rounded-xl shadow-xl border"
//       >
//         {/* HEADER */}
//         <div className="space-y-3">
//           <div className="flex justify-between">
//             <input
//               name="date"
//               className="input w-1/4 p-1 border border-slate-400 outline-blue-900 rounded"
//               placeholder="Date"
//               onChange={handleChange}
//             />
//             <input
//               name="session"
//               className="input w-1/4 p-1 border border-slate-400 outline-blue-900 rounded"
//               placeholder="Session"
//               onChange={handleChange}
//             />
//             <input
//               name="regNo"
//               className="input w-1/4 p-1 border border-slate-400 outline-blue-900 rounded"
//               placeholder="Reg No"
//               onChange={handleChange}
//             />
//           </div>

//           <input
//             name="collegeName"
//             className="input w-full p-1 border border-slate-400 outline-blue-900 rounded"
//             placeholder="College Name"
//             onChange={handleChange}
//           />

//           <div className="flex gap-4">
//             <input
//               name="examName"
//               className="input flex-1 p-1 border border-slate-400 outline-blue-900 rounded"
//               placeholder="Exam Name"
//               onChange={handleChange}
//             />
//             <input
//               name="monthYear"
//               className="input w-1/3 p-1 border border-slate-400 outline-blue-900 rounded"
//               placeholder="Month / Year"
//               onChange={handleChange}
//             />
//           </div>

//           <div className="flex gap-4">
//             <input
//               name="duration"
//               className="input w-1/3 p-1 border border-slate-400 outline-blue-900 rounded"
//               placeholder="Duration"
//               onChange={handleChange}
//             />
//             <input
//               name="maxMarks"
//               className="input w-1/3 p-1 border border-slate-400 outline-blue-900 rounded"
//               placeholder="Max Marks"
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         {/* SECTION BLOCK */}
//         <div className="mt-8 border-t pt-6">
//           <div className="flex items-center gap-4">
//             <label className="font-semibold">Select Section:</label>

//             <select
//               className="input w-40 p-1 border border-slate-400 outline-blue-900 rounded"
//               value={section}
//               onChange={(e) => setSection(e.target.value)}
//             >
//               <option value="">--Select--</option>
//               <option value="A">PART-A</option>
//               <option value="B">PART-B</option>
//               <option value="C">PART-C</option>
//               <option value="D">PART-D</option>
//             </select>

//             <input
//               name="marks"
//               onChange={handleChange}
//               className="input flex-1 p-1 border border-slate-400 outline-blue-900 rounded"
//               placeholder="Marks (Table) in () parameters"
//             />
//           </div>

//           <input
//             name="sectionHeading"
//             className="input w-full mt-4 p-1 border border-slate-400 outline-blue-900 rounded"
//             placeholder="Section Heading"
//             onChange={handleChange}
//           />

//           <AnimatePresence>
//             {(section === "A" || section === "B" || section === "D") && (
//               <motion.div className="mt-4">
//                 <label className="text-sm text-slate-600">
//                   Question ({section})
//                 </label>
//                 <input
//                   name="questionA"
//                   type="number"
//                   onChange={handleChange}
//                   className="input mt-1 ml-1 p-1 border border-slate-400 outline-blue-900 rounded"
//                   placeholder="Enter Question Number"
//                 />
//               </motion.div>
//             )}

//             {section === "C" && (
//               <motion.div className="mt-4 space-y-3">
//                 <input
//                   name="questionA"
//                   type="number"
//                   onChange={handleChange}
//                   className="input"
//                   placeholder="(a)"
//                 />
//                 <input
//                   name="questionB"
//                   type="number"
//                   onChange={handleChange}
//                   className="input"
//                   placeholder="(b)"
//                 />
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         <div className="mt-8 border-t pt-6 text-slate-500 text-sm">
//           👉 Add each section one by one (A → B → C → D)
//         </div>

//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="mt-6 w-full bg-slate-800 text-white py-2 rounded-lg"
//         >
//           {loading ? "Saving..." : "Save Section"}
//         </button>

//         <style>
//           {`
//             .input {
//               @apply border border-slate-300 p-2 rounded-md w-full;
//             }
//           `}
//         </style>
//       </motion.div>
//     </div>
//   );
// }
