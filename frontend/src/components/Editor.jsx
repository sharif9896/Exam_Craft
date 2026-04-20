import { useRef, useState, useEffect } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link,
  Image,
  Table,
} from "lucide-react";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import DashboardLayout_2 from "./DashboardLayout_2";

export default function Editor() {
  const fileRefs = useRef([]);
  const editorRefs = useRef([]);

  const { staffId } = useAppContext();
  const mail = localStorage.getItem("user");
  const valid = mail?.toLowerCase();

  const [questions, setQuestions] = useState([]);
  const [saving, setSaving] = useState(false);
  const [mcqOptions, setMcqOptions] = useState({});
  const [examDetails, setExamDetails] = useState({});
  // ✅ SECTION CONFIG (NEW)
  const sectionMeta = {
    "Part-A": {
      heading: "Answer All the Questions",
      marks: "(10X1=10)",
    },
    "Part-B": {
      heading: "Answer All the Questions",
      marks: "(5X2=10)",
    },
    "Part-C": {
      heading: "Answer All the Questions",
      marks: "(5X5=25)",
    },
    "Part-D": {
      heading: "Answer ANY THREE Questions",
      marks: "(10X1=10)",
    },
  };

  // EXEC COMMAND
  const exec = (index, command, value = null) => {
    const editor = editorRefs.current[index];
    if (!editor) return;
    editor.focus();
    document.execCommand(command, false, value);
  };

  const addLink = (index) => {
    const url = prompt("Enter URL");
    if (url) exec(index, "createLink", url);
  };

  const insertTable = (index) => {
    const rows = parseInt(prompt("Rows?"));
    const cols = parseInt(prompt("Columns?"));
    if (!rows || !cols) return;

    let table = `<table border="1" style="width:100%;border-collapse:collapse; border: 2px solid black;">`;

    for (let i = 0; i < rows; i++) {
      table += "<tr>";
      for (let j = 0; j < cols; j++) {
        table += "<td style='padding:5px'>Cell</td>";
      }
      table += "</tr>";
    }

    table += "</table>";
    exec(index, "insertHTML", table);
  };

  // IMAGE UPLOAD
  const uploadImage = async (e, index) => {
    try {
      const form = new FormData();
      form.append("image", e.target.files[0]);

      const res = await axios.post("http://localhost:3095/upload", form);

      exec(
        index,
        "insertHTML",
        `<img src="${res.data.url}" style="max-width:100%;margin:10px 0"/>`,
      );
    } catch {
      alert("Image upload failed");
    }
  };

  // MCQ CHANGE
  const handleOptionChange = (index, option, value) => {
    setMcqOptions((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [option]: value,
      },
    }));
  };

  // GENERATE QUESTIONS
  const generatePaper = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3095/api/papers/latest/${valid}`,
      );

      const paper = Array.isArray(res.data) ? res.data[0] : res.data;

      setExamDetails({
        collegeName: paper.collegeName,
        examName: paper.examName,
        regNo: paper.regNo,
        session: paper.session,
        date: paper.date,
        monthYear: paper.monthYear,
        duration: paper.duration,
        maxMarks: paper.maxMarks,
      });

      let qList = [];
      let qNo = 1;

      paper.sections.forEach((section) => {
        section.questions.forEach((q) => {
          for (let i = 0; i < q.questionCount; i++) {
            qList.push({
              number: qNo++,
              section: section.sectionName,
              label: q.label || "",
            });
          }
        });
      });

      setQuestions(qList);
    } catch {
      alert("Failed to load questions");
    }
  };

  // ✅ BUILD PAYLOAD WITH HEADING + MARKS
  const buildPayload = (status) => {
    const structured = {};

    questions.forEach((q, i) => {
      if (!structured[q.section]) {
        structured[q.section] = {
          heading: sectionMeta[q.section]?.heading || "",
          marks: sectionMeta[q.section]?.marks || "",
          questions: [],
        };
      }

      structured[q.section].questions.push({
        questionNo: q.number,
        label: q.label,
        content: editorRefs.current[i]?.innerHTML || "",
        options:
          q.section === "Part-A"
            ? mcqOptions[i] || { A: "", B: "", C: "", D: "" }
            : null,
      });
    });

    return {
      staffId,
      examDetails,
      questions: structured,
      status,
    };
  };

  const saveContent = async () => {
    const payload = buildPayload("published");
    await axios.post("http://localhost:3095/save", payload);
    alert("Published successfully");
  };

  const saveDraft = async () => {
    const payload = buildPayload("draft");
    await axios.post("http://localhost:3095/save", payload);
    alert("Saved as draft");
  };

  useEffect(() => {
    generatePaper();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSaving(true);
      setTimeout(() => setSaving(false), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ✅ GROUP QUESTIONS BY SECTION
  const grouped = questions.reduce((acc, q, i) => {
    if (!acc[q.section]) acc[q.section] = [];
    acc[q.section].push({ ...q, index: i });
    return acc;
  }, {});

  return (
    <DashboardLayout_2>
      <div className="max-w-5xl mx-auto mt-10 space-y-8">
        {/* ✅ HEADER */}
        <div className="text-center font-bold space-y-1">
          <h2>{examDetails.collegeName}</h2>
          <h3>{examDetails.examName}</h3>
          <p>{examDetails.monthYear}</p>
          <div className="flex justify-between px-10 mt-2">
            <span>Reg No: {examDetails.regNo}</span>
            <span>Date: {examDetails.date}</span>
          </div>
          <div className="flex justify-between px-10">
            <span>Session: {examDetails.session}</span>
            <span>Duration: {examDetails.duration}</span>
            <span>Max Marks: {examDetails.maxMarks}</span>
          </div>
        </div>

        {Object.keys(grouped).map((section) => (
          <div key={section}>
            {/* ✅ SECTION HEADER */}
            <center className="font-bold text-lg">{section} </center>
            <div className="bg-gray-200 p-4 rounded-xl flex justify-between shadow font-bold text-lg">
              {sectionMeta[section]?.heading}{" "}
              <span className="text-blue-600">
                {sectionMeta[section]?.marks}
              </span>
            </div>

            {grouped[section].map((q, idx) => {
               let displayNumber = q.number;

              // ✅ PART-C FORMAT
              if (section === "Part-C") {
                const base = 16 + Math.floor(idx / 2);
                const sub = idx % 2 === 0 ? "(a)" : "(b)";
                displayNumber = `${base} ${sub}`;
              }
              return (
                <div key={q.index} className="mt-4">

                  <div className="border rounded-xl shadow">
                    <div className="flex gap-2 p-3 border-b bg-gray-100">
                      <button onClick={() => exec(q.index, "bold")}><Bold size={16} /></button>
                      <button onClick={() => exec(q.index, "italic")}><Italic size={16} /></button>
                      <button onClick={() => exec(q.index, "insertUnorderedList")}><List size={16} /></button>
                      <button onClick={() => exec(q.index, "insertOrderedList")}><ListOrdered size={16} /></button>
                      <button onClick={() => addLink(q.index)}><Link size={16} /></button>
                      <button onClick={() => fileRefs.current[q.index]?.click()}><Image size={16} /></button>
                      <button onClick={() => insertTable(q.index)}><Table size={16} /></button>
                    </div>

                    <input type="file" hidden ref={(el) => (fileRefs.current[q.index] = el)} onChange={(e) => uploadImage(e, q.index)} />

                    <div className="p-3 font-bold">{displayNumber}</div>

                    <div
                      ref={(el) => (editorRefs.current[q.index] = el)}
                      contentEditable
                      className="p-3 min-h-16 border-t"
                    />
                  </div>

                  {/* MCQ */}
                  {section === "Part-A" && (
                    <div className="mt-3 bg-blue-50 border p-4 rounded-xl">
                      <div className="grid grid-cols-2 gap-4">
                        {["A", "B", "C", "D"].map((opt) => (
                          <input
                            key={opt}
                            type="text"
                            placeholder={`Option ${opt}`}
                            className="border p-2 rounded"
                            value={mcqOptions[q.index]?.[opt] || ""}
                            onChange={(e) =>
                              handleOptionChange(q.index, opt, e.target.value)
                            }
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {/* BUTTONS */}
        <div className="text-center space-x-4">
          <button
            onClick={saveContent}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Publish
          </button>
          <button
            onClick={saveDraft}
            className="bg-gray-600 text-white px-6 py-2 rounded"
          >
            Save Draft
          </button>
          {saving && <p className="text-sm mt-2">Auto saving...</p>}
        </div>
      </div>
    </DashboardLayout_2>
  );
}

// import { useRef, useState, useEffect } from "react";
// import {
//   Bold,
//   Italic,
//   List,
//   ListOrdered,
//   Link,
//   Image,
//   Table,
//   Save,
// } from "lucide-react";
// import axios from "axios";
// import { useAppContext } from "../context/AppContext";
// import DashboardLayout_2 from "./DashboardLayout_2";

// export default function Editor() {
//   const fileRefs = useRef([]);
//   const editorRefs = useRef([]);
//   const {staffId, staffs} = useAppContext();
//   // console.log("Staff_ID : ", staffId);
//   const mail = localStorage.getItem("user");
//   const valid = mail.toLocaleLowerCase();
//   const [questions, setQuestions] = useState([]);
//   const [saving, setSaving] = useState(false);

//   // EXEC COMMAND
//   const exec = (index, command, value = null) => {
//     const editor = editorRefs.current[index];
//     if (!editor) return;

//     editor.focus();
//     document.execCommand(command, false, value);
//   };

//   const addLink = (index) => {
//     const url = prompt("Enter URL");
//     if (url) exec(index, "createLink", url);
//   };

//   const insertTable = (index) => {
//     const rows = parseInt(prompt("Rows?"));
//     const cols = parseInt(prompt("Columns?"));
//     if (!rows || !cols) return;

//     let table = `<table border="1" style="width:100%;border-collapse:collapse;">`;

//     for (let i = 0; i < rows; i++) {
//       table += "<tr>";
//       for (let j = 0; j < cols; j++) {
//         table += "<td style='padding:5px'>Cell</td>";
//       }
//       table += "</tr>";
//     }

//     table += "</table>";

//     exec(index, "insertHTML", table);
//   };

//   // IMAGE UPLOAD
//   const uploadImage = async (e, index) => {
//     try {
//       const form = new FormData();
//       form.append("image", e.target.files[0]);

//       const res = await axios.post("http://localhost:3095/upload", form);

//       exec(
//         index,
//         "insertHTML",
//         `<img src="${res.data.url}" style="max-width:100%;margin:10px 0"/>`
//       );
//     } catch {
//       alert("Image upload failed");
//     }
//   };

//   // GENERATE QUESTIONS
//   const generatePaper = async () => {
//     const res = await axios.get(`http://localhost:3095/api/papers/latest/${valid}`);
//     const paper = Array.isArray(res.data) ? res.data[0] : res.data;

