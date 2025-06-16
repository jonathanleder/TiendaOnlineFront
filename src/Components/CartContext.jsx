import React from 'react'
import {createContext,useContext,useState,useEffect} from "react";

const CartContext= createContext();

export const CartProvider = ({children}) => {

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [showCartMenu, setShowCartMenu] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, quantity) => {
        const existingProduct = cart.find((item) => item.id === product.id);

        if (existingProduct) {
            const totalQuantity = existingProduct.quantity + quantity;

            if (totalQuantity > product.stock) {
                setErrorMessage(
                    `No hay suficiente producto en stock disponible, solo puedes agregar ${product.stock - existingProduct.quantity} unidades más`
                );
            } else {
                setCart(cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                ));
                setErrorMessage(""); // ✅ Borrar mensaje de error si todo está OK
            }
        } else {
            if (quantity > product.stock) {
                setErrorMessage(
                    `No hay suficiente producto en stock disponible, solo puedes agregar ${product.stock} unidades`
                );
            } else {
                setCart([...cart, { ...product, quantity }]);
                setErrorMessage(""); // ✅ También acá
            }
        }

        setShowCartMenu(true);
    };


    const increaseQuantity = (productId) => {
            setCart(cart.map((item) =>
                item.id === productId
                    ? {...item, quantity: item.quantity + 1}
                    : item)
            );
        }
    const decreaseQuantity = (productId) => {
        setCart(cart.map((item) =>
            item.id === productId && item.quantity >1
                ? {...item, quantity: item.quantity - 1}
                : item)
        );
    }
    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item.id !== productId));
    }
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
    }
    return (
        <CartContext.Provider value={
            {
                cart,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                clearCart,
                showCartMenu,
                setShowCartMenu,
                errorMessage,
                setErrorMessage,
            }
        }>{children}</CartContext.Provider>
    );
};


export const useCart = () => useContext(CartContext);