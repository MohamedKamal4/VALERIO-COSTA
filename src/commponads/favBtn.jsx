import { AiFillHeart } from "react-icons/ai";
import { addFavorite, removeFavorite } from "../features/favoriteSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function FavBtn({ data }) {
  const [isFav, setIsFav] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const localStorageData = localStorage.getItem("favorite");
    const parsedData = localStorageData ? JSON.parse(localStorageData) : [];
    const itemExists = parsedData.some((item) => item.id === data.id);
    setIsFav(itemExists);
  }, [data.id]);

    
  function handleFavBtn() {
    if (isFav) {
      dispatch(removeFavorite(data));
      setIsFav(false);
    } else {
      dispatch(addFavorite(data));
      setIsFav(true);
    }
  }

  return (
    <div
        role="button"
        tabIndex={0}
        className={`btn d-flex justify-content-center align-items-center ${isFav ? "text-danger" : "text-black"}`}
        onClick={handleFavBtn}
      >
        <AiFillHeart size={18} className="heart-icon"/>
    </div>
  );
}
