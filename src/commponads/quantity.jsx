import { AiOutlineMinus } from "react-icons/ai"; 
import { AiOutlinePlus } from "react-icons/ai"; 
export default function Quantity({count, setCount, product, inStock}) {
    return (
            <div className="d-flex w-50 justify-content-between align-items-center">
              <button className="btn"
                  disabled={count === 0} onClick={() => setCount(count - 1)}>
                    <AiOutlineMinus size={10} />
                  </button>
                  <input
                    className="count text-center border-0 bg-transparent"
                    style={{ fontSize: "12px" ,width: '30px'}}
                    readOnly
                    value={count}
                  />
                  <button
                    className="btn"
                    disabled={count === product.quantity || inStock === 0}
                    onClick={() => setCount(count + 1)}
                  >
                  <AiOutlinePlus size={10} />
              </button>
            </div>
    )
}