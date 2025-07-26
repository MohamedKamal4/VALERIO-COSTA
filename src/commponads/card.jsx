import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { Card, CardActionArea, CardMedia } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MdDone } from "react-icons/md";
import { Link } from "react-router-dom";
import { cardData } from "../context/contextCard";
import FavBtn from "./favBtn";
import Footer from './footer';

export default function Cards() {

  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true      
    });
  }, []); 
    const { data } = useContext(cardData);

 const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    
      useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
    
        window.addEventListener("resize", handleResize);
    
        return () => window.removeEventListener("resize", handleResize);
      }, []);
    
    

    const renderCard = (product) => (
        <div key={product.id} className="col-11 col-sm-6 col-lg-4" {...(screenWidth > 430 ? {"data-aos": "fade-up"} : {})} >
            <Card style={{ boxShadow: "none", width: "100%" }}>
                <CardActionArea>
                    <Link className="link img-wrapper position-relative" to={`/details/product/${product.id}`}>
                        <CardMedia
                            component="img"
                            height="400"
                            image={product.MainImage}
                            alt={product.name}
                            className="img-card"
                        />
                    </Link>
                    <div className="px-3 py-2 d-flex flex-column justify-content-between align-items-center gap-2">
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <p className="name-product p-0 m-0">{product.name}</p>
                            <FavBtn data={product} />
                        </div>
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <div className="w-50 h-50 d-flex justify-content-start align-items-center">
                                <span className="price-product p-0 m-0 w-50">
                                    {product.originalPrice}
                                </span>
                                <span className="name-product p-0 m-0 w-50" style={{ fontSize: "8px" }}>
                                    {product.price} $
                                </span>
                            </div>
                            <span
                                className="name-product p-0 m-0 w-50 d-flex justify-content-end gap-1 align-items-center"
                                style={{ fontSize: "8px" }}
                            >
                                <MdDone />{product.soldCount}
                            </span>
                        </div>
                    </div>
                </CardActionArea>
            </Card>
        </div>
    );

    const segments = [
        { start: 0, end: 6, render: renderCard },
        { start: 6, end: 7, render: renderCard },
        { start: 7, end: 13, render: renderCard },
        { start: 13, end: 14, render: renderCard },
        { start: 14, end: 20, render: renderCard },
        { start: 20, end: 21, render: renderCard },
        { start: 21, end: 27, render: renderCard },
        { start: 27, end: 28, render: renderCard },
        { start: 28, end: 34, render: renderCard },
        { start: 34, end: 35, render: renderCard },
        { start: 35, end: 41, render: renderCard },
        { start: 41, end: 42, render: renderCard },
        { start: 42, end: 48, render: renderCard },
        { start: 48, end: 49, render: renderCard },
        { start: 49, end: 55, render: renderCard },
        { start: 55, end: 56, render: renderCard },
        { start: 56, end: 62, render: renderCard },
        { start: 62, end: 63, render: renderCard },
        { start: 63, end: 69, render: renderCard },
        { start: 69, end: 70, render: renderCard },
        { start: 70, end: 76, render: renderCard },
        { start: 76, end: 77, render: renderCard },
        { start: 77, end: 83, render: renderCard },
        { start: 83, end: 84, render: renderCard },
        { start: 84, end: 90, render: renderCard },
        { start: 90, end: 91, render: renderCard },
        { start: 91, end: 97, render: renderCard },
        { start: 97, end: 98, render: renderCard },
        { start: 98, end: 104, render: renderCard },
        { start: 104, end: 105, render: renderCard },
        { start: 105, end: 111, render: renderCard },
        { start: 111, end: 112, render: renderCard },
        { start: 112, end: data.length, render: renderCard },
    ];

    return (
    <>
        <div className="row g-5 justify-content-center align-items-center">
            {segments.map((segment) =>
                data.slice(segment.start, segment.end).map(segment.render)
            )}
        </div>
        <Footer />    
    </>        
    );
}
