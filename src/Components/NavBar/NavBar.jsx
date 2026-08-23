import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { NavLinks } from "../../data/NavLinks";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { getCart } from "../../utils/cart";

import { useAuth } from "../../Context/useAuth";
import { getProducts } from "../../services/productService";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [cart, setCart] = useState(getCart());
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const { user, logout } = useAuth();
  const [products, setProducts] = useState([]);


  const token = !!user;
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(()=> {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    }
    fetchProducts();
  }, [])

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleUpdate = () => {
      setCart(getCart());
    };
    window.addEventListener("cartUpdated", handleUpdate);
    return () => {
      window.removeEventListener("cartUpdated", handleUpdate);
    };
  }, []);

  const navLinkClass = ({ isActive }) =>
    `nav-link logo-text transition-colors hover:text-primary duration-300 ${
      isActive ? "text-primary border-b border-primary " : "text-secondary"
    }`;
  const navLinkClassMobile = ({ isActive }) =>
    `text-xl font-medium transition-colors duration-300 ${
      isActive
        ? "text-primary border-b border-primary"
        : "text-secondary hover:text-primary transition-colors duration-300"
    }`;

  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((parts, i) =>
      parts.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="bg-yellow-200 px-1 rounded">
          {parts}
        </span>
      ) : (
        parts
      ),
    );
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-transparent py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center relative">
          {/* Left links  */}
          <div className="hidden lg:flex space-x-12 xl:space-x-20 ">
            {NavLinks.filter((l) => l.side === "left").map((link, i) => (
              <NavLink key={i} to={link.path} className={navLinkClass}>
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Logo */}
          <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            <Link
              to="/"
              className="text-5xl logo-text text-primary tracking-tighter"
            >
              Homey
            </Link>
          </div>

          {/* Right links*/}
          <div className="hidden lg:flex items-center gap-15">
            {/* search */}
            <button
              onClick={() => setOpenSearch(!openSearch)}
              className="nav-link logo-text text-secondary cursor-pointer hover:text-primary transition-colors duration-300 "
            >
              Search
            </button>

            {/* Account  */}

            <NavLink
              to={token ? "/account" : "/login"}
              className="flex items-center gap-2"
            >
              {token ? (
                <>
                  <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                    {user?.username?.charAt(0)?.toUpperCase()}
                  </div>

                  <span className="nav-link logo-text text-secondary hover:text-primary transition-colors duration-300">
                    {user?.username}
                  </span>
                </>
              ) : (
                <span className="nav-link logo-text text-secondary hover:text-primary transition-colors duration-300">
                  Account
                </span>
              )}
            </NavLink>
            {token ? (
              <button
                onClick={handleLogout}
                className="nav-link logo-text text-secondary cursor-pointer hover:text-primary transition-colors duration-300"
              >
                Logout
              </button>
            ):(
              <Link
                to="/login"
                className="nav-link logo-text text-secondary hover:text-primary transition-colors duration-300"
              >
                Login
              </Link>
            )}
          </div>

          {/* mobile Button */}
          <div className="lg:hidden flex items-center gap-4">
            {/* search */}
            <button
              onClick={() => setOpenSearch(!openSearch)}
              className="text-primary focus:outline-none p-2"
            >
              <FiSearch size={24} />
            </button>

            {/* Cart */}

            <Link
              to="/cart"
              className="relative text-secondary hover:text-primary transition-colors duration-300"
            >
              <FiShoppingCart size={24} className="text-primary" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary focus:outline-none p-2"
            >
              {isOpen ? <HiX size={30} /> : <HiMenuAlt3 size={30} />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div
        className={`absolute top-full left-0 w-full transition-all duration-300  ${
          openSearch ? " py-6" : "max-h-0 opacity-0 py-0 overflow-hidden"
        }`}
      >
        <div className="max-w-3xl mx-auto px-6">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                const value = e.target.value;
                setSearch(value);

                if (!value.trim()) {
                  setResults([]);
                  return;
                }
                const filtered = products
                  .filter((p) => {
                    const text = `${p.name} ${p.category}`.toLowerCase();
                    const searchValue = value.toLowerCase();

                    return text.includes(searchValue);
                  })
                  .slice(0, 5);
                setResults(filtered);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && results.length > 0) {
                  navigate(`/product/${results[0].slug}`);
                  setOpenSearch(false);
                  setResults([]);
                  setSearch("");
                }
              }}
              className="w-full border-b-2 border-secondary rounded-lg px-4 py-3 pr-12 outline-none focus:border-primary transition text-secondary"
            />
            <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-primary text-xl" />

            {/* dropdown */}

            {results.length > 0 && (
              <div className="absolute top-full backdrop-blur-md left-0 w-full mt-2 rounded-2xl shadow-lg border z-9999 max-h-72 overflow-y-auto">
                {results.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      navigate(`/product/${item.slug}`);
                      setOpenSearch(false);
                      setResults([]);
                    }}
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded"
                    />

                    {/* 🧾 Info */}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-primary">
                        {highlightText(item.name, search)}
                      </p>

                      <p className="text-xs text-gray-400">{item.category}</p>
                    </div>
                    <span>EGP {item.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden absolute top-full w-full left-0 backdrop-blur-md shadow-lg transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-125 py-6" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6">
        <>
        {NavLinks.filter((link)=>{
          if(token && link.name === "Login") return false;
          return true;

        }).map((link, i) => (
          link.name.toLowerCase() === "search" ? (
            <button
            key={i}
            onClick={() => {
              setOpenSearch(!openSearch);
              setIsOpen(false);
            }}
            className="text-xl font-medium text-secondary hover:text-primary"
            >
              search
            </button>
          ):(
            <NavLink
            key={i}
            to={link.name === "Account" && !token ? "/login" : link.path }
            onClick={() => setIsOpen(false)}
            className={navLinkClassMobile}
            >
              {token && link.name === "Account"
                ? user?.username 
                : link.name}
            </NavLink>
          )
        )
      )}
      {token && (
        <button
          onClick={()=>{
            logout();
            setIsOpen(false);
            navigate("/login");
          }}
          className="text-xl font-medium text-secondary hover:text-primary"
        >
          Logout
        </button>
      )}
        </>
        </div>
      </div>
    </nav>
  );
}
//           <p className="text-xs text-gray-400">
//             {item.category}
//           </p>
//         </div>

//         {/* 💰 Price */}
//         <span className="text-xs text-gray-400">
//           EGP {item.price.toLocaleString()}
//         </span>
//       </div>
//     ))}

//   </div>
// )}

//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`lg:hidden absolute top-full w-full left-0 backdrop-blur-md shadow-lg transition-all duration-300 overflow-hidden ${
//           isOpen ? "max-h-125 py-6" : "max-h-0 opacity-0"
//         }`}
//       >
//         <div className="flex flex-col items-center gap-6">
//           {NavLinks.map((link, i) =>
//             link.name.toLowerCase() === "search" ? (
//               <button
//                 key={i}
//                 onClick={() => {
//                   setOpenSearch(!openSearch);
//                   setIsOpen(false);
//                 }}
//                 className="text-xl text-secondary hover:text-primary"
//               >
//                 {link.name}
//               </button>
//             ) : (
//               <NavLink
//                 key={i}
//                 to={link.path}
//                 onClick={() => setIsOpen(false)}
//                 className={navLinkClassMobile}
//               >
//                 {link.name}
//               </NavLink>
//             )
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }
