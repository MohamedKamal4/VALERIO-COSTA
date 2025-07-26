import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./navbar";
import { SquareLoader } from "react-spinners";
import Footer from "./footer";
import AddBox from "./addBox";
import GoTop from "./goTop";
import Cards from "./card";
import { cardData } from "../context/contextCard";

export default function Details() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState({});
  const [imageOne, setImageOne] = useState("");
  const [imageTwo, setImageTwo] = useState("");
  const [sizes, setSizes] = useState([]);
  const [smilerProducts, setSmipleProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const relatedRef = useRef();
  const [showAddBox, setShowAddBox] = useState(true);




useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      setShowAddBox(!entry.isIntersecting);
    },
    {
      root: null,
      threshold: 0,
      rootMargin: "0px 0px -100px 0px", // ممكن تزود -200 لو لسه في تداخل
    }
  );

  const current = relatedRef.current;
  if (current) observer.observe(current);

  return () => {
    if (current) observer.unobserve(current);
  };
}, []);




  useEffect(() => {
    fetch(`https://app-data-ebon.vercel.app/products/${productId}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setImageOne(data.images[0]);
        setImageTwo(data.images[1]);
        setSizes(data.sizes);
        setLoading(false);
        const updatedStock = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const itemInCart = cart.find(
          (item) => item.id === data.id && data.sizes.includes(item.size)
        );

        const remaining = itemInCart
          ? data.inStock - itemInCart.quantity
          : data.inStock;

        setProduct((prev) => ({ ...prev, inStock: remaining }));
      };

      updatedStock(); // تحديث الكمية مباشرة
      }).catch(err => console.log(err));
    
  }, [productId]);


  useEffect(() => {
    fetch("https://app-data-ebon.vercel.app/products")
    .then(res => res.json())
      .then(data => {
        const filter = data.filter(el => el.category === product.category)
        const filterClen = filter.filter(el => el.id !== product.id)
        setSmipleProducts(filterClen)
      })
      .catch(err => console.log(err))
  },[product])

  


  useEffect(() => {
  const interval = setInterval(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemInCart = cart.find(
      (item) => item.id === product.id && product.sizes.includes(item.size)
    );

    const remaining = itemInCart
      ? product.inStock - itemInCart.quantity
      : product.inStock;

    setProduct((prev) => ({ ...prev, inStock: remaining }));
  }, 1000); 

  return () => clearInterval(interval);
}, [product]);

const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const content =
    screenWidth > 993 ? (
      <section>
      <div className="container details-content">
        {!loading ? (
          <>
            <div className="row h-50">
              <div className="col-6">
                <img className="img-fluid w-100 h-100" style={{ objectFit: "cover" }} src={imageOne} alt="" />
              </div>
              <AddBox product={product} sizes={sizes}/>
            </div>

            <div className="row h-50">
              <div className="col-6 d-flex justify-content-center align-items-center">
                <div className="text-box w-100 h-50 p-3 d-flex flex-column gap-3">
                  <div><span className="name-product details-text">DESCRIPTION :</span><p className="details-text">{product.discription}</p></div>
                  <div><span className="name-product details-text">COUNTRY : {product.currency}</span></div>
                  <div><span className="name-product details-text">SOLD COUNT : {product.soldCount}</span></div>
                  <div><span className="name-product details-text">CATEGORY: {product.category}</span></div>
                </div>
              </div>
              <div className="col-6">
                <img className="img-fluid w-100 h-100" style={{ objectFit: "cover" }} src={imageTwo} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <SquareLoader />
          </div>
        )}
        <GoTop />
      </div>
    </section>
    ) : (
      <section className="position-relative " style={{ marginBottom: "100px" }}>
      <div className="container details-content">
        {!loading ? (
          <>
            <div className="row " style={{height: "40%"}}>
              <div className="col-12 position-relative">
                <img className="img-fluid w-100 h-100" style={{ objectFit: "cover" }} src={imageOne} alt="" />
              </div>
            </div>
            <div className="row my-5" style={{height: "20%"}}>
              <div className="col-6 d-flex justify-content-center align-items-center">
                <div className="text-box w-100 h-50 p-3 d-flex flex-column gap-3">
                  <div><span className="name-product details-text">NAME :</span><p className="details-text">{product.name}</p></div>
                  <div><span className="name-product details-text">DESCRIPTION :</span><p className="details-text">{product.discription}</p></div>
                  <div><span className="name-product details-text">COUNTRY : {product.currency}</span></div>
                  <div><span className="name-product details-text">SOLD COUNT : {product.soldCount}</span></div>
                  <div><span className="name-product details-text">CATEGORY: {product.category}</span></div>
                </div>
              </div>
              <div className="col-6 my-5" style={{backgroundImage : `url(${product.MainImage})`, backgroundSize: "cover", backgroundPosition: "center"}}></div>
            </div>
            <div className="row " style={{height: "40%"}}>
              <div className="col-12">
                <img className="img-fluid w-100 h-100" style={{ objectFit: "cover" }} src={imageTwo} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <SquareLoader />
          </div>
        )}
      </div>
    </section>
    );
  

  return (
    <>
      {content}
      {!loading ?
        showAddBox && <AddBox product={product} sizes={sizes} />
        :
        null
      }
      <div ref={relatedRef} style={{ height: "1px", marginTop: "300px" }}></div>
      <div className="container flex-column d-flex justify-content-center align-items-center" style={{position: "relative",backgroundColor: "white",zIndex: "99999999999"}}>
        <p className="p-5 w-100 text-center text-black name-product" style={{fontSize: "20px", fontWeight: "100"}}>SIMPLE PRODUCTS</p>
        <cardData.Provider value={{  data : smilerProducts  }}>
          <Cards />
        </cardData.Provider>
      </div>
    </>
    );
}
