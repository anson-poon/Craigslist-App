import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useIsFocused } from "@react-navigation/native";

interface UploadImageProps {
    onImagePick: (uri: string, fileName: string, fileType: string) => void;
}

export default function UploadImage({ onImagePick }: UploadImageProps) {
    const [image, setImage] = useState<string | null>(null);
    const isFocused = useIsFocused();

    // Clear image when the screen is not focused
    useEffect(() => {
        if (!isFocused) {
            setImage(null);
        }
    }, [isFocused]);

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
        <View style={style.container}>
            {image ? (
                // If an image is selected, display the image
                <TouchableOpacity onPress={pickImage}>
                    <Image source={{ uri: image }} style={style.image} />
                </TouchableOpacity>
            ) : (
                // If no image is selected, display the upload button
                <TouchableOpacity onPress={pickImage} style={style.uploadButton}>
                    <Text style={style.uploadText}>Select Image</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const style = StyleSheet.create({
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
        backgroundColor: "#444",
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
