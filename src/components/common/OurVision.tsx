/**
 * @description Vision component
 */

import VisionBg from "../../assets/our-vision.webp";

const OurVision = () => {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat py-24"
      style={{ backgroundImage: `url(${VisionBg})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-16 flex flex-col md:flex-row gap-12 items-stretch">
        {/* Left: Our Vision header */}
        <div className="md:flex-[1] flex items-center justify-center text-center md:text-left">
          <h3
            className="text-3xl md:text-5xl font-semibold leading-tight text-white"
            data-aos="fade-up"
          >
            Our Vision
          </h3>
        </div>

        {/* Right: Text content */}
        <div className="md:flex-[2] text-center md:text-left space-y-6 text-white/90 flex flex-col justify-center">
          <p
            className="text-base md:text-lg leading-relaxed"
            data-aos="zoom-out"
          >
            Our vision is to create a world where every aspiring tech talent has
            the opportunity to grow through practical experience, regardless of
            their background or location. We envision a global community of
            learners, creators and innovators who collaborate, experiment and
            innovate together, building the next generation of tech solutions.
            <br /> We aim to be leading platform where aspiring tech talents not
            only learn but thrive, gaining the confidence, experience and
            connections needed to succeed in the tech industry. <b />
            Whether it's building a mobile app, designing a website or
            contributing to open-source projects. Ou vision is to ensure that no
            beginner feels stuck, unskilled or isolated.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurVision;
