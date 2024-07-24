import React from "react";
import BgSidebarDesktop from "../../assets/images/bg-sidebar-desktop.svg";
import BgSidebarMobile from "../../assets/images/bg-sidebar-mobile.svg";

interface SidebarProps {
  index: number;
  setIndex: (index: number) => void;
}

const Labels = ["YOUR INFO", "SELECT PLAN", "ADD-ON", "SUMMARY"];

const Sidebar: React.FC<SidebarProps> = ({ index, setIndex }) => {
  return (
    <div className="relative align-middle">
      <div className="hidden md:block">
        <BgSidebarDesktop />
      </div>
      <div className="block md:hidden">
        <BgSidebarMobile />
      </div>
      <div className="absolute w-full md:w-auto top-10 md:left-10 gap-4 md:gap-7 md:grid flex justify-center items-center align-middle">
        {Labels.map((label, idx) => (
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => setIndex(idx)}
            key={idx}
          >
            <div
              className={`text-xl rounded-full border aspect-square h-8 flex items-center justify-center ${
                idx === index && "bg-step text-black"
              }`}
            >
              {idx + 1}
            </div>
            <div className="md:block hidden">
              <div className="text-secondary font-regular text-xs">
                STEP {idx + 1}
              </div>
              <div className="text-white text-sm font-medium">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
