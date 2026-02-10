/**
 * @description Contact page
 */
import { useState } from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import useToastStore from "../store/notificationStore";
import { ContactUsService } from "../services/contactService";
import { contactSchema } from "../validation/contactValidation";

const ContactUs = () => {
  const { addToast } = useToastStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  // Handle input
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setError(null);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error: validationError } = contactSchema.validate(formData, {
      abortEarly: true,
    });

    if (validationError) {
      setError(validationError.details[0].message);
      return;
    }

    setLoading(true);
    try {
      const response = await ContactUsService(formData);
      addToast({
        message: response.message || "Message sent successfully",
        type: "success",
      });

      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to send message";
      addToast({ message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50 mt-12">
      {/* Header */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10">
        Contact Us
      </h2>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* LEFT — FORM */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-10">
            <h3 className="text-xl md:text-2xl font-bold mb-1">Get in Touch</h3>
            <p className="text-gray-600 mb-6 text-sm">
              Fill out the form and our team will get back to you shortly.
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && (
                <p className="text-xs text-red-600 bg-red-100 p-2 rounded">
                  {error}
                </p>
              )}

              {/* Name */}
              <div>
                <label className="block text-xs font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInput}
                  placeholder="John Doe"
                  className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInput}
                  placeholder="+234 801 234 5678"
                  className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInput}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInput}
                  placeholder="Tell us how we can help you..."
                  className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue text-white py-2.5 text-sm rounded-lg font-semibold hover:bg-blue-800 transition disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* RIGHT — CONTACT INFO */}
          <div
            className="bg-blue text-white rounded-xl p-6 md:p-8 flex flex-col justify-center"
            data-aos="zoom-in"
          >
            <h3
              className="text-xl md:text-2xl font-bold mb-3"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              We’d Love to Hear From You
            </h3>
            <p
              className="text-gray-300 mb-8 text-sm"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              Whether you have a question, an idea, or want to collaborate —
              reach out anytime.
            </p>

            <div className="space-y-5">
              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <FaPhoneAlt />
                </div>
                <div>
                  <p className="text-xs text-gray-300">Phone</p>
                  <p className="font-semibold text-sm">+234 801 234 5678</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-xs text-gray-300">Email</p>
                  <p className="font-semibold text-sm">hello@techjam.com</p>
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
