/**
 * @returns component for hero section
 */

import { useEffect, useState } from "react";
import { PlayIcon } from "lucide-react";
import Button from "../common/Button";
import SignUpModal from "../authModals/signUpModal";
import SignInModal from "../authModals/signInModal";

const Hero = () => {
  const [openModal, setOpenModal] = useState<"signin" | "signup" | null>(null);

   useEffect(() => {
     if (openModal) {
       document.body.style.overflow = "hidden";
     } else {
       document.body.style.overflow = "";
     }
   }, [openModal]);
   
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col justify-center items-center gap-5">
        {/** text + description */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-center px-4">
          {" "}
          Gain Real World <span className="text-blue"> Experience </span> -
          Together
        </h1>
        <p className="text-gray-600 leading-tight px-4 text-center text-sm sm:text-xl max-w-2xl mb-4">
          {" "}
          Join Tech Jam to collaborate on real projects, connect with
          like-minded people and grow your skills.
        </p>

        {/** users + affiliations */}
        <p className="text-sm text-center text-mute-gray">
          Used and trusted by 2,363,101+ people from teams like
        </p>

        {/** affiliated logos */}
        <div className="flex justify-center p-4 overflow-hidden">
          <img src="/affiliations.png" alt="affiliations" className="" />
        </div>

        {/** cta buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4 w-full max-w-md mx-auto lg:mt-6 [@media(max-width:410px)]:flex-col">
          <Button
            text="Get Started"
            variant="primary"
            className="flex-1 [@media(max-width:410px)]:w-full"
            onClick={() => setOpenModal("signin")}
          />
          <Button
            text="Watch Video"
            variant="ghost"
            icon={<PlayIcon size={14} />}
            className="flex-1 [@media(max-width:410px)]:w-full"
          />
        </div>
      </div>

      {/* Sign In Modal */}
      <SignInModal
        isOpen={openModal === "signin"}
        onClose={() => setOpenModal(null)}
        onSwitchToSignUp={() => setOpenModal("signup")}
      />

      {/* Sign Up Modal */}
      <SignUpModal
        isOpen={openModal === "signup"}
        onClose={() => setOpenModal(null)}
        onSwitchToSignIn={() => setOpenModal("signin")}
      />
    </section>
  );
};

export default Hero;
