import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

// Function to get pre-signed URL from the backend
const getPresignedUrl = async (fileName: string, fileType: string) => {
    try {
        // Replace with your PC ip address
        const response = await fetch("http://192.168.1.153:8082/get-presigned-url", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ fileName, fileType }),
        });
        const data = await response.json();
        return data.uploadUrl;
    } catch (error) {
        console.error("Error fetching pre-signed URL:", error);
    }
};

// Function to upload the image to S3 using the pre-signed URL
const uploadToS3 = async (uri: string, uploadUrl: string) => {
    try {
        const response = await fetch(uri);
        const blob = await response.blob();
        const s3Response = await fetch(uploadUrl, {
            method: "PUT",
            headers: {
                "Content-Type": blob.type,
            },
            body: blob,
        });

        if (s3Response.ok) {
            console.log("File uploaded successfully");
        } else {
            console.error("Error uploading file:", s3Response);
        }
    } catch (error) {
        console.error("Error during S3 upload:", error);
    }
};

export function UploadImage() {
    const [image, setImage] = useState<string | null>(null);

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

            // Get the pre-signed URL
            const uploadUrl = await getPresignedUrl(fileName, fileType);

            // Upload the image to S3 using the pre-signed URL
            if (uploadUrl) {
                await uploadToS3(fileUri, uploadUrl);
            }
        }
    };

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            {image && <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />}
            <TouchableOpacity onPress={pickImage} style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 18, color: "blue" }}>Select Image</Text>
            </TouchableOpacity>
        </View>
    );
}
