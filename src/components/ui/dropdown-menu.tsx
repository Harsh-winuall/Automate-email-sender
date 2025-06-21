'use client'
import React, { useState, useRef, useEffect, createContext, useContext, useCallback } from 'react';

// --- Utility Function: cn (Concatenate Class Names) ---
// A simple utility to conditionally join Tailwind CSS classes.
// It filters out any falsy values and joins the remaining strings with a space.
type ClassValue = string | boolean | undefined | null;

function cn(...inputs: ClassValue[]): string {
  return inputs
    .filter(Boolean) // Filter out fals falsy values (null, undefined, false, '')
    .join(' ')
    .trim(); // Trim any leading/trailing spaces
}

// --- Dropdown Context ---
// This context will manage the open/closed state of the dropdown
// and provide functions to control it to its children.
interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggle: () => void;
  close: () => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

// Custom hook to use the dropdown context, ensuring it's used within a provider
const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('useDropdown must be used within a DropdownMenuProvider');
  }
  return context;
};

// --- DropdownMenu Component (Root) ---
// This component acts as the provider for the dropdown context.
// It manages the overall open/closed state.
interface DropdownMenuProps {
  children: React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);

  const contextValue = React.useMemo(() => ({ isOpen, setIsOpen, toggle, close }), [isOpen, toggle, close]);

  return (
    <DropdownContext.Provider value={contextValue}>
      <div className="relative inline-block text-left">
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

// --- DropdownMenuTrigger Component ---
// This component is the button that opens/closes the dropdown.
// It uses the context to toggle the dropdown state.
interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ children, className, onClick, ...props }, ref) => {
    const { toggle } = useDropdown();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      toggle();
      onClick?.(event); // Call original onClick if provided
    };

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'inline-flex justify-center px-4 py-2 text-sm font-medium',
          className
        )}
        onClick={handleClick}
        aria-haspopup="true" // Indicate that this element has a popup
        aria-expanded={useDropdown().isOpen} // Indicate whether the popup is currently expanded
        {...props}
      >
        {children}
      </button>
    );
  }
);
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

// --- DropdownMenuContent Component ---
// This component holds the actual menu items and is conditionally rendered.
// It handles closing the menu when clicking outside or pressing Escape.
interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  sideOffset?: number; // Distance from the trigger (not fully implemented for complex positioning)
}

const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ children, className, sideOffset = 4, ...props }, ref) => {
    const { isOpen, close } = useDropdown();
    const contentRef = useRef<HTMLDivElement>(null); // Internal ref for click outside

    // Effect to handle clicks outside the dropdown and Escape key press
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        // Close if click is outside the content and not on the trigger
        if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
          close();
        }
      };

      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          close();
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscapeKey);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }, [isOpen, close]);

    if (!isOpen) return null; // Don't render if not open

    return (
      <div
        ref={(node) => {
          // Assign both external and internal refs
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
          (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn(
          'absolute right-0 mt-2 px-1.5 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg border border-gray-200 ring-opacity-5 focus:outline-none',
          className
        )}
        style={{ top: `calc(100% + ${sideOffset}px)` }} // Basic positioning below the trigger
        role="menu" // ARIA role for a menu
        aria-orientation="vertical"
        tabIndex={-1} // Make it focusable but not part of tab order
        {...props}
      >
        <div className="py-1" role="none">
          {children}
        </div>
      </div>
    );
  }
);
DropdownMenuContent.displayName = 'DropdownMenuContent';

// --- DropdownMenuItem Component ---
// Individual clickable items within the dropdown menu.
// Clicking an item will close the dropdown.
interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  inset?: boolean; // For indentation, not fully utilized in this basic version
}

const DropdownMenuItem = React.forwardRef<HTMLButtonElement, DropdownMenuItemProps>(
  ({ children, className, onClick, inset, ...props }, ref) => {
    const { close } = useDropdown();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      close(); // Close the dropdown when an item is clicked
      onClick?.(event); // Call original onClick if provided
    };

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'block w-full px-4 py-2 text-left text-sm text-gray-700 rounded-sm  hover:bg-gray-100 hover:text-gray-900',
          inset && 'pl-8', // Apply inset padding if needed
          className
        )}
        onClick={handleClick}
        role="menuitem" // ARIA role for a menu item
        tabIndex={0} // Make menu items focusable
        {...props}
      >
        {children}
      </button>
    );
  }
);
DropdownMenuItem.displayName = 'DropdownMenuItem';

// --- Export Components ---
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  // Note: DropdownMenuCheckboxItem, DropdownMenuRadioItem,
  // DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut,
  // DropdownMenuGroup, DropdownMenuPortal, DropdownMenuSub,
  // DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuRadioGroup
  // are NOT included in this simplified custom implementation.
  // Implementing them would require significant additional logic for state management,
  // accessibility attributes, and event handling.
};