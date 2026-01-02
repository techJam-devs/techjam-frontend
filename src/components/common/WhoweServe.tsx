/**
 * @returns components
 */

const WhoWeServe = () => {
  const audiences = [
    "Aspiring Developers",
    "Product Managers",
    "Data Analysts",
    "Tech Beginners With No Portfolio",
    "Startups Looking For Contributors",
    "Students Seeking Practical Experience",
  ];

  return (
    <div className="relative py-16 bg-blue">
      {/** absolute background div */}
      <div className="absolute left-0 top-0 bg-black h-48 md:w-xl w-sm"></div>
      <div className="container mx-auto flex flex-col md:flex-row gap-4 justify-center items-center">
        {/** === left image ======== */}
        <div
          className="flex justify-center items-center"
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          <div className="w-full max-w-md md:max-w-lg h-96 md:h-[400px] rounded-2xl overflow-hidden">
            <img
              src="/src/assets/we-serve.png"
              alt="Team working"
              className="w-full h-full object-cover"
              data-aos="zoom-in"
              data-aos-delay="400"
            />
          </div>
        </div>

        {/** === right === */}
        <div className="overflow-hidden">
          <div className="container mx-auto px-4">
            <h2
              className="text-2xl md:text-4xl font-semibold text-center text-white mb-16"
              data-aos="fade-up"
            >
              Who TechJam Is For??
            </h2>

            <div className="flex flex-col gap-6 max-w-4xl mx-auto">
              {audiences.map((text, idx) => {
                const isLeft = idx % 2 === 0;
                const rotation = isLeft ? "-rotate-2" : "rotate-2";

                return (
                  <div
                    key={idx}
                    className={`flex ${
                      isLeft ? "justify-start" : "justify-end"
                    } lg:px-12`}
                    data-aos="fade-down"
                    data-aos-delay={idx * 200}
                    data-aos-duration="800"
                    data-aos-easing="ease-out-cubic"
                  >
                    <div
                      className={`bg-white border shadow-xl rounded-2xl px-8 py-4 text-center text-sm md:text-lg font-semibold max-w-md w-full lg:w-auto transform ${rotation}`}
                    >
                      {text}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeServe;
