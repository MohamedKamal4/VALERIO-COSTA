import AOS from 'aos';
// ..
import { useEffect, useState } from "react"
import { useData } from "../context/contextData"
import { Link } from "react-router-dom";
import { CardMedia } from "@mui/material";
import FavBtn from './favBtn';
import 'aos/dist/aos.css';


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
        <header className="vw-100 vh-100 d-flex justify-content-center align-items-start">
                <div
                    style={{ width: "1344px",height:"90%", margin: "auto" }}
                    className=" position-relative flex-column d-flex justify-content-start align-items-center">
                    <div className="w-100 h-50">
                        <h1
                            data-aos="fade-down"
                            data-aos-offset="200"
                            data-aos-easing="ease-in-out"
                            data-aos-delay="1000"
                            className="head-text w-100 h-100 d-flex justify-content-start align-items-center text-black" style={{ fontSize: "180px" }}>BEST SELLAR</h1>
                    </div>
                    <div className="w-100 h-50">
                        <h2
                            data-aos="fade-up"
                            data-aos-offset="200"
                            data-aos-easing="ease-in-out"
                            data-aos-delay="1000"
                            className="head-text w-100 h-100 d-flex justify-content-end align-items-center text-black" style={{ fontSize: "180px" }}>COLLECTION</h2>
                    </div>
                    <div style={{position: "absolute",zIndex: "-1" , top: "50%", left: "50%", transform: "translate(-50% , -50%)"}}>
                        <img
                            data-aos="zoom-in"
                            data-aos-offset="200"
                            data-aos-easing="ease-in-out"
                            style={{ width: "400px", height: "400px" }} src="https://i.pinimg.com/1200x/87/93/c9/8793c9e812e369c923ea69678b136278.jpg" alt="" />
                    </div>
                </div>
        </header>
        <section className="container">
            {productSelected.map((el, index) => {
                const isEven = index % 2 === 0;
                return (
                    <div
                        data-aos="fade-up"
                        data-aos-offset="200"
                        data-aos-easing="ease-in-out"
                        key={el.id} className={`product-box row p-5 vh-100 d-flex justify-content-center align-items-center ${isEven ? "flex-row-reverse" : ""}`}>
                    <div className="image-box col-4 img-animate" style={{ height: "80%" }}>
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