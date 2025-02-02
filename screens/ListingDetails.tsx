import React, { useEffect, useState, useContext } from "react";
import { Text, Image, View, ScrollView, SafeAreaView, Button, StyleSheet } from "react-native";
import { getListingByID } from "../services/ListingsService.js";
import { FavoriteContext } from "../FavoriteContext";
import { RouteProp } from "@react-navigation/native";

type ListingDetailsProps = {
    route: RouteProp<{ ListingDetails: { listingId: string } }, "ListingDetails">;
};

export function ListingDetails({ route }: ListingDetailsProps) {
    const { listingId } = route.params;
    const [Listing, setListing] = useState<{
        id: string;
        image: any;
        name: string;
        price: number;
        description: string;
    } | null>(null);

    const { addItemToFavorite } = useContext(FavoriteContext);

    useEffect(() => {
        async function fetchListing() {
            const fetchedListing = await getListingByID(listingId); // Make sure to await the promise
            if (fetchedListing) {
                setListing({
                    id: fetchedListing.id,
                    image: fetchedListing.imageUrl,
                    name: fetchedListing.productName,
                    price: fetchedListing.price,
                    description: fetchedListing.description,
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

    return (
        <SafeAreaView>
            <ScrollView>
                {Listing && (
                    <>
                        <Image style={styles.image} source={Listing.image} />
                        <View style={styles.infoContainer}>
                            <Text style={styles.name}>{Listing.name}</Text>
                            <Text style={styles.price}>$ {Listing.price}</Text>
                            <Text style={styles.description}>{Listing.description}</Text>
                            <Button onPress={onAddToFavorite} title="Add to favorite" />
                        </View>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderRadius: 16,
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowColor: "black",
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 1,
        marginVertical: 20,
    },
    image: {
        height: 300,
        width: "100%",
    },
    infoContainer: {
        padding: 16,
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
    },
    price: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        fontWeight: "400",
        color: "#787878",
        marginBottom: 16,
    },
});