//     let qList = [];
//     let qNo = 1;

//     paper.sections.forEach((section) => {
//       if (section.sectionName === "Part-C") {
//         section.questions.forEach((q) => {
//           for (let i = 0; i < q.questionCount; i++) {
//             qList.push({
//               number: qNo++,
//               section: section.sectionName,
//               label: q.label,
//             });
//           }
//         });
//       } else {
//         section.questions.forEach((q) => {
//           for (let i = 0; i < q.questionCount; i++) {
//             qList.push({
//               number: qNo++,
//               section: section.sectionName,
//             });
//           }
//         });
//       }
//     });

//     setQuestions(qList);
//   };

//   // ✅ PUBLISH SAVE
//   const saveContent = async () => {
//     const updated = questions.map((q, i) => ({
//       ...q,
//       content: editorRefs.current[i]?.innerHTML,
//     }));

//     await axios.post("http://localhost:3095/save", {
//       questions: updated,
//       status: "published",
//     });

//     alert("Published successfully");
//   };

//   // ✅ SAVE AS DRAFT
//   const saveDraft = async () => {
//     const updated = questions.map((q, i) => ({
//       ...q,
//       content: editorRefs.current[i]?.innerHTML,
//     }));

//     await axios.post("http://localhost:3095/save", {
//       questions: updated,
//       status: "draft",
//     });

