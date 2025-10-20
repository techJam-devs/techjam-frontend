/**
 * @description About section of the landing page
 */

const About = () => {
  return (
    <section className="py-16">
      <div className="max-w-2xl mx-auto p-4 text-center space-y-8">
        <h1 className="text-2xl md:text-3xl font-semibold">About Us</h1>
        <p className="text-base md:text-lg leading-relaxed">
          TechJam is the platform for tech beginners to gain hands-on experience
          by working on real-world projects in design, development, product
          management and many more.{" "}
          <span className="text-blue font-bold">
            Our community driven approaches ensures you never build alone.
          </span>
        </p>
      </div>
    </section>
  );
};

export default About;
