/**
 * @description User Stories section
 */

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const stories = [
  {
    name: "Sarah Johnson",
    role: "Frontend Developer",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    story:
      "Joining TechJam helped me grow from a beginner to building real-world projects with a team. The collaboration was top-notch!",
  },
  {
    name: "James Carter",
    role: "UI/UX Designer",
    img: "https://randomuser.me/api/portraits/men/3.jpg",
    story:
      "I met my current team here! We’ve worked on multiple projects that improved our portfolios massively.",
  },
  {
    name: "Amara Benson",
    role: "Backend Engineer",
    img: "https://randomuser.me/api/portraits/women/4.jpg",
    story:
      "The community gave me so much confidence and opportunities to work on meaningful projects. Highly recommend it!",
  },
];

const Userstories = () => {
  const [index, setIndex] = useState(0);

  const nextStory = () => setIndex((prev) => (prev + 1) % stories.length);
  const prevStory = () =>
    setIndex((prev) => (prev - 1 + stories.length) % stories.length);

  return (
    <section
      style={{
        background: "linear-gradient(to top, #fff 0%, #ffff 10%, #0908c3 100%)",
      }}
      className="py-20 text-white border-t border-gray-500"
    >
      <h1 className="text-2xl md:text-3xl font-semibold mb-14 md:mb-20 text-center">
        {" "}
        User stories
      </h1>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12 mb-14">
        {/* Left side - Title + Arrows */}
        <div className="flex flex-col items-start gap-6">
          <h2 className="text-2xl">
            From our <br />{" "}
            <span className="font-bold text-4xl"> community</span>
          </h2>
          <p className="text-base md:text-lg">
            Here is what other subscribers are saying about projects from
            TechJam
          </p>

          {/* Arrows */}
          <div className="hidden md:flex gap-4 mt-6">
            <button
              onClick={prevStory}
              className="p-3 rounded-full border border-gray-300 bg-gray-500 transition"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
            <button
              onClick={nextStory}
              className="p-3 rounded-full border border-gray-300 bg-gray-800 transition"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Right side - Active user story */}
        <div className="flex flex-col items-center text-center p-8">
          <p className="italic md:text-lg mb-8">{stories[index].story}</p>
          <div className="flex items-center justify-center gap-4">
            <img
              src={stories[index].img}
              alt={stories[index].name}
              className="h-16 w-16 rounded-full border object-cover"
            />
            <div className="text-left">
              <p className="font-semibold text-gray-900">
                {stories[index].name}
              </p>
              <span className="text-gray-500 text-sm">
                {stories[index].role}
              </span>
            </div>
          </div>
          {/** mobile version */}
          <div className="md:hidden flex gap-4 mt-10">
            <button
              onClick={prevStory}
              className="p-3 rounded-full border border-gray-300 bg-gray-500 transition"
            >
              <ChevronLeft className="h-4 w-4 text-white" />
            </button>
            <button
              onClick={nextStory}
              className="p-3 rounded-full border border-gray-300 bg-gray-800 transition"
            >
              <ChevronRight className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Userstories;
