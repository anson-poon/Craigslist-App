// Skeleton Code Used and Modified
//Source URL: https://docs.expo.dev/router/introduction/

import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Link } from 'expo-router';
import { TextInput } from 'react-native';
import { useState } from 'react';

// Create product with attributes based on schema 
export default function ProfileHome() {

  // useState function reference for use: https://react.dev/reference/react/useState
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [relavance, setRelavance] = useState('');
  const [price, setPrice] = useState('');
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>

    <ThemedText>Category</ThemedText>

    <ThemedView style={styles.titleContainer}>
      <TextInput
        style={styles.inputText}
        placeholder="Create Category Query"
        value={category}
        onChangeText={setCategory}
      />
    </ThemedView>

    <ThemedText>Date Created</ThemedText>
    <ThemedView style={styles.titleContainer}>
      <TextInput
        style={styles.inputText}
        placeholder="Create Date Query"
        value={date}
        onChangeText={setDate}
      />
    </ThemedView>

    <ThemedText>Description</ThemedText>
    <ThemedView style={styles.titleContainer}>
      <TextInput
        style={styles.inputText}
        placeholder="Create Description Query"
        value={description}
        onChangeText={setDescription}
      />
    </ThemedView>

    <ThemedText>Image URL</ThemedText>
    <ThemedView style={styles.titleContainer}>
      <TextInput
        style={styles.inputText}
        placeholder="Amazon S3 Image Management"
        value={image}
        onChangeText={setImage}
      />
    </ThemedView>

    <ThemedText>New or Old Item</ThemedText>
    <ThemedView style={styles.titleContainer}>
      <TextInput
        style={styles.inputText}
        placeholder="Boolean Value"
        value={relavance}
        onChangeText={setRelavance}
      />
    </ThemedView>

    <ThemedText>Price</ThemedText>
    <ThemedView style={styles.titleContainer}>
      <TextInput
        style={styles.inputText}
        placeholder="Create Price Query"
        value={price}
        onChangeText={setPrice}
      />
    </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  inputText: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    color: 'white',
  },
});
