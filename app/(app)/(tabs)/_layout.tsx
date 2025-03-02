import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Animated, Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "react-native";

import { ListingsList } from "../../../screens/Browse";
import { ListingDetails } from "../../../screens/ListingDetails";
import { Favorites } from "../../../screens/Favorites";
import { UserProfile } from "../../../screens/UserProfile";
import { UserProfileSettings } from "../../../screens/UserProfileSettings";
import { CreateThisListing } from "../../../screens/CreateListing";
import { UploadImage } from "../../../screens/UploadImage";

import { useAuth } from "@/AuthContext";
import { getAuth, signOut } from "firebase/auth";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

// Stack Navigator for Browse
function BrowseStack() {
    const colorScheme = useColorScheme();
    const { user } = useAuth();

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
                    headerRight: () => (
                        <TouchableOpacity
                            style={styles.signOutButton}
                            onPress={() => {
                                const auth = getAuth();
                                signOut(auth);
                            }}
                        >
                            <Text style={styles.signOutButtonText}>Sign out</Text>
                        </TouchableOpacity>
                    ),
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
                        <TouchableOpacity
                            style={styles.settingsIcon}
                            onPress={() => navigation.navigate("UserProfileSettings")}
                        >
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
                headerShown: false,
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                tabBarLabelPosition: "below-icon",
                tabBarStyle: {
                    backgroundColor: colorScheme === "dark" ? "#181818" : "white",
                    height: 65,
                    paddingTop: 5,
                },
                animation: "shift",
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
                name="MyListings"
                component={Favorites} // To be replaced with My Listings component
                options={{
                    title: "My Listings",
                    tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
                    headerShown: true,
                }}
            />

            <Tab.Screen
                name="CreateListing"
                component={CreateThisListing}
                options={{
                    title: "Create Listing",
                    tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
                    headerShown: true,
                    headerTitleStyle: styles.headerTitle,
                }}
            />

            <Tab.Screen
                name="Chat"
                component={Favorites} // To be replaced with Chat component
                options={{
                    title: "Chat",
                    tabBarIcon: ({ color }) => <TabBarIcon name="comments" color={color} />,
                    headerShown: true,
                    headerTitleStyle: styles.headerTitle,
                }}
            />

            <Tab.Screen
                name="User"
                component={UserProfileStack}
                options={{
                    title: "User",
                    tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
                }}
            />

            <Tab.Screen
                name="UploadImage"
                component={UploadImage} // To be replaced with More component
                options={{
                    title: "Upload (Remove later)",
                    tabBarIcon: ({ color }) => <TabBarIcon name="image" color={color} />,
                    headerShown: true,
                    headerTitleStyle: styles.headerTitle,
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 20,
        fontWeight: "semibold",
        marginLeft: 10,
    },
    settingsIcon: {
        marginRight: 10,
    },
    signOutButton: {
        marginRight: 10,
        padding: 8,
        backgroundColor: "purple",
        borderRadius: 10,
    },
    signOutButtonText: {
        color: "white",
    },
});
