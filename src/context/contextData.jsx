import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);
    fetch("https://app-data-ebon.vercel.app/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => {
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      });
  }, []);

  console.log(products);



  return (
    <DataContext.Provider value={{ products, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
