import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable } from "react-native";

import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

import { ProductsList } from "../../screens/ProductsList";
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
                name="Products"
                component={ProductsList}
                options={({ navigation }) => ({
                    title: "Products",
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
                name="Chat"
                component={Favorites}
                options={{
                    title: "Chat",
                    tabBarIcon: ({ color }) => <TabBarIcon name="comments" color={color} />,
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
