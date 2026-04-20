import React from "react";
import DashboardLayout from "./DashboardLayout";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EF4444", "#06B6D4"];

const DashCon = () => {
  const demoData = {
    allowedThings: [
      { department: "CS", subject: "DBMS" },
      { department: "CS", subject: "AI" },
      { department: "IT", subject: "Cloud" },
      { department: "ECE", subject: "VLSI" },
      { department: "CS", subject: "ML" },
      { department: "IT", subject: "Networking" },
    ],
    syllabus: [
      { month: "Jan", count: 5 },
      { month: "Feb", count: 8 },
      { month: "Mar", count: 12 },
      { month: "Apr", count: 18 },
      { month: "May", count: 10 },
    ],
    subjects: [
      { name: "DBMS", value: 10 },
      { name: "AI", value: 8 },
      { name: "ML", value: 12 },
      { name: "Cloud", value: 6 },
      { name: "Others", value: 4 },
    ],
  };

  const totalAllowedThings = demoData.allowedThings.length;
  const totalSyllabus = demoData.syllabus.reduce(
    (sum, item) => sum + item.count,
    0
  );

  // 📊 Department Mapping
  const departmentMap = {};
  demoData.allowedThings.forEach((item) => {
    departmentMap[item.department] =
      (departmentMap[item.department] || 0) + 1;
  });

  const departmentData = Object.keys(departmentMap).map((key) => ({
    name: key,
    value: departmentMap[key],
    extra: Math.floor(Math.random() * 5) + 1, // for stacked chart
  }));

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">

        {/* 🔥 STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="Allowed Things" value={totalAllowedThings} color="from-indigo-400 to-indigo-600" />
          <StatCard title="Syllabus Assigned" value={totalSyllabus} color="from-green-400 to-green-600" />
          <StatCard title="Active Departments" value={Object.keys(departmentMap).length} color="from-blue-400 to-blue-600" />
          <StatCard title="Subjects" value={demoData.subjects.length} color="from-pink-400 to-red-500" />
        </div>

        {/* 🧠 INSIGHTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InsightCard text="📊 CS department has highest activity" />
          <InsightCard text="📈 Syllabus growth increased in April" />
          <InsightCard text="🎯 AI & ML subjects dominate usage" />
        </div>

        {/* 📈 AREA + MINI LINE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* AREA */}
          <GlassCard title="Syllabus Growth">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={demoData.syllabus}>
                <defs>
                  <linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22C55E" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#22C55E" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area dataKey="count" stroke="#16A34A" fill="url(#areaColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>

          {/* DONUT */}
          <GlassCard title="Subject Distribution">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={demoData.subjects}
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                >
                  {demoData.subjects.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </GlassCard>

        </div>

        {/* 🍩 DONUT + PROGRESS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


          {/* MINI LINE */}
          <GlassCard title="Quick Trend">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={demoData.syllabus}>
                <Line dataKey="count" stroke="#6366F1" strokeWidth={2} />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </GlassCard>          

          {/* PROGRESS */}
          <GlassCard title="Performance">
            {demoData.subjects.map((item, i) => (
              <div key={i} className="mb-4">
                <p className="text-sm text-gray-600">{item.name}</p>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full"
                    style={{
                      width: `${item.value * 5}%`,
                      background: COLORS[i],
                    }}
                  />
                </div>
              </div>
            ))}
          </GlassCard>
        </div>

        {/* 📊 STACKED BAR */}
        <GlassCard title="Department Comparison (Stacked)">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" stackId="a" fill="#6366F1" />
              <Bar dataKey="extra" stackId="a" fill="#22C55E" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* 📊 BAR LAST */}
        <GlassCard title="Department Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366F1" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

      </div>
    </DashboardLayout>
  );
};

export default DashCon;

/* 🔹 COMPONENTS */

const StatCard = ({ title, value, color }) => (
  <div className={`bg-gradient-to-r ${color} text-white p-5 rounded-2xl shadow`}>
    <h3 className="text-sm">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

const GlassCard = ({ title, children }) => (
  <div className="bg-white/70 backdrop-blur-md p-5 rounded-2xl shadow border border-slate-400">
    <h2 className="text-lg font-semibold text-gray-700 mb-3">{title}</h2>
    {children}
  </div>
);

const InsightCard = ({ text }) => (
  <div className="bg-white p-4 rounded-xl shadow text-gray-700">
    {text}
  </div>
);