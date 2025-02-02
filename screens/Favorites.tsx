import React, { useEffect, useState, useContext } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { FavoriteContext } from "../FavoriteContext";

import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
    Cart: undefined;
    // Add other screens here if needed
};

type FavoriteScreenNavigationProp = StackNavigationProp<RootStackParamList, "Favorites">;

/*
    The Favorites component displays a list of favorite items.
*/
export function Favorites({ navigation }: { navigation: FavoriteScreenNavigationProp }) {
    const { items, getItemsCount } = useContext(FavoriteContext);

    function renderItem({
        item,
    }: {
        item: { product: { name: string; id: number } | undefined; qty: number; totalPrice: number };
    }) {
        return (
            <View style={styles.cartLine}>
                <Text style={styles.lineLeft}>
                    {item.product?.name ?? "Unknown"} x {item.qty}
                </Text>
                <Text style={styles.lineRight}>$ {item.totalPrice}</Text>
            </View>
        );
    }

    return (
        <FlatList
            style={styles.itemsList}
            contentContainerStyle={styles.itemsListContainer}
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.product?.id.toString() ?? Math.random().toString()}
        />
    );
}
const styles = StyleSheet.create({
    cartLine: {
        flexDirection: "row",
    },
    cartLineTotal: {
        flexDirection: "row",
        borderTopColor: "#dddddd",
        borderTopWidth: 1,
    },
    lineTotal: {
        fontWeight: "bold",
    },
    lineLeft: {
        fontSize: 20,
        lineHeight: 40,
        color: "#333333",
    },
    lineRight: {
        flex: 1,
        fontSize: 20,
        fontWeight: "bold",
        lineHeight: 40,
        color: "#333333",
        textAlign: "right",
    },
    itemsList: {
        backgroundColor: "#eeeeee",
    },
    itemsListContainer: {
        backgroundColor: "#eeeeee",
        paddingVertical: 8,
        marginHorizontal: 8,
    },
});
