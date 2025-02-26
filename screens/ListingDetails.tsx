import React, { useEffect, useState, useContext } from "react";
import { Image, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { FadeIn, useSharedValue } from "react-native-reanimated";
import moment from "moment";
import { getListingByID } from "../services/ListingsService";
import { FavoriteContext } from "../FavoriteContext";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useColorScheme } from "react-native";
import { Text, View } from "@/components/Themed";

/*
    The ListingDetails component show the details of a listing in a dedicated screen.
    It also allows the user to add the listing to their favorites.
*/
export function ListingDetails() {
    const { listingId } = useRoute<RouteProp<{ ListingDetails: { listingId: string } }, "ListingDetails">>().params;
    const { addItemToFavorite } = useContext(FavoriteContext);
    const colorScheme = useColorScheme();
    const styles = getStyles(colorScheme ?? "light");

    // Listing
    const [listing, setListing] = useState<null | {
        id: string;
        productName: string;
        imageUrl: string;
        price: number;
        description: string;
        category: string;
        isNew: boolean;
        userID: string;
        dateCreated: Date | null;
        tags: string[]; 
    }>(null);

    useEffect(() => {
        async function fetchListingData() {
            try {
                const fetchedListing = await getListingByID(listingId);
                if (fetchedListing) {
                    setListing(fetchedListing);
                }
            } catch (error) {
                console.error("Error fetching listing data:", error);
            }
        }

        fetchListingData();
    }, [listingId]);

    // Favorite
    const [isFavorite, setIsFavorite] = useState(false);

    const onAddToFavorite = () => {
        setIsFavorite(!isFavorite);
        if (!isFavorite) {
            addItemToFavorite(listing?.id || "");
        }
    };

    // Days calculation
    const daysAgo = listing && listing.dateCreated ? moment().diff(moment(listing.dateCreated), "days") : 0;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {listing && (
                    <View style={styles.mainContent}>
                        {/* Image */}
                        <Animated.View entering={FadeIn.duration(400)}>
                            <Image style={styles.image} source={{ uri: listing.imageUrl }} />
                        </Animated.View>

                        {/* Add to Favorite */}
                        <TouchableOpacity
                            style={[styles.addToFavorite, { backgroundColor: isFavorite ? "purple" : "gray" }]}
                            onPress={onAddToFavorite}
                        >
                            <Icon name="heart" size={25} color="white" style={{ marginTop: 2 }} />
                        </TouchableOpacity>

                        {/* Product Info */}
                        <Animated.View entering={FadeIn.duration(300)}>
                            <View style={styles.infoContainer}>
                                <Text style={styles.name}>{listing.productName}</Text>
                                <Text style={styles.price}>${listing.price.toFixed(2)}</Text>
                                <Text style={styles.category}>Category: {listing.category}</Text>
                                <Text style={styles.date}>
                                    Listed on:{" "}
                                    {listing.dateCreated ? moment(listing.dateCreated).format("MMM D, YYYY") : "N/A"} (
                                    {daysAgo} {daysAgo === 1 ? "day" : "days"} ago)
                                </Text>

                                <Text style={styles.description}>Condition: {listing.isNew ? "New" : "Used"}</Text>
                                <Text style={styles.description}>{listing.description}</Text>
                                <Text style={styles.description}>{listing.tags.join(", ")}</Text>

                            </View>
                        </Animated.View>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const getStyles = (colorScheme: "dark" | "light") => {
    const backgroundColor = { light: "#ffffff", dark: "#000000" };
    const textColor = { light: "#000000", dark: "#ffffff" };

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: backgroundColor[colorScheme],
        },
        scrollContainer: {
            paddingBottom: 20,
            alignItems: "center",
        },
        mainContent: {
            width: "100%",
            backgroundColor: backgroundColor[colorScheme],
        },
        image: {
            height: 300,
            width: "100%",
        },
        infoContainer: {
            padding: 16,
            alignItems: "flex-start",
            width: "100%",
            backgroundColor: backgroundColor[colorScheme],
        },
        name: {
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 8,
            color: textColor[colorScheme],
        },
        rowContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
        },
        price: {
            fontSize: 20,
            fontWeight: "600",
            marginBottom: 10,
            color: textColor[colorScheme],
        },
        category: {
            fontSize: 16,
            marginBottom: 8,
            color: colorScheme === "dark" ? "darkgray" : "#555",
        },
        date: {
            fontSize: 14,
            marginBottom: 8,
            color: colorScheme === "dark" ? "darkgray" : "#777",
        },
        description: {
            fontSize: 16,
            marginBottom: 8,
            color: textColor[colorScheme],
        },
        addToFavorite: {
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            top: 20,
            right: 20,
            width: 50,
            height: 50,
            backgroundColor: "orange",
            borderRadius: 30,
            zIndex: 1,
        },
    });
};
