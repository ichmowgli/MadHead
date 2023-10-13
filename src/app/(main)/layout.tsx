"use client";

import { Sidebar } from "./_components/sidebar";
import { useState } from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="relative flex h-screen w-screen flex-row bg-background dark:bg-[#1f1f1f]">
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <main className="h-full flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default MainLayout;
