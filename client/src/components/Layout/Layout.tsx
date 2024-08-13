import { Outlet } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useState } from "react";

export default function Layout() {
  const [isTextHidden, setIsTextHidden] = useState(true);

  console.log("Is text hidden:", isTextHidden);

  return (
    <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] h-screen">
      <div className="col-span-2">
        <Header
          onHamburgerClick={() => {
            setIsTextHidden(!isTextHidden);
          }}
        />
      </div>
      <div className="h-full">
        <Sidebar textHidden={isTextHidden} />
      </div>
      <div className="overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
