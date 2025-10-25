/**
 *@description This component shows a colored status dot, a "Status" label, and a dropdown arrow.
 */

import { ChevronDown } from "lucide-react";

const StatusIcon = () => {
  return (
    <div className="bg-[#0908C3] flex items-center gap-3 justify-center text-white text-sm py-2 px-4 rounded-full">
      <span className={`size-2 bg-green-300 rounded-full`}></span>
      Status
      <ChevronDown />
    </div>
  );
};

export default StatusIcon;
