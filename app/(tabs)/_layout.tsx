import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Animated, StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "react-native";

import { ListingsList } from "../../screens/Browse";
import { ListingDetails } from "../../screens/ListingDetails";
import { Favorites } from "../../screens/Favorites";
import { FavoritesIcon } from "../../components/FavoritesIcon";

// UserProfile UI to UserProfileSettings UI
import { UserProfile } from "../../screens/UserProfile";
import { UserProfileSettings } from "../../screens/UserProfileSettings";

import { CreateThisListing } from "../../screens/CreateListing"; // Added this import for creating a listing 

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

// Stack Navigator for UserProfile and UserProfileSettings 
function UserProfileStack() {

    return (
        <Stack.Navigator>

            {/* UserProfile.tsx screen */}
            <Stack.Screen
                name="UserProfile"
                component={UserProfile}
                options={({ navigation }) => ({
                    title: "User Profile Home",
                    headerTitleStyle: styles.headerTitle,
                    headerRight: () => (
                        <TouchableOpacity style={styles.settingsIcon} onPress={() => navigation.navigate("UserProfileSettings")}>
                            <FontAwesome name="cog" size={24} color="white" />
                        </TouchableOpacity>
                    ),
                })}
            />

            {/* UserProfileSettings.tsx screen*/}
            <Stack.Screen
                name="UserProfileSettings"
                component={UserProfileSettings}
                options={{
                    title: "Change Profile Settings",
                    headerTitleStyle: styles.headerTitle,
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
                name="User Profile and User Profile Settings"
                component={UserProfileStack} 
                options={{
                    title: "User",
                    tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
                }}
            />

            <Tab.Screen
                name="Create Listing"
                component={CreateThisListing}
                options={{
                    title: "Create",
                    tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
                }}
            />

        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 20,
    },
    settingsIcon: {
        marginRight: 10,
    },
});
