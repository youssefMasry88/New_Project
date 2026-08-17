import { Formik, Form, Field } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWishlist } from "../utils/wishlist";
import { Eye, EyeOff } from "lucide-react";
import * as Yup from "yup";
import { getMyOrders } from "../services/orderService";
import { toast } from "react-hot-toast";

export default function AccountPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("account");
  const [wishlist, setWishlist] = useState(() => getWishlist() || []);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

const user = JSON.parse(localStorage.getItem("user")) || {};
console.log(user)
  const firstLetter = user.username?.charAt(0).toUpperCase() || "U";

  useEffect(() => {
    const handleWishlistUpdate = () => {
      setWishlist(getWishlist());
    };

    window.addEventListener("wishlistUpdated", handleWishlistUpdate);

    return () => {
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
    };
  }, []);

  useEffect(() => {
    if (activeTab !== "orders") return;

    const fetchOrders = async () => {
      try {
        setLoadingOrders(true);
        const data = await getMyOrders();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders. Please try again later.");
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, [activeTab]);

  const tabButtonClass = (tab) =>
    `w-full rounded-md px-4 py-3 text-left text-sm font-medium transition border border-gray-300 ${
      activeTab === tab
        ? "bg-primary text-white"
        : "text-gray-700 hover:bg-fourth"
    }`;

  const passwordSchema = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords do not match")
      .required("Confirm password is required"),
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  const formik = `w-full bg-transparent border-b-2 border-third focus:border-primary transition-all duration-300 outline-none p-2 text-[#2B1D12] placeholder:text-third placeholder:text-sm focus:placeholder:text-primary `;

  const label = `block text-sm font-medium text-primary  `;
  return (
    <div className="min-h-screen py-20">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Title */}
        <h1 className="mb-10 text-3xl font-semibold text-gray-900">
          My Account
        </h1>

        {/* Tabs */}
        <div className="grid gap-6 lg:grid-cols-3">
          <aside>
            <div className="flex flex-col items-center text-center ">
              {/* Top */}
              <div className="mb-4 flex h-25 w-25 items-center justify-center rounded-full bg-primary text-6xl font-bold text-white">
                {firstLetter}
              </div>

              <h2 className="text-2xl font-bold text-primary">{user.username}</h2>

              <p className="mt-1 text-sm text-secondary">{user.email}</p>
            </div>

            {/* Buttons */}
            <div className="mt-8 space-y-2">
              <button
                type="button"
                onClick={() => setActiveTab("account")}
                className={tabButtonClass("account")}
              >
                Account Details
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("orders")}
                className={tabButtonClass("orders")}
              >
                Orders
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("addresses")}
                className={tabButtonClass("addresses")}
              >
                Addresses
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("wishlist")}
                className={tabButtonClass("wishlist")}
              >
                Wishlist
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("Password")}
                className={tabButtonClass("Password")}
              >
                Password
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-md px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-fourth border border-gray-300"
              >
                Logout
              </button>
            </div>
          </aside>

          <main className=" lg:col-span-2  p-6 ">
            {activeTab === "account" && (
              <section className="rounded-lg p-6 ">
                <h2 className="mb-5 text-2xl font-bold text-primary">
                  Account Details
                </h2>
                <Formik
                  initialValues={{
                    firstName: user.username || "",
                    lastName:  "",
                    email: user.email || "",
                    phone: user.phone || "",
                    address: user.address || "",
                  }}
                  onSubmit={(values) => {
                    console.log("Account values:", values);
                  }}
                >
                  {() => (
                    <Form className="grid gap-5 md:grid-cols-2">
                      {/* First-name */}
                      <div className=" First-name gap-2">
                        <label htmlFor="firstName" className={label}>
                          First Name
                        </label>
                        <Field
                          type="text"
                          id="firstName"
                          name="firstName"
                          className={formik}
                        />
                      </div>

                      {/* Last-name */}
                      <div>
                        <label htmlFor="lastName" className={label}>
                          Last Name
                        </label>
                        <Field
                          type="text"
                          id="lastName"
                          name="lastName"
                          className={formik}
                        />
                      </div>

                      {/* Email */}
                      <div className="md:col-span-2">
                        <label htmlFor="email" className={label}>
                          Email
                        </label>
                        <Field
                          type="email"
                          id="email"
                          name="email"
                          className={formik}
                        />
                      </div>

                      {/* Phone */}
                      <div className="md:col-span-2">
                        <label htmlFor="phone" className={label}>
                          Phone
                        </label>
                        <Field
                          type="tel"
                          id="phone"
                          name="phone"
                          className={formik}
                        />
                      </div>

                      {/* Address */}
                      <div className="md:col-span-2">
                        <label htmlFor="address" className={label}>
                          Address
                        </label>
                        <Field
                          type="text"
                          id="address"
                          name="address"
                          className={formik}
                        />
                      </div>
                    </Form>
                  )}
                </Formik>
              </section>
            )}

            {/* orders */}
            {activeTab === "orders" && (
              <section>
                <div className="flex items-center">
                  <img
                    className="pb-5"
                    width="40"
                    height="40"
                    src="https://img.icons8.com/3d-fluency/94/pottery.png"
                    alt="pottery"
                  />
                  <h2 className="mb-5 text-4xl font-bold text-primary">
                    orders
                  </h2>
                </div>

                {loadingOrders ? (
                  <p>Loading...</p>
                ) : orders.length === 0 ? (
                  <p className="text-secondary">No orders yet.</p>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div
                      key={order.id}
                      className="rounded-xl border border-gray-200 p-5 shadow-sm"
                      >
                        {/* Headers*/}
                        <div className="flex justify-between items-center border-b pb-3 mb-3 ">
                        

                        <div>
                          <h3 className="text-lg font-semibold text-primary">
                            📦 Order #{order.id}
                          </h3>

                          <p className="text-sm text-secondary">
                            {new Date(order.createdAt).toLocaleDateString("en-GB",{
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold
                          ${
                            order.orderStatus === "Pending"
                              ? "bg-yellow-100 text-primary"
                              : order.orderStatus === "Processing"
                                ? "bg-blue-100 text-blue-700"
                                : order.orderStatus === "Delivered"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                                }`}
                                >
                          {order.orderStatus}
                        </span>
                        </div>

                          {/* Products */}
                          
                        <div className="space-y-2">
                          {order.products?.map((product) => (
                            <div
                            key={product.id}
                            className="flex justify-between text-sm"
                            >
                              <div className="flex items-center gap-4">
                                <img src={product.image} 
                                alt={product.name}
                                className="w-16 h-16 rounded-lg object-cover"
                                />

                                <div>
                                  <h3 className="font-medium text-primary">
                                    {product.name}
                                  </h3>

                                  <p className="text-sm text-secondary">
                                    Qty: {product.quantity}
                                  </p>
                                </div>
                              </div>

                              <span>
                                EGP {(product.price * product.quantity).toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Footer */}

                        <div className="border-t mt-5 pt-5 flex justify-between items-end">
                          <div className="text-gray-700">
                            <p className="text-sm ">
                              {order.shippingAddress}
                            </p >
                            <p className="text-sm ">
                              {order.phone}
                            </p>
                          </div>
                          <h2 className="text-lg font-semibold text-primary">Total: EGP {order.total.toLocaleString()}</h2>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {/* {loadingOrders ? (
  <p>Loading...</p>
) : orders.length === 0 ? (
  <p className="text-gray-500">No orders yet.</p>
) : (
  <div className="space-y-6">
    {orders.map((order) => (
      <div
        key={order.id}
        className="rounded-xl border border-gray-200 p-5 shadow-sm"
      >
        
        <div className="flex justify-between items-center border-b pb-3 mb-3">
          <div>
            <h3 className="font-bold text-lg text-primary">
              Order #{order.id}
            </h3>

            <p className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold
              ${
                order.orderStatus === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : order.orderStatus === "Processing"
                  ? "bg-blue-100 text-blue-700"
                  : order.orderStatus === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
          >
            {order.orderStatus}
          </span>
        </div>

      

        <div className="space-y-2">
          {order.products.map((product, index) => (
            <div
              key={index}
              className="flex justify-between text-sm"
            >
              <span>
                {product.name} × {product.quantity}
              </span>

              <span>
                EGP {(product.price * product.quantity).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

      

        <div className="border-t mt-4 pt-4 flex justify-between items-center">

          <div>
            <p className="text-sm text-gray-500">
              {order.shippingAddress}
            </p>

            <p className="text-sm text-gray-500">
              {order.phone}
            </p>
          </div>

          <h2 className="text-xl font-bold text-primary">
            EGP {order.total.toLocaleString()}
          </h2>

        </div>
      </div>
    ))}
  </div>
)} */}
              </section>
            )}
            {/* Addresses */}
            {activeTab === "addresses" && (
              <section>
                <div className="flex items-center">
                  <img
                    className="pb-5"
                    width="40"
                    height="40"
                    src="https://img.icons8.com/emoji/48/amphora-emoji.png"
                    alt="amphora-emoji"
                  />
                  <h2 className="mb-5 text-4xl font-bold text-primary">
                    Addresses
                  </h2>
                </div>

                <Formik
                  initialValues={{
                    address: user.address,
                    city: "Cairo",
                    phone: user.phone,
                  }}
                  onSubmit={(values) => {
                    console.log("Address values:", values);
                  }}
                >
                  {() => (
                    <Form className="grid gap-5">
                      <div>
                        <label className={label}>Address</label>
                        <Field
                          name="address"
                          type="text"
                          className={formik}
                        ></Field>
                      </div>

                      <div>
                        <label className={label}>City</label>
                        <Field name="city" type="text" className={formik} />
                      </div>

                      <div>
                        <label className={label}>Phone</label>
                        <Field name="phone" type="tel" className={formik} />
                      </div>
                      <button
                        type="submit"
                        className="w-fit rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                      >
                        Save Address
                      </button>
                    </Form>
                  )}
                </Formik>
              </section>
            )}

            {/* Wishlist */}
            {activeTab === "wishlist" && (
              <section className="rounded-lg p-3">
                <div className="flex items-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2569/2569951.png "
                    width="38"
                    height="38"
                    alt=""
                    title=""
                    className="pb-5"
                  ></img>
                  <h2 className="mb-5 text-4xl font-bold text-primary">
                    Wishlist
                  </h2>
                </div>

                {wishlist.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    Your wishlist is empty.
                  </p>
                ) : (
                  <div className="grid gap-5 sm:grid-cols-2">
                    {wishlist.map((item) => {
                      console.log(item);
                      return (
                        <div
                          key={item.id}
                          className="cursor-pointer rounded-lg border border-gray-200 p-4 transition hover:-translate-y-1 hover:shadow-md"
                          onClick={() => navigate(`/product/${item.slug}`)}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="mb-4 h-56 w-full rounded-md object-cover"
                          />

                          <h3 className="font-semibold text-primary">
                            {item.name}
                          </h3>

                          <p className="mt-1 text-sm text-secondary">
                            EGP {item.price.toLocaleString()}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            )}

            {/* Password */}
            {activeTab === "Password" && (
              <section className="rounded-lg p-3">
                <h2 className="mb-7 text-4xl font-bold text-primary">
                  Change Password
                </h2>

                <Formik
                  initialValues={{
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  }}
                  validationSchema={passwordSchema}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    console.log("Password values:", values);
                    setSubmitting(false);
                    resetForm();
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="max-w-3x flex flex-col gap-6 text-sm font-medium text-primary">
                      <div>
                        <label className="  ">Current Password</label>
                        <Field
                          name="currentPassword"
                          label="Current Password"
                          placeholder="Enter current password"
                          type="password"
                          className={formik}
                        />
                      </div>

                      <div>
                        <label className="  ">New Password</label>
                        <Field
                          name="newPassword"
                          label="New Password"
                          placeholder="Enter new password"
                          type="password"
                          className={formik}
                        />
                      </div>
                      <div>
                        <label className="  ">Confirm Password</label>
                        <Field
                          name="confirmPassword"
                          label="Confirm Password"
                          placeholder="Confirm new password"
                          type="password"
                          className={formik}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-4 w-fit rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Update Password
                      </button>
                    </Form>
                  )}
                </Formik>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