//     alert("Saved as draft");
//   };

//   useEffect(() => {
//     generatePaper();
//   }, []);

//   // AUTO SAVE INDICATOR
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setSaving(true);
//       setTimeout(() => setSaving(false), 1000);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <DashboardLayout_2>
//     <div className="max-w-5xl mx-auto mt-10 space-y-6">

//       {questions.map((q, index) => (
//         <div key={index} className="border border-slate-400 rounded-xl shadow">

//           {/* TOOLBAR */}
//           <div className="flex flex-wrap gap-2 p-3 border-b border-slate-400 bg-gray-100">
//             <button onClick={() => exec(index, "bold")}><Bold size={16} /></button>
//             <button onClick={() => exec(index, "italic")}><Italic size={16} /></button>

//             <button onClick={() => exec(index, "insertUnorderedList")}><List size={16} /></button>
//             <button onClick={() => exec(index, "insertOrderedList")}><ListOrdered size={16} /></button>

//             <button onClick={() => addLink(index)}><Link size={16} /></button>

//             <button onClick={() => fileRefs.current[index].click()}>
//               <Image size={16} />
//             </button>

//             <button onClick={() => insertTable(index)}>
//               <Table size={16} />
//             </button>
//           </div>

//           {/* IMAGE INPUT */}
//           <input
//             type="file"
//             hidden
//             ref={(el) => (fileRefs.current[index] = el)}
//             onChange={(e) => uploadImage(e, index)}
//           />

