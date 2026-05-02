import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { CartItem } from "../types/cart"
import type { Product } from "../types/product";

type CartContextType = {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    message: string | null;
    increaseQty: (id: number) => void;
    decreaseQty: (id: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => { // Wrapper Component
    const [cart, setCart] = useState<CartItem[]>(() => {
        const stored = localStorage.getItem("cart");
        return stored ? JSON.parse(stored) : [];
    });
    const [message, setMessage] = useState<string | null>(null);

    // Load from localStorage
    // useEffect(() => {
    //     const stored = localStorage.getItem("cart");
    //     if(stored) setCart(JSON.parse(stored));
    // }, []);


    // Save to localStorage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id );

            if(existing){
                return prev.map((item) => item.id === product.id ? {...item, quantity: item.quantity + 1} : item);
            }

            return [...prev, {...product, quantity: 1}];
        });

        // show message
        setMessage("Added to Cart");

        setTimeout(() => {
            setMessage(null);
        }, 2000);
    };

    const increaseQty = (id: number) => {
        setCart( prev => prev.map(item => item.id === id ? {...item, quantity: item.quantity + 1} : item));        
    };   

    const decreaseQty = (id: number) => {
        setCart( prev => prev.map(item => item.id === id ? {...item, quantity: item.quantity - 1} : item).filter(item => item.quantity > 0));
    };    

    const clearCart = () => {
        setCart([]);
    };

    return(
        <CartContext.Provider value={{cart, addToCart, message, increaseQty, decreaseQty, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if(!context) throw new Error("useCart must be inside CartProvider");
    return context;
};