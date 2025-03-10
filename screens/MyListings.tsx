import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, useColorScheme, ToastAndroid, Platform, Alert } from "react-native";
import { ListingHorizontal } from "../components/ListingCardHorizontal";
import { getListsListByUserID } from "../services/ListingsService";
import { NavigationProp } from "@react-navigation/native";
import { useAuth } from "@/AuthContext";

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
    The ListingsList component displays a list of user's listings rerieved from ListingsService.
*/
export function MyListingsList({ navigation }: { navigation: NavigationProp<any> }) {
    const [listings, setListings] = useState<ListingItem[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const colorScheme = useColorScheme() ?? "light";
    const styles = getStyles(colorScheme);

    const { user } = useAuth();

    useEffect(() => {
        (async () => {
            setListings(await getListsListByUserID(user?.uid || ""));
        })();
    }, []);

    // Refresh control for pull-to-refresh functionality
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(async () => {
            setListings(await getListsListByUserID(user?.uid || ""));
            setRefreshing(false);
        }, 2000);

        const msg = "Listings refreshed";
        if (Platform.OS === "android") {
            ToastAndroid.show(msg, ToastAndroid.SHORT);
        } else {
            Alert.alert(msg);
        }
    };

    return (
        <FlatList
            style={styles.productsList}
            contentContainerStyle={styles.productsListContainer}
            keyExtractor={(item) => item.id}
            data={listings}
            renderItem={({ item }) => (
                <ListingHorizontal
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
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={["grey"]}
                    progressBackgroundColor={"black"}
                />
            }
        />
    );
}

const getStyles = (colorScheme: "light" | "dark") => {
    const backgroundColor = { light: "#ffffff", dark: "#000000" };

    return StyleSheet.create({
        productsList: {
            backgroundColor: backgroundColor[colorScheme],
            marginTop: 2,
        },
        productsListContainer: {
            backgroundColor: backgroundColor[colorScheme],
            marginHorizontal: 14,
        },
    });
};
