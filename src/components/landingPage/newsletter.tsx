/**
 *
 * @returns  newsletter component for the landing page
 */

import { Mail } from "lucide-react";
import React, { useState } from "react";
import { subscribeToNewsletterService } from "../../services/newsletterService";
import useToastStore from "../../store/notificationStore";

const Newsletter = () => {
  const { addToast } = useToastStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string | "">("");

  const noInput = email === "";

  // handle subscription for email
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const result = await subscribeToNewsletterService(email);

    if (result.success) {
      addToast({
        message:
          result.message || "Please check your email to confirm subscription",
        type: "success",
      });
      setEmail("");
    } else {
      console.error(result.message);
      addToast({
        message: result.message || "Unexpected error occurred. Try again later",
        type: "error",
      });
    }

    setLoading(false);
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
        <h2
          className="text-center md:text-start text-2xl md:text-4xl font-semibold"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          Subscribe to
          <br />— Our Newsletter
        </h2>
        {/** ======== bottom ============ */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-10 px-6">
          {/* Left Side - Text Content */}
          <div>
            <p
              className="text-center md:text-start text-gray-600 text-lg max-w-md"
              data-aos="fade-up"
              data-aos-delay="400"
            >
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
              disabled={loading || noInput}
              className="absolute right-2 -bottom-4 md:bottom-0 bg-gray-900 text-white py-4 px-8 uppercase text-sm hover:bg-gray-700 transition-colors duration-500 cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? "Subscribing...⌛" : " Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
