import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { useData } from "../context/contextData";
import { SquareLoader } from "react-spinners";
import { cardData } from "../context/contextCard";
import Cards from "../commponads/card";

export default function Shirt() {
    const { products, loading } = useData();
    const [shirt, setShirt] = useState([]);
    useEffect(() => { 
          const shirt = products.filter((el) =>
            el.category === "Shirt"
          );

         setShirt(shirt)
    },[products])
   


    return (
        <section>
            <div className="shirt-back vw-100 vh-100" style={{ backgroundImage: "url(https://i.pinimg.com/1200x/c9/5d/6e/c95d6ef67a0185cd4763ba8e440d7fb4.jpg)" }}>
                <h1 className="text w-100 h-100 d-flex justify-content-center align-items-center">SHIRTS</h1>
            </div>
            <div className="container vh-100" style={{ marginTop: "100px" }}>
               {loading === false ?
                    <cardData.Provider value={{  data : shirt  }}>
                        <Cards />
                    </cardData.Provider>
                    :
                    <div className="d-flex flex-column justify-content-center align-items-center h-100">
                          {<SquareLoader />}
                    </div>
          }
            </div>
        </section>
    )
}