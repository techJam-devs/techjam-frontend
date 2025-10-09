/**
 * @returns component for hero section
 */

import { useState } from "react";
import { PlayIcon } from "lucide-react";
import Button from "../common/Button";
import SignUpModal from "../common/signUpModal";

const Hero = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col justify-center items-center gap-6">
        {/** text + description */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center px-4">
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
        <p className="text-sm text-center text-mute-gray lg:my-6">
          Used and trusted by 2,363,101+ people from teams like
        </p>

        {/** affiliated logos */}
        <div className="flex justify-center p-4 overflow-hidden">
          <img
            src="/affiliations.png"
            alt="affiliations"
            className=""
          />
        </div>

        {/** cta buttons */}
              <div className="flex flex-wrap justify-center items-center gap-4 w-full max-w-md mx-auto lg:mt-6 [@media(max-width:410px)]:flex-col">
                  <Button
                      text="Get Started"
                      variant="primary"
                      className="flex-1 [@media(max-width:410px)]:w-full"
                      onClick={() => setShowSignUp(true)}
                  />
                  <Button
                      text="Watch Video"
                      variant="ghost"
                      icon={<PlayIcon size={14} />}
                      className="flex-1 [@media(max-width:410px)]:w-full"
                  />
              </div>
      </div>

      {/**  auth modal pop up */}
      <SignUpModal isOpen={showSignUp} onClose={() => setShowSignUp(false)} />
    </section>
  );
};

export default Hero;
