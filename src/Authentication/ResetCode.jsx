import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Banner from "../Components/NavBar/Banner";
import UnderBanner from "../Components/NavBar/UnderBanner";
import { Field, Form, Formik } from "formik";

export default function ResetCode() {
  const navigate = useNavigate();
  const inputs = useRef([]);
const initialValues = {
      d1: "",
    d2: "",
    d3: "",
    d4: "",
}

const handleChange = (e, index,setFieldValue) => {
    const value = e.target.value;

    if (!/^\d?$/.test(value)) return;

     setFieldValue(`d${index + 1}`, value);
         if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }
}

const handleKeyDown = (e, index , values , setFieldValue) => {
  if(e.key === "Backspace" && !values [`d${index + 1}`] && index > 0){
    inputs.current[index - 1]?.focus();
  }
  if(e.key === "Backspace" && values [`d${index + 1}`]){
    setFieldValue(`d${index + 1}`, "");
  }
  }

const handleSubmit = async (values, { setSubmitting }) => {
  try {
    navigate("/resetPassword", { state: { success: true } });
  } catch (err) {
    console.log(err);
  } finally {
    setSubmitting(false);
  }
};


  return (
    <div>
      <Banner />
    <div className=" flex items-center justify-center px-4 py-[7em]">
      <div className="text-center w-full max-w-md">
        
        {/* Title */}
        <h2 className="text-3xl sm:text-5xl text-left pl-[1em] font-third text-primary">
          Code
        </h2>

        <p className="text-sm text-third mt-3">
          Enter the 4 dights code that you received on your email
        </p>

        {/* Form */}
        <Formik initialValues={initialValues} onSubmit={handleSubmit} >
          
          {/* OTP Boxes */}
          {({isSubmitting, values, setFieldValue})=>(
          <Form className=" space-y-5">
            <div className="flex gap-2 justify-center pt-5"> 
            {[0, 1, 2, 3].map((index) => (
              <div key={index}>
                <Field name={`d${index + 1}`}>
                {({field})=>(
                  <input
                    {...field}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    ref={(input) => (inputs.current[index] = input)}
                    onKeyDown={(e) => handleKeyDown(e, index, values, setFieldValue)}
                    onChange={(e) => handleChange(e, index, setFieldValue)}
                    disabled={isSubmitting}
                    value={values[`d${index + 1}`] || ""}
                    className="
                      w-14
                      h-14
                      text-center
                      text-2xl
                      font-semibold
                      rounded-2xl
                      border
                      border-primary/50
                      focus:outline-none
                      "
                      
                  />
                )}
                </Field>
              </div>
            ))}
            </div>
            {/* Submit */}
          <button
            disabled={isSubmitting}
            type="submit"
            className="
              w-50 py-3
              rounded-full
              bg-[#B8A184]
              text-primary
              font-third
              text-2xl
              hover:brightness-95
              transition
            "
          >
            send
          </button>
          {/* Resend */}
          <p className="text-xs text-third">
            Didn’t receive a code?{" "}
            <Link
              to="/forgotPassword"
              type="button"
              className="text-primary font-semibold hover:underline"
              
            >
              Send Code
            </Link>
          </p>
          </Form>
          )}



        </Formik>
      </div>
    </div>
    <UnderBanner />
    </div>

  );
}