//           {/* QUESTION LABEL */}
//           <div className="p-3 font-bold">
//             {q.section} {q.label ? `(${q.label})` : ""} - {q.number}.
//           </div>

//           {/* ✅ RESIZABLE EDITOR */}
//           <div
//             ref={(el) => (editorRefs.current[index] = el)}
//             contentEditable
//             className="p-3 min-h-5 outline-none resize-y overflow-auto"
//             style={{ resize: "vertical" }}
//           />
//         </div>
//       ))}

//       {/* BUTTONS */}
//       <div className="text-center space-x-4">
//         <button
//           onClick={saveContent}
//           className="bg-blue-600 text-white px-6 py-2 rounded"
//         >
//           Publish
//         </button>

//         <button
//           onClick={saveDraft}
//           className="bg-gray-600 text-white px-6 py-2 rounded"
//         >
//           Save as Draft
//         </button>

//         {saving && (
//           <p className="text-sm text-gray-500 mt-2">Auto saving...</p>
//         )}
//       </div>
//     </div>
//     </DashboardLayout_2>
//   );
// }

// import { useRef, useState, useEffect } from "react";
// import {
//   Bold,
//   Italic,
//   List,
//   ListOrdered,
//   Link,
//   Image,
//   Table,
//   Save,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import axios from "axios";

// export default function Editor() {
//   const editorRef = useRef(null);
//   const fileRef = useRef();

//   const [saving, setSaving] = useState(false);

//   const focusEditor = () => {
//     editorRef.current.focus();
//   };

//   const exec = (command, value = null) => {
//     focusEditor();
//     document.execCommand(command, false, value);
//   };

//   const increaseFont = () => exec("fontSize", 5);
//   const decreaseFont = () => exec("fontSize", 2);

//   const addLink = () => {
//     const url = prompt("Enter URL");
//     if (url) exec("createLink", url);
//   };

//   const insertTable = () => {
//     const rows = parseInt(prompt("Rows?"));
//     const cols = parseInt(prompt("Columns?"));

//     if (!rows || !cols) return;

//     let table = `<table border="1" style="width:100%;border-collapse:collapse;">`;

//     for (let i = 0; i < rows; i++) {
//       table += "<tr>";
//       for (let j = 0; j < cols; j++) {
//         table += "<td style='padding:5px'>Cell</td>";
//       }
//       table += "</tr>";
//     }

//     table += "</table>";

//     exec("insertHTML", table);
//   };

//   // IMAGE UPLOAD
//   const uploadImage = async (e) => {
//     try {
//       const form = new FormData();
//       form.append("image", e.target.files[0]);

//       const res = await axios.post("http://localhost:3095/upload", form, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const imageUrl = res.data.url;

