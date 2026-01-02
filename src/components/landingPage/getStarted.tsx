/**
 * @description A CTA at the bottom of the landing page
 */

import Button from "../common/Button";
import Modal from "../authModals/AuthModal";
import { useState } from "react";
import type { AuthPortal } from "../../types/authModel.types";

const GetStarted = () => {
  // Modal visibility
  const [openModal, setOpenModal] = useState<AuthPortal | null>(null);

  return (
    <section className="flex flex-col lg:flex-row max-w-6xl mx-auto py-20 px-4 justify-between items-center gap-4">
      {/** text */}
      <div className="lg:w-4xl">
        <h3
          className="text-center lg:text-start text-lg md:text-2xl leading-loose"
          data-aos="fade-down"
        >
          Get Started
        </h3>
        <p
          className="text-center lg:text-start font-semibold text-3xl md:text-4xl tracking-normal"
          data-aos="fade-right"
        >
          {" "}
          Ready to start building real - <br /> world experience?
        </p>
      </div>
      {/** button */}
      <div
        className="flex items-center justify-center w-full  mt-6"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <Button
          onClick={() => setOpenModal("signUp")}
          text="Get Started"
          className="w-sm"
        />
      </div>

      {/** Sign Up modal */}
      <Modal
        isOpen={!!openModal}
        onClose={() => setOpenModal(null)}
        switchPortal={openModal}
        onSwitch={setOpenModal}
      />
    </section>
  );
};

export default GetStarted;
