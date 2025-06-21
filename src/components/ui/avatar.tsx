import React from 'react';

// Define the props interface for the Avatar component
interface AvatarProps {
  src?: string; // Optional image URL for the avatar
  alt?: string; // Optional alt text for the image, important for accessibility
  name?: string; // New: Optional name to derive initials from (e.g., "John Doe" -> "J")
  initials?: string; // Optional initials to display if no image or name is provided
  size?: 'sm' | 'md' | 'lg' | 'xl'; // Predefined sizes for the avatar
  className?: string; // Optional additional CSS classes for custom styling
}

/**
 * Avatar Component
 *
 * A versatile React component for displaying user avatars.
 * It can render an image, fallback to initials derived from a name,
 * explicit initials, or a generic placeholder.
 *
 * @param {AvatarProps} props - The properties for the Avatar component.
 * @param {string} [props.src] - The URL of the avatar image.
 * @param {string} [props.alt] - The alt text for the avatar image (for accessibility).
 * @param {string} [props.name] - A name from which the first letter will be used as initials.
 * @param {string} [props.initials] - Explicit initials to display if no image or name is provided.
 * @param {'sm' | 'md' | 'lg' | 'xl'} [props.size='md'] - The size of the avatar.
 * @param {string} [props.className] - Additional CSS classes to apply.
 *
 * @returns {JSX.Element} The Avatar component.
 */
const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'User Avatar', // Default alt text for accessibility
  name, // Destructure the new 'name' prop
  initials,
  size = 'md', // Default size
  className,
}) => {
  // Determine the size classes based on the 'size' prop
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',    // Small avatar: 32x32px, small text
    md: 'w-12 h-12 text-lg',  // Medium avatar: 48x48px, large text
    lg: 'w-16 h-16 text-xl',  // Large avatar: 64x64px, extra large text
    xl: 'w-24 h-24 text-3xl', // Extra large avatar: 96x96px, 3xl text
  }[size];

  // Determine the text to display for initials
  // Prioritize 'name' first, then 'initials', then an empty string
  const displayedText = name
    ? name.substring(0, 1).toUpperCase() // Use first letter of name
    : initials
      ? initials.substring(0, 2).toUpperCase() // Use provided initials (up to 2 chars)
      : ''; // Fallback to empty string if neither name nor initials are provided

  // Combine base classes with size-specific classes and any additional classes
  const baseClasses = `
    relative flex items-center justify-center
    rounded-full font-semibold overflow-hidden
    bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300
    flex-shrink-0
    ${sizeClasses}
    ${className || ''}
  `;

  return (
    <div className={baseClasses}>
      {src ? (
        // If 'src' is provided, render an image
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          // Fallback for broken images: display initials if available
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none'; // Hide the broken image
            // In a real application, you might want to set a state to show the initials/placeholder
            // For now, hiding the image will reveal the initials/placeholder behind it.
          }}
        />
      ) : displayedText ? (
        // If no 'src' but 'displayedText' (from name or initials) is available, display it
        <span className="select-none">{displayedText}</span>
      ) : (
        // If neither 'src' nor 'displayedText' are available, display a generic SVG placeholder
        <svg
          className="w-2/3 h-2/3 text-gray-400 dark:text-gray-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM12 12.5c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"></path>
        </svg>
      )}
    </div>
  );
};

export default Avatar;