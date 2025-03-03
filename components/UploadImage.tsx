import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useColorScheme } from "react-native";
import { useIsFocused } from "@react-navigation/native";

interface UploadImageProps {
    onImagePick: (uri: string, fileName: string, fileType: string) => void;
    clearImageTrigger?: boolean;
}

export default function UploadImage({ onImagePick, clearImageTrigger }: UploadImageProps) {
    const colorScheme = useColorScheme() ?? "light";
    const styles = getStyles(colorScheme);
    const [image, setImage] = useState<string | null>(null);
    const isFocused = useIsFocused();

    // Clear image when the screen is not focused
    useEffect(() => {
        if (!isFocused) {
            setImage(null);
        }
    }, [isFocused]);

    // Clear image when the clearImageTrigger changes
    useEffect(() => {
        if (clearImageTrigger) {
            setImage(null); // Reset the image state
        }
    }, [clearImageTrigger]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const fileUri = result.assets[0].uri;
            setImage(fileUri);
            const fileName = `${new Date().getTime()}-${result.assets[0].uri.split("/").pop()}`;
            const fileType = result.assets[0].type || "image/jpeg";

            onImagePick(fileUri, fileName, fileType);
        }
    };

    return (
        <View style={styles.container}>
            {image ? (
                // If an image is selected, display the image
                <TouchableOpacity onPress={pickImage}>
                    <Image source={{ uri: image }} style={styles.image} />
                </TouchableOpacity>
            ) : (
                // If no image is selected, display the upload button
                <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
                    <Text style={styles.uploadText}>Select Image</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const getStyles = (colorScheme: "light" | "dark") => {
    const backgroundColor = { light: "#999", dark: "#444" };

    return StyleSheet.create({
        container: {
            justifyContent: "center",
            alignItems: "center",
            width: Dimensions.get("window").width * 0.9,
            height: Dimensions.get("window").width * 0.75,
            marginTop: 20,
            marginBottom: 20,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#ddd",
            backgroundColor: backgroundColor[colorScheme],
        },
        uploadButton: {
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            borderRadius: 10,
            backgroundColor: "#f0f0f0",
        },
        uploadText: {
            color: "#888",
        },
        image: {
            width: Dimensions.get("window").width * 0.9,
            height: Dimensions.get("window").width * 0.75,
            resizeMode: "cover",
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "#ddd",
        },
    });
};