//       exec(
//         "insertHTML",
//         `<img src="${imageUrl}" style="max-width:100%;margin:10px 0"/>`
//       );
//     } catch (err) {
//       console.error(err);
//       alert("Image upload failed");
//     }
//   };

//   // ✅ GENERATE PAPER (FIXED)
//   const generatePaper = async () => {
//     try {
//       const res = await axios.get("http://localhost:3095/api/papers/latest");
//       console.log(res, "API Response:");
//       // ✅ FIX: API returns array
//       const paper = Array.isArray(res.data) ? res.data[0] : res.data;
//       console.log(paper, "Generated Paper:");
//       if (!paper) {
//         alert("No paper found");
//         return;
//       }

//       let html = `
//         <h2 style="text-align:center">${paper.collegeName}</h2>
//         <h3 style="text-align:center">${paper.examName}</h3>
//         <p><b>Date:</b> ${paper.date} | <b>Session:</b> ${paper.session}</p>
//         <p><b>Duration:</b> ${paper.duration} | <b>Max Marks:</b> ${paper.maxMarks}</p>
//         <hr/>
//       `;

//       let questionNumber = 1;

//       paper.sections.forEach((section) => {
//         html += `<h3 style="margin-top:20px">${section.sectionName}</h3>`;

//         // ✅ PART-C (a, b)
//         if (section.sectionName === "Part-C") {
//           section.questions.forEach((q) => {
//             html += `<p><b>(${q.label})</b></p>`;

//             for (let i = 0; i < q.questionCount; i++) {
//               html += `
//                 <div style="margin-bottom:12px;">
//                   <label><b>${questionNumber}.</b></label>
//                   <div
//                     data-qno="${questionNumber}"
//                     contenteditable="true"
//                     style="border:1px solid #ccc;padding:10px;border-radius:6px;margin-top:5px;min-height:40px;">
//                     Enter question here...
//                   </div>
//                 </div>
//               `;
//               questionNumber++;
//             }
//           });
//         }

//         // ✅ OTHER PARTS
//         else {
//           section.questions.forEach((q) => {
//             for (let i = 0; i < q.questionCount; i++) {
//               html += `
//                 <div style="margin-bottom:12px;">
//                   <label><b>${questionNumber}.</b></label>
//                   <div
//                     data-qno="${questionNumber}"
//                     contenteditable="true"
//                     style="border:1px solid #ccc;padding:10px;border-radius:6px;margin-top:5px;min-height:40px;">
//                     Enter question here...
//                   </div>
//                 </div>
//               `;
//               questionNumber++;
//             }
//           });
//         }
//       });

//       editorRef.current.innerHTML = html;
//     } catch (err) {
//       console.error(err);
//       alert("Failed to generate paper");
//     }
//   };

//   // SAVE CONTENT
//   const saveContent = async () => {
//     try {
//       const html = editorRef.current.innerHTML;

//       await axios.post("http://localhost:3095/save", { content: html });

//       alert("Saved successfully");
//     } catch (err) {
//       console.error(err);
//       alert("Save failed");
//     }
//   };

//   // DRAFT SAVE
//   const saveDraft = async () => {
//     try {
//       const html = editorRef.current.innerHTML;

//       localStorage.setItem("editorDraft", html);

//       await axios.post("http://localhost:3095/draft", { content: html });

//       alert("Draft saved");
//     } catch (err) {
//       console.error(err);
//       alert("Draft failed");
//     }
//   };

//   // LOAD DRAFT OR GENERATE PAPER
//   useEffect(() => {
//     const draft = localStorage.getItem("editorDraft");

//     if (draft && editorRef.current) {
//       editorRef.current.innerHTML = draft;
//     } else {
//       // generatePaper(); // ✅ AUTO LOAD
//     }
//     generatePaper();
//   }, []);

//   // AUTO SAVE
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!editorRef.current) return;

//       const html = editorRef.current.innerHTML;

//       localStorage.setItem("editorDraft", html);

//       setSaving(true);
//       setTimeout(() => setSaving(false), 1000);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="max-w-5xl mx-auto mt-10 border rounded-xl shadow">
//       <motion.div
//         className="flex flex-wrap gap-2 p-3 border-b bg-gray-100 items-center"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         <button onClick={() => exec("bold")}>
//           <Bold size={18} />
//         </button>

