import { BsArrowDown } from "react-icons/bs";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import Slide from "./commponads/test";
import Head from "./pages/headPage";

function Home() {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [intro, setIntro] = useState(true);
  const [fadeClass, setFadeClass] = useState("");
  const [collection, setCollection] = useState({ name: "PANTS", image: "https://i.pinimg.com/736x/4d/dc/bc/4ddcbcf654b94f19e68756bc584feded.jpg" });

  const collections = [{
    name: "PANTS", image: "https://i.pinimg.com/736x/4d/dc/bc/4ddcbcf654b94f19e68756bc584feded.jpg"
  },
  { name: "JACKETS", image: "https://i.pinimg.com/1200x/8e/cf/2d/8ecf2d139e5a08d19ea8a4767b23c165.jpg" },
  { name: "SHOES", image: "https://i.pinimg.com/1200x/3d/89/3f/3d893fba683b35d4558700035366728b.jpg" },
  { name: "SHIRTS", image: "https://i.pinimg.com/1200x/16/fa/0d/16fa0d7ad1da0905b87e3d1b5dfa2aa8.jpg" },
  { name: "HOODIES", image: "https://i.pinimg.com/1200x/c2/b6/1b/c2b61b6368cd8adeea2bb2fec14ed771.jpg" },
  { name: "T-SHIRTS", image: "https://i.pinimg.com/1200x/34/e3/49/34e349a5c2b741ab0f02201fdcce5ba3.jpg" }
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [collection.image, collection.name]);

  useEffect(() => {
    setTimeout(() => {
      setIntro(false);
    }, 3000);
  }, [])


  function changeCollectionWithTransition(item) {
    setFadeClass("fade-collection");
    setTimeout(() => {
      setCollection(item);
      setFadeClass(""); // إزالة الكلاس بعد انتهاء الأنيميشن
    }, 50); // نصف مدة تأثير الفيد
  }


  function handleShoBtn() {
    setIsTransitioning(true);
    setTimeout(() => {
      if (collection.name === "PANTS") {
        navigate("/pants");
      } else if (collection.name === "JACKETS") {
        navigate("/jackets");
      } else if (collection.name === "SHOES") {
        navigate("/shoes");
      } else if (collection.name === "SHIRTS") {
        navigate("/shirts");
      } else if (collection.name === "HOODIES") {
        navigate("/hoodies");
      } else if (collection.name === "T-SHIRTS") {
        navigate("/t-shirts");
      } else {
        navigate("/home");
      }
    }, 500);
  }

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);



  return (
    <>

      {intro === true ?
        <div className="head-text vh-100 vw-100 gap-5 bg-black d-flex justify-content-center align-items-center text-white" style={{ position: "fixed", top: "0", left: "0", zIndex: "2000" }}>
          <div className=" d-flex intro justify-content-center align-items-center gap-4" style={{ fontSize: "100px" }}>
            <span
              data-aos="zoom-in"
              data-aos-offset="200"
              data-aos-easing="ease-in-out"
            >V</span>
            <span
              data-aos="zoom-in"
              data-aos-offset="200"
              data-aos-easing="ease-in-out"
              data-aos-delay="100"
            >A</span>
            <span
              data-aos="zoom-in"
              data-aos-offset="200"
              data-aos-easing="ease-in-out"
              data-aos-delay="200"
            >L</span>
            <span
              data-aos="zoom-in"
              data-aos-offset="200"
              data-aos-easing="ease-in-out"
              data-aos-delay="400"
            >E</span>
            <span
              data-aos="zoom-in"
              data-aos-offset="200"
              data-aos-easing="ease-in-out"
              data-aos-delay="500"
            >I</span>
            <span
              data-aos="zoom-in"
              data-aos-offset="200"
              data-aos-easing="ease-in-out"
              data-aos-delay="600"
            >O</span>
          </div>
          <div className="d-flex intro justify-content-center align-items-center gap-4" style={{ fontSize: "100px" }}>
            <span
              data-aos="zoom-in"
              data-aos-offset="200"
              data-aos-easing="ease-in-out"
              data-aos-delay="700"
            >C</span>
            <span
              data-aos="zoom-in"
              data-aos-offset="200"
              data-aos-easing="ease-in-out"
              data-aos-delay="800"
            >O</span>
            <span
              data-aos="zoom-in"
              data-aos-offset="200"
              data-aos-easing="ease-in-out"
              data-aos-delay="900"
            >S</span>
            <span
              data-aos="zoom-in"
              data-aos-offset="200"
              data-aos-easing="ease-in-out"
              data-aos-delay="1000"
            >T</span>
            <span
              data-aos="zoom-in"
              data-aos-offset="200"
              data-aos-easing="ease-in-out"
              data-aos-delay="1100"
            >A</span>
          </div>
        </div>
        :
        <>
          <main className={isTransitioning ? "fade-out" : ""} style={{marginBottom: '200px'}}>
            <section className="container hero-section vh-100 d-flex justify-content-center align-items-start pt-5 ">
              <div className="w-100 left-head d-flex justify-content-center align-items-center position-relative h-100">
                <div className={` w-75 test`}
                  style={{ height: "100%" }}
                >
                  <div style={{ height: "5%" }}>
                    <p
                      data-aos="fade-right"
                      data-aos-offset="200"
                      data-aos-easing="ease-in-out"
                      className="p-0" style={{ fontSize: "10px", letterSpacing: "5px" }}>NEW COLLECTION</p>
                  </div>
                  <div
                    data-aos="fade-up-right"
                    data-aos-offset="200"
                    data-aos-easing="ease-in-out"
                    key={collection.image}
                    style={{ height: "95%" }} className={`img-box position-relative ${fadeClass}`}>
                    <img
                      className={`img-head w-100 h-100`}
                      src={collection.image}
                      alt="collection"
                      style={{ transition: "all 0.5s ease" }}
                    />
                    {screenWidth >= 1000 ?
                      <div className="dotts-background position-absolute h-50 w-50 " style={{ right: "200px", top: "-50px", zIndex: -1 }}>
                        <img
                          data-aos="fade-up-right"
                          data-aos-offset="200"
                          data-aos-easing="ease-in-out"
                          className="w-100 h-100" src="https://static.vecteezy.com/system/resources/thumbnails/049/690/731/small/dotted-pattern-dotted-background-polka-dot-dot-pattern-seamless-background-monochrome-dotted-texture-eps-10-vector.jpg" alt="" />
                      </div>
                      :
                      null
                    }
                  </div>
                </div>

                <div
                  className="collection-name w-100 ps-5 position-absolute end-0"
                  style={{ top: "40%" }}
                  key={collection.name}
                  data-aos="zoom-in"
                  data-aos-offset="200"
                  data-aos-easing="ease-in-out"
                >
                  <h1
                    className={`head-text ${fadeClass}`}
                    style={{ fontSize: "80px",color: "rgb(255 157 0)", transition: "all 0.5s ease" }}
                  >
                    {collection.name}
                  </h1>
                </div>

                <div className="w-25 h-100 d-flex justify-content-between align-items-center" style={{ overflow: "hidden" }}>
                  {/* Scroll message */}
                  <div
                    data-aos="fade-down"
                    data-aos-offset="200"
                    data-aos-easing="ease-in-out"
                    className="w-50 h-100 d-flex justify-content-end align-items-center"
                    style={{ writingMode: "vertical-lr" }}
                  >
                    <p
                      
                      className="d-flex gap-2 text-black scroll-down justify-content-center align-items-center"
                      style={{ fontSize: "8px" }}
                    >
                      SCROLL DOWN TO SEE MORE <BsArrowDown className="arrow-down-icon" color="black" />
                    </p>
                  </div>

                  <div className="w-50 h-100 d-flex flex-column justify-content-between align-items-center" >
                    <div className="btns d-flex flex-column justify-content-between align-items-center" style={{ height: "40%" }}>
                      {collections.map((item, index) => (
                        <button
                          data-aos="zoom-in"
                          data-aos-offset="200"
                          data-aos-easing="ease-in-out"
                          key={item.name}
                          className="btn-collection text-black"
                          style={{
                            fontSize: "8px",
                            fontWeight: collection.name === item.name ? "bold" : "normal",
                            color: collection.name === item.name ? "#000" : "#666",
                            marginRight: collection.name === item.name ? "20px" : "0",
                            background: "none",
                            border: "none",
                            position: "relative",
                            // zIndex: 500,
                            cursor: "pointer",
                          }}
                          onClick={() => changeCollectionWithTransition(item)}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                    <button
                      className="shop-now-btn bg-black text-white p-2 mt-2"
                      style={{ fontSize: "8px" }}
                      onClick={handleShoBtn}
                    >
                      SHOP NOW
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </main >
          <section className="vw-100 bg-white position-relative" style={{marginBottom: '200px'}}>
            <div className="container d-flex justify-content-center align-items-center " >
              <div
                data-aos='fade-right'
                data-aos-offset="200"
                data-aos-easing="ease-in-out"
              className="w-25 be h-100 d-flex flex-column justify-content-center align-items-start" style={{ zIndex: 501, position: "relative" }}>
                <p
                  className="text-black text-center" style={{ fontSize: "60px", fontFamily: "Abril Fatface, serif" }}>Be</p>
                <p
                  className="text-black" style={{ fontSize: "60px", fontFamily: "Abril Fatface, serif" }}>UNIQUE</p>
                <p
                  className="position-relative" style={{ fontSize: "60px", right: "-80px", fontFamily: "Abril Fatface, serif", color: "rgb(255 157 0)" }}>FASHION</p>
                <p
                  className="text-black d-flex justify-content-center align-items-start flex-column" style={{ fontSize: "60px", fontFamily: "Abril Fatface, serif" }}>OUTLET <span style={{ width: "100px", height: "2px", backgroundColor: "rgb(255 157 0)" }}></span></p>
              </div>
              <div
                data-aos="zoom-in"
                data-aos-offset="200"
                data-aos-easing="ease-in-out"
                className=" d-flex justify-content-center align-items-center" style={{ width: "300px", height: "100%" }}>
                <img className="w-100 h-50" src="https://i.pinimg.com/1200x/be/95/8c/be958cfef82ad910d0214aad3a5c0aaa.jpg" alt="" />
              </div>
              <div 
              data-aos='fade-left'
              data-aos-offset="200"
              data-aos-easing="ease-in-out"
              className="name-brand-box w-50 p-3 h-100 d-flex justify-content-center align-items-start">
                <div 
                className="w-50 with-name-brand h-100 d-flex justify-content-center align-items-center">
                  <h2 className="text-black d-flex flex-column text-center justify-content-center align-items-center" style={{ fontSize: "80px", fontFamily: "Playfair Display, serif" }}><p className="text-black" style={{ fontSize: "12px", fontFamily: "Playfair Display, serif", letterSpacing: "5px", fontWeight: "100", fontVariant: "small-caps" }}>WITH</p>VALERIO COSTA</h2>
                </div>
                <div className="exp d-flex w-50 h-100 justify-content-center align-items-center">
                  <p
                    className="text-black w-100 d-flex justify-content-center align-items-center flex-column"
                    style={{ fontFamily: "Dancing Script, cursive" }}>
                    <span
                      style={{ fontFamily: "Dancing Script, cursive", color: "rgb(255 157 0)", fontSize: "100px" }}>20</span> EXPERIENCE</p>
                </div>
              </div>
            </div>
          </section>
          <section className=" vw-100 bg-white position-relative d-flex justify-content-center align-items-start" style={{marginBottom: '200px'}}>
            <div
              data-aos="fade-up"
              data-aos-offset="200"
              data-aos-easing="ease-in-out"
              className="d-flex sale-box container justify-content-center align-items-center p-0 position-relative " style={{ height: "500px" }}>
              <div className="sale-box-left d-flex justify-content-between align-items-center h-100" style={{ width: "50%" }}>
                <div className="h-100 slice d-flex justify-content-between align-items-center flex-column" style={{ width: "40%" }}>
                  <div
                    
                    className="w-100 h-25 d-flex flex-column justify-content-center align-items-center">
                    <h3 className="text-black" style={{ fontFamily: "Anton, sans-serif" }}>SALE</h3>
                    <p className="name-product text-black" style={{ fontFamily: "Nunito, sans-serif" }}>SUMMER 25</p>
                  </div>
                  <div
                    
                    className="h-75 w-100 d-flex justify-content-center align-items-end" style={{ overflow: "hidden" }}>
                    <img className="sale-caption h-100" style={{ width: "1000px" }} src="https://i.pinimg.com/736x/9c/75/7e/9c757ef71ef71f5ea6785c75185080dd.jpg" alt="" />
                  </div>
                </div>
                <div className="h-100 sale-img-hide" style={{ width: "60%" }}>
                  <img
                    data-aos="zoom-in"
                    data-aos-offset="200"
                    data-aos-easing="ease-in-out"
                    className="w-100 h-100 " src="https://i.pinimg.com/1200x/46/af/3d/46af3d024842c20b5a9f9c07ffe60615.jpg" alt="" />
                </div>
              </div>
              <div className="QUALIFIED-box h-100 d-flex justify-content-end flex-column align-items-center position-relative" style={{ width: "50%" }}>
                <div
                  data-aos="fade-down-right"
                  data-aos-offset="200"
                  data-aos-easing="ease-in-out "
                  className="w-50 p-3 bg-black QUALIFIED text-white d-flex justify-content-center align-items-center position-absolute" style={{ zIndex: 606, right: "0px", top: "40px" }} >QUALIFIED COLLECTION</div>
                <div
                  data-aos="fade-up-left"
                  data-aos-offset="200"
                  data-aos-easing="ease-in-out"
                  className="w-50 h-75 bg-danger position-relative">
                  <div className="w-100 h-100 position-absolute" style={{ bottom: "0", right: "0", zIndex: 602 }}>
                    <img className="w-100 h-100" src="https://i.pinimg.com/1200x/09/28/cf/0928cf1d3c5d280e0d15f27725fb7da0.jpg" alt="" />
                  </div>
                  <div className="w-100 h-100 position-absolute" style={{ bottom: "10px", right: "10px", zIndex: 603 }}>
                    <img className="w-100 h-100" src="https://i.pinimg.com/1200x/09/28/cf/0928cf1d3c5d280e0d15f27725fb7da0.jpg" alt="" />
                  </div>
                  <div className="w-100 h-100 position-absolute" style={{ bottom: "20px", right: "20px", zIndex: 604 }}>
                    <img className="w-100 h-100" src="https://i.pinimg.com/1200x/09/28/cf/0928cf1d3c5d280e0d15f27725fb7da0.jpg" alt="" />
                  </div>
                  <div className="w-100 h-100 position-absolute" style={{ bottom: "30px", right: "30px", zIndex: 605 }}>
                    <img className="w-100 h-100" src="https://i.pinimg.com/1200x/09/28/cf/0928cf1d3c5d280e0d15f27725fb7da0.jpg" alt="" />
                  </div>
                </div>
                <div className="pt-5 h-25 show">
                  <Link to={"/t-shirts"} className="link text-white bg-black p-2" >SHOW COLLECTION</Link>
                </div>
              </div>
            </div>
          </section>
          <section style={{marginBottom: '200px'}} >
            <Link className="link" to={"/bigSale"}>
                <Head animate={''} name={'BIG SALE'} other={'COLLECTION'}  img={`https://i.pinimg.com/1200x/69/bb/fb/69bbfbd902212959225e826d7888d303.jpg`} />
            </Link>
          </section>
          <section className="d-flex vh-100 justify-content-center align-items-center" style={{marginBottom: '200px'}}>
            <div
              data-aos="zoom-in"
              data-aos-offset="200"
              data-aos-easing="ease-in-out"
              className="season-section h-100 d-flex container justify-content-center align-items-start">
              <div className="h-100 numbers" style={{ width: "60%" }}>
                  
                <div className="w-100 h-75 d-flex justify-content-center align-items-center position-relative">




                  
                  <div className="d-flex img-p w-50 h-100 justify-content-center align-items-center flex-column">
                    <img
                      className="w-100 h-75" src="https://i.pinimg.com/1200x/a8/61/6d/a8616d481171b6c2b125d1b47bb66b9c.jpg" alt="" />
                    <p className="text-black w-100 text-start">EFFORTLESS LINES</p>
                    <p className="text-black w-100 text-start">MEET SEASONAL STILLNES</p>
                  </div>

                  <div className=" pe-2 w-100 h-100 d-flex flex-column position-absolute top-0 start-0" style={{zIndex: '1000'}}>
                    <div className="w-100 h-50 d-flex justify-content-start align-items-start">
                      <p
                        data-aos="fade-right"
                        data-aos-offset="200"
                        data-aos-easing="ease-in-out"
                        className="season-name" style={{ color: "rgb(255, 157, 0)", fontSize: "145px", position: "relative", zIndex: "701", fontFamily: "Anton, sans-serif" }}>WINTER</p>
                      <div
                        data-aos="fade-up"
                        data-aos-offset="200"
                        data-aos-easing="ease-in-out"
                        className="season-product-details w-100 flex-column d-flex justify-content-start align-items-end">
                        <p className="text-black">
                          TILLORED CALM
                        </p>
                        <p className="text-black">
                          DRESSED FOR NEW
                        </p>
                        <p className="text-black">
                          TERRAIN
                        </p>
                      </div>
                    </div>
                    <div className="w-100 h-50 d-flex justify-content-end align-items-end">
                      <p
                        data-aos="fade-right"
                        data-aos-offset="200"
                        data-aos-easing="ease-in-out"
                        className=" name-product season-date" style={{color: "rgb(255, 157, 0)", fontSize: "150px", position: "relative", zIndex: "707", fontFamily: "Anton, sans-serif" }}>'26</p>
                    </div>
                  </div>
                </div>





                <div className="w-100 h-25 d-flex justify-content-between align-items-center">
                  <div
                    
                    className="w-75 refined h-100 d-flex flex-column justify-content-start align-items-start">
                    <p
                      className="text-black" style={{ fontSize: "50px", fontFamily: "Dancing Script, cursive" }}>REFINED FOR NOW</p>
                    <p
                      className="text-black" style={{ fontSize: "50px", fontFamily: "Dancing Script, cursive" }}>_*ROOTED IN FORM</p>
                  </div>

                  <Link to="/jackets" className="link show w-25 d-flex justify-content-center align-items-center text-white bg-black p-2 me-5">SHOP NOW</Link>
                </div>
              </div>
              <div className="h-100 pic-remove gap-1 d-flex justify-content-center align-items-center" style={{ width: "40%", overflow: "hidden" }}>
                <div style={{ width: "100%", height: "100%" }}>
                  <img
                    className="w-100 h-100" src="https://i.pinimg.com/1200x/16/f0/95/16f0954eb024990554db753113c8c1d5.jpg" alt="" />
                </div>
              </div>
            </div>
          </section>
          <section style={{ height: '150vh'}}>
            <div className="container-fluid event-section d-flex justify-content-center align-items-center position-relative" style={{ height: "100vh", background: "url(https://i.pinimg.com/1200x/09/06/18/090618b61d565c6e5704b509a98736bf.jpg)", backgroundAttachment: "fixed", backgroundRepeat: "no-repeat", backgroundSize: "cover", margin: "auto" }}>
              <Slide />
            </div>
          </section >
        </>
      }
    </>
  );
}

export default Home;
