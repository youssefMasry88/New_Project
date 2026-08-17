import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { addToCart, clearCart, getCart } from "../utils/cart";
import AddToCartButton from "../Components/UI/AddToCartButton";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast  from "react-hot-toast";
import { getProducts } from "../services/productService";
import { createOrder } from "../services/orderService";

export default function Checkout() {
  const [cart, setCart] = useState(getCart());
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const checkoutSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),

    email: Yup.string().email("Invalid email").required("Email is required"),

    phone: Yup.string()
      .matches(/^[0-9]{11}$/, "Phone must be 11 digits")
      .required("Phone is required"),

    

    address: Yup.string()
      .min(10, "Address is too short")
      .required("Address is required"),

  });

  // fetch
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products");
    }finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);
const suggested = products.slice(0, 4);

const handleAdd = (product) => {
  const added = addToCart(product);
  console.log(product);
  if (added) {
    
    console.log(getCart());

    setCart(getCart());
    toast.success("Item added to cart!");
  } else {
    toast.error("No more stock available");
  }
};
useEffect(() => {
  if (cart.length === 0) {
    navigate("/cart");
  }
}, [cart, navigate]);


if (loading) {
  return <h1 className="text-center mt-20">Loading...</h1>;
}
  return (
    <div className="max-w-6xl mx-auto space-y-16 py-30 px-5 min-h-screen ">
      {/* section */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* section */}
        <div className="bg-primary/5 p-6 rounded-lg ">
          <h1 className="text-3xl mb-6 text-primary font-secondary font-semibold">
            Order Summary
          </h1>

          <div className="space-y-4  border-b pb-4 border-third/50">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>EGP {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <h1 className="mt-3 text-3xl font-secondary text-primary font-bold ">
            Total: EGP {total.toLocaleString()}
          </h1>
        </div>

        {/* 🧍‍♂️ Form */}
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            zip: "",
            address: "",
          }}
          onSubmit={async (values , { resetForm }) => {
            try{
              const orderData = {
                total,
                shippingAddress: values.address,
                phone: values.phone,
                orderStatus: "Pending",
                products: cart.map((item)=>({
                  id: item.id,
                  name: item.name,
                  image: item.image,
                  price: item.price,
                  quantity: item.quantity,
                })),
              };
              await createOrder(orderData);
              toast.success("Order placed successfully");
              clearCart();
              setCart([]);
              resetForm();
              navigate("/Account");

            } catch (error) {
  console.log("ERROR:", error.response?.data);
  console.log("DETAILS:", error.response);

  toast.error("Failed to place order");
}
          }}
          validationSchema={checkoutSchema}
          >
          <Form
          className="space-y-3 bg-primary/5 p-6 rounded-lg"
          >
            <h2 className="text-2xl mb-6 text-primary font-semibold">
              Your Info
            </h2>

            <Field
              type="text"
              name="name"
              placeholder="Name"
              className="w-full bg-transparent border-b-2 border-third focus:border-primary focus:transform duration-300 focus:shadow-2xl outline-none py-2 text-[#2B1D12] placeholder:text-third placeholder:text-sm pb-1"
              required
            />
            <ErrorMessage
              name="name"
              component="p"
              className="text-red-500 text-sm"
            />

            <Field
              type="email"
              name="email"
              placeholder="Email"
              className="w-full bg-transparent border-b-2 border-third focus:border-primary focus:transform duration-300 focus:shadow-2xl outline-none py-2 text-[#2B1D12] placeholder:text-third placeholder:text-sm pb-1"
              required
            />
            <ErrorMessage
              name="email"
              component="p"
              className="text-red-500 text-sm"
            />

            <Field
              type="text"
              name="phone"
              placeholder="Phone"
              className="w-full bg-transparent border-b-2 border-third focus:border-primary focus:transform duration-300 focus:shadow-2xl outline-none py-2 text-[#2B1D12] placeholder:text-third placeholder:text-sm pb-1"
              required
            />
            <ErrorMessage
              name="phone"
              component="p"
              className="text-red-500 text-sm"
            />
            <Field
              type="text"
              name="zip"
              placeholder="zip"
              className="w-full bg-transparent border-b-2 border-third focus:border-primary focus:transform duration-300 focus:shadow-2xl outline-none py-2 text-[#2B1D12] placeholder:text-third placeholder:text-sm pb-1"
              required
            />
            <ErrorMessage
              name="zip"
              component="p"
              className="text-red-500 text-sm"
            />

            <Field
              as="textarea"
              name="address"
              placeholder="Address"
              className="w-full bg-transparent border-b-2 border-third focus:border-primary transition-all duration-300 outline-none py-2 text-[#2B1D12] placeholder:text-third placeholder:text-sm resize-none"
              required
            />
            <ErrorMessage
              name="address"
              component="p"
              className="text-red-500 text-sm"
            />

            <button
              type="submit"
              
              className="w-full py-3 bg-primary text-white rounded-lg hover:opacity-90 transition"
            >
              Confirm Order
            </button>
          </Form>
        </Formik>
      </div>

      {/* 🛍️ Suggested Products */}
      {suggested.length > 0 && (
      <div>
        <h2 className="text-2xl text-primary mb-6 text-center font-semibold">
          You May Also Like
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {suggested.map((item) => (
            <div
              key={item.id}
              className=" rounded-lg text-center overflow-hidden group relative"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-65 object-cover group-hover:scale-105 transition"
              />

              <div>
                <h3 className="text-sm text-primary font-medium pt-5">
                  {item.name}
                </h3>

                <span className="text-xs text-secondary">
                  EGP {item.price.toLocaleString()}
                </span>
              </div>
              {/* add button */}
              
                <span className="absolute w-12 h-12 bottom-5 right-1 rounded-full flex items-center justify-center transition-all duration-300">
                  <AddToCartButton product={item} onAdd={handleAdd} />
                  </span>
              
            </div>
          ))}
        </div>
      </div>
        
      )}
    </div>
  );
}
