import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import AOS from "aos";

export default function Slide() {
    const collections = [
        {
            id: 1,
            imges: [
                "https://i.pinimg.com/1200x/37/b7/4f/37b74ffadaa9d91fc24456804c769efd.jpg",
                "https://i.pinimg.com/1200x/56/d4/1d/56d41d15335edd3e0b8a4698c6b66a86.jpg"
            ],
            name: "PANTS",
            caption: "Step up your style with our latest pants collection – comfort meets confidence",
        },
        {
            id: 2,
            imges: [
                "https://i.pinimg.com/1200x/c7/d1/da/c7d1da9c782cc9a3cae36ee044f6d1ef.jpg",
                "https://i.pinimg.com/1200x/c4/ae/c2/c4aec246938a21138b4ffa310f39e532.jpg"
            ],
            name: "T - SHIRTS",
            caption: "Elevate your everyday look with our new T‑shirt collection – where comfort meets style"
        },
        {
            id: 3,
            imges: [
                "https://i.pinimg.com/1200x/9f/ac/9c/9fac9ce580169a482c20ef0d0cacb89a.jpg",
                "https://i.pinimg.com/1200x/d3/fc/72/d3fc727b26934f2b5c48f5ba777dc61a.jpg"
            ],
            name: "HOODIE",
            caption: "Chill vibes only. New hoodies just dropped"
        },
        {
            id: 4,
            imges: [
                "https://i.pinimg.com/1200x/2e/d5/39/2ed5390fcfc83ad0970de30cfeb1271b.jpg",
                "https://i.pinimg.com/1200x/07/93/db/0793dbc8a6e9cf02017b27083b7cdc7e.jpg"
            ],
            name: "JACKETS",
            caption: "Own the cold with jackets that do more than just keep you warm"
        },
        {
            id: 5,
            imges: [
                "https://i.pinimg.com/1200x/6b/b3/20/6bb320dc44c27a0571476210b7cc15b5.jpg",
                "https://static.zara.net/assets/public/bc07/f28f/f0434e8d8d1c/c8f46a2a24e6/01063305250-e1/01063305250-e1.jpg?ts=1735568191450&w=563"
            ],
            name: "SHIRTS",
            caption: "From casual to classic – our new shirts have you covered."
        },
        {
            id: 6,
            imges: [
                "https://i.pinimg.com/1200x/43/90/39/439039195552a986f47f923172e694c1.jpg",
                "https://i.pinimg.com/1200x/ea/64/e5/ea64e5739d456e9fb65047a2625c2a45.jpg"
            ],
            name: "SHOES",
            caption: "From street to sleek – discover shoes that do it all"
        }
    ];

    const [itemIndex, setItemIndex] = useState(0);
    const [location , setLocation] = useState(null)

    const handleNext = () => {
        const nextIndex = (itemIndex + 1) % collections.length; // يدور تلقائي بعد آخر عنصر
        setItemIndex(nextIndex);
    };

    useEffect(() => {
        AOS.init({
          duration: 1000,
          once: false,
        });

        if (itemIndex === 0) {
            setLocation("/pants")
        }else if (itemIndex === 1) {
            setLocation("/shirts")
        }else if (itemIndex === 2) {
            setLocation("/hoodies")
        }else if (itemIndex === 3) {
            setLocation("/jackets")
        }else if (itemIndex === 4) {
            setLocation("/t-shirts")
        }else if (itemIndex === 5) {
            setLocation("/shoes")
        }
      }, [itemIndex]);

      useEffect(() => {
        AOS.refresh();
      }, [itemIndex]);

    const currentItem = collections[itemIndex];
    // const nextItem = collections[(itemIndex + 1) % collections.length];

    console.log(itemIndex);



    return (
        <div
        key={itemIndex}
        style={{position: 'relative'}}
        className="slider vw-100 vh-100 d-flex justify-content-center align-items-center">
            

            <div
                data-aos="fade-left"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                className="w-100 h-100 d-flex justify-content-center align-items-center position-relative">
                <div 
                onClick={() => {
                    window.location.href = location
                }}
                className="position-absolute top-0 start-0 w-100 h-100" style={{cursor:'pointer' , zIndex: '99'}}>
                    <span 
                    className="h-25 w-100 d-flex justify-content-start align-items-center name-product  diff best-seller head-text"
                    style={{
                        zIndex: "10",
                        fontSize: "150px",
                        color: "rgb(255, 157, 0)",
                    }}
                    >
                    {currentItem.name}
                    
                    </span>
                    <div className="h-50"></div>
                    <span 
                        className="h-25 w-100 name-product best-seller head-text d-flex justify-content-end align-items-center"
                        style={{
                            zIndex: "10",
                            fontSize: "150px",
                            color: "rgb(255, 157, 0)",
                        }}
                    >
                    BEST SELLER
                    </span>
                </div>
                <img
                data-aos="zoom-in"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                className="w-75 h-75 object-fit-cover" src={currentItem.imges[0]} alt={currentItem.name} />
            </div>

            <div
                key={itemIndex}
                data-aos="fade-left"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                style={{position: 'absolute' , top: '50%' , right: '0' ,zIndex: '9999'}}>
                <button 
                    className="btn name-product py-2 fw-bold text-white bg-black px-4" 
                    onClick={handleNext}
                >
                    NEXT
                </button>
            </div>
        </div>
    );
}
