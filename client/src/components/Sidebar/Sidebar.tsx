import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";

export default function Sidebar() {
  const [isTextHidden, setIsTextHidden] = useState(true);
  const location = useLocation();

  console.log(location.pathname);

  const getPathName = (text: string) => {
    text = text.toLowerCase();

    if (text === "home") {
      return "/";
    } else if (text === "archive") {
      return "/archive";
    } else if (text === "bin") {
      return "/bin";
    }
  };

  const content = (img: React.ReactNode, text: string) => {
    const isActive = location.pathname === getPathName(text);
    return (
      <div
        className={`flex gap-4 rounded-e-full items-center ${
          !isTextHidden
            ? `hover:bg-gray-200 w-48 px-5 ${
                isActive &&
                "border-r-4 border-r-[#8fe4a8] bg-gray-400 hover:bg-gray-400"
              }`
            : `pl-1 justify-center `
        }`}
      >
        <div
          className={`p-2 rounded-full ${
            isActive &&
            isTextHidden &&
            "border-r-4 border-r-[#8fe4a8] bg-gray-400 hover:bg-gray-400"
          }`}
        >
          {img}
        </div>
        {!isTextHidden && (
          <div className="text-lg text-[#282e2b]  transition-opacity ease-in-out duration-500">
            {text}
          </div>
        )}
      </div>
    );
  };

  const logoImg = <img src="/images/logo_dark.png" alt="" className="size-6" />;
  const archiveImg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6 text-[#282e2b]"
    >
      <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
      <path
        fillRule="evenodd"
        d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087ZM12 10.5a.75.75 0 0 1 .75.75v4.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72v-4.94a.75.75 0 0 1 .75-.75Z"
        clipRule="evenodd"
      />
    </svg>
  );
  const binImg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6 text-[#282e2b]"
    >
      <path
        fillRule="evenodd"
        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div
      onMouseEnter={() => setIsTextHidden(false)}
      onMouseLeave={() => setIsTextHidden(true)}
      className={`pt-5 shadow-md flex flex-col justify-between h-full  transition-all ease-in-out duration-500 ${
        isTextHidden ? "w-20" : "w-48"
      }`}
    >
      <div
        className={`flex flex-col justify-start items-start gap-5 ${
          isTextHidden && "px-4"
        } py-2`}
      >
        <Link to={"/"}>{content(logoImg, "Home")}</Link>
        <Link to={"/archive"}>{content(archiveImg, "Archive")}</Link>
        <Link to={"/bin"}>{content(binImg, "Bin")}</Link>
      </div>
      {!isTextHidden && (
        <div className="text-center py-2 text-xs transition-all delay-500 ease-in-out">
          {"Developed by Lion-ofJudah"}
        </div>
      )}
    </div>
  );
}
