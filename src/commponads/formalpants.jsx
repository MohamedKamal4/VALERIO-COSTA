import { useEffect, useState } from "react";
import { useData } from "../context/contextData";
import Cards from "./card";
import { cardData } from "../context/contextCard";


export default function FormalPants() {
    const { products } = useData();
    const [Pants, setPants] = useState([]);

    useEffect(() => { 
        const formalpants = products.filter((el) => el.category === "Formal pants");
        setPants(formalpants)
    },[products])
    
    return (
        <cardData.Provider value={{ data : Pants }}>
            <Cards />
        </cardData.Provider>
    );
}