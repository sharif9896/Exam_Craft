import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Sidebar_2 from "./Sidebar_2";
import Navbar_2 from "./Navbar_2";

export default function DashboardLayout_2({ children }) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">

      <Sidebar_2 sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1">

        <Navbar_2 setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}