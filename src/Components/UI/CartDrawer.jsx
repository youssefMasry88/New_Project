import React from 'react'
import { motion as Motion } from 'framer-motion'
import {  Link, useNavigate } from 'react-router-dom'
import { IoIosCloseCircle } from "react-icons/io";
import { FaTrash } from "react-icons/fa";


export default function CartDrawer({onClose , isOpen, cartItems , onRemove , onIncrease , onDecrease }) {
    const navigate = useNavigate()

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleViewCart = () => {
        onClose();
        navigate("/cart")
    }
  return (
    <>
    {/* overlay */}
    <div
    onClick={onClose}
    className={`fixed inset-0 bg-black/60 transition-opacity z-50 duration-300 ${
        isOpen
        ?"opacity-100 pointer-events-auto"
        :"opacity-0 pointer-events-none"
    }`}
    >
        {/* Drawer Content */}

        <aside
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-0 right-0 z-9999 h-screen flex flex-col w-[90%] sm:w-[30%] bg-white shadow-2xl
            transform transition-transform duration-500 ease-in-out ${
                isOpen
                ?"translate-x-0"
                :"translate-x-full"
            }`}
        >
            {/* Header */}
            <div className="shrink-0 flex justify-center items-center gap-4 p-4 border-b">
                <div>
                    <h2 className="text-2xl font-bold text-primary">
                        Shopping Cart
                    </h2>
                    <p className="text-third leading-relaxed mt-1">
                        {cartItems.length} {""}
                        {cartItems.length === 1 ? "item" : "items"} in your cart
                    </p>
                </div>
                <button
                onClick={onClose}
                className="text-3xl font-bold text-primary cursor-pointer">
                    <IoIosCloseCircle />
                </button>
            </div>

            {/* Items */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        <p className="text-third">Your cart is empty</p>
                    </div>
                ):(
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <Motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 ,delay: 0.1 ,ease: "easeInOut"}}
                            className="flex gap-4 border-b pb-4">

                                {/* Image */}
                                <Link to={`/product/${item.slug}`}
                                onClick={onClose}
                                className="shrink-0">
                                    <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-xl"/>
                                </Link>

                                {/* Info */}
                                <div className="flex-1">
                                    <div className="flex justify-between items-center gap-2">
                                        <h3>
                                            {item.name}
                                        </h3>
                                        <button 
                                        onClick={()=> onRemove(item.id)}
                                        className="text-red-500 hover:text-red-700 transition-colors duration-300 cursor-pointer">
                                            <FaTrash size={13} />
                                        </button>
                                    </div>
                                    {/* EGP */}
                                    <p className="text-third text-sm mt-2">
                                        EGP {item.price.toLocaleString()}
                                    </p>
                                    {/* Quantity */}
                                    <div className="flex items-center gap-2 mt-2">
                                        <button 
                                        onClick={()=> onDecrease(item.id)}
                                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors duration-300">
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                        onClick={()=> onIncrease(item.id)}
                                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors duration-300">
                                            +
                                        </button>
                                    </div>
                                </div>
                            </Motion.div>
                        ))}
                    </div>
                )}
            </div>
            {/* Footer */}
            {cartItems.length > 0 && (
                <div className="shrink-0 w-full p-4 border-t backdrop:blur-sm bg-white/70   ">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-primary">
                            Subtotal: 
                        </span>
                        <span className="text-lg font-bold text-primary">
                            EGP {total.toLocaleString()}
                        </span>
                    </div>
                    <button 
                    onClick={handleViewCart}
                    className="w-full mt-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors duration-300">
                        View Cart
                    </button>
                </div>
            )}
        </aside>
    </div>
    </>
  )
}
