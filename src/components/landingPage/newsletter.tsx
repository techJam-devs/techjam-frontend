/**
 *
 * @returns  newsletter component
 */

import { Mail } from "lucide-react";
import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  // handle subscription for email
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="relative py-20 md:px-4 overflow-hidden">
      {/**background */}
      <div className="absolute w-1/2 h-full right-0 top-0">
        <img
          src="/subscribe-bg.svg"
          alt="background"
          className="h-full w-full"
        />
      </div>
      {/** center div */}
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center md:text-start text-2xl md:text-4xl font-semibold">
          Subscribe to
          <br />— Our Newsletter
        </h2>
        {/** ======== bottom ============ */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-10 px-6">
          {/* Left Side - Text Content */}
          <div>
            <p className="text-center md:text-start text-gray-600 text-lg max-w-md">
              Get weekly updates about our community on your email, no spam
              guaranteed we promise 👋
            </p>
          </div>

          {/* Right Side - Email Input and Button */}
          <form
            onSubmit={handleSubmit}
            className="w-full md:w-xl py-4 md:p-6 relative"
          >
            {/** icon */}
            <Mail className="text-gray-300 absolute top-1/2 left-4 md:left-8 -translate-y-1/2" />
            <input
              type="email"
              placeholder="youremail23@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-white w-full border-gray-400 border-1 p-6 pl-12 md:pl-10 outline-none text-gray-600"
            />
            <button
              type="submit"
              className="absolute right-2 -bottom-4 md:bottom-0 bg-gray-900 text-white py-4 px-8 uppercase text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
