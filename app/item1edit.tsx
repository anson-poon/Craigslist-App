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

// Created product with attributes based on schema 
export default function ProfileHome() {

  // useState function reference for use
  // Source URL: https://react.dev/reference/react/useState
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
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
        placeholder="Change Category"
        value={category}
        onChangeText={setCategory}
      />
    </ThemedView>

    <ThemedText>Description</ThemedText>
    <ThemedView style={styles.titleContainer}>
      <TextInput
        style={styles.inputText}
        placeholder="Change Description"
        value={description}
        onChangeText={setDescription}
      />
    </ThemedView>

    <ThemedText>Image URL</ThemedText>
    <ThemedView style={styles.titleContainer}>
      <TextInput
        style={styles.inputText}
        placeholder="Amazon S3 Query Here"
        value={image}
        onChangeText={setImage}
      />
    </ThemedView>

    <ThemedText>Price</ThemedText>
    <ThemedView style={styles.titleContainer}>
      <TextInput
        style={styles.inputText}
        placeholder="Change Price"
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
