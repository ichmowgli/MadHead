"use client";

import { useState } from "react";
import { Sidebar } from "./_components/sidebar";
import { useUser } from "@clerk/nextjs";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [showSidebar, setShowSidebar] = useState(true);

  const { user }  = useUser();

  if(!user) {
    return <>No user</>
  }

  return (
    <div className="relative flex h-screen w-screen flex-row bg-background dark:bg-[#1f1f1f]">
      <Sidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar} userId={user.id}      />
      <main className="h-full flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default MainLayout;
