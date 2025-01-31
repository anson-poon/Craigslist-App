// Skeleton Code Used and Modified
//Source URL: https://docs.expo.dev/router/introduction/


import { StyleSheet, Image, Platform, TextInput, Button, Pressable } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Link } from 'expo-router';

export default function ProfileHome() {


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

      

      <ThemedView style={styles.changeNavigationContainer}>

        <ThemedText type="title">Listing Management Tab</ThemedText>

        <Link href="/createlisting" asChild>
          <Pressable>
            <ThemedText>Create a Listing</ThemedText>
          </Pressable>
        </Link>

        <Link href="/findandbuylisting" asChild>
          <Pressable>
            <ThemedText>Find and Buy a Listing</ThemedText>
          </Pressable>
        </Link>

        <Link href="/viewandeditlisting" asChild>
          <Pressable>
            <ThemedText>View and Edit Your Active Listings</ThemedText>
          </Pressable>
        </Link>


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
  profilePhotoImage: {
    width: 150,
    height: 150,
    borderRadius: 60,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  changeNavigationContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
});
