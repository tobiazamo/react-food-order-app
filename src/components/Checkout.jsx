import Modal from "./UI/Modal.jsx";
import {useContext} from "react";
import CartContext from "../store/CartContext.jsx";
import {currencyFormatter} from "../utils/priceFormatter.js";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const httpConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
}

export default function Checkout() {
    const cartContext = useContext(CartContext);
    const userProgressContext = useContext(UserProgressContext);

    const {
        data,
        isLoading: isSending,
        error,
        sendRequest,
        clearData
    } = useHttp('http://localhost:3000/orders', httpConfig);

    const cartTotalPrice = cartContext.items.reduce((totalPrice, item) => {
        return totalPrice + item.quantity * item.price;
    }, 0)

    function handleCloseCheckout() {
        userProgressContext.hideCheckout();
    }

    function handleOrderCompleted() {
        userProgressContext.hideCheckout();
        cartContext.clearCart();
        clearData();
    }

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const customerData = Object.fromEntries(formData.entries());

        sendRequest(
            JSON.stringify({
                order: {
                    items: cartContext.items,
                    customer: customerData
                }
            })
        );
    }

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleCloseCheckout}>Close</Button>
            <Button>Submit Order</Button>
        </>
    )

    if (isSending) {
        actions = <span>Sending order data...</span>
    }

    if (data && !error) {
        return (
            <Modal open={userProgressContext.progress === 'checkout'} onClose={handleCloseCheckout}>
                <h2>Success! Your order was created</h2>
                <p>All the details have been sent to your e-mail.</p>
                <p className="modal-actions">
                    <Button onClick={handleOrderCompleted}>Okay</Button>
                </p>
            </Modal>
        )
    }

    return (
        <Modal open={userProgressContext.progress === 'checkout'} onClose={handleCloseCheckout}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total amount: {currencyFormatter.format(cartTotalPrice)}</p>

                <Input
                    label="Full name"
                    type="text"
                    id="name"
                    required
                />

                <Input
                    label="E-Mail address"
                    type="email"
                    id="email"
                    required
                />

                <Input
                    label="Street"
                    type="text"
                    id="street"
                    required
                />
                <div className="control-row">
                    <Input
                        label="Postal Code"
                        type="text"
                        id="postal-code"
                        required
                    />
                    <Input
                        label="City"
                        type="text"
                        id="city"
                        required
                    />
                </div>
                {error && <Error title="Failed to submit order" message={error}/>}
                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    )
}