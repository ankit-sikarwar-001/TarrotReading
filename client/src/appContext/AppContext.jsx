import { createContext,  useState } from "react";

export const AppContext = createContext();



export const AppContextProvider = ({ children }) => {

  const [items, setItems] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("hhhh"));
      if (Array.isArray(stored) && stored.length > 0) {
        return stored;
      }
    } catch (err) {
      console.error("Failed to parse cartItems from localStorage", err);
    }
  
    // Default fallback products (make sure they include `quantity`)
    return [
      {
        id: 1,
        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        price: 109.95,
        quantity: 1,
        description:
          "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
      },
      {
        id: 2,
        title: "Another Backpack",
        price: 129.99,
        quantity: 1,
        description:
          "Another great option for daily use with improved storage and comfort."
      }
    ];
  });

  
  
  
  const [cartItems, setCartItems] =useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("hhhh"));
      if (Array.isArray(stored) && stored.length > 0) {
        return stored;
      }
    } catch (err) {
      console.error("Failed to parse cartItems from localStorage", err);
    }
  
    // Default fallback products (make sure they include `quantity`)
    return [
      {
        id: 1,
        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        price: 109.95,
        quantity: 1,
        description:
          "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
      },
      {
        id: 2,
        title: "Another Backpack",
        price: 129.99,
        quantity: 1,
        description:
          "Another great option for daily use with improved storage and comfort."
      }
    ];
  }
)





  return (
    <AppContext.Provider value={{  items, setItems, cartItems, setCartItems }}>
      {children}
    </AppContext.Provider>
  );
}