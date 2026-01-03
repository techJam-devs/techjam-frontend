/**
 * @description contact page
 */

import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="py-20 bg-gray-50 mt-16">
      {/** ==== header text ====== */}
      <h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 leading-tight tracking-wide"
        data-aos="fade-up"
      >
        Contact Us
      </h2>
      <div className="container mx-auto px-4">
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-12
            items-stretch
          "
        >
          {/* LEFT — CONTACT FORM */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Get in Touch
            </h2>
            <p className="text-gray-600 mb-8">
              Fill out the form and our team will get back to you shortly.
            </p>

            <form className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+234 801 234 5678"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium mb-1">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us how we can help you..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="
                  w-full
                  bg-blue text-white
                  py-3 rounded-lg
                  font-semibold
                  hover:bg-blue-800
                  transition
                "
              >
                Send Message
              </button>
            </form>
          </div>

          {/* RIGHT — CONTACT INFO */}
          <div className="bg-blue text-white rounded-2xl p-8 md:p-10 flex flex-col justify-center">
            <h3
              className="text-2xl md:text-3xl font-bold mb-4"
              data-aos="fade-up"
            >
              We’d Love to Hear From You
            </h3>
            <p className="text-gray-300 mb-10">
              Whether you have a question, an idea, or want to collaborate —
              reach out anytime.
            </p>

            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-center gap-4" data-aos="fade-left">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <FaPhoneAlt />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="font-semibold">+234 801 234 5678</p>
                </div>
              </div>

              {/* Email */}
              <div
                className="flex items-center gap-4"
                data-aos="zoom-out"
                data-aos-delay="400"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="font-semibold">hello@techjam.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
