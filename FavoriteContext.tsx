import React, { createContext, useState } from "react";
import { getListingsList, getListingByID } from "./services/ListingsService";

interface FavoriteItem {
    id: string;
    listing:
        | {
              id: string;
              name: string;
              price: number;
              image: any;
              description: string;
          }
        | undefined;
}

interface FavoriteContextType {
    items: FavoriteItem[];
    setItems: (items: FavoriteItem[]) => void;
    addItemToFavorite: (id: string) => void;
}

export const FavoriteContext = createContext<FavoriteContextType>({
    items: [],
    setItems: () => {},
    addItemToFavorite: () => {},
});

interface FavoriteProviderProps {
    children: React.ReactNode;
}

export function FavoriteProvider(props: FavoriteProviderProps) {
    const [items, setItems] = useState<
        {
            id: string;
            listing: { id: string; name: string; price: number; image: any; description: string } | undefined;
        }[]
    >([]);

    function addItemToFavorite(id: string) {
        // const listing = getListingByID(id);
        // setItems((prevItems) => {
        //     const item = prevItems.find((item) => item.id == id);
        //     if (!item) {
        //         return [
        //             ...prevItems,
        //             {
        //                 id,
        //                 listing,
        //             },
        //         ];
        //     }
        // });
        return null;
    }

    return (
        <FavoriteContext.Provider value={{ items, setItems, addItemToFavorite }}>
            {props.children}
        </FavoriteContext.Provider>
    );
}
