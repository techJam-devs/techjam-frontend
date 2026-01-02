/**
 * @description Discover Our Benefits section
 */

const BenefitsSection = () => {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Title */}
        <h2
          className="text-2xl md:text-3xl font-semibold text-[#0f0f0f] mb-14"
          data-aos="zoom-out"
        >
          Discover Our Benefits
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div
            className="bg-[#ECF2FF] rounded-2xl px-10 pt-10 flex flex-col justify-between items-center text-left"
            data-aos="fade-up"
          >
            <div>
              <h3 className="text-lg font-semibold text-[#0f0f0f] mb-4">
                Build your portfolio
              </h3>
              <ul className="text-[#4b4b4b] text-sm list-disc pl-5 space-y-2">
                <li>Showcase real projects you’ve worked on.</li>
                <li>
                  Strengthen your portfolio to impress employers or clients.
                </li>
              </ul>
            </div>
            <div className="relative bg-blue rounded-t-4xl pt-10 mt-4">
              {/** top rectangle hole */}
              <div className="absolute left-1/2 -translate-x-1/2 h-4 w-12 bg-white rounded-4xl"></div>
              <img
                src="/portfolio.svg"
                alt="Portfolio illustration"
                className="mt-10 w-60 object-contain"
              />
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="bg-[#ECF2FF] rounded-2xl p-10 flex flex-col justify-between items-center text-left"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div>
              <h3 className="text-lg font-semibold text-[#0f0f0f] mb-4">
                Collaborate
              </h3>
              <ul className="text-[#4b4b4b] text-sm list-disc pl-5 space-y-2">
                <li>
                  Connect with like-minded tech enthusiasts, mentors, and future
                  colleagues.
                </li>
                <li>
                  Learn teamwork and collaboration — key skills for tech roles.
                </li>
              </ul>
            </div>
            <img
              src="/benefits-collaboration.svg"
              alt="Collaboration illustration"
              className="mt-10 w-70 object-contain"
            />
          </div>

          {/* Card 3 */}
          <div
            className="bg-[#ECF2FF] rounded-2xl p-10 flex flex-col justify-between items-center text-left"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div>
              <h3 className="text-lg font-semibold text-[#0f0f0f] mb-4">
                Safe space for newbies
              </h3>
              <ul className="text-[#4b4b4b] text-sm list-disc pl-5 space-y-2">
                <li>
                  Designed specially for beginners transitioning into tech.
                </li>
                <li>No judgment — only growth, learning, and support.</li>
              </ul>
            </div>
            <img
              src="/newbies.svg"
              alt="Newbies illustration"
              className="mt-10 w-80 object-contain"
            />
          </div>

          {/* Card 4 */}
          <div
            className="bg-[#ECF2FF] rounded-2xl p-10 flex flex-col justify-center items-center gap-3"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {[
              "Personalize Matching",
              "Expand your network",
              "Get rated and review",
              "Flexible and remote",
              "Opportunity to lead",
            ].map((item, index) => (
              <div
                key={index}
                className="w-full bg-white text-[#0f0f0f] text-sm md:text-base font-medium py-3 rounded-md shadow-sm hover:bg-[#f3f4ff] transition-all"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
