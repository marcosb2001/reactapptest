import ItemCount from "./ItemCount"
import "../styles/Item.css"
import { Link } from "react-router-dom"
import Button from "./Button"
function Item({id, name, price, data}) {
    return  (
        <div className="card">
            <div className="card-detail">
                <h2>{name}</h2>
                <h5>${price}</h5>
                <p>{data}</p>
                <Link to={`/detalle/${id}`}>
                    <Button type text="ver más"></Button>
                </Link>
            </div>
        </div>
    )
}

export default Item