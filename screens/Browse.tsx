import React, { useEffect, useState } from "react";
import { View, Text, FlatList, RefreshControl, StyleSheet, useColorScheme, TouchableOpacity } from "react-native";
import { Listing } from "../components/ListingCard";
import { getListingsList } from "../services/ListingsService";
import { NavigationProp } from "@react-navigation/native";

// Source URL: https://callstack.github.io/react-native-paper/docs/components/Menu/
import { Menu, Divider, PaperProvider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";



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
    const [refreshing, setRefreshing] = useState(false);
    const colorScheme = useColorScheme() ?? "light";
    const styles = getStyles(colorScheme);

    // Flag when dropdown clicked 
    const [sortClicked, setSortClicked] = useState(false);
    const [filterClicked, setFilterClicked] = useState(false);


    useEffect(() => {
        (async () => {
            setListings(await getListingsList());
        })();
    }, []);

    // Refresh control for pull-to-refresh functionality
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(async () => {
            setListings(await getListingsList());
            setRefreshing(false);
        }, 2000);
    };

    return (

        <PaperProvider>
        <View>
            <View style={styles.sortLayout}>
                <Menu
                    visible={sortClicked}
                    onDismiss={() => setSortClicked(false)}
                    
                    anchor={
                        <TouchableOpacity style={styles.sortButton} onPress={() => setSortClicked(true)}>
                            <Icon name="unfold-more" size={30} color="black" />
                            <Text>Sort</Text>
                        </TouchableOpacity>
                    }
                >
                    <Menu.Item onPress={() => console.log("expensive")} title="Expensive" />
                    <Menu.Item onPress={() => console.log("cheapest")} title="Cheapest" />
                    <Menu.Item onPress={() => console.log("recent")} title="Recent" />
                    <Menu.Item onPress={() => console.log("oldest")} title="Oldest" />
                    <Divider />
                </Menu>

                <Menu
                    visible={filterClicked}
                    onDismiss={() => setFilterClicked(false)}
                    
                    anchor={
                        <TouchableOpacity style={styles.sortButton} onPress={() => setFilterClicked(true)}>
                            <Icon name="filter-list" size={30} color="black" />
                            <Text>Filter</Text>
                        </TouchableOpacity>
                    }
                >
                    <Menu.Item onPress={() => console.log("E then C")} title="Placeholder" />
                    
                    <Divider />
                </Menu>
            </View>
        
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
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={["grey"]}
                    progressBackgroundColor={"black"}
                />
            }
        />
        </View>
        </PaperProvider>
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
        sortLayout: {
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: 10,
            paddingBottom: 5, 
            gap: 10,
        },
        sortButton: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#00bfff",
            borderRadius: 10,
            minWidth: 70,  
            gap: 2,
        },
    });
};
