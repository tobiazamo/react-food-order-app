import Modal from "./UI/Modal.jsx";
import {useContext} from "react";
import CartContext from "../store/CartContext.jsx";
import {currencyFormatter} from "../utils/priceFormatter.js";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
    const cartContext = useContext(CartContext);
    const userProgressContext = useContext(UserProgressContext);

    const cartTotalPrice = cartContext.items.reduce((totalPrice, item) => {
        return totalPrice + item.quantity * item.price;
    }, 0)

    function handleCloseCart() {
        userProgressContext.hideCart();
    }

    function handleGoToCheckout() {
        userProgressContext.showCheckout();
    }

    return (
        <Modal className="cart" open={userProgressContext.progress === 'cart'}
               onClose={userProgressContext.progress === 'cart' ? handleCloseCart : null}>
            <h2>Your cart</h2>
            <ul>
                {cartContext.items.map((item) =>
                    <CartItem
                        key={item.id}
                        {...item}
                        onDecrease={() => cartContext.removeItem(item.id)}
                        onIncrease={() => cartContext.addItem(item)}
                    />
                )}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotalPrice)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {cartContext.items.length > 0 && (
                    <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
                )}
            </p>
        </Modal>
    )
}