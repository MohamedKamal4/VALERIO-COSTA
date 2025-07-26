import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";
                    //  const pathPrefix = window.location.hostname.includes("github.io") ? "/VALERIO-COSTA-FASHON-SHOP/" : "./";


export default function TopSold({ state }) {
    
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    
      useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
    
        window.addEventListener("resize", handleResize);
    
        return () => window.removeEventListener("resize", handleResize);
      }, []);
    
      const mediaOne =
        screenWidth > 430 ? (
        <video style={{ width: "100%", height: "50%" }} autoPlay muted loop playsInline>
            <source className="w-100 h-100" src={`https://res.cloudinary.com/dvd8u4zet/video/upload/v1753368060/6_efxm09.mp4`} type="video/mp4" />
        </video>
        ) : (
          <img
            className=" pants-back"
            style={{ width: "100%", height: "50%" }}
            src="https://i.pinimg.com/1200x/ed/99/87/ed9987c687cc2cdcd007774764cd00e2.jpg"
            alt=""
          />
        );
      const mediaTwo =
        screenWidth > 430 ? (
        <video style={{ width: "100%", height: "30%" }} autoPlay muted loop playsInline>
            <source className="w-100 h-100" src={`https://res.cloudinary.com/dvd8u4zet/video/upload/v1753368077/7_eckxrn.mp4`} type="video/mp4" />
        </video>
        ) : (
          <img
            className="pants-back"
            style={{ width: "100%", height: "30%" }}          
            src="https://i.pinimg.com/1200x/d6/4f/50/d64f5034de7357bffe004843ac547a78.jpg"
            alt=""
          />
        );



    return (
        <section style={{ width: "100vw", height: "102vh", background: "#151515" }} className="top-sold d-flex">
            <div style={{ width: "50%", height: "100%" }} className="d-flex flex-wrap">
                <div className="item-1" style={{ width: "40%", height: "70%" , backgroundImage: "url(https://i.pinimg.com/1200x/6a/c7/85/6ac78566a0b4e09c94a0e3e5d10353bf.jpg)" }} >
                </div>
                <div style={{ width: "60%", height: "70%" }}>
                    {mediaOne}
                    <div className="item-2" style={{ width: "100%", height: "50%", backgroundImage : "url(https://i.pinimg.com/1200x/bc/c1/7b/bcc17bb8de5782245f8aeb8e5e5943ad.jpg)" }}>
                    </div>
                </div>
                <div className="item-3" style={{ width: "50%", height: "30%" , backgroundImage: "url(https://i.pinimg.com/1200x/df/87/8b/df878bced4643cfb3241c9d481a2cd1e.jpg)"}}>
                </div>
                <div className="item-4" style={{ width: "50%", height: "30%" , backgroundImage:"url(https://i.pinimg.com/1200x/cc/41/1d/cc411d782c8b6a2b5967e43d5c49525b.jpg)" }}>
                </div>
            </div>
            <div style={{ width: "50%", height: "100%" }} className="d-flex flex-wrap ">
                <div style={{ width: "50%", height: "100%" }}>
                    <div className="item-5" style={{ width: "100%", height: "70%" , backgroundImage: "url(https://i.pinimg.com/1200x/58/d0/5c/58d05c35230dab3626cfb40741950e0d.jpg)" }}>
                    </div>
                    {mediaTwo}
                </div>
                <div className="item-6" style={{ width: "50%", height: "100%" , backgroundImage: "url(https://i.pinimg.com/1200x/45/6b/3b/456b3bbcfbc2fb910aa8ce7f4d1ed89d.jpg)"}} >
                </div>
            </div>
            {state === true ?
                <Link
                to={"/bestseller"}
                className="link d-flex justify-content-center align-items-center flex-column"
                style={{
                    position: "absolute",
                    bottom: "20%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                    zIndex: 1000000
                }}
            >
                <IoMdArrowDropdown />
                DISCOVER
                </Link>
                :
                null
            }
            
        </section>
    );
}
