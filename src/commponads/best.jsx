import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
import { useEffect, useState } from "react"
import { useData } from "../context/contextData"
import { Link } from "react-router-dom";
import { CardMedia } from "@mui/material";
import TopSold from './topSold';
import FavBtn from './favBtn';
import Footer from './footer';

export default function BestSeller() {
    useEffect(() => {
        AOS.init({
        duration: 1000, 
        once: true      
        });
    }, []);
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
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    
      useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
    
        window.addEventListener("resize", handleResize);
    
        return () => window.removeEventListener("resize", handleResize);
      }, []);
    
    

    return (
    <>
        <header className="tShirt-back vw-100 vh-100" style={{backgroundImage: "url(https://i.pinimg.com/1200x/c7/c8/d2/c7c8d279a12dbdddeba31d7902cfbadb.jpg)"}}>
            <h1 className="text w-100 h-100 d-flex justify-content-center align-items-center">BEST SELLER</h1>
        </header>
        <section className="container">
            {productSelected.map((el, index) => {
                const isEven = index % 2 === 0;
                return (
                <div key={el.id}  className={`product-box row p-5 vh-100 d-flex justify-content-center align-items-center ${isEven ? "flex-row-reverse" : ""}`}>
                        <div className="image-box col-6 img-animate" style={{ height: "100%" }} {...(screenWidth > 430 ? {"data-aos": isEven ? "fade-up-left" : "fade-up-right"} : {})}>
                        <Link className="link img-wrapper position-relative" to={`/details/product/${el.id}`}>
                        <CardMedia
                            component="img"
                            image={el.MainImage}
                            alt={el.name}
                            className="img-card w-100 h-100 "
                        />
                        </Link>
                    </div>
                    <div
                    className="col-6 d-flex flex-column justify-content-center align-items-center content-animate"
                    {...(screenWidth > 430 ? {"data-aos": isEven ? "fade-up-right" : "fade-up-left"} : {})}
                        >
                        <div className="py-3 d-flex justify-content-between align-items-center w-100">
                            <h2 className="name-best-seller name-product w-100 text-black">{el.name}</h2>
                            <FavBtn data={el} />    
                        </div>
                        <p className="discription-product name-product w-100 text-black">{el.discription}</p>
                        <div className="numbers-box w-100 py-2 d-flex justify-content-center align-items-center">
                            <div className="numbers-items w-50 gap-4 d-flex justify-content-start align-items-center">        
                                <span className="price-number price-product" style={{ fontSize: "10px" }}>{el.originalPrice}</span>
                                <span className="price-number name-product text-black">{el.price} $</span>
                            </div>
                            <span className="numbers-items name-product text-black w-50 d-flex justify-content-end align-items-center">SOLDED : {el.soldCount}</span>
                        </div>
                    </div>
                </div>
                );
                })}
        </section>
    </>
    )
}