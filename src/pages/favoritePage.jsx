import { Card, CardActionArea, CardMedia } from "@mui/material"
import { MdDone } from "react-icons/md"
import { Link } from "react-router-dom"
import FavBtn from "../commponads/favBtn"
import { useSelector } from "react-redux";

export default function FavoritePage() {
    const dataFromLocal = useSelector((state) => state.favorite.items);

    return (
        <>
            <section className="container py-5 mt-5">
                {dataFromLocal.length === 0 ?(
                <div className="col-12 d-flex flex-column justify-content-center align-items-center" style={{height: "100px"}}>
                    <h1 className="name-product text-center">YOUR FAVORITE LIST IS EMTY</h1>
                </div>)
                    :
                (<div className="row g-5 justify-content-center align-items-center" style={{paddingBottom: "300px"}}>
                    {dataFromLocal.map((product) => {
                        return (
                        <div key={product.id} className="col-11 col-sm-6 col-lg-4 ">
                            <Card style={{ boxShadow: "none", width: "80%" }}>
                                <CardActionArea>
                                <Link className="link img-wrapper position-relative" to={"/details/product/" + product.id}>
                                    <CardMedia
                                        component="img"
                                        height="300"
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
