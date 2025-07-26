import { Card, CardActionArea, CardMedia } from "@mui/material"
import { MdDone } from "react-icons/md"
import { Link } from "react-router-dom"
import FavBtn from "../commponads/favBtn"
import { useSelector } from "react-redux";

export default function FavoritePage() {
    const dataFromLocal = useSelector((state) => state.favorite.items);

    return (
        <>
            <header className=" vw-100 vh-100" style={{ backgroundImage: `url(https://i.pinimg.com/1200x/88/10/da/8810da114d2a535a612933b221128668.jpg)`,backgroundPosition: "top", backgroundSize: "cover" }}>
                <h1 className="text w-100 h-100 d-flex justify-content-center align-items-center">FAVORITES LIST</h1>
            </header>
            <section className="container py-5 mt-5">
                {dataFromLocal.length === 0 ?(
                <div className="col-12 d-flex flex-column justify-content-center align-items-center vh-100">
                    <h1 className="name-product text-center">YOUR FAVORITE LIST IS EMTY</h1>
                </div>)
                    :
                (<div className="row g-5 justify-content-center align-items-center">
                    {dataFromLocal.map((product) => {
                        return (
                        <div key={product.id} className="col-11 col-sm-6 col-lg-4 ">
                            <Card style={{ boxShadow: "none", width: "100%" }}>
                                <CardActionArea>
                                <Link className="link img-wrapper position-relative" to={"/details/product/" + product.id}>
                                    <CardMedia
                                        component="img"
                                        height="400"
                                        image={product.MainImage}
                                        alt={product.name}
                                        className="img-card"
                                    />
                                    </Link>
                                    <div className="px-3 py-2 d-flex flex-column justify-content-between align-items-center gap-2">
                                        <div className="d-flex justify-content-between align-items-center w-100">
                                            <p className="name-product p-0 m-0">{product.name}</p>
                                            <FavBtn data={product}/>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center w-100">
                                            <div className="w-50 h-50 d-flex justify-content-start align-items-center">
                                                <span className="price-product p-0 m-0 w-50">
                                                    {product.originalPrice}
                                                </span>
                                                <span className="name-product p-0 m-0 w-50" style={{ fontSize: "8px" }}>
                                                    {product.price} $
                                                </span>
                                            </div>
                                            <span
                                                className="name-product p-0 m-0 w-50 d-flex justify-content-end gap-1 align-items-center"
                                                style={{ fontSize: "8px" }}
                                            >
                                                <MdDone />{product.soldCount}
                                            </span>
                                        </div>
                                    </div>
                                </CardActionArea>
                            </Card>
                        </div>
                        )
                    })}
                </div>)
                }
            </section>
        </>
    )
}
