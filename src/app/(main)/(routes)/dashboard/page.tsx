'use client'

import React, { useState } from "react";
import { Sidebar } from "../../_components/sidebar";

export default function Hallo() {
    const [showSidebar, setShowSidebar] = useState(true);

  return (
    <>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    <div className="scrollbar flex w-full flex-col items-center justify-start overflow-x-hidden overflow-y-scroll p-2 md:p-5">
    </div>
    </>
  );
}
