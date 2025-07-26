import { useEffect, useState } from "react";
import { useData } from "../context/contextData";
import { cardData } from "../context/contextCard";
import Cards from "./card";

export default function CasualShoes() {
    const { products } = useData();
    const [CasualShoes, setCasualShoes] = useState([]);

    useEffect(() => {
        const CasualShoes = products.filter((el) => el.category === "Casual Shoes");
        setCasualShoes(CasualShoes);
    }, [products]);

    return (
        <cardData.Provider value={{  data : CasualShoes  }}>
            <Cards />
        </cardData.Provider>
    );
}
