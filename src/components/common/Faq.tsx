/**
 * @returns FAQ component
 */
import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What is TechJam?",
    answer:
      "TechJam is a collaborative platform that allows teams to work together seamlessly, both remotely and in the office.",
  },
  {
    question: "How do I join a team?",
    answer:
      "You can join a team by signing up and selecting the team you want to collaborate with from the dashboard.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes, TechJam offers a 14-day free trial with full access to all features.",
  },
  {
    question: "Can I integrate external tools?",
    answer:
      "Absolutely! TechJam supports integrations with popular tools like Slack, Trello, and GitHub.",
  },
  {
    question: "How secure is my data?",
    answer:
      "Your data is protected with enterprise-grade encryption and regular security audits.",
  },
  {
    question: "Can I access TechJam on mobile?",
    answer:
      "Yes, TechJam has a fully responsive web app and a mobile app for both iOS and Android.",
  },
];

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col gap-4 max-w-2xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
                data-aos="fade-up"
                data-aos-delay={idx * 150} // stagger each question
                data-aos-duration="1000"
              >
                {/* Question with number on the left and + / - on the right */}
                <button
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none hover:bg-gray-50 transition"
                  onClick={() => toggleIndex(idx)}
                >
                  <div className="flex items-center gap-4">
                    {/* Number badge */}
                    <div className="flex-shrink-0 w-10 h-10 text-gray-600 text-xl rounded-full flex items-center justify-center font-bold">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    {/* Question */}
                    <span className="font-semibold text-lg">
                      {faq.question}
                    </span>
                  </div>

                  {/* Plus / Minus */}
                  <span className="text-2xl font-bold">
                    {isOpen ? "–" : "+"}
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`px-6 pb-6 text-gray-600 text-sm md:text-base transition-all duration-300 ease-in-out ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
