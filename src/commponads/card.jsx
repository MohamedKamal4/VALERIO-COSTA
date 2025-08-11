import AOS from 'aos';
import 'aos/dist/aos.css';
import { Card, CardActionArea, CardMedia } from "@mui/material";
import { useContext, useEffect, useState ,useRef } from "react";
import { MdDone } from "react-icons/md";
import { Link } from "react-router-dom";
import { cardData } from "../context/contextCard";
import FavBtn from "./favBtn";
import { SquareLoader } from "react-spinners";
import { TfiClose } from "react-icons/tfi";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import AddBox from './addBox';

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
              <div key={product.id} className="p-3 col-8 col-sm-6 col-md-3" style={{ height: '500px'}} {...(screenWidth > 430 ? { "data-aos": "zoom-in" } : {})}>
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









          {openDetails &&
          <div className='d-flex p-0 flex-column bg-white position-fixed start-0' style={{overflow: 'hidden',transition: 'all 0.5s ' , bottom: openDetails ? '0' : '-100%' , boxShadow: '0 0 50px black ' , borderTopRightRadius: '40px' , borderTopLeftRadius: '40px' , width: '100vw' , height: '90vh' , zIndex: '9999999999999'}}>
            <div className='w-100 position-absolute top-0 start-0 d-flex justify-content-end py-3 px-2' style={{zIndex: '99'}}>
              <button type='button' className='btn'><TfiClose size={24} color={'#000'} onClick={() => setOpenDetails(false)} /></button>
            </div>
            <div className='w-100 h-100'>
              <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                <SwiperSlide>
                  <img className='w-100 h-100' src={product.MainImage} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img className='w-100 h-100' src={product.images[0]} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img className='w-100 h-100' src={product.images[1]} alt="" />
                </SwiperSlide>
              </Swiper>
            </div>
            <div className='w-100 position-absolute bottom-0 start-0' style={{ backgroundColor: '#ffffff96' , backdropFilter: 'blur(5px)', zIndex: '99'}}>
              <button className='btn w-100' style={{backgroundColor : 'inherit'}} onClick={() => {
                setOpenModal(!openModal)
              }}>{openModal ? 'CLOSE' : 'OPEN'} ADD FORM</button>
              {openModal &&
                <div className='w-100 p-3 gap-2' style={{transition: 'all 0.5s',height: '250px'}}>
                <div className='w-100 h-50'>
                  <p>{product.name}</p>
                  <p>PRICE : <span  className='name-product'>{product.price} $</span></p>
                  <p className='pt-1' style={{lineHeight: '10px'}}>DESCRIPTION : <span style={{fontSize: '10px'}}>{product.discription}</span></p>
                </div>
                <AddBox product={product} sizes={product.sizes} />
              </div>
              }
            </div>
          </div>
          }
        </section>
      )}
    </>
  );
}
