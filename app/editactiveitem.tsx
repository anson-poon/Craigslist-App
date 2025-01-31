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



import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AsyncStorage from 'react-native';


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
      <ThemedView style={styles.settingsIcon}>
        <Link href="/credentials">
        <FontAwesome6 name="user-gear" size={24} color="white" />
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
  settingsIcon: {
    position: 'absolute', 
    top: 10, 
    right: 2, 
  }
});
