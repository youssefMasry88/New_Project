import React from "react";
import contact from "../assets/contact.png";
import C1 from "../assets/C1.png";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { IconBrandX } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { Form, Field, Formik } from "formik";
import UnderBanner from "../Components/NavBar/UnderBanner";
import { FaArrowUp } from "react-icons/fa";

export default function ContactUsPage() {

    const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const inputClass =
    "w-full bg-transparent border-b-2 border-third focus:border-primary transition-all duration-300 outline-none py-2 text-[#2B1D12] placeholder:text-third placeholder:text-sm";
  return (
    <div >
      <div className=" w-full h-[60vh] bg-cover bg-center relative flex items-center justify-center">
        <img
          src={contact}
          alt=""
          className="w-full h-full object-cover absolute"
        />
        <div className="absolute inset-0 bg-black/40"></div>

        <h1 className="text-5xl text-[#C57A1A] font-nav relative">
          Contact Us
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-10 lg:px-22 pt-30">
        {/* Left */}
        <div className="grid grid-cols-1 gap-6 ">
          <div className="flex flex-col gap-2 ">
            <img
              src={C1}
              alt=""
              className="w-164 h-71 rounded-2xl object-cover "
            />

            <div className="pt-3">
              <h1 className="text-4xl font-secondary text-primary font-bold">
                Contact information
              </h1>
              <p className="text-md font-third text-third">
                Tortor dignissim convallis aenean et tortor at risus viverra
                adipiscing.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between  gap-10  ">
                <div className="flex flex-col gap-4 text-third text-lg">

                  <Link to="https://instagram.com" className="hover:text-primary transition-colors duration-300 cursor-pointer">
                    email@yourcompany.com
                  </Link>

                  <span className="hover:text-primary transition-colors duration-300 cursor-pointer">
                    15Th Street Avenue, New York, USA
                  </span>

                  <span className="hover:text-primary transition-colors duration-300 cursor-pointer">
                    011-554-8798-6556
                  </span>

                </div>
                <div className=" flex items-center gap-4 text-third ">
                  <SocialLink to="#" icon={<FaFacebookF size={20} />}  />
                  <SocialLink to="#" icon={<FaLinkedinIn size={20} />} />
                  <SocialLink to="#" icon={<IconBrandX size={20} />} />
                  <SocialLink to="#" icon={<FaInstagram size={20} />} />
                  <div>

                  </div>
                </div>


              
            </div>

            
          </div>
        </div>
        {/* Right */}
        <div className="grid grid-cols-1 gap-6 ">
          <div className="flex flex-col gap-2 ">
            <div>
              <h1 className="text-4xl font-primary text-primary font-bold">
                Leave Any Questions?
              </h1>
              <p className="text-sm p-2 font-third text-third">
                Use the form below to get in touch with us.
              </p>
            </div>
            <div>
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  phone: "",
                  subject: "",
                  message: "",
                }}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                <Form className="flex flex-col gap-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm text-primary font-third"
                    >
                      Your Name*
                    </label>
                    <Field
                      type="text"
                      name="name"
                      placeholder="write Your Name Here ......."
                      className={inputClass}
                    />
                  </div>
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm text-primary font-third"
                    >
                      Email*
                    </label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Your Email Here....."
                      className={inputClass}
                    />
                  </div>
                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm text-primary font-third"
                    >
                      Phone Number*
                    </label>
                    <Field
                      type="tel"
                      name="phone"
                      placeholder="Your Phone Number Here....."
                      className={inputClass}
                    />
                  </div>
                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm text-primary font-third"
                    >
                      Subject*
                    </label>
                    <Field
                      type="text"
                      name="subject"
                      placeholder="Your Subject Here....."
                      className={inputClass}
                    />
                  </div>
                  {/* Message */}

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm text-primary font-third"
                    >
                      Message*
                    </label>
                    <Field
                      as="textarea"
                      type="textarea"
                      name="message"
                      placeholder="Your Message Here....."
                      className={`${inputClass} resize-none `}
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="w-full  py-3 rounded-full bg-third text-primary font-semibold text-xl font-third hover:brightness-95 transition disabled:opacity-60"
                    >
                      Send
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
            
          </div>
        </div>
      </div>

      <UnderBanner />
        <button
          onClick={handleScroll}
          className="animate-bounce fixed bottom-6 right-6 w-10 h-10 bg-primary flex items-center justify-center text-white rounded-full"
        >
          <FaArrowUp />
        </button>
    </div>
  );
}
const SocialLink = ({ to, icon }) => (
  <Link
    to={to}
    className="flex items-center justify-center border border-black/20 rounded-lg p-2 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
  >
    {icon}
  </Link>
);