//         <button onClick={() => exec("italic")}>
//           <Italic size={18} />
//         </button>

//         <button onClick={increaseFont}>A+</button>
//         <button onClick={decreaseFont}>A-</button>

//         <button onClick={() => exec("insertUnorderedList")}>
//           <List size={18} />
//         </button>

//         <button onClick={() => exec("insertOrderedList")}>
//           <ListOrdered size={18} />
//         </button>

//         <button onClick={addLink}>
//           <Link size={18} />
//         </button>

//         <button onClick={() => fileRef.current.click()}>
//           <Image size={18} />
//         </button>

//         <button onClick={insertTable}>
//           <Table size={18} />
//         </button>

//         <button
//           onClick={saveDraft}
//           className="bg-yellow-500 text-white px-3 py-1 rounded flex items-center gap-1"
//         >
//           <Save size={16} /> Draft
//         </button>

//         <button
//           onClick={saveContent}
//           className="ml-auto bg-blue-600 text-white px-3 py-1 rounded"
//         >
//           Publish
//         </button>

//         {saving && (
//           <span className="text-sm text-gray-500 ml-2">
//             Auto saving...
//           </span>
//         )}
//       </motion.div>

//       <input
//         type="file"
//         ref={fileRef}
//         hidden
//         accept="image/*"
//         onChange={uploadImage}
//       />

//       <div
//         ref={editorRef}
//         contentEditable
//         suppressContentEditableWarning
//         className="editor-content min-h-[400px] p-4 outline-none"
//         style={{ lineHeight: "1.6" }}
//       />
//     </div>
//   );
// }

// import { useRef, useState, useEffect } from "react";
// import {
//   Bold,
//   Italic,
//   List,
//   ListOrdered,
//   Link,
//   Image,
//   Table,
//   Save,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import axios from "axios";

// export default function Editor() {
//   const editorRef = useRef(null);
//   const fileRef = useRef();

//   const [saving, setSaving] = useState(false);

//   const focusEditor = () => {
//     editorRef.current.focus();
//   };

//   const exec = (command, value = null) => {
//     focusEditor();
//     document.execCommand(command, false, value);
//   };

//   const increaseFont = () => exec("fontSize", 5);
//   const decreaseFont = () => exec("fontSize", 2);

//   const addLink = () => {
//     const url = prompt("Enter URL");
//     if (url) exec("createLink", url);
//   };

//   const insertTable = () => {
//     const rows = parseInt(prompt("Rows?"));
//     const cols = parseInt(prompt("Columns?"));

//     if (!rows || !cols) return;

//     let table = `<table border="1" style="width:100%;border-collapse:collapse;">`;

//     for (let i = 0; i < rows; i++) {
//       table += "<tr>";
//       for (let j = 0; j < cols; j++) {
//         table += "<td style='padding:5px'>Cell</td>";
//       }
//       table += "</tr>";
//     }

//     table += "</table>";

//     exec("insertHTML", table);
//   };

//   // IMAGE UPLOAD
//   const uploadImage = async (e) => {
//     const form = new FormData();
//     form.append("image", e.target.files[0]);

//     const res = await axios.post("http://localhost:3095/upload", form, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     const imageUrl = res.data.url;

//     exec(
//       "insertHTML",
//       `<img src="${imageUrl}" style="max-width:100%;margin:10px 0"/>`
//     );
//   };

// const generatePaper = async () => {
//   try {
//     const res = await axios.get("http://localhost:3095/api/papers/latest");
//     const paper = res.data;
//     console.log(paper);
//     let html = `
//       <h2 style="text-align:center">${paper.collegeName}</h2>
//       <h3 style="text-align:center">${paper.examName}</h3>
//       <p><b>Date:</b> ${paper.date} | <b>Session:</b> ${paper.session}</p>
//       <p><b>Duration:</b> ${paper.duration} | <b>Max Marks:</b> ${paper.maxMarks}</p>
//       <hr/>
//     `;

//     let questionNumber = 1;

//     paper.sections.forEach((sec) => {
//       html += `<h3>${sec.sectionName}</h3>`;

