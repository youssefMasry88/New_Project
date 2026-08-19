import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import AppLayout from "../Layout/AppLayout";
import AboutPage from "../Pages/AboutPage";
import ContactUsPage from "../Pages/ContactUsPage";
import RegisterPage from "../Authentication/RegisterPage";
import LoginPage from "../Authentication/LoginPage";
import ForgotPassword from "../Authentication/ForgotPassword";
import ResetCode from "../Authentication/ResetCode";
import ResetPass from "../Authentication/ResetPass";
import ShopPage from "../Pages/ShopPage";
import CartPage from "../Pages/CartPage";
import Checkout from "../Pages/Checkout";
import ScrollToTop from "../Components/UI/ScrollToTop";
import SinglePage from "../Pages/SinglePage";
import AccountPage from "../Pages/AccountPage";
import ProtectedRoute from "../Components/UI/ProtectedRoute";

export const Router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <>
          <AppLayout />
          <ScrollToTop />
        </>
      ),

      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/about",
          element: <AboutPage />,
        },
        {
          path: "/contact",
          element: <ContactUsPage />,
        },

        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "/reset-code",
          element: <ResetCode />,
        },
        {
          path: "/reset-password",
          element: <ResetPass />,
        },
        {
          path: "/shop",
          element: <ShopPage />,
        },
        {
          path: "/product/:slug",
          element: <SinglePage />,
        },
        {
          path: "/cart",
          element: <CartPage />,
        },
        {
          path: "/checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "/account",
          element: (
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ],
  {
    basename: import.meta.env.PROD ? "/New_Project/" : "/",
  },
);

export default Router;
