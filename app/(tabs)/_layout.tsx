import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable } from "react-native";

import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

import { ListingsList } from "../../screens/Browse";
import { ListingDetails } from "../../screens/ListingDetails";
import { Favorites } from "../../screens/Favorites";
import { FavoritesIcon } from "../../components/FavoritesIcon";

const Stack = createBottomTabNavigator();

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Stack.Navigator
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                headerShown: useClientOnlyValue(false, true),
            }}
        >
            <Stack.Screen
                name="All Listings"
                component={ListingsList}
                options={({ navigation }) => ({
                    title: "All Listings",
                    headerTitleStyle: styles.headerTitle,
                    headerRight: () => <FavoritesIcon navigation={navigation} />,
                    tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
                })}
            />
            <Stack.Screen
                name="Favorites"
                component={Favorites}
                options={{
                    title: "Favorites",
                    tabBarIcon: ({ color }) => <TabBarIcon name="star" color={color} />,
                }}
            />
            <Stack.Screen
                name="My Listings"
                component={Favorites}
                options={{
                    title: "My Listings",
                    tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
                }}
            />
            <Stack.Screen
                name="Setting"
                component={Favorites}
                options={{
                    title: "User",
                    tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
                }}
            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 20,
    },
});
