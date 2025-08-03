"use client";
import React, { useState } from "react";
import { IoSearch, IoSettingsOutline } from "react-icons/io5";
import { FaRegBell, FaRegMoon } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";
import { Input } from "./ui/input";
import Avatar from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import SettingsDialog from "@/app/_components/dialogs/settings-dialog";

const Header = () => {
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <>
      <header className="h-16 border-b border-gray-200 bg-card flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative w-full">
            <IoSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="w-full pl-8 h-9 md:w-64"
            />
          </div>
        </div>

        <div className="flex justify-between items-center gap-2">
          <button className="relative">
            <FaRegBell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
          </button>

          <button onClick={() => {}}>
            <MdOutlineWbSunny className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <FaRegMoon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </button>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar name="Harsh Tripathi" size="sm" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="z-20">
                {/* <DropdownMenuItem onClick={() => console.log("Edit clicked")}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => console.log("Duplicate clicked")}
              >
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log("Archive clicked")}>
                Archive
              </DropdownMenuItem>
              */}
                <DropdownMenuItem
                  onClick={() => {
                    setOpenSettings(true);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <IoSettingsOutline className="size-4" />
                    Settings
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () => await signOut({ callbackUrl: "/" })}
                  className="text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <div className="flex items-center gap-2">
                    <FiLogOut /> Log Out
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <SettingsDialog open={openSettings} onOpenChange={setOpenSettings} />
    </>
  );
};

export default Header;
