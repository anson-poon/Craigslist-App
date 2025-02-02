import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Listing } from "../components/ListingCard";
import { getListingsList } from "../services/ListingsService";
import { NavigationProp } from "@react-navigation/native";
import { insertSampleListings } from "../services/InsertSampleListings";

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

const styles = StyleSheet.create({
    productsList: {
        backgroundColor: "#f7f7f7",
    },
    productsListContainer: {
        backgroundColor: "#f7f7f7",
        marginHorizontal: 14,
    },
});
