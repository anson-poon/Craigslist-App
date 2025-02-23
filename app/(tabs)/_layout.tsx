import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Animated, StyleSheet, Text } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "react-native";

import { ListingsList } from "../../screens/Browse";
import { ListingDetails } from "../../screens/ListingDetails";
import { Favorites } from "../../screens/Favorites";
import { FavoritesIcon } from "../../components/FavoritesIcon";

import { CreateThisListing } from "../../screens/CreateListing"; // Added this import for creating a listing 
import ProfileHome from "@/screens/UserProfile";
// import { EditThisListing } from "../../screens/EditListing"; // Added this import for edit a listing - placeholder
// import { deleteThisListing } from "../../screens/DeleteListing"; // Added this import for delete a listing - placeholder

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

// Stack Navigator for Browse
function BrowseStack() {
    const colorScheme = useColorScheme();

    return (
        <Stack.Navigator
            screenOptions={() => ({
                headerShown: true,
                headerStyle: {
                    backgroundColor: colorScheme === "dark" ? "#181818" : "white",
                    shadowOpacity: 0,
                    elevation: 0,
                },
                headerTintColor: Colors[colorScheme ?? "light"].text,
            })}
        >
            <Stack.Screen
                name="AllListings"
                component={ListingsList}
                options={({ navigation }) => ({
                    title: "All Listings",
                    headerTitleStyle: styles.headerTitle,
                    headerRight: () => <FavoritesIcon navigation={navigation} />,
                })}
            />

            <Stack.Screen
                name="ListingDetails"
                component={ListingDetails}
                options={{
                    title: "Item",
                    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
                    gestureEnabled: true,
                    gestureDirection: "horizontal",
                }}
            />
        </Stack.Navigator>
    );
}

// Bottom Tabs
export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                tabBarStyle: {
                    backgroundColor: colorScheme === "dark" ? "#181818" : "white",
                },
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={BrowseStack}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
                }}
            />

            <Tab.Screen
                name="Favorites"
                component={Favorites}
                options={{
                    title: "Favorites",
                    tabBarIcon: ({ color }) => <TabBarIcon name="star" color={color} />,
                }}
            />

            <Tab.Screen
                name="MyListings"
                component={Favorites} // To be replaced with My Listings component
                options={{
                    title: "My Listings",
                    tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
                }}
            />

            <Tab.Screen
                name="User Profile & Settings"
                component={ProfileHome} // To be replaced with user profile and settings component
                options={{
                    title: "User",
                    tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
                }}
            />

            <Tab.Screen
                name="Create Listing"
                component={CreateThisListing} // Attach the create a listing screen here, grab function to create a listing from CreateListing.tsx
                options={{
                    title: "Create",
                    tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
                }}
            />

            <Tab.Screen
                name="Update Listing"
                component={CreateThisListing} // Attach the edit a listing screen here, grab function to edit a listing from EditListing.tsx, Placeholder screen for now 
                options={{
                    title: "Update",
                    tabBarIcon: ({ color }) => <TabBarIcon name="pencil" color={color} />,
                }}
            />

            <Tab.Screen
                name="Delete Listing"
                component={CreateThisListing} // Attach the delete a listing screen here, grab function to create a listing from DeleteListing.tsx, Placeholderscreen for now 
                options={{
                    title: "Delete",
                    tabBarIcon: ({ color }) => <TabBarIcon name="eraser" color={color} />,
                }}
            />

        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 20,
    },
});
