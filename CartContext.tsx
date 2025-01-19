import React, { createContext, useState } from "react";
import { getProduct } from "./services/ProductsService";

interface CartItem {
    id: number;
    qty: number;
    product: { id: number; name: string; price: number; image: any; description: string } | undefined;
    totalPrice: number;
}

interface CartContextType {
    items: CartItem[];
    setItems: (items: CartItem[]) => void;
    getItemsCount: () => number;
    addItemToCart: (id: number) => void;
    getTotalPrice: () => number;
}

export const CartContext = createContext<CartContextType>({
    items: [],
    setItems: () => {},
    getItemsCount: () => 0,
    addItemToCart: () => {},
    getTotalPrice: () => 0,
});

interface CartProviderProps {
    children: React.ReactNode;
}

export function CartProvider(props: CartProviderProps) {
    const [items, setItems] = useState<
        {
            id: number;
            qty: number;
            product: { id: number; name: string; price: number; image: any; description: string } | undefined;
            totalPrice: number;
        }[]
    >([]);

    function addItemToCart(id: number) {
        const product = getProduct(id);
        setItems((prevItems) => {
            const item = prevItems.find((item) => item.id == id);
            if (!item) {
                return [
                    ...prevItems,
                    {
                        id,
                        qty: 1,
                        product,
                        totalPrice: product ? product.price : 0,
                    },
                ];
            } else {
                return prevItems.map((item) => {
                    if (item.id == id) {
                        item.qty++;
                        item.totalPrice += product ? product.price : 0;
                    }
                    return item;
                });
            }
        });
    }
    function getItemsCount() {
        return items.reduce((sum, item) => sum + item.qty, 0);
    }

    function getTotalPrice() {
        return items.reduce((sum, item) => sum + item.totalPrice, 0);
    }

    return (
        <CartContext.Provider value={{ items, setItems, getItemsCount, addItemToCart, getTotalPrice }}>
            {props.children}
        </CartContext.Provider>
    );
}
