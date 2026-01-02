/**
 * @description Testimonials section — tilted cards with one highlighted
 */

const testimonials = [
  {
    name: "Sarah Johnson",
    text: "This platform completely transformed how I manage my projects. The interface is intuitive, and I can easily track progress across multiple teams. Highly recommended!",
    active: false,
  },
  {
    name: "Michael Adeyemi",
    text: "I love how smooth and fast the dashboard feels. From task creation to completion tracking, everything works seamlessly. It’s definitely made my workflow more efficient.",
    active: true,
  },
  {
    name: "Chloe Martinez",
    text: "As a designer, I appreciate the clean layout and thoughtful user experience. It’s rare to find a tool that’s both powerful and pleasant to use every day.",
    active: false,
  },
  {
    name: "David Kim",
    text: "The collaboration features have been a game changer for my team. We can communicate, assign tasks, and monitor progress all in one place. Great job!",
    active: false,
  },
  {
    name: "Emily Thompson",
    text: "I’ve tried several dashboard tools before, but none come close to this one. The attention to detail, performance, and simplicity are unmatched.",
    active: false,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className="text-2xl md:text-3xl font-semibold mb-20"
          data-aos="fade-down"
        >
          Testimonials
        </h2>

        <div className="flex flex-wrap justify-center gap-6 mt-16">
          {testimonials.map((t, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 150}
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
