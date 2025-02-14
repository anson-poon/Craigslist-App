import React, { useEffect, useState, useContext } from "react";
import { Text, Image, View, ScrollView, SafeAreaView, StyleSheet, Button, TouchableOpacity } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import moment from "moment";

import { getListingByID } from "../services/ListingsService";
import { FavoriteContext } from "../FavoriteContext";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";

export function ListingDetails() {
    const route = useRoute<RouteProp<{ ListingDetails: { listingId: string } }, "ListingDetails">>();
    const { listingId } = route.params;
    const [Listing, setListing] = useState<{
        id: string;
        productName: string;
        image: any;
        price: number;
        description: string;
        imageUrl: string;
        category: string;
        isNew: boolean;
        userID: string;
        dateCreated: Date | null;
    } | null>(null);

    const { addItemToFavorite } = useContext(FavoriteContext);
    const navigation = useNavigation();

    useEffect(() => {
        async function fetchListing() {
            const fetchedListing = await getListingByID(listingId);
            if (fetchedListing) {
                setListing({
                    id: fetchedListing.id,
                    productName: fetchedListing.productName,
                    image: fetchedListing.imageUrl,
                    price: fetchedListing.price,
                    description: fetchedListing.description,
                    imageUrl: fetchedListing.imageUrl,
                    category: fetchedListing.category,
                    isNew: fetchedListing.isNew,
                    userID: fetchedListing.userID,
                    dateCreated: fetchedListing.dateCreated,
                });
            }
        }
        fetchListing();
    }, [listingId]);

    function onAddToFavorite() {
        if (Listing) {
            addItemToFavorite(Listing.id);
        }
    }

    const daysAgo = Listing && Listing.dateCreated ? moment().diff(moment(Listing.dateCreated), "days") : 0;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {Listing && (
                    <View style={styles.mainContent}>
                        {/* Image */}
                        <Animated.View entering={FadeIn.duration(500)}>
                            <Image style={styles.image} source={{ uri: Listing.imageUrl }} />
                        </Animated.View>

                        {/* Product Info */}
                        <Animated.View entering={FadeIn.duration(300)}>
                            <View style={styles.infoContainer}>
                                <Text style={styles.name}>{Listing.productName}</Text>

                                <View style={styles.rowContainer}>
                                    <Text style={styles.price}>${Listing.price.toFixed(2)}</Text>
                                    {/* Add to Favorite Button */}
                                    <TouchableOpacity style={styles.addToFavorite} onPress={onAddToFavorite}>
                                        <Text style={{ color: "white" }}>Add to Favorite</Text>
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.category}>Category: {Listing.category}</Text>
                                <Text style={styles.date}>
                                    Listed on:{" "}
                                    {Listing.dateCreated ? moment(Listing.dateCreated).format("MMM D, YYYY") : "N/A"} (
                                    {daysAgo} {daysAgo === 1 ? "day" : "days"} ago)
                                </Text>
                                <Text style={styles.date}></Text>
                                <Text style={styles.description}>Condition: {Listing.isNew ? "New" : "Used"}</Text>
                                <Text style={styles.description}>{Listing.description}</Text>
                            </View>
                        </Animated.View>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7f7f7",
    },
    scrollContainer: {
        paddingBottom: 20,
        alignItems: "center",
    },
    mainContent: {
        width: "100%",
    },
    backButton: {
        padding: 10,
        backgroundColor: "black",
        borderRadius: 8,
        marginLeft: 10,
        marginBottom: 10,
        width: 35,
    },
    backButtonText: {
        color: "white",
        fontSize: 18,
    },
    image: {
        height: 300,
    },
    infoContainer: {
        padding: 16,
        alignItems: "flex-start",
        backgroundColor: "white",
        height: "100%",
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
    addToFavorite: {
        backgroundColor: "orange",
        color: "white",
        padding: 8,
        borderRadius: 8,
        fontWeight: "bold",
        marginLeft: 30,
        marginBottom: 20,
    },
    price: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 20,
    },
    category: {
        fontSize: 16,
        color: "#555",
        marginBottom: 8,
    },
    date: {
        fontSize: 14,
        color: "#777",
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16, // Add space after the row
    },
});
