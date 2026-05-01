import React from "react";
import {  createBrowserRouter } from "react-router-dom";
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

export const Router = createBrowserRouter([
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
        path: "/About",
        element: <AboutPage />,
      },
      {
        path: "/Contact",
        element: <ContactUsPage />,
      },
      
      {
        path: "/LogIn",
        element: <LoginPage />,
      },
      {
          path: '/SignUp',
          element: <RegisterPage/>
      },
      {
          path: '/ForgotPassword',
          element: <ForgotPassword/>
      },
      {
          path: '/resetCode',
          element: <ResetCode/>
      },
      {
          path: '/resetPass',
          element: <ResetPass/>
      },
      {
        path: "/Shop",
        element: <ShopPage />,
      },
      {
        path: "/Product/:id",
        element: <SinglePage />,
      }
      ,
      {
        path: "/Cart",
        element: <CartPage />,
      },
      {
        path: "/Checkout",
        element: <Checkout />,
      }
    ],
  },
],
 {
   basename: "/New_Project", 
 }
);

export default Router;