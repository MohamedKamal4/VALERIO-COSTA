import { useEffect, useState } from "react";

export default function BigSale({ width }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const media =
    screenWidth > 430 ? (
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        onError={() =>
          alert("حدث خطأ أثناء تحميل الفيديو. جرّب تحديث الصفحة أو تحقق من الرابط.")
        }
      >
        <source
          src="https://dl.dropboxusercontent.com/scl/fi/4zzjdw49kj7vlidwydqii/202507142323.mp4?rlkey=tcsi5057igjdhafvgmkaf2mbg&st=rd3glj4l&dl=0"
          type="video/mp4"
        />
        متصفحك لا يدعم عرض الفيديو.
      </video>
    ) : (
      <img
      className="w-100 h-100 pants-back"
      src="https://i.pinimg.com/1200x/d4/13/e8/d413e8a79ba14321e47712ea58d76d96.jpg"
      alt=""
      />
    );

  const parentWidth = screenWidth > 430 ? 
    ("w-50 h-100")
          :
    ("w-100 h-100");
  
  return (
    <section className={`video-big ${parentWidth}`}>
      {media}
    </section>
  );
}
