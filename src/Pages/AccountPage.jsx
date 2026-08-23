import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Heart,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import * as Yup from "yup";
import { toast } from "react-hot-toast";

import { getMyOrders } from "../services/orderService";
import {
  getMyWishlist,
  toggleWishlist,
} from "../services/wishlistService";

import { addToCart } from "../utils/cart";

// =========================
// Get Stored User
// =========================

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    localStorage.removeItem("user");
    return {};
  }
};

export default function AccountPage() {
  const navigate = useNavigate();

  // =========================
  // State
  // =========================

  const [activeTab, setActiveTab] = useState("account");

  const [user, setUser] = useState(getStoredUser);

  const [orders, setOrders] = useState([]);

  const [wishlist, setWishlist] = useState([]);

  const [loadingOrders, setLoadingOrders] = useState(false);

  const [loadingWishlist, setLoadingWishlist] = useState(false);

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  // =========================
  // First Letter
  // =========================

  const firstLetter =
    user.username?.charAt(0).toUpperCase() || "U";

  // =========================
  // Classes
  // =========================

  const inputClass =
    "w-full bg-transparent border-b-2 border-third focus:border-primary transition-all duration-300 outline-none p-2 text-[#2B1D12] placeholder:text-third placeholder:text-sm focus:placeholder:text-primary";

  const labelClass =
    "block text-sm font-medium text-primary";

  const errorClass =
    "mt-1 text-sm text-red-500";

  // =========================
  // Authentication
  // =========================

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // =========================
  // Load Wishlist
  // =========================

  useEffect(() => {
    if (activeTab !== "wishlist") return;

    const fetchWishlist = async () => {
      try {
        setLoadingWishlist(true);

        const response = await getMyWishlist();

        console.log("WISHLIST RESPONSE:", response);

        /*
          We support different Strapi response shapes.
        */

        let products = [];

        if (Array.isArray(response)) {
          products = response;
        } else if (Array.isArray(response?.products)) {
          products = response.products;
        } else if (Array.isArray(response?.data)) {
          products = response.data;
        } else if (
          Array.isArray(response?.data?.products)
        ) {
          products = response.data.products;
        }

        // =========================
        // Normalize Products
        // =========================

        const formattedProducts = products.map((item) => {
          const product = item?.attributes
            ? {
                id: item.id,
                ...item.attributes,
              }
            : item;

          // Strapi media
          let image = product.image;

          if (
            product.coverImage?.url
          ) {
            image = product.coverImage.url;
          }

          if (
            product.coverImage?.data?.attributes?.url
          ) {
            image =
              product.coverImage.data.attributes.url;
          }

          // Convert relative Strapi URL
          if (
            image &&
            image.startsWith("/")
          ) {
            image = `https://homey-strapi.onrender.com${image}`;
          }

          return {
            ...product,

            id: product.id,

            name:
              product.name ||
              product.title ||
              "Product",

            price: Number(product.price || 0),

            slug:
              product.slug ||
              product.documentId ||
              product.id,

            image,
          };
        });

        console.log(
          "FORMATTED WISHLIST:",
          formattedProducts
        );

        setWishlist(formattedProducts);
      } catch (error) {
        console.error(
          "WISHLIST ERROR:",
          error.response?.data || error
        );

        toast.error(
          "Failed to load wishlist"
        );

        setWishlist([]);
      } finally {
        setLoadingWishlist(false);
      }
    };

    fetchWishlist();
  }, [activeTab]);

  // =========================
  // Orders
  // =========================

  useEffect(() => {
    if (activeTab !== "orders") return;

    const fetchOrders = async () => {
      try {
        setLoadingOrders(true);

        const data = await getMyOrders();

        console.log("MY ORDERS:", data);

        setOrders(data || []);
      } catch (error) {
        console.log(
          "ORDERS ERROR:",
          error.response?.data || error
        );

        toast.error(
          "Failed to fetch orders. Please try again later."
        );
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [activeTab]);

  // =========================
  // Tabs
  // =========================

  const tabButtonClass = (tab) =>
    `w-full rounded-md px-4 py-3 text-left text-sm font-medium transition border border-gray-300 ${
      activeTab === tab
        ? "bg-primary text-white"
        : "text-gray-700 hover:bg-fourth"
    }`;

  // =========================
  // Validation
  // =========================

  const accountSchema = Yup.object({
    firstName: Yup.string().required(
      "First name is required"
    ),

    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),

    phone: Yup.string(),

    address: Yup.string(),
  });

  const addressSchema = Yup.object({
    address: Yup.string()
      .min(5, "Address is too short")
      .required("Address is required"),

    city: Yup.string().required(
      "City is required"
    ),

    phone: Yup.string().required(
      "Phone is required"
    ),
  });

  const passwordSchema = Yup.object({
    currentPassword: Yup.string().required(
      "Current password is required"
    ),

    newPassword: Yup.string()
      .min(
        8,
        "Password must be at least 8 characters"
      )
      .required("New password is required"),

    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("newPassword")],
        "Passwords do not match"
      )
      .required(
        "Confirm password is required"
      ),
  });

  // =========================
  // Save User
  // =========================

  const saveUser = (updatedUser) => {
    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);
  };

  // =========================
  // Logout
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // =========================
  // Password Toggle
  // =========================

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // =========================
  // Password Field
  // =========================

  const renderPasswordField = (
    name,
    label,
    placeholder
  ) => (
    <div>
      <label
        htmlFor={name}
        className={labelClass}
      >
        {label}
      </label>

      <div className="relative">
        <Field
          id={name}
          name={name}
          placeholder={placeholder}
          type={
            showPassword[name]
              ? "text"
              : "password"
          }
          className={`${inputClass} pr-10`}
        />

        <button
          type="button"
          onClick={() =>
            togglePasswordVisibility(name)
          }
          className="absolute right-2 top-2 text-primary"
        >
          {showPassword[name] ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>

      <ErrorMessage
        name={name}
        component="p"
        className={errorClass}
      />
    </div>
  );

  // =========================
  // Remove Wishlist
  // =========================

  const handleRemoveWishlist = async (
    item
  ) => {
    try {
      await toggleWishlist(item.id);

      // Reload wishlist from Strapi
      const response =
        await getMyWishlist();

      let products = [];

      if (Array.isArray(response)) {
        products = response;
      } else if (
        Array.isArray(response?.products)
      ) {
        products = response.products;
      } else if (
        Array.isArray(response?.data)
      ) {
        products = response.data;
      } else if (
        Array.isArray(
          response?.data?.products
        )
      ) {
        products =
          response.data.products;
      }

      const formattedProducts =
        products.map((item) => {
          const product =
            item?.attributes
              ? {
                  id: item.id,
                  ...item.attributes,
                }
              : item;

          let image =
            product.image;

          if (
            product.coverImage?.url
          ) {
            image =
              product.coverImage.url;
          }

          if (
            product.coverImage?.data
              ?.attributes?.url
          ) {
            image =
              product.coverImage.data
                .attributes.url;
          }

          if (
            image &&
            image.startsWith("/")
          ) {
            image = `https://homey-strapi.onrender.com${image}`;
          }

          return {
            ...product,
            id: product.id,
            name:
              product.name ||
              product.title ||
              "Product",
            price: Number(
              product.price || 0
            ),
            slug:
              product.slug ||
              product.documentId ||
              product.id,
            image,
          };
        });

      setWishlist(
        formattedProducts
      );

      toast.success(
        "Removed from wishlist"
      );
    } catch (error) {
      console.error(
        "REMOVE WISHLIST ERROR:",
        error.response?.data ||
          error
      );

      toast.error(
        "Failed to remove from wishlist"
      );
    }
  };

  // =========================
  // Add Wishlist Item To Cart
  // =========================

  const handleWishlistAddToCart = (
    item
  ) => {
    if (item.stock === 0) {
      toast.error("Out of stock");
      return;
    }

    const added = addToCart(item);

    if (added) {
      toast.success(
        "Added to cart"
      );
    } else {
      toast.error(
        "No more stock available"
      );
    }
  };

  // =========================
  // JSX
  // =========================

  return (
    <div className="min-h-screen py-20">
      <div className="mx-auto max-w-6xl px-4 py-10">

        {/* =========================
            Title
        ========================= */}

        <h1 className="mb-10 text-3xl font-semibold text-gray-900">
          My Account
        </h1>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* =========================
              Sidebar
          ========================= */}

          <aside>
            <div className="flex flex-col items-center text-center">

              <div className="mb-4 flex h-25 w-25 items-center justify-center rounded-full bg-primary text-6xl font-bold text-white">
                {firstLetter}
              </div>

              <h2 className="text-2xl font-bold text-primary">
                {user.username ||
                  "User"}
              </h2>

              <p className="mt-1 text-sm text-secondary">
                {user.email ||
                  "No email"}
              </p>
            </div>

            <div className="mt-8 space-y-2">

              <button
                type="button"
                onClick={() =>
                  setActiveTab(
                    "account"
                  )
                }
                className={tabButtonClass(
                  "account"
                )}
              >
                Account Details
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveTab(
                    "orders"
                  )
                }
                className={tabButtonClass(
                  "orders"
                )}
              >
                Orders
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveTab(
                    "addresses"
                  )
                }
                className={tabButtonClass(
                  "addresses"
                )}
              >
                Addresses
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveTab(
                    "wishlist"
                  )
                }
                className={tabButtonClass(
                  "wishlist"
                )}
              >
                Wishlist
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveTab(
                    "password"
                  )
                }
                className={tabButtonClass(
                  "password"
                )}
              >
                Password
              </button>

              <button
                type="button"
                onClick={
                  handleLogout
                }
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-fourth"
              >
                Logout
              </button>

            </div>
          </aside>

          {/* =========================
              Main
          ========================= */}

          <main className="p-6 lg:col-span-2">

            {/* =========================
                Account
            ========================= */}

            {activeTab ===
              "account" && (
              <section className="rounded-lg p-6">

                <h2 className="mb-5 text-2xl font-bold text-primary">
                  Account Details
                </h2>

                <Formik
                  enableReinitialize
                  initialValues={{
                    firstName:
                      user.username ||
                      "",

                    lastName:
                      user.lastName ||
                      "",

                    email:
                      user.email ||
                      "",

                    phone:
                      user.phone ||
                      "",

                    address:
                      user.address ||
                      "",
                  }}
                  validationSchema={
                    accountSchema
                  }
                  onSubmit={(values) => {
                    const updatedUser = {
                      ...user,

                      username:
                        values.firstName,

                      lastName:
                        values.lastName,

                      email:
                        values.email,

                      phone:
                        values.phone,

                      address:
                        values.address,
                    };

                    saveUser(
                      updatedUser
                    );

                    toast.success(
                      "Account details saved"
                    );
                  }}
                >
                  <Form className="grid gap-5 md:grid-cols-2">

                    <div>
                      <label
                        htmlFor="firstName"
                        className={
                          labelClass
                        }
                      >
                        First Name
                      </label>

                      <Field
                        id="firstName"
                        name="firstName"
                        className={
                          inputClass
                        }
                      />

                      <ErrorMessage
                        name="firstName"
                        component="p"
                        className={
                          errorClass
                        }
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className={
                          labelClass
                        }
                      >
                        Last Name
                      </label>

                      <Field
                        id="lastName"
                        name="lastName"
                        className={
                          inputClass
                        }
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="email"
                        className={
                          labelClass
                        }
                      >
                        Email
                      </label>

                      <Field
                        id="email"
                        name="email"
                        type="email"
                        className={
                          inputClass
                        }
                      />

                      <ErrorMessage
                        name="email"
                        component="p"
                        className={
                          errorClass
                        }
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="phone"
                        className={
                          labelClass
                        }
                      >
                        Phone
                      </label>

                      <Field
                        id="phone"
                        name="phone"
                        type="tel"
                        className={
                          inputClass
                        }
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="address"
                        className={
                          labelClass
                        }
                      >
                        Address
                      </label>

                      <Field
                        id="address"
                        name="address"
                        className={
                          inputClass
                        }
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-fit rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      Save Changes
                    </button>

                  </Form>
                </Formik>

              </section>
            )}

            {/* =========================
                Orders
            ========================= */}

            {activeTab ===
              "orders" && (
              <section>

                <h2 className="mb-5 text-4xl font-bold text-primary">
                  Orders
                </h2>

                {loadingOrders ? (
                  <p className="text-secondary">
                    Loading...
                  </p>
                ) : orders.length ===
                  0 ? (
                  <p className="text-secondary">
                    No orders yet.
                  </p>
                ) : (
                  <div className="space-y-6">

                    {orders.map(
                      (order) => (
                        <div
                          key={
                            order.id
                          }
                          className="rounded-xl border border-gray-200 p-5 shadow-sm"
                        >

                          <div className="mb-3 flex items-center justify-between border-b pb-3">

                            <div>
                              <h3 className="text-lg font-semibold text-primary">
                                Order #
                                {
                                  order.id
                                }
                              </h3>

                              <p className="text-sm text-secondary">
                                {order.createdAt
                                  ? new Date(
                                      order.createdAt
                                    ).toLocaleDateString(
                                      "en-GB",
                                      {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                      }
                                    )
                                  : "No date"}
                              </p>
                            </div>

                            <span
                              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                                order.orderStatus ===
                                "Pending"
                                  ? "bg-yellow-100 text-primary"
                                  : order.orderStatus ===
                                    "Processing"
                                  ? "bg-blue-100 text-blue-700"
                                  : order.orderStatus ===
                                    "Delivered"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {order.orderStatus ||
                                "Unknown"}
                            </span>

                          </div>

                          <div className="space-y-2">

                            {(order.products ||
                              []).map(
                              (
                                product,
                                index
                              ) => (
                                <div
                                  key={`${product.id}-${index}`}
                                  className="flex justify-between text-sm"
                                >

                                  <div className="flex items-center gap-4">

                                    <img
                                      src={
                                        product.image
                                      }
                                      alt={
                                        product.name
                                      }
                                      className="h-16 w-16 rounded-lg object-cover"
                                    />

                                    <div>
                                      <h3 className="font-medium text-primary">
                                        {
                                          product.name
                                        }
                                      </h3>

                                      <p className="text-sm text-secondary">
                                        Qty:{" "}
                                        {
                                          product.quantity
                                        }
                                      </p>
                                    </div>

                                  </div>

                                  <span>
                                    EGP{" "}
                                    {(
                                      (product.price ||
                                        0) *
                                      (product.quantity ||
                                        0)
                                    ).toLocaleString()}
                                  </span>

                                </div>
                              )
                            )}

                          </div>

                          <div className="mt-5 flex items-end justify-between border-t pt-5">

                            <div className="text-gray-700">
                              <p className="text-sm">
                                {
                                  order.shippingAddress
                                }
                              </p>

                              <p className="text-sm">
                                {
                                  order.phone
                                }
                              </p>
                            </div>

                            <h2 className="text-lg font-semibold text-primary">
                              Total: EGP{" "}
                              {(
                                order.total ||
                                0
                              ).toLocaleString()}
                            </h2>

                          </div>

                        </div>
                      )
                    )}

                  </div>
                )}

              </section>
            )}

            {/* =========================
                Addresses
            ========================= */}

            {activeTab ===
              "addresses" && (
              <section>

                <h2 className="mb-5 text-4xl font-bold text-primary">
                  Addresses
                </h2>

                <Formik
                  enableReinitialize
                  initialValues={{
                    address:
                      user.address ||
                      "",

                    city:
                      user.city ||
                      "Cairo",

                    phone:
                      user.phone ||
                      "",
                  }}
                  validationSchema={
                    addressSchema
                  }
                  onSubmit={(values) => {
                    const updatedUser = {
                      ...user,

                      address:
                        values.address,

                      city:
                        values.city,

                      phone:
                        values.phone,
                    };

                    saveUser(
                      updatedUser
                    );

                    toast.success(
                      "Address saved"
                    );
                  }}
                >
                  <Form className="grid gap-5">

                    <div>
                      <label
                        htmlFor="address"
                        className={
                          labelClass
                        }
                      >
                        Address
                      </label>

                      <Field
                        id="address"
                        name="address"
                        className={
                          inputClass
                        }
                      />

                      <ErrorMessage
                        name="address"
                        component="p"
                        className={
                          errorClass
                        }
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="city"
                        className={
                          labelClass
                        }
                      >
                        City
                      </label>

                      <Field
                        id="city"
                        name="city"
                        className={
                          inputClass
                        }
                      />

                      <ErrorMessage
                        name="city"
                        component="p"
                        className={
                          errorClass
                        }
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className={
                          labelClass
                        }
                      >
                        Phone
                      </label>

                      <Field
                        id="phone"
                        name="phone"
                        type="tel"
                        className={
                          inputClass
                        }
                      />

                      <ErrorMessage
                        name="phone"
                        component="p"
                        className={
                          errorClass
                        }
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-fit rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      Save Address
                    </button>

                  </Form>
                </Formik>

              </section>
            )}

            {/* =========================
                Wishlist
            ========================= */}

            {activeTab ===
              "wishlist" && (
              <section className="rounded-lg p-3">

                <div className="mb-6 flex items-center justify-between">

                  <div>
                    <h2 className="text-4xl font-bold text-primary">
                      Wishlist
                    </h2>

                    <p className="mt-1 text-sm text-secondary">
                      {wishlist.length}{" "}
                      {wishlist.length ===
                      1
                        ? "item"
                        : "items"}{" "}
                      saved
                    </p>
                  </div>

                  <Heart
                    className="text-primary"
                    size={28}
                    fill="currentColor"
                  />

                </div>

                {/* Loading */}

                {loadingWishlist ? (
                  <div className="flex justify-center py-20">
                    <p className="text-secondary">
                      Loading wishlist...
                    </p>
                  </div>
                ) : wishlist.length ===
                  0 ? (

                  /* Empty */

                  <div className="flex flex-col items-center justify-center py-20 text-center">

                    <Heart
                      size={55}
                      className="mb-4 text-third"
                    />

                    <h3 className="text-xl font-semibold text-primary">
                      Your wishlist is empty
                    </h3>

                    <p className="mt-2 text-sm text-secondary">
                      Save your favorite
                      pieces here and
                      come back to them
                      later.
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          "/shop"
                        )
                      }
                      className="mt-6 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      Browse Shop
                    </button>

                  </div>

                ) : (

                  /* Products */

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                    {wishlist.map(
                      (item) => (

                        <div
                          key={
                            item.id
                          }
                          className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >

                          {/* Image */}

                          <div
                            className="relative cursor-pointer overflow-hidden"
                            onClick={() =>
                              navigate(
                                `/product/${item.slug}`
                              )
                            }
                          >

                            <img
                              src={
                                item.image
                              }
                              alt={
                                item.name
                              }
                              className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                            />

                            {/* Heart */}

                            <button
                              type="button"
                              onClick={(
                                e
                              ) => {
                                e.stopPropagation();

                                handleRemoveWishlist(
                                  item
                                );
                              }}
                              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-primary shadow-md backdrop-blur-sm transition hover:scale-110"
                              aria-label="Remove from wishlist"
                            >
                              <Heart
                                size={
                                  19
                                }
                                fill="currentColor"
                              />
                            </button>

                          </div>

                          {/* Info */}

                          <div className="p-4">

                            <div className="flex items-start justify-between gap-3">

                              <div>
                                <h3 className="font-semibold text-primary">
                                  {
                                    item.name
                                  }
                                </h3>

                                <p className="mt-1 text-sm text-secondary">
                                  EGP{" "}
                                  {(
                                    item.price ||
                                    0
                                  ).toLocaleString()}
                                </p>
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveWishlist(
                                    item
                                  )
                                }
                                className="text-red-500 transition hover:scale-110 hover:text-red-700"
                                aria-label="Remove item"
                              >
                                <Trash2
                                  size={
                                    18
                                  }
                                />
                              </button>

                            </div>

                            {/* Add To Cart */}

                            <button
                              type="button"
                              onClick={() =>
                                handleWishlistAddToCart(
                                  item
                                )
                              }
                              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-white transition hover:opacity-90"
                            >
                              <ShoppingCart
                                size={
                                  18
                                }
                              />

                              Add to Cart
                            </button>

                          </div>

                        </div>

                      )
                    )}

                  </div>
                )}

              </section>
            )}

            {/* =========================
                Password
            ========================= */}

            {activeTab ===
              "password" && (
              <section className="rounded-lg p-3">

                <h2 className="mb-7 text-4xl font-bold text-primary">
                  Change Password
                </h2>

                <Formik
                  initialValues={{
                    currentPassword:
                      "",

                    newPassword:
                      "",

                    confirmPassword:
                      "",
                  }}
                  validationSchema={
                    passwordSchema
                  }
                  onSubmit={(
                    values,
                    {
                      setSubmitting,
                      resetForm,
                    }
                  ) => {
                    setSubmitting(
                      false
                    );

                    resetForm();

                    toast.error(
                      "Change password API is not connected yet."
                    );
                  }}
                >
                  {({
                    isSubmitting,
                  }) => (
                    <Form className="max-w-3xl flex flex-col gap-6 text-sm font-medium text-primary">

                      {renderPasswordField(
                        "currentPassword",
                        "Current Password",
                        "Enter current password"
                      )}

                      {renderPasswordField(
                        "newPassword",
                        "New Password",
                        "Enter new password"
                      )}

                      {renderPasswordField(
                        "confirmPassword",
                        "Confirm Password",
                        "Confirm new password"
                      )}

                      <button
                        type="submit"
                        disabled={
                          isSubmitting
                        }
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