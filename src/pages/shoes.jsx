import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { useData } from "../context/contextData";
import { SquareLoader } from "react-spinners";
import { cardData } from "../context/contextCard";
import Cards from "../commponads/card";


export default function Shoes() {
  const location = useLocation()
  const { products, loading } = useData();
  const [shoes, setShoes] = useState([]);
  const [name , setName] = useState("SHOES")
    useEffect(() => { 
          const allshoes = products.filter((el) =>
            el.type === "shoes"
          );

         setShoes(allshoes)
    },[products])
   
  useEffect(() => {
      if(location.pathname === "/shoes"){
        setName("ALL SHOES")
      }else if(location.pathname === "/shoes/casual"){
          setName("CASUAL SHOES")
      }else if(location.pathname === "/shoes/formal"){
          setName("FORMAL SHOES")
      }
   },[location.pathname])


    return (
        <>
            <header className="shoes-back vw-100 vh-100" style={{backgroundImage: "url(https://i.pinimg.com/1200x/f1/6e/7f/f16e7ff302c1965f1c173308da6c4875.jpg)"}}>
                <h1 className="text text-center w-100 h-100 d-flex justify-content-center align-items-center">{name}</h1>
            </header>
            <section className="container" style={{ marginTop: "100px" }}>
                <div className="pants-links w-100 d-flex align-items-center py-5">
                    <Link to={"/shoes"} className={`${location.pathname === "/shoes" ? "active-btn" : ""} btn`}>ALL</Link>
                    <Link to={"casual"} className={`${location.pathname === "/shoes/casual" ? "active-btn" : ""} btn`}>CASUAL</Link>
                    <Link to={"formal"} className={`${location.pathname === "/shoes/formal" ? "active-btn" : ""} btn`}>FORMAL</Link>
                </div>
               {loading === false ?
                    location.pathname === "/shoes" ?
                        <cardData.Provider value={{  data : shoes  }}>
                            <Cards />
                        </cardData.Provider>
                        :
                        <Outlet />
                        :
                    <div className="d-flex flex-column justify-content-center align-items-center h-100">
                        {<SquareLoader />}
                    </div>
          }
            </section>
        </>
    )
}