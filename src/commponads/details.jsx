import { useEffect, useRef, useState } from "react";
import { useParams , useNavigate} from "react-router-dom";
import { SquareLoader } from "react-spinners";
import AddBox from "./addBox";
import Cards from "./card";
import { cardData } from "../context/contextCard";

export default function Details() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null); // ✅ changed from [] to null
  const [imageOne, setImageOne] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [smilerProducts, setSmipleProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const relatedRef = useRef();
  const [showAddBox, setShowAddBox] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowAddBox(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "0px 0px -150px 0px",
      }
    );

    const current = relatedRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await fetch(`https://app-data-ebon.vercel.app/products/${productId}`, {
          signal: controller.signal,
        });
        const data = await res.json();

        setProduct(data);
        setImageOne(data.images?.[0] || null);
        setImageTwo(data.images?.[1] || null);
        setSizes(data.sizes || []);
        setLoading(false);

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const itemInCart = cart.find(
          (item) => item.id === data.id && item.size && data.sizes.includes(item.size)
        );
        const remaining = itemInCart ? data.inStock - itemInCart.quantity : data.inStock;
        setProduct((prev) => ({ ...prev, inStock: remaining }));

        const resAll = await fetch("https://app-data-ebon.vercel.app/products", {
          signal: controller.signal,
        });
        const allProducts = await resAll.json();
        const filtered = allProducts.filter(
          (el) => el.category === data.category && el.id !== data.id
        );
        setSmipleProducts(filtered);

      } catch (err) {
        if (err.name !== "AbortError") console.log(err);
      }
    };

    fetchProduct();

    return () => controller.abort();
  }, [productId]);

  useEffect(() => {
    const handleStorageChange = () => {
      if (!product) return;
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const itemInCart = cart.find(
        (item) => item.id === product.id && product.sizes.includes(item.size)
      );
      const remaining = itemInCart
        ? product.inStock - itemInCart.quantity
        : product.inStock;

      setProduct((prev) => ({ ...prev, inStock: remaining }));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [product]);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenWidth <= 380) {
      navigate('/home')
    }
  },[screenWidth,navigate])

  const content = (
  screenWidth > 900 && product ? (
    <section className={`${screenWidth === 768 ? 'container-fluid' : 'container'} details-content`}>
      {/* محتوى الشاشات الكبيرة */}
      <div className="row ">
        <div className="col-6">
          {imageOne && (
            <img
              className="img-fluid w-100 h-100"
              style={{ objectFit: "cover" }}
              src={imageOne}
              alt="product"
            />
          )}
        </div>
        <div className="col-6 d-flex flex-column justify-content-center align-items-start">
          <h5 className="brand-name" style={{ color: "black", fontWeight: "100" }}>
            {product.name}
          </h5>
          <div className="price d-flex gap-3">
            <span className="price-product fw-bold" style={{ fontSize: '10px' }}>{product.originalPrice} $</span>
            <span className="name-product originalPrice-price fw-bold">
              {product.price} $
            </span>
          </div>
          <AddBox product={product} sizes={sizes} />
        </div>
      </div>

      <div className="row ">
        <div className="col-6 d-flex justify-content-center align-items-center">
          <div className="text-box w-100 h-50 p-3 d-flex flex-column gap-3">
            <div>
              <span className="name-product details-text fw-bold text-black">DESCRIPTION :</span>
              <p className="details-text name-product fw-bold text-black">{product.discription}</p>
            </div>
            <div>
              <span className="name-product fw-bold text-black details-text">COUNTRY : {product.currency}</span>
            </div>
            <div>
              <span className="name-product fw-bold text-black details-text">SOLD COUNT : {product.soldCount}</span>
            </div>
            <div>
              <span className="name-product fw-bold text-black details-text">CATEGORY: {product.category}</span>
            </div>
          </div>
        </div>
        <div className="col-6">
          {imageTwo && (
            <img
              className="w-100 vh-100"
              style={{ objectFit: "cover" }}
              src={imageTwo}
              alt="product"
            />
          )}
        </div>
      </div>
    </section>
  ) : screenWidth > 375 && product ? (
    <section className="d-flex flex-column position-relative">
      {/* محتوى الشاشات المتوسطة */}
      <div className="row">
        {imageOne && <img src={imageOne} alt="" />}
      </div>
      <div>
        <div className="row h-100 position-relative d-flex justify-content-center align-items-center">
          <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
            <div className="p-4 w-100 h-50 d-flex flex-column">
              <h2 className="fw-bold text-black d-flex flex-wrap w-100">{product.name}</h2>
              <div className="price d-flex gap-3">
                <span className="price-product fw-bold" style={{ fontSize: '10px' }}>{product.originalPrice} $</span>
                <span className="name-product originalPrice-price fw-bold">
                  {product.price} $
                </span>
              </div>
              <span className="name-product fw-bold text-black details-text">COUNTRY : {product.currency}</span>
              <span className="name-product fw-bold text-black details-text">SOLD COUNT : {product.soldCount}</span>
              <span className="name-product fw-bold text-black details-text">CATEGORY: {product.category}</span>
            </div>
            <div className="w-100 h-50 p-4">
              <div className="w-100 h-100 flex-column d-flex justify-content-end align-items-start">
                <span className="name-product details-text fw-bold text-black">DESCRIPTION :</span>
                <p className="details-text name-product fw-bold text-black" style={{ fontSize: '10px' }}>{product.discription}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-100 bg-white px-3 pb-5">
        <AddBox product={product} sizes={sizes} />
      </div>
      <div className="row">
        {imageTwo && <img src={imageTwo} alt="" />}
      </div>
    </section>
  ) : null
);


  if (loading || !product) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <SquareLoader />
      </div>
    );
  }

  return (
    <>
      {content}

      <section
        className="w-100 flex-column d-flex justify-content-center align-items-center"
        style={{ position: "relative", backgroundColor: "white" }}
        ref={relatedRef}
      >
        <p className="p-5 mt-5 w-100 text-center text-black name-product" style={{ fontSize: "20px", fontWeight: "100" }}>
          RECOMMENDED PRODUCTS
        </p>
        <div className="container">
          <cardData.Provider value={{ data: smilerProducts }}>
            <Cards />
          </cardData.Provider>
        </div>
      </section>
    </>
  );
}
