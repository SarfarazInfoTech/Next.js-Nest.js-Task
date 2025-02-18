"use client";

import { useState } from "react";
import {
  Code,
  Settings,
  Grid,
  List,
  Users,
  Trophy,
  Folder,
  Menu,
  ChevronDown,
  ChevronRight,
  User,
} from "lucide-react";
import Image from "next/image";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-[#0F172A] min-h-screen p-4 text-gray-400 transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-8">
        {isOpen && <Image src="./logo.svg" alt="logo" width={80} height={80} />}
        <button
          className="text-gray-400 p-2 hover:bg-gray-800 rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="h-6 w-6 text-white" />
        </button>
      </div>

      <nav className="space-y-2">
        <SidebarItem
          icon={Folder}
          label="Systems"
          isOpen={isOpen}
          hasSubmenu
          isSubmenuOpen={openMenu === "systems"}
          onClick={() => toggleMenu("systems")}
          active={openMenu === "systems"}
        />
        {openMenu === "systems" && (
          <div className="space-y-2">
            <SidebarItem
              icon={Code}
              label="System Code"
              isOpen={isOpen}
              // active={activeSubItem === "System Code"}
              onClick={() => setActiveSubItem("System Code")}
              className={`${
                activeSubItem === "System Code" &&
                "bg-[#A3E635] text-[#0F172A] hover:bg-[#A3E635]"
              }`}
            />
            <SidebarItem
              icon={Settings}
              label="Properties"
              isOpen={isOpen}
              // active={activeSubItem === "Properties"}
              onClick={() => setActiveSubItem("Properties")}
              className={`${
                activeSubItem === "Properties" &&
                "bg-[#A3E635] text-[#0F172A] hover:bg-[#A3E635]"
              }`}
            />
            <SidebarItem
              icon={Grid}
              label="Menus"
              isOpen={isOpen}
              // active={activeSubItem === "Menus"}
              onClick={() => setActiveSubItem("Menus")}
              className={`${
                activeSubItem === "Menus" &&
                "bg-[#A3E635] text-[#0F172A] hover:bg-[#A3E635]"
              }`}
            />
            <SidebarItem
              icon={List}
              label="API List"
              isOpen={isOpen}
              // active={activeSubItem === "API List"}
              onClick={() => setActiveSubItem("API List")}
              className={`${
                activeSubItem === "API List" &&
                "bg-[#A3E635] text-[#0F172A] hover:bg-[#A3E635]"
              }`}
            />
          </div>
        )}

        <SidebarItem
          icon={Users}
          label="Users & Group"
          isOpen={isOpen}
          hasSubmenu
          isSubmenuOpen={openMenu === "users"}
          onClick={() => toggleMenu("users")}
          active={openMenu === "users"}
        />
        {openMenu === "users" && (
          <div className="space-y-2">
            <SidebarItem
              icon={User}
              label="Users"
              isOpen={isOpen}
              // active={activeSubItem === "Users"}
              onClick={() => setActiveSubItem("Users")}
              className={`${
                activeSubItem === "Users" &&
                "bg-[#A3E635] text-[#0F172A] hover:bg-[#A3E635]"
              }`}
            />
            <SidebarItem
              icon={Users}
              label="Group"
              isOpen={isOpen}
              // active={activeSubItem === "Group"}
              onClick={() => setActiveSubItem("Group")}
              className={`${
                activeSubItem === "Group" &&
                "bg-[#A3E635] text-[#0F172A] hover:bg-[#A3E635]"
              }`}
            />
          </div>
        )}

        <SidebarItem
          icon={Trophy}
          label="Competition"
          isOpen={isOpen}
          active={activeSubItem === "Competition"}
          onClick={() => setActiveSubItem("Competition")}
        />
      </nav>
    </div>
  );
}

function SidebarItem({
  icon: Icon,
  label,
  active = false,
  isOpen,
  className = "",
  hasSubmenu = false,
  isSubmenuOpen = false,
  onClick,
}: {
  icon: any;
  label: string;
  active?: boolean;
  isOpen: boolean;
  className?: string;
  hasSubmenu?: boolean;
  isSubmenuOpen?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      className={`flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer
       ${active ? "bg-gray-700 text-white" : ""} ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5" />
        {isOpen && <span className="text-sm font-medium">{label}</span>}
      </div>
      {hasSubmenu && isOpen && (
        <div>
          {isSubmenuOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </div>
      )}
    </div>
  );
}
