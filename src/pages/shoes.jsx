import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { useData } from "../context/contextData";
import { SquareLoader } from "react-spinners";
import { cardData } from "../context/contextCard";
import Cards from "../commponads/card";
import AOS from "aos";
import Head from "./headPage";


export default function Shoes() {
  const location = useLocation()
  const { products, loading } = useData();
  const [shoes, setShoes] = useState([]);
  const [name , setName] = useState("ALL SHOES")
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

    
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
        });
        }, []);
        
        useEffect(() => {
        AOS.refresh();
    }, [name]);
        

    return (
        <>

            <Head animate={name} name={name} other={'COLLECTION'} img={`https://i.pinimg.com/1200x/1d/86/bb/1d86bbf2766b79322cd2d35bcaa426c5.jpg`} />
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