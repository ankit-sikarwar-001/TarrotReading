import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();



export const AppContextProvider = ({ children }) => {


  const [allitems, setAllItems] = useState([]);
  const [totalCartItems, setTotalCartItems] = useState([])
  
  const [totalOrders, setTotalOrders] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("tarotCartItems"));
    if (storedCartItems) {
      setTotalCartItems(storedCartItems);
    }
  }, []);





  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getProducts = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/products`, {
        method: "GET"
      });
      const data = await response.json(); // Await the JSON parsing
      setAllItems(data) // Log the parsed data
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts(); // Call the function to fetch products
  }, []); // Empty dependency array to run once on mount



  const getOrders = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/orders`, {
        method: "GET"
      });
         const data = await response.json();
      const totalOrders = data.reduce((sum, item) => sum + item.totalorders, 0);
      const totalPrice = data.reduce((sum, item) => sum + item.totalPrice, 0);
      setTotalOrders(totalOrders)
      setTotalPrice(totalPrice)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };



  useEffect(() => {
    getOrders();
  }, []);


  return (
    <AppContext.Provider value={{ totalOrders, totalPrice, allitems, setAllItems, totalCartItems, setTotalCartItems }}>
      {children}
    </AppContext.Provider>
  );
}