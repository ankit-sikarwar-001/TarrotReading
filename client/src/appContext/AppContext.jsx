import { createContext,  useEffect,  useState } from "react";

export const AppContext = createContext();



export const AppContextProvider = ({ children }) => {


  const [allitems, setAllItems] = useState([]);
  const [totalCartItems, setTotalCartItems] = useState([])


  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("tarotCartItems"));
    if (storedCartItems) {
      setTotalCartItems(storedCartItems);
    }
  }, []);






const getProducts = async () => {
  try {
      const response = await fetch("http://localhost:3001/api/products", {
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


  return (
    <AppContext.Provider value={{ allitems, setAllItems ,totalCartItems, setTotalCartItems }}>
      {children}
    </AppContext.Provider>
  );
}