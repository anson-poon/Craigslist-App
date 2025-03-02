import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, useColorScheme } from "react-native";

import { createNewListing } from "../services/ListingsService";
import { Timestamp } from "firebase/firestore";
import UploadImage from "../components/UploadImage";
import { useAuth } from "../AuthContext";
import { useIsFocused } from "@react-navigation/native";

const getPresignedUrl = async (fileName: string, fileType: string) => {
    try {
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
            return uploadUrl.split("?")[0]; // Return the URL without the query parameters
        } else {
            console.error("Error uploading file:", s3Response);
        }
    } catch (error) {
        console.error("Error during S3 upload:", error);
    }
};

export function CreateThisListing() {
    const colorScheme = useColorScheme() ?? "light";
    const styles = getStyles(colorScheme);

    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileType, setFileType] = useState<string | null>(null);
    const [isNew, setIsNew] = useState(false);
    const [price, setPrice] = useState("");
    const [tags, setTags] = useState("");

    const { user } = useAuth();

    // Clear form when the screen is not focused
    const isFocused = useIsFocused();
    useEffect(() => {
        if (!isFocused) {
            setProductName("");
            setCategory("");
            setDescription("");
            setImageUri(null);
            setFileName(null);
            setFileType(null);
            setIsNew(false);
            setPrice("");
            setTags("");
        }
    }, [isFocused]);

    const handleImagePick = (uri: string, name: string, type: string) => {
        setImageUri(uri);
        setFileName(name);
        setFileType(type);
    };

    const createListing = async () => {
        if (imageUri && fileName && fileType) {
            const uploadUrl = await getPresignedUrl(fileName, fileType);

            if (uploadUrl) {
                const uploadedImageUrl = await uploadToS3(imageUri, uploadUrl);
                if (uploadedImageUrl) {
                    const numericPrice = Number(price);
                    const tagArr = tags.split(",");

                    createNewListing({
                        productName,
                        category,
                        description,
                        imageUrl: uploadedImageUrl,
                        isNew,
                        price: numericPrice,
                        userID: user?.uid || "",
                        tags: tagArr,
                        dateCreated: Timestamp.now(),
                    });

                    Alert.alert("Success", "Your listing has been created!"); // IOS and Android
                    alert("Your listing has been created!"); // Web
                }
            }
        } else {
            Alert.alert("Error", "Please select an image.");
            alert("Please select an image.");
        }
    };

    return (
        <TouchableOpacity style={styles.basicLayout}>
            <UploadImage onImagePick={handleImagePick} />

            <TextInput
                style={styles.textField}
                placeholder="Product Name"
                placeholderTextColor={styles.placeholderText.color}
                value={productName}
                onChangeText={setProductName}
            />

            <TextInput
                style={styles.textField}
                placeholder="Category"
                placeholderTextColor={styles.placeholderText.color}
                value={category}
                onChangeText={setCategory}
            />

            <TextInput
                style={styles.textField}
                placeholder="Description"
                placeholderTextColor={styles.placeholderText.color}
                value={description}
                onChangeText={setDescription}
            />

            <TextInput
                style={styles.textField}
                placeholder="Price"
                placeholderTextColor={styles.placeholderText.color}
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
            />

            <TextInput
                style={styles.textField}
                placeholder="Enter tags with commas i.e computer, laptop, desktop"
                placeholderTextColor={styles.placeholderText.color}
                value={tags}
                onChangeText={setTags}
            />

            <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Condition:</Text>

                <TouchableOpacity onPress={() => setIsNew(true)} style={styles.buttonLayout}>
                    <View style={[styles.buttonCircle, isNew && styles.optionPressed]} />
                    <Text style={styles.buttonText}>New</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setIsNew(false)} style={styles.buttonLayout}>
                    <View style={[styles.buttonCircle, !isNew && styles.optionPressed]} />
                    <Text style={styles.buttonText}>Used</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={createListing} style={styles.createButton}>
                <Text style={styles.createButtonText}>Create Listing</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const getStyles = (colorScheme: "light" | "dark") => {
    const backgroundColor = { light: "#ffffff", dark: "#000000" };
    const textColor = { light: "#000000", dark: "white" };
    const textFieldColor = { light: "#ffffff", dark: "#222222" };
    const placeholderTextColor = { light: "#000000", dark: "#888888" };
    const borderColor = { light: "#000000", dark: "#ffffff" };

    return StyleSheet.create({
        basicLayout: {
            alignItems: "center",
            height: "100%",
            width: "100%",
            backgroundColor: backgroundColor[colorScheme],
        },
        textField: {
            borderColor: borderColor[colorScheme],
            borderWidth: 1,
            marginBottom: 15,
            paddingHorizontal: 15,
            height: 40,
            width: "90%",
            borderRadius: 5,
            backgroundColor: textFieldColor[colorScheme],
            color: textColor[colorScheme],
        },
        buttonContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "90%",
        },
        buttonText: {
            fontSize: 15,
            marginRight: 10,
            color: textColor[colorScheme],
        },
        buttonLayout: {
            flexDirection: "row",
            alignItems: "center",
        },
        buttonCircle: {
            height: 20,
            width: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: borderColor[colorScheme],
            alignItems: "center",
            justifyContent: "center",
            marginRight: 8,
        },
        optionPressed: {
            backgroundColor: textColor[colorScheme],
        },
        placeholderText: {
            color: placeholderTextColor[colorScheme],
        },
        createButton: {
            backgroundColor: "purple",
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
        },
        createButtonText: {
            color: "white",
        },
    });
};
