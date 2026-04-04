import React from "react";
import About from "../assets/About.png";
import { IconTruckDelivery } from "@tabler/icons-react";
import { IconShoppingCart } from "@tabler/icons-react";
import { PiArrowsClockwiseBold } from "react-icons/pi";
import T1 from "../assets/T1.jpg";
import T2 from "../assets/T2.jpg";
import T3 from "../assets/T3.jpg";
import T4 from "../assets/T4.jpg";
import { FaArrowUp } from "react-icons/fa";
export default function AboutPage() {
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const data = [
    { id: 1, name: "John Smith", role: "Founder", Img: T1 },
    { id: 2, name: "Emily Clark", role: "Designer", Img: T2 },
    { id: 3, name: "Michael Lee", role: "Manager", Img: T3 },
    { id: 4, name: "Sarah Brown", role: "Marketing", Img: T4 },
  ];
  return (
    <div className="min-h-screen  ">
      <div
        className="w-full h-[60vh] bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: `url(${About})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <h1 className="text-5xl text-[#C57A1A] font-nav relative">About Us</h1>
      </div>
      {/* Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-10 lg:px-20 py-30">
        <div className="flex flex-col gap-2 items-center justify-center ">
          <IconTruckDelivery size={40} color="gray" className="mx-auto" />

          <h1 className="text-2xl italic font-secondary text-primary">
            {" "}
            Quick delivery
          </h1>
          <p className="text-third font-nav text-sm">
            Inside City delivery within 5 days
          </p>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center ">
          <IconShoppingCart size={40} color="gray" className="mx-auto" />

          <h1 className="text-2xl italic font-secondary text-primary">
            {" "}
            Pick up in store
          </h1>
          <p className="text-third font-nav text-sm">
            We have option of pick up in store
          </p>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center ">
          <PiArrowsClockwiseBold size={40} color="gray" className="mx-auto" />

          <h1 className="text-2xl italic font-secondary text-primary">
            {" "}
            Return policy
          </h1>
          <p className="text-third font-nav text-sm">
            We will take return in some cases
          </p>
        </div>
      </div>

      {/* story */}
      <div className="flex flex-col gap-6 ">
        <h1 className="font-secondary text-4xl font-semibold text-primary px-6 md:px-10 lg:px-25">
          How We Started?
        </h1>
        <p className="text-third font-third text-md px-6 md:px-10 lg:px-33">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing specimen book. It has survived not only five centuries, but
          also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing
        </p>
      </div>

      {/* mission */}
      <div className="flex flex-col gap-6  py-15">
        <h1 className="font-secondary text-4xl font-semibold text-primary px-6 md:px-10 lg:px-25">
          What we stand for as a business?
        </h1>
        <p className="text-third font-third text-md px-6 md:px-10 lg:px-33">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing specimen book. It has survived not only five centuries, but
          also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing
        </p>
      </div>

      {/* Team */}
      <div>
        <h1 className="font-secondary text-4xl font-semibold text-center text-primary pb-15 py-10">
          {" "}
          Our Team
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 md:px-10 lg:px-20">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-2 items-center justify-center transition duration-300 hover:-translate-y-2"
            >
              <img
                src={item.Img}
                alt={item.name}
                loading="lazy"
                className="w-70 h-70 object-cover rounded-xl transition duration-300 hover:scale-105"
              />
              <h1 className="text-2xl italic font-secondary text-primary">
                {" "}
                {item.name}
              </h1>
              <p className="text-third font-nav text-sm">{item.role}</p>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleScroll}
        className="fixed bottom-6 right-6 w-10 h-10 bg-primary flex items-center justify-center text-white rounded-full"
      >
        <FaArrowUp />
      </button>
    </div>
  );
}
