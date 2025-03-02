import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function UploadImage({ onImagePick }) {
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
                <TouchableOpacity onPress={pickImage}>
                    <Image source={{ uri: image }} style={style.image} />
                </TouchableOpacity>
            ) : (
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
        width: "90%",
        height: 300,
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
        width: 400,
        height: 280,
        resizeMode: "cover",
    },
});
