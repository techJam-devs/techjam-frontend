/**
 * @description Collaboration component used in the about page
 */
import GlobeImg from "../../assets/globalImg.svg";

const Collaborate = () => {
  return (
    <section className="py-24">
      {/* Heading at top (optional) */}
      <h1
        className="text-2xl md:text-3xl font-bold max-w-xl mx-auto text-center mb-10 px-4 leading-relaxed"
        data-aos="fade-up"
      >
        Collaborate anywhere in the world without constraints
      </h1>

      <div className="relative flex flex-col items-center justify-center text-center h-[300px] md:h-[400px] w-full px-4 space-y-4">
        <img
          src={GlobeImg}
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Floating texts */}
        <p
          className="text-lg md:text-2xl font-semibold text-blue z-50 mb-6"
          data-aos="fade-up"
        >
          Easy Integration
        </p>
        <p
          className="text-lg md:text-2xl font-semibold text-blue"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          Secure Data
        </p>
      </div>
    </section>
  );
};

export default Collaborate;
