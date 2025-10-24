/**
 * @description Profile component for our dashboard nav
 */

import { useState } from "react";

const Profile = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setShow(!show)}
        title="profile"
        className="cursor-pointer flex"
      >
        <img
          src="/subhero/Ellipse.png"
          alt="profile picture"
          className="border border-gray-300 size-10 rounded-full"
        />
      </button>

      {/** ==== show settings page =============*/}
      {show && (
        <div className="bg-white fixed top-[6rem] w-full left-0 h-screen px-4 xl:px-18 z-50 ">
          {/** ========== banner header ========== */}
          <div className="h-[110px] w-full">
            <img
              src="/banner.png"
              alt="profile banner image"
              className="h-full rounded-t-xl w-full object-cover"
            />
          </div>
          <button onClick={() => setShow(!show)}> X</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
