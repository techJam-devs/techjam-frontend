/**
 * @description Creates a pyramid look like menu icon
 */

const MenuIcon = ({
  className = "w-6 h-6 text-gray-700 hover:text-black",
}: {
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Top line (longest) */}
    <line x1="3" y1="6" x2="21" y2="6" />
    {/* Middle line (shorter) */}
    <line x1="6" y1="12" x2="18" y2="12" />
    {/* Bottom line (shortest) */}
    <line x1="9" y1="18" x2="15" y2="18" />
  </svg>
);

export default MenuIcon;
