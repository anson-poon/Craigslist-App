// Skeleton Code Used and Modified
//Source URL: https://docs.expo.dev/router/introduction/


import { StyleSheet, Image, Platform, FlatList, View, TextInput } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Link } from 'expo-router';

// Filter Icon 
import Feather from '@expo/vector-icons/Feather';

// Sort A - Z and Z - A
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Sort by Relevance 
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Magnifying Glass 
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

// Need to tidy the user interface for a better sort and filter option 
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


      <ThemedView style={styles.magnifyingIcon }>
        <FontAwesome6 name="magnifying-glass" size={35} color="white" />
        <TextInput
          style={styles.textSearch}
          placeholder="Lets Search"
          placeholderTextColor="#ccc"
        />
      </ThemedView>

      
      <ThemedView style={styles.iconsContainer }> 
        <Link href="/credentials">
        <FontAwesome name="sort-alpha-asc" size={24} color="white" />
        </Link>

        <Link href="/credentials">
        <FontAwesome name="sort-alpha-desc" size={24} color="white" />
        </Link>
  

        <Link href="/credentials">
        <Feather name="filter" size={24} color="white" />
        </Link>


        <Link href="/credentials">
        <Feather name="filter" size={24} color="white" />
        </Link>


        <Link href="/credentials">
        <MaterialCommunityIcons name="sort-clock-ascending-outline" size={24} color="white" />
        </Link>


        <Link href="/credentials">
        <MaterialCommunityIcons name="sort-clock-descending-outline" size={24} color="white" />
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
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  iconsContainer: {
    position: 'absolute', 
    flexDirection: 'row',
    alignItems: 'center',
    top: 10, 
    right: 5, 
    gap: 5, 
  },
  magnifyingIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 10, 
    flexDirection: 'row',
    gap: 10,
  },
  textSearch: {
    alignItems: 'center',
    color: "white",
    top: 10, 
    fontSize: 30,
    marginLeft: 15,
    borderWidth: 3,  
    borderColor: 'white',  
    borderRadius: 20,  
    paddingHorizontal: 5,
    paddingVertical: 5, 
  },


});
