import { useEffect, useState } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Scrollbar from "smooth-scrollbar";
import { Link } from "react-router-dom";
import BigSale from "./commponads/sale/bigsale";
import Navbar from "./commponads/navbar";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import Footer from "./commponads/footer";
import TopSold from "./commponads/topSold";
import { IoMdArrowDropdown } from "react-icons/io";


function App() {
  useEffect(() => {
    // Register plugins
    gsap.registerPlugin(ScrollTrigger);

    // Init custom scrollbar
    const bodyScrollBar = Scrollbar.init(document.body, {
      damping: 0.1,
      delegateTo: document,
    });

    // ScrollTrigger proxy
    ScrollTrigger.scrollerProxy(".scroller", {
      scrollTop(value) {
        if (arguments.length) {
          bodyScrollBar.scrollTop = value;
        }
        return bodyScrollBar.scrollTop;
      },
    });

    bodyScrollBar.addListener(ScrollTrigger.update);

    gsap.set(".panel", {
      zIndex: (i, target, targets) => targets.length - i,
    });

    const images = gsap.utils.toArray(".panel:not(.purple)");

    images.forEach((image, i) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: "section.black",
          scroller: ".scroller",
          start: () => "top -" + window.innerHeight * (i + 0.5),
          end: () => "+=" + window.innerHeight,
          scrub: true,
          toggleActions: "play none reverse none",
          invalidateOnRefresh: true,
        },
      }).to(image, { height: 0 });
    });

    // Animate text
    gsap.set(".panel-text", {
      zIndex: (i, target, targets) => targets.length - i,
    });

    const texts = gsap.utils.toArray(".panel-text");

    texts.forEach((text, i) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: "section.black",
          scroller: ".scroller",
          start: () => "top -" + window.innerHeight * i,
          end: () => "+=" + window.innerHeight,
          scrub: true,
          toggleActions: "play none reverse none",
          invalidateOnRefresh: true,
        },
      })
        .to(text, { duration: 0.33, opacity: 1, y: "50%" })
        .to(text, { duration: 0.33, opacity: 0, y: "0%" }, 0.66);
    });

    // Pinning section
    ScrollTrigger.create({
      trigger: "section.black",
      scroller: ".scroller",
      scrub: true,
      pin: true,
      start: () => "top top",
      end: () => "+=" + (images.length + 1) * window.innerHeight,
      invalidateOnRefresh: true,
    });
    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      bodyScrollBar.destroy();
    };

  }, []);


  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const media =
    screenWidth > 430 ? (
      <section className="orange">
        <video preload="auto" autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }}>
          <source src="https://dl.dropboxusercontent.com/scl/fi/jy5exx8dc5j7t3j9s0ocm/head.mp4?rlkey=idpbgd481qbbihut3v0w0a45z&st=9zz21zkl&dl=0" type="video/mp4" />
        </video>
        <div className="text">VALERIO COSTA</div>
      </section>
    ) : (
      <section className="orange" style={{ backgroundImage: "url(https://i.pinimg.com/1200x/d3/60/68/d36068b1912b4c967c428bf03392e687.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="text">VALERIO COSTA</div>
      </section>
    );


  return (

    <div className="scroller">
      {media}

      <section className="black">
        <div className="text-wrap">
          <div className="panel-text blue-text">
            <Link to={"/pants"} className="link-shop link">
              PANTS
              <p>Elevate your everyday style with our curated collection of premium pants — where comfort meets timeless elegance.</p>
            </Link>
          </div>
          <div className="panel-text red-text">
            <Link to={"/jackets"} className="link-shop link">
              JACKETS
              <p>Layer up in style — discover our collection of premium jackets, crafted for comfort, designed for distinction.</p>
            </Link>
          </div>
          <div className="panel-text green-text">
            <Link to={"/shoes"} className="link-shop link">
              SHOES
              <p>Step into sophistication — our curated shoe collection blends timeless style with everyday comfort.</p>
            </Link>
          </div>
          <div className="panel-text orange-text">
            <Link to={"/shirts"} className="link-shop link">
              SHIRTS
              <p>Refine your wardrobe with shirts that speak elegance — tailored fits, premium fabrics, timeless designs.</p>
            </Link>
          </div>
          <div className="panel-text yellow-text">
            <Link to={"/hoodies"} className="link-shop link">
              HOODIES
              <p>Wrap yourself in comfort and confidence — explore hoodies that blend cozy warmth with modern attitude.</p>
            </Link>
          </div>
          <div className="panel-text purple-text">
            <Link to={"/t-shirts"} className="link-shop link">
              T-SHIRTS
              <p>Effortless style starts here — discover our collection of premium T-shirts, crafted for comfort and made to last.</p>
            </Link>
          </div>
        </div>
        <div className="p-wrap">
          <div className="panel blue"></div>
          <div className="panel red"></div>
          <div className="panel green"></div>
          <div className="panel orange"></div>
          <div className="panel yellow"></div>
          <div className="panel purple"></div>
        </div>
      </section>

      <section className="blue " style={{ marginTop: "100px", marginBottom: "100px" }}>
        <BigSale width={"50%"} />
        <div className="content w-50">
          <h1 style={{ color: "black" }}>
            BIG SALE
          </h1>
          <Link to={"/bigSale"} className="link text-black d-flex align-items-center justify-content-center flex-column">
            <IoMdArrowDropdown color="black" />
            DISCOVER
          </Link>
        </div>
      </section>
      <TopSold state={true} />
      <Footer />
    </div>
  );
}

export default App;
