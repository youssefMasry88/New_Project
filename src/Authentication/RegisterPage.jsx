import React from "react";
import Banner from "../Components/NavBar/Banner";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import UnderBanner from "../Components/NavBar/UnderBanner";
import * as Yup from "yup";

function RegisterPage() {
  const navigate = useNavigate();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    Password: "",
    confirmPassword: "",
    terms: false,
  };
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
  const RegisterSchema = Yup.object({
  firstName: Yup.string().min(2, "Too short").required("First name is required"),
  lastName: Yup.string().min(2, "Too short").required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  Password: Yup.string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("Password")], "Passwords must match")
    .required("Confirm password is required"),
  terms: Yup.boolean().oneOf([true], "You must accept terms"),

  })
    const inputClass =
    "w-full bg-transparent border-b-2 border-third focus:border-primary transition-all duration-300 outline-none py-2 text-[#2B1D12] placeholder:text-third placeholder:text-sm";

  return (
    <div>
      <Banner />

      <div className="max-w-2xl lg:mx-auto mx-5 ">
        <h2 className="pt-10 sm:pt-[3em] pb-6 sm:pb-[1em] text-3xl sm:text-4xl font-third text-primary ">
          Sign Up
        </h2>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={RegisterSchema}>
          {({ isSubmitting }) => (
            <Form className="space-y-5 ">
              {/* Name */}
              <div className="Name grid grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm text-primary font-third"
                  >
                    First Name:
                  </label>
                  <Field
                    type="firstName"
                    name="firstName"
                    placeholder="First Name....."
                    className={inputClass}
                  />
                  <ErrorMessage
                    name="firstName"
                    component="p"
                    className="text-xs mt-2 text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm text-primary font-third"
                  >
                    Last Name:
                  </label>
                  <Field
                    type="lastName"
                    name="lastName"
                    placeholder="Last Name....."
                    className={inputClass}
                  />
                  <ErrorMessage
                    name="lastName"
                    component="p"
                    className="text-xs text-red-500"
                  />
                </div>
              </div>
              
              {/* Email */}

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
                  className={inputClass}
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-xs mt-2 text-red-500"
                />
              </div>
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

              {/* Terms + Login */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <label
                  htmlFor="terms"
                  className="text-sm text-primary font-third flex items-center "
                >
                  <Field
                    type="checkbox"
                    name="terms"
                    id="terms"
                    className="mr-2"
                  />
                  Agree with Terms & Conditions
                </label>

                <p className="text-xs text-third">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary font-bold">
                    Login
                  </Link>
                </p>
              </div>

              {/* Social */}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
                <Link
                to="https://www.google.com/">
                <button
                  type="button"
                  className="w-full md:w-70 py-2 rounded-full border border-[#B7772A] text-[#B7772A] hover:bg-[#B7772A] hover:text-white transition font-third text-md font-semibold"
                  
                >
                  Google
                </button>
                </Link>

                <Link to="https://www.facebook.com/">
                <button
                  type="button"
                  className="w-full md:w-70 py-2 rounded-full border border-[#B7772A] text-[#B7772A] hover:bg-[#B7772A] hover:text-white transition font-third text-md font-semibold"
                  
                >
                  Facebook
                </button>
                </Link>
              </div>

              {/* Submit */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-80 py-3 rounded-full bg-third text-primary font-semibold text-xl font-third hover:brightness-95 transition disabled:opacity-60"
                >
                  {isSubmitting ? "Signing Up..." : "Sign Up"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        <UnderBanner />
      </div>
    </div>
  );
}

export default RegisterPage;



//               {/* Submit */}
//               <div className="flex justify-center pt-2">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full sm:w-72 py-3 rounded-full bg-[#B8A184] text-white font-semibold hover:brightness-95 transition disabled:opacity-60"
//                 >
//                   {isSubmitting ? "Signing Up..." : "Sign Up"}
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>

//       <UnderBanner />
//     </div>
//   );
// }

// export default RegisterPage;