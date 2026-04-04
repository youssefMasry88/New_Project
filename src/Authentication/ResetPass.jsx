import React from "react";
import Banner from "../Components/NavBar/Banner";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import UnderBanner from "../Components/NavBar/UnderBanner";

function ResetPass() {
  const navigate = useNavigate();
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // هنا هتحط API بتاعك
      // مثال:
      // await api.post("/auth/register", values);

      console.log("REGISTER:", values);

      navigate("/login", { state: { success: true } });

      resetForm();
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = {
    Password: "",
    confirmPassword: "",
  };

  const passSchema = Yup.object().shape({
    Password: Yup.string()
      .min(6, "Min 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("Password")], "Passwords must match")
      .required("Confirm password is required"),
  });
  const inputClass =
    "w-full bg-transparent border-b-2 border-third focus:border-primary transition-all duration-300 outline-none py-2 text-[#2B1D12] placeholder:text-third placeholder:text-sm";
  return (
    <div>
      <Banner />
      <div className="max-w-2xl lg:mx-auto py-10 ">
        <div className=" flex flex-col gap-1 pt-10 sm:pt-[3em] pb-6 sm:pb-[1em]  ">
          <h2 className="text-primary text-3xl sm:text-4xl  font-third  ">
            Create New Password
          </h2>
          <div className="pl-[1em] pt-[.5em]">
            <p className="text-secondary text-sm font-secondary ">
              Your new password must be different from previous one
            </p>
            <p className="text-secondary text-sm font-secondary  ">
              Create a strong password
            </p>
          </div>
        </div>
        <div >
          <Formik
            initialValues={initialValues}
            validationSchema={passSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                {/* Password */}

                <div className="Password">
                  <label
                    htmlFor="Password"
                    className="block text-sm text-primary font-third"
                  >
                    Password:
                  </label>
                  <Field
                    type="password"
                    name="Password"
                    placeholder="Set your Password...... "
                    className={inputClass}
                  />
                  <ErrorMessage
                    name="Password"
                    component="p"
                    className="text-xs mt-2 text-red-500"
                  />
                </div>
                {/* Confirm Password: */}

                <div className="confirmPassword:">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm text-primary font-third"
                  >
                    Confirm Password:
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password......."
                    className={inputClass}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="p"
                    className="text-xs mt-2 text-red-500"
                  />
                </div>

                {/* Submit */}
                <div className="flex justify-center pt-5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-80 py-3 rounded-full bg-third text-primary font-semibold text-xl font-third hover:brightness-95 transition disabled:opacity-60"
                  >
                    {isSubmitting ? "Reset Password..." : "Reset Password"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div>
        <UnderBanner />
      </div>
    </div>
  );
}

export default ResetPass;
