import React from "react";
import Banner from "../Components/NavBar/Banner";
import UnderBanner from "../Components/NavBar/UnderBanner";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
  };
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log("LOGIN:", values);

      navigate("/resetCode", { state: { success: true } });

      resetForm();
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };
  const ForgetSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });
  return (
    <div  >
      <Banner />
      <div className="max-w-2xl lg:mx-auto mx-5 py-[5em] ">
            <h2 className=" text-4xl font-third text-primary ">
          Forgot Password
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={ForgetSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className=" space-y-4" >
              <div>
                <div className="Email">
                  <label
                    htmlFor="email"
                    className="block text-sm text-primary font-third"
                  >
                    Email:
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Your Email Here....."
                    className="w-full bg-transparent border-b-2 border-third focus:border-primary focus:transform duration-300 focus:shadow-2xl outline-none py-2 text-[#2B1D12] placeholder:text-third placeholder:text-sm pb-1"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-xs mt-2 text-red-500"
                  />
                </div>
                {/* Submit */}
                <div className="flex justify-center pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-80 py-3 rounded-full bg-third text-primary font-semibold text-xl font-third hover:brightness-95 transition disabled:opacity-60"
                  >
                    {isSubmitting ? "Sending..." : "Send"}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <UnderBanner />
    </div>
  );
}