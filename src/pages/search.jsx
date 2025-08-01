import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardActionArea, CardMedia } from "@mui/material";
import FavBtn from "../commponads/favBtn";
import { MdDone } from "react-icons/md";

export default function SearchPage() {
    useEffect(() => {
        AOS.init({
          duration: 1000, 
          once: true      
        });
      }, []); 
    const [products, setProducts] = useState([])
    const name = useParams()
    const nameTitle = name.title.toLocaleLowerCase()

        

    useEffect(() => {
        fetch("https://app-data-ebon.vercel.app/products")
            .then(res => res.json())
            .then(data => {
                if (nameTitle === "pants") {
                    setProducts(data.filter(el => el.type === "pants"))
                }else if (nameTitle === "all" || nameTitle === "all products" || nameTitle === "all product") {
                    setProducts(data)
                } else if (nameTitle === "formal pants") {
                    setProducts(data.filter(el => el.category === "Formal Pants"))
                }else if (nameTitle === "casual pants") {
                    setProducts(data.filter(el => el.category === "Casual Pants"))
                }else if (nameTitle === "jackets" || nameTitle === "jacket") {
                    setProducts(data.filter(el => el.category === "Jacket"))
                } else if (nameTitle === "shoes") {
                    setProducts(data.filter(el => el.type === "shoes"))
                } else if (nameTitle === "shirts" || nameTitle === "shirt") {
                    setProducts(data.filter(el => el.category === "Shirt"))
                } else if (nameTitle === "hoodies" || nameTitle === "hoodie") {
                    setProducts(data.filter(el => el.category === "Hoodie"))
                } else if (nameTitle === "t-shirts" || nameTitle === "t-shirt") {
                    setProducts(data.filter(el => el.category === "T-shirt"))
                } else if (nameTitle === "formal shoes") {
                    setProducts(data.filter(el => el.category === "Formal Shoes"))
                } else if (nameTitle === "casual shoes") {
                    setProducts(data.filter(el => el.category === "Casual Shoes"))
                } else {
                    setProducts(false)
                }
            })
            .catch(err => console.log(err))
    }, [nameTitle])

    
    
     const [screenWidth, setScreenWidth] = useState(window.innerWidth);
        
          useEffect(() => {
            const handleResize = () => setScreenWidth(window.innerWidth);
        
            window.addEventListener("resize", handleResize);
        
            return () => window.removeEventListener("resize", handleResize);
          }, []);
        
        
    

    return (
        <>
            <header className="pants-back vw-100 vh-100" style={{ backgroundImage: `url(https://i.pinimg.com/1200x/cc/73/64/cc7364225b4c9d7f972aa8f57790c59b.jpg)`, backgroundPosition: "center 30%", backgroundSize: "cover" }}>
                <h1 className="text w-100 h-100 d-flex justify-content-center align-items-center">SEARCH FOR {nameTitle}</h1>
            </header>
            <section className="container py-5">
                <div className="row g-5 justify-content-center align-items-center">
                    {products === false ?
                        <div className="col-12 d-flex flex-column justify-content-center align-items-center vh-100">
                            <h1 className="name-product text-center">NOT FOUND ANY PRODUCT</h1>
                        </div>
                        :
                        products.map((product) => {
                            return (
                            <div key={product.id} className="col-11 col-sm-6 col-lg-4 "
                                {...(screenWidth > 430 ? {"data-aos": "fade-up"} : {})}>
                                <Card style={{ boxShadow: "none", width: "100%" }}>
                                    <CardActionArea>
                                    <Link className="link img-wrapper position-relative" to={"/details/product/" + product.id}>
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
                                                <FavBtn data={product}/>
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
                            )
                        })}
                </div>
            </section>
        </>
    );
}