import {createContext, useReducer} from "react";

const UserProgressContext = createContext({
    progress: '',
    showCart: () => {
    },
    hideCart: () => {
    },
    showCheckout: () => {
    },
    hideCheckout: () => {
    }
});

const initialState = {
    progress: ''
}

function userProgressReducer(state, action) {
    switch (action.type) {
        case 'SHOW_CART':
            return {...state, progress: 'cart'};
        case 'HIDE_CART':
            return {...state, progress: ''};
        case 'SHOW_CHECKOUT':
            return {...state, progress: 'checkout'};
        case 'HIDE_CHECKOUT':
            return {...state, progress: ''};
        default:
            return state;
    }
}


export function UserProgressContextProvider({children}) {
    const [userProgress, dispatchUserProgressAction] = useReducer(userProgressReducer, initialState);

    function showCart() {
        dispatchUserProgressAction({
            type: 'SHOW_CART'
        })
    }

    function hideCart() {
        dispatchUserProgressAction({
            type: 'HIDE_CART',
        })
    }

    function showCheckout() {
        dispatchUserProgressAction({
            type: 'SHOW_CHECKOUT',
        })
    }

    function hideCheckout() {
        dispatchUserProgressAction({
            type: 'HIDE_CHECKOUT',
        })
    }

    const userProgressContext = {
        progress: userProgress.progress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    }

    return (
        <UserProgressContext.Provider value={userProgressContext}>
            {children}
        </UserProgressContext.Provider>
    )
}

export default UserProgressContext;