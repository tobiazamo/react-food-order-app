import logo from '../assets/logo.jpg';
import Button from "./UI/Button.jsx";
import {useContext} from "react";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Header() {
    const cartContext = useContext(CartContext);
    const userProgressContext = useContext(UserProgressContext);

    const numberOfItemsInCart = cartContext.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity
    }, 0);

    function handleShowCart() {
        userProgressContext.showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt="Food order app logo"/>
                <h1>React food order app</h1>
            </div>
            <nav className="App-nav">
                <Button textOnly onClick={handleShowCart}>Cart ({numberOfItemsInCart})</Button>
            </nav>
        </header>
    )
}