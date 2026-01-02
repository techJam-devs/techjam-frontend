/**
 *
 * @returns Service page component
 */

import FAQAccordion from "../components/common/Faq";
import TechSupport from "../components/common/TechSupport";
import WhoWeServe from "../components/common/WhoweServe";

const Services = () => {
  const services = [
    {
      title: "Collaborative Project Hub",
      text: "TechJam connects beginners with real hands-on projects created by individuals start-ups and community members. Users can join project teams, contribute their skills and work in environments that simulate real workplace collaboration.",
    },
    {
      title: "Project creation for innovators",
      text: "For creators, startups and team leads, TechJam offers a simple way to post projects and recruit contributors. Weather you're building a new app, designing a website or experimenting with a tech idea, the platform helps you gather the right people to bring your idea to life.",
    },
    {
      title: "Skill-Based team matching",
      text: "Our algorithm helps match contributors to projects based on their skills, interests and experience level. This ensures every user finds a project that fits their learning goals and personal strengths.",
    },
    {
      title: "Mentorship & Guided learning",
      text: "TechJam connects beginners with real hands-on projects created by individuals, startups and community members. Users can join project teams, contribute their skills and work in environments that stimulate real workplace collaboration.",
    },
    {
      title: "Community forum & learning space",
      text: " For creators startups and team leads, TechJam offers a simple way to post projects and recruit contributors. Weather you're building a new app, designing a website or experimenting with a tech idea, the platform helps you gather the right people to bring your idea to life.",
    },
    {
      title: "Portfolio & Experience building",
      text: "Our algorithm helps match contributors to projects base on their skills, interests and experience level. This ensures every user finds a project that fits their learning goals and personal strengths.",
    },
  ];

  return (
    <section className="mt-16 py-10">
      <h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 leading-tight tracking-wide"
        data-aos="fade-up"
      >
        Services
      </h2>
      <p
        className="text-center max-w-2xl mx-auto tracking-wide p-4"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        At Techjam, we provide a comprehensive ecosystem designed to help tech
        beginners gain practical experience, collaborate on real projects and
        build the confidence they need to thrive in the tech industry. Our
        services are built around real-world application, community support and
        skill development.
      </p>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((n, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg shadow-md bg-blue-100"
              data-aos="fade-up"
              data-aos-delay={idx * 200} // stagger each card by 200ms
              data-aos-duration="1000"
            >
              <h3 className="text-2xl tracking-wide uppercase text-center mb-4 max-w-xs mx-auto font-semibold text-gray-800">
                {n.title}
              </h3>
              <p className="text-center text-xs md:text-sm text-gray-600">
                {n.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/** ====== work together ===== */}
      <div className="container mx-auto flex flex-col-reverse lg:flex-row justify-center gap-6 items-center mt-6 py-16">
        {/* Left text section */}
        <div
          className="p-4 flex-1"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <h3
            className="text-2xl md:text-4xl font-bold lg:max-w-md mb-4 text-center lg:text-start"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            Work together, wherever you are
          </h3>
          <p
            className="text-xs md:text-lg w-full lg:max-w-sm text-gray-600 text-center lg:text-start"
            data-aos="fade-right"
            data-aos-delay="400"
          >
            In the office, remote or a mix of two with TechJam. Your team can
            connect, collaborate and co-create in one space no matter where you
            are.
          </p>
          <div
            className="w-36 h-1 bg-blue-500 mt-16 rounded-full mx-auto lg:mx-0"
            data-aos="fade-right"
            data-aos-delay="600"
          ></div>
        </div>

        {/* Right single image */}
        <div
          className="flex-1 flex justify-center items-center"
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          <div className="w-full max-w-md md:max-w-lg h-64 md:h-[400px] rounded-2xl overflow-hidden">
            <img
              src="/src/assets/services.png"
              alt="Team working"
              className="w-full h-full object-cover"
              data-aos="zoom-in"
              data-aos-delay="400"
            />
          </div>
        </div>
      </div>

      {/** ======== Who we serve ======= */}
      <WhoWeServe />

      {/** ==== technology support ====== */}
      <TechSupport />
      {/** =========== FAQ ======== */}
      <FAQAccordion />
    </section>
  );
};

export default Services;
