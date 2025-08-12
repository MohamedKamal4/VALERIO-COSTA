export default function Head({animate, name ,img,other}){
    return(
        <header style={{marginBottom: '50px'}} className="vw-100 vh-100 d-flex justify-content-center align-items-start">
            <div            
                style={{position:'relative' , background: `url(${img})` , backgroundPosition: 'center' , backgroundSize: 'cover' , backgroundRepeat: 'no-repeat' }}
                className="flex-column w-100 h-100 d-flex justify-content-start align-items-center">
                <div className="w-100 h-100">
                    <h1 
                    key={animate}
                    data-aos="zoom-in"
                    data-aos-offset="200"
                    data-aos-easing="ease-in-out"
                    className="w-100 h-100 name-product d-flex justify-content-center align-items-center text-black" style={{ fontFamily: "Nunito, sans-serif" , fontSize: "30px" }}>{name}</h1>
                </div>
            </div>
        </header>
    )
}