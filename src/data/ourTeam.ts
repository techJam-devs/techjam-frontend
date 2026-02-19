/**
 * @description Array of data to be used in our team component
 *              Displaying team members name, pic, role
 */

import Marcus from "../assets/marcus.webp";
import Otega from "../assets/ortega.webp";
import Deborah from "../assets/deb.webp";
import Thelma from "../assets/thelma.webp";

export const images = [
  {
    src: Marcus,
    radius: "rounded-full rounded-br-none",
    color: "bg-yellow-400",
  },
  {
    src: Deborah,
    radius: "rounded-full rounded-bl-none",
    color: "bg-gray-400",
  },
  {
    src: Otega,
    radius: "rounded-full rounded-tr-none",
    color: "bg-pink-400",
  },

  {
    src: Thelma,
    radius: "rounded-full rounded-tl-none",
    color: "bg-purple-400",
  },
];

export const teamMembers = [
  {
    name: "Marcus",
    role: "Our leading UI/UX designer delivering good and catchy designs across projects.",
    border: "border-r-red-600 border-b-pink-400",
    delay: 600,
  },
  {
    name: "Deborah",
    role: "Project manager, keeping the team in check with years of expertise handling projects and delivering good results.",
    border: "border-l-pink-400",
    delay: 300,
  },
  {
    name: "Otega Otite",
    role: "Our backend lead, building security and database for applications.",
    border: "border-t-red-400 border-r-yellow-400",
    delay: 500,
  },

  {
    name: "Thelma",
    role: "Project manager, keeping the team in check with years of expertise handling projects and delivering good results.",
    border: "border-t-blue border-l-yellow-400",
    delay: 100,
  },
];