//       // ✅ PART C (a, b)
//       if (sec.sectionName === "Part-C") {
//         sec.questions.forEach((q) => {
//           html += `<p><b>(${q.label})</b></p>`;

//           for (let i = 0; i < q.questionCount; i++) {
//             html += `
//               <div style="margin-bottom:10px;">
//                 <label><b>${questionNumber++}.</b></label>
//                 <div contenteditable="true"
//                   style="border:1px solid #ccc;padding:8px;border-radius:5px;margin-top:5px;">
//                   Enter question here...
//                 </div>
//               </div>
//             `;
//           }
//         });
//       }

//       // ✅ OTHER PARTS
//       else {
//         sec.questions.forEach((q) => {
//           for (let i = 0; i < q.questionCount; i++) {
//             html += `
//               <div style="margin-bottom:10px;">
//                 <label><b>${questionNumber++}.</b></label>
//                 <div contenteditable="true"
//                   style="border:1px solid #ccc;padding:8px;border-radius:5px;margin-top:5px;">
//                   Enter question here...
//                 </div>
//               </div>
//             `;
//           }
//         });
//       }
//     });

//     editorRef.current.innerHTML = html;

//   } catch (err) {
//     console.error(err);
//     alert("Failed to generate paper");
//   }
// };

//   // SAVE CONTENT
//   const saveContent = async () => {
//     const html = editorRef.current.innerHTML;

//     await axios.post("http://localhost:3095/save", { content: html });

//     alert("Saved successfully");
//   };

//   // DRAFT SAVE
//   const saveDraft = async () => {
//     const html = editorRef.current.innerHTML;

//     localStorage.setItem("editorDraft", html);

//     await axios.post("http://localhost:3095/draft", { content: html });

//     alert("Draft saved");
//   };

//   // LOAD DRAFT OR GENERATE PAPER
//   useEffect(() => {
//     const draft = localStorage.getItem("editorDraft");

//     if (draft && editorRef.current) {
//       editorRef.current.innerHTML = draft;
//     } else {
//       generatePaper(); // ✅ AUTO LOAD PAPER
//     }
//   }, []);

//   // AUTO SAVE
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!editorRef.current) return;

//       const html = editorRef.current.innerHTML;

//       localStorage.setItem("editorDraft", html);

//       setSaving(true);
//       setTimeout(() => setSaving(false), 1000);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="max-w-5xl mx-auto mt-10 border rounded-xl shadow">
//       <motion.div
//         className="flex flex-wrap gap-2 p-3 border-b bg-gray-100 items-center"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         <button onClick={() => exec("bold")}>
//           <Bold size={18} />
//         </button>

//         <button onClick={() => exec("italic")}>
//           <Italic size={18} />
//         </button>

//         <button onClick={increaseFont}>A+</button>
//         <button onClick={decreaseFont}>A-</button>

//         <button onClick={() => exec("insertUnorderedList")}>
//           <List size={18} />
//         </button>

//         <button onClick={() => exec("insertOrderedList")}>
//           <ListOrdered size={18} />
//         </button>

//         <button onClick={addLink}>
//           <Link size={18} />
//         </button>

//         <button onClick={() => fileRef.current.click()}>
//           <Image size={18} />
//         </button>

//         <button onClick={insertTable}>
//           <Table size={18} />
//         </button>

//         <button
//           onClick={saveDraft}
//           className="bg-yellow-500 text-white px-3 py-1 rounded flex items-center gap-1"
//         >
//           <Save size={16} /> Draft
//         </button>

//         <button
//           onClick={saveContent}
//           className="ml-auto bg-blue-600 text-white px-3 py-1 rounded"
//         >
//           Publishjsjdjs
//         </button>

//         {saving && (
//           <span className="text-sm text-gray-500 ml-2">Auto saving...</span>
//         )}
//       </motion.div>

//       <input
//         type="file"
//         ref={fileRef}
//         hidden
//         accept="image/*"
//         onChange={uploadImage}
//       />

//       <div
//         ref={editorRef}
//         contentEditable
//         suppressContentEditableWarning
//         className="editor-content min-h-[400px] p-4 outline-none"
//         style={{ lineHeight: "1.6" }}
//       />
//     </div>
//   );
// }
