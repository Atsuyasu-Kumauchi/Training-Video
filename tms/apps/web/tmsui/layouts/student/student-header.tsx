"use client";
import { deleteAuthToken } from "@/tmsui";
import { useSettings } from "@/tmsui/store";
import { LinkButton } from "@/tmsui/ui";
import { faBars, faChevronDown, faKey, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";

export function StudentHeader() {
  const { toggleSidebar, setIsSidebarOpen } = useSettings();

  const removeAuthTokens = async () => {
    await deleteAuthToken("tms_token");
    await deleteAuthToken("tms_step");
    window.location.reload();
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          {/* Open on mobile */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            id="openSidebar"
            className="lg:hidden text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <FontAwesomeIcon icon={faBars} className="text-xl" />
          </button>
          {/* Toggle on desktop */}
          <button
            onClick={toggleSidebar}
            id="toggleSidebar"
            className="hidden lg:block text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <FontAwesomeIcon icon={faBars} className="text-xl" />
          </button>
        </div>



        <div className="flex items-center space-x-4">
          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <Menu as="div" className="relative">
              <MenuButton id="userMenuButton" className="flex items-center space-x-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">JD</span>
                </div>
                <span className="text-gray-700 font-medium">John Doe</span>
                <FontAwesomeIcon icon={faChevronDown} className="text-gray-400" />
              </MenuButton>
              <MenuItems className="absolute right-0 focus:outline-none mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <MenuItem>
                  <LinkButton
                    as={Link}
                    href="/student/change-password"
                    variant="ghost"
                    className={`px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-start`}
                  >
                    <FontAwesomeIcon icon={faKey} className="mr-2" />
                    パスワード変更
                  </LinkButton>
                </MenuItem>
                <div className="border-t border-gray-100 my-1" />
                <MenuItem>
                  <Button
                    onClick={removeAuthTokens}
                    className={`px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center w-full`}
                  >
                    <FontAwesomeIcon icon={faSignOut} className="mr-2" />
                    ログアウト
                  </Button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>

      </div>
    </header>
  );
}
