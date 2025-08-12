import AOS from 'aos';
// ..
import { useEffect, useState } from "react"
import { useData } from "../context/contextData"
import 'aos/dist/aos.css';
import Cards from "../commponads/card";
import { cardData } from "../context/contextCard";
import Head from '../pages/headPage';


export default function BestSeller() {
    const [products, setProduct] = useState([])
    const data  = useData()

    useEffect(() => {
        setProduct(data.products)
    }, [data])
 
    const topSellingIds = [
    "70", "60", "76", "116", "87",
    "64", "13", "14", "91", "115",
    "104", "11", "75", "1", "80",
    "63", "107", "97", "101", "74",
    "106", "57", "20", "62", "89"
    ];

    const productSelected = products.filter(el => topSellingIds.includes(el.id));
    // const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    
    //   useEffect(() => {
    //     const handleResize = () => setScreenWidth(window.innerWidth);
    
    //     window.addEventListener("resize", handleResize);
    
    //     return () => window.removeEventListener("resize", handleResize);
    //   }, []);
    
     useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
        });
        }, []);
        
    useEffect(() => {
        AOS.refresh();
    }, []);
        

    return (
    <>
        <Head animate={''} name={'BEST SELLAR'} other={'COLLECTION'} img={`https://i.pinimg.com/1200x/93/f3/82/93f3825e3b255b5c698c0c6d8056f48b.jpg`} />
        <section className="container">
            <cardData.Provider value={{  data : productSelected  }}>
                <Cards />
            </cardData.Provider>
        </section>
    </>
    )
}