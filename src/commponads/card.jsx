import AOS from 'aos';
import 'aos/dist/aos.css';
import { CardMedia } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MdDone } from "react-icons/md";
import { Link } from "react-router-dom";
import { cardData } from "../context/contextCard";
import FavBtn from "./favBtn";
import { SquareLoader } from "react-spinners";
import 'swiper/css';
import 'swiper/css/pagination';
import DetailsBox from './detailsBox';

export default function Cards() {
  const { data } = useContext(cardData);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(true);
  const [openDetails , setOpenDetails] = useState(false);
  const [product , setProduct] = useState({});
  const [openModal , setOpenModal] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  


  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <SquareLoader />
        </div>
      ) : (
        <section className="row justify-content-center align-items-center" style={{ paddingBottom: "300px" }}>
          {data.map((product) => {
            return (
              <div
              data-aos='zoom-in'
              data-aos-offset="200"
              data-aos-easing="ease-in-out"
              key={product.id} className="p-3 col-12 col-sm-6 col-md-6 col-lg-3" style={{ marginBottom: '50px', height: '550px'}}>
                <div className='w-100 h-100'>
                  {screenWidth > 380 ?
                      <Link className="link img-wrapper position-relative" to={`/details/product/${product.id}`}>
                        <div className='w-100 h-75'>
                            <img
                            src={product.MainImage}
                            alt={product.name}
                            className="img-card w-100 h-100"
                          />
                        </div>
                      </Link>
                      :
                      <div className="img-wrapper position-relative" role='button' onClick={() => {
                        setOpenDetails(true);
                        setProduct(product);
                      }}>
                        <CardMedia
                            component="img"
                            height="450"
                            image={product.MainImage}
                            alt={product.name}
                            className="img-card"
                        />
                      </div>
                  }
                  <div className="px-3 py-2 d-flex flex-column justify-content-between align-items-center gap-2">
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <p className="name-product p-0 m-0">{product.name}</p>
                      <FavBtn data={product} />
                    </div>
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <div className="w-50 h-50 d-flex justify-content-start align-items-center">
                        <span className="price-product p-0 m-0 w-50">{product.originalPrice}</span>
                        <span className="name-product p-0 m-0 w-50" style={{ fontSize: "8px" }}>
                          {product.price} $
                        </span>
                      </div>
                      <span className="name-product p-0 m-0 w-50 d-flex justify-content-end gap-1 align-items-center" style={{ fontSize: "8px" }}>
                        <MdDone />{product.soldCount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
          }
          <DetailsBox openDetails={openDetails} setOpenDetails={setOpenDetails} product={product} openModal={openModal} setOpenModal={setOpenModal} />
        </section>
      )}
    </>
  );
}
