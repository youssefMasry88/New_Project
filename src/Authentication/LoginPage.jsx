import React, { useState } from "react";
import Banner from "../Components/NavBar/Banner";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import UnderBanner from "../Components/NavBar/UnderBanner";
import toast from "react-hot-toast";
import { login as loginService } from "../services/authService";
import { useAuth } from "../Context/useAuth";

function LoginPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {login} = useAuth();
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    Password: Yup.string().required("Required"),
  });
  const initialValues = {
    email: "",
    Password: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setError("");

      const res = await loginService({
        identifier: values.email,
        password: values.Password
      });
      // 💾  Storage
      login(res.user, res.jwt);

      toast.success('Login Success');
      navigate("/");

      resetForm();

    } catch (err) {
      console.log(err.message);
      setError("Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  };

  // const handleGoogleLogin = async () => {
  //   try{
  //     const provider = new GoogleAuthProvider();

  //     const result = await signInWithPopup(auth, provider);

  //     const user = result.user;

  //     localStorage.setItem("user", JSON.stringify(user));

  //     console.log("GOOGLE LOGIN SUCCESS:", user);

  //     navigate("/");
  //   }catch (err) {
  //     console.log(err.message);
  //   }
  // }

  return (
    <div >
      <Banner />
      <div>
      <div className="max-w-2xl lg:mx-auto mx-5 ">
        <h2 className="pt-[3em] pb-[1em] text-4xl font-third text-primary ">
          Log in
        </h2>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={LoginSchema}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5 ">
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
                  className="w-full bg-transparent border-b-2 border-third focus:border-primary focus:transform duration-300 focus:shadow-2xl outline-none py-2 text-[#2B1D12] placeholder:text-third placeholder:text-sm pb-1"
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
                  className="w-full bg-transparent border-b-2 border-third focus:border-primary focus:transform duration-300 focus:shadow-2xl outline-none py-2 text-[#2B1D12] placeholder:text-third placeholder:text-sm pb-1"
                />
                <ErrorMessage
                  name="Password"
                  component="p"
                  className="text-xs mt-2 text-red-500"
                />
              </div>

              {/* Terms + Login */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm ">
                <label
                  htmlFor="terms"
                  className="text-sm text-primary font-third flex items-center     "
                >
                  <Field
                    type="checkbox"
                    name="terms"
                    id="terms"
                    className="mr-2"
                  />
                  Remember Me
                </label>

                <div>
                  <Link
                    to="/forgot-password"
                    className="text-primary font-semibold"
                  >
                    Forgot Password?
                  </Link>

                  <Link to="/register">
                    <span className="pl-2 text-primary font-semibold">
                      Create an Account
                    </span>
                  </Link>
                </div>
              </div>

              {/* Social */}

              <div className="flex flex-col  md:flex-row items-center justify-center gap-4 pt-3 w-full">
                {/* <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full md:w-70 py-2 rounded-full cursor-pointer border border-[#B7772A] text-[#B7772A] hover:bg-[#B7772A] hover:text-white transition font-third text-md font-semibold flex items-center justify-center gap-2"
                >
                  Google
                </button> */}

                <Link
                  to="https://www.facebook.com/"
                  className="flex items-center cursor-pointer justify-center gap-2 w-full md:w-70 py-2 rounded-full border border-[#B7772A] text-[#B7772A] hover:bg-[#B7772A] hover:text-white transition font-third text-md font-semibold"
                >
                  <button type="button" className="">
                    Facebook
                  </button>
                </Link>
              </div>

              {/* Submit */}
              <div className="flex items-center flex-col gap-2 justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full cursor-pointer sm:w-80 py-3 rounded-full bg-third text-primary font-semibold text-xl font-third hover:brightness-95 transition disabled:opacity-60"
                >
                  {isSubmitting ? "logging in..." : "Log In"}
                </button>
                {error && <p className="text-red-500">{error}</p>}
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        <UnderBanner />
      </div>
    </div>
    </div>
  );
}

export default LoginPage;
