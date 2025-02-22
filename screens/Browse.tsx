import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, useColorScheme } from "react-native";
import { Listing } from "../components/ListingCard";
import { getListingsList } from "../services/ListingsService";
import { NavigationProp } from "@react-navigation/native";

interface ListingItem {
    id: string;
    productName: string;
    price: number;
    category: string;
    description: string;
    imageUrl: any;
    isNew: boolean;
    userID: string;
    dateCreated: Date;
}

/*
    The ListingsList component displays a list of listings rerieved from ListingsService.
*/
export function ListingsList({ navigation }: { navigation: NavigationProp<any> }) {
    const [listings, setListings] = useState<ListingItem[]>([]);
    const colorScheme = useColorScheme() ?? "light";
    const styles = getStyles(colorScheme);

    useEffect(() => {
        (async () => {
            setListings(await getListingsList());
        })();
    }, []);

    return (
        <FlatList
            style={styles.productsList}
            contentContainerStyle={styles.productsListContainer}
            keyExtractor={(item) => item.id}
            data={listings}
            renderItem={({ item }) => (
                <Listing
                    id={item.id}
                    name={item.productName}
                    price={item.price}
                    image={item.imageUrl}
                    description={item.description}
                    category={item.category}
                    isNew={item.isNew}
                    onPress={() => navigation.navigate("ListingDetails", { listingId: item.id })}
                />
            )}
        />
    );
}

const getStyles = (colorScheme: "light" | "dark") => {
    const backgroundColor = { light: "#ffffff", dark: "#000000" };
    const textColor = { light: "#000000", dark: "#ffffff" };

    return StyleSheet.create({
        productsList: {
            backgroundColor: backgroundColor[colorScheme],
        },
        productsListContainer: {
            backgroundColor: backgroundColor[colorScheme],
            marginHorizontal: 14,
        },
    });
};
