
import { useContext } from "react"
import { CartContext } from "./CartContext"
import CartItem from "./CartItem"
import  { Link } from "react-router-dom"
import UserForm from "./UserForm"
export default function CartView() {

    const {cart, clearCart} = useContext(CartContext)

    let totalQuantity = 0
    cart.map(item => {
        totalQuantity += item.quantity
        return 0;
    })

    let totalPrice = 0 
    cart.map(item => {
        totalPrice += item.price*item.quantity
        return 0;
    })
    return (
        
    <div>
    <h1>carrito</h1>
    <button onClick={clearCart}>vaciar carrito</button>
    {totalQuantity > 0 ?
    <p>cantidad de items: {totalQuantity}</p>
    : <p></p> }
    <br />
    <Link to="/">
        <button>home</button>
    </Link>
    
    { cart.length > 0 ? (
    cart.map(cartProduct => {
        return(

        <div>
        <CartItem
        key={cartProduct.key}
        id={cartProduct.id}
        name={cartProduct.name}
        price={cartProduct.price}
        quantity={cartProduct.quantity}
        total={cartProduct.quantity*cartProduct.price}
        />

        <h3>Precio total: ${totalPrice}</h3>

        <UserForm cart={cart}/>
        </div>
        )
        })
        
        ) : (
            <p>El carrito está vacío.</p>
        )}

</div>
    )
}