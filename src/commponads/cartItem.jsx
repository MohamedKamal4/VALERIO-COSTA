import { Link } from "react-router-dom";

export default function CartItem({ item }) {
  return (
    <div key={`${item.productData.id}-${item.size}`} className="col-12 d-flex p-3" style={{ height: "400px" }}>
        <div className="w-50 h-100 d-flex justify-content-center align-items-center">
                <Link to={`/details/product/${item.productData.id}`} className="link img-wrapper position-relative"
                style={{ objectFit: "cover", height: "100%", width: "60%" }}
                >
                <img
                    className="img-fluid"
                    style={{ objectFit: "cover", height: "100%", width: "100%" }}
                    src={item.productData.MainImage}
                    alt={item.productData.name}
                    />      
            </Link>
        </div>
        <div className="w-50 gap-2 d-flex flex-column justify-content-center">
        <h5 className="name-product" style={{ fontSize: "20px", fontWeight: "100" }}>{item.productData.name}</h5>
        <p className="name-product">SIZE : {item.size}</p>
        <p className="name-product">QUANTITY : {item.quantity}</p>
        <p className="name-product">PRICE : ${item.productData.price}</p>
        <p className="name-product">TOTAL: {(item.productData.price * item.quantity).toFixed(2)}$</p>
        </div>
    </div>
  );
}
