import React, { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import ConnectEmail from '../connect-email-form';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsDialog: React.FC<Props> = ({ open, onOpenChange }) => {
  const [selectedOption, setSelectedOption] = useState("connect-email");

  const renderRightPanel = (onOpenChange:any) => {
    switch (selectedOption) {
      case "connect-email":
        return <ConnectEmail onOpenChange/>;
      case "account":
        return <div>Account Settings Component</div>;
      case "security":
        return <div>Security Settings Component</div>;
      default:
        return <div>Select an option</div>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-4xl [&>button:last-child]:hidden">
        <div className="overflow-y-auto">
          <DialogHeader className="contents space-y-0 text-left">
            <DialogTitle className="border-b border-gray-300 w-full">
              <div className='px-6 py-3'>Settings</div>
            </DialogTitle>
            <DialogDescription asChild>
              <div className="">
                <div className="flex h-[400px]">
                  {/* LEFT MENU */}
                  <div className="w-1/4 border-r border-gray-300 pr-4 px-3">
                    <ul className="space-y-2 mt-4">
                      <li>
                        <button
                          onClick={() => setSelectedOption("connect-email")}
                          className={`w-full text-left px-3 py-2 rounded-md ${
                            selectedOption === "connect-email"
                              ? "bg-gray-200 font-semibold"
                              : "hover:bg-accent"
                          }`}
                        >
                          Connect Email
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setSelectedOption("account")}
                          className={`w-full text-left px-3 py-2 rounded-md ${
                            selectedOption === "account"
                              ? "bg-gray-200 font-semibold"
                              : "hover:bg-accent"
                          }`}
                        >
                          Account
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setSelectedOption("security")}
                          className={`w-full text-left px-3 py-2 rounded-md ${
                            selectedOption === "security"
                              ? "bg-gray-200 font-semibold"
                              : "hover:bg-accent"
                          }`}
                        >
                          Security
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* RIGHT PANEL */}
                  <div className="w-3/4 py-6 pl-6 overflow-y-auto">
                    {renderRightPanel(onOpenChange)}
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          {/* <DialogFooter className="px-6 pb-6 sm:justify-start">
            <DialogClose asChild>
              <button type="button">Cancel</button>
            </DialogClose>
            <DialogClose asChild>
              <button type="button">Okay</button>
            </DialogClose>
          </DialogFooter> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
