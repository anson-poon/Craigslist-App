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

        <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Current Credentials</ThemedText>
        </ThemedView>
            <ThemedText>Current Username: johndoe </ThemedText>
            <ThemedText>Current Password: *****</ThemedText>

        <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Current About Me</ThemedText>
        </ThemedView>
            <ThemedText>Insert function to change about me here!</ThemedText>

        <ThemedView style={styles.titleContainer}>
              <ThemedText type="title">Current Photo</ThemedText>
        </ThemedView>
              <ThemedText>Insert function to change avatar photo here!</ThemedText>
      

        <Link href="/userprofile">
              <ThemedText type="link">Go back to user profile page!</ThemedText>
        </Link>

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
});
