/**
 * @description Testimonials section — tilted cards with one highlighted
 */

const testimonials = [
  {
    name: "Debbie Willhite",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    active: false,
  },
  {
    name: "Debbie Willhite",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    active: true,
  },
  {
    name: "Debbie Willhite",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    active: false,
  },
  {
    name: "Debbie Willhite",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    active: false,
  },
  {
    name: "Debbie Willhite",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    active: false,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-20">
          Testimonials
        </h2>

        <div className="flex flex-wrap justify-center gap-6 mt-16">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`w-72 md:w-80 p-6 rounded-2xl shadow-md transition-transform duration-300 ${
                t.active
                  ? "bg-blue-600 text-white rotate-0 scale-105"
                  : "bg-blue-50 text-gray-800"
              } ${
                i % 2 === 0
                  ? "-rotate-6"
                  : i % 3 === 0
                    ? "rotate-6"
                    : "-rotate-3"
              }`}
            >
              {/* Stars */}
              <div className="text-lg mb-3">★★★★★</div>
              {/* Text */}
              <p className="text-sm mb-4">{t.text}</p>
              {/* Name */}
              <p
                className={`font-semibold ${
                  t.active ? "text-white" : "text-gray-900"
                }`}
              >
                {t.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
