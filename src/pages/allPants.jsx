import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { useData } from "../context/contextData";
import { SquareLoader } from "react-spinners";
import { cardData } from "../context/contextCard";
import Cards from "../commponads/card";
import "aos/dist/aos.css";
import AOS from "aos";
import Head from "./headPage";

export default function AllPants() {

    const { products, loading } = useData();
    const [Pants, setPants] = useState([]);
    const [name , setName] = useState("ALL PANTS")
    const location = useLocation()
    useEffect(() => { 
          const allpants = products.filter((el) =>
            el.type === "pants"
          );

         setPants(allpants)
    },[products])
   
    useEffect(() => {
      if(location.pathname === "/pants"){
        setName("ALL PANTS")
      }else if(location.pathname === "/pants/casual"){
          setName("CASUAL PANTS")
      }else if(location.pathname === "/pants/formal"){
          setName("FORMAL PANTS")
      }else if(location.pathname === "/pants/sports"){
          setName("SPORTS PANTS")
      }
    }, [location.pathname])
    
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
        < >
            <Head animate={name} name={name} other={'COLLECTION'} img={`https://i.pinimg.com/1200x/70/bf/6a/70bf6a5d8bf01afcc4ef44e2f98cb99c.jpg`} />
            <section className="container">
                <div className="pants-links w-100 d-flex align-items-center py-5">
                    <Link to={"/pants"} className={`${location.pathname === "/pants" ? "active-btn" : ""} btn`}>ALL</Link>
                    <Link to={"casual"} className={`${location.pathname === "/pants/casual" ? "active-btn" : ""} btn`}>CASUAL</Link>
                    <Link to={"formal"} className={`${location.pathname === "/pants/formal" ? "active-btn" : ""} btn`}>FORMAL</Link>
                    <Link to={"sports"} className={`${location.pathname === "/pants/sports" ? "active-btn" : ""} btn`}>SPORTS</Link>
                </div>
               {loading === false ?
                    location.pathname === "/pants" ?
                    <cardData.Provider value={{  data : Pants  }}>
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