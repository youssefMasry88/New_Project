// get the Product
export const getCart = () => {
  const data = localStorage.getItem("cart");
  const parsed = data ? JSON.parse(data) : [];

  return parsed.filter((item) => item && item.id); 
};

// Save the Product
export const saveCart = (cart) => {
  // console.log("saveCart",cart);
  
  localStorage.setItem("cart", JSON.stringify(cart));
  // console.log("saveCart", cart);
}

// Add a product to the cart

export const addToCart = (product , qty = 1) => {
  const cart = getCart();

  const exist = cart.find((item) => item.id === product.id);

  let updated;

  if (exist) {
    updated = cart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + qty }
        : item
    );
  } else {
    updated = [...cart, { ...product, quantity : qty }];
  }

  saveCart(updated);

  
  window.dispatchEvent(new Event("cartUpdated"));
};


// increase the quantity

  export const increaseQty = (id) => {
    const cart = getCart();
    const updated = cart.map((item)=> {
      return item.id === id 
      ? {...item , quantity: item.quantity + 1}
      : item
    })
    saveCart(updated);
    window.dispatchEvent(new Event("cartUpdated"));
  };

//   // decrease the quantity

    export const decreaseQty = (id) => {
    const cart = getCart();
    const updated = cart.map((item)=> {
      return item.id === id 
      ? { ...item, quantity: Math.max(1, item.quantity - 1) }
      : item
    })
    .filter((item)=> item.quantity > 0);
    saveCart(updated);
    window.dispatchEvent(new Event("cartUpdated"));
  };


  // delete the Product
export const removeItem = (id) => {
  const cart = getCart();

  const updated = cart.filter((item) => {
    return item && item.id !== id; 
  });

  saveCart(updated);
  window.dispatchEvent(new Event("cartUpdated"));
};

export const clearCart = () => {
  localStorage.removeItem("cart");
};