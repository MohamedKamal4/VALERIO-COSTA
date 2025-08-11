export default function Head({animate, name ,img,other}){
    return(
        <header className="vw-100 vh-100 d-flex justify-content-center align-items-start">
            <div
                key={animate}
                data-aos="zoom-out"
                data-aos-offset="200"
                data-aos-easing="ease-in-out"
                style={{position:'relative' , width: "1344px",height:"90%", margin: "auto" }}
                className="flex-column d-flex justify-content-start align-items-center">
                <div data-aos-delay="500" className="w-100 h-50">
                    <h1 className="head-text w-100 h-100 d-flex justify-content-start align-items-center" style={{ fontSize: "180px" }}>{name}</h1>
                </div>
                <div 
                data-aos-delay="500"
                className="w-100 h-50">
                    <h2
                        className="head-text w-100 h-100 d-flex justify-content-end align-items-center" style={{ fontSize: "180px" }}>{other}</h2>
                </div>
                <div style={{position: "absolute",zIndex: "-1" , top: "50%", left: "50%", transform: "translate(-50% , -50%)"}}>
                    <img
                        data-aos="zoom-in"
                        data-aos-offset="200"
                        data-aos-easing="ease-in-out"
                        style={{ width: "400px", height: "400px" }} src={img} alt="" />
                </div>
            </div>
        </header>
    )
}