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

import AntDesign from '@expo/vector-icons/AntDesign';


import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function ProfileHome() {
  const products = [
    { id: '1', itemName: 'New Spatulas', itemImage: require('@/assets/images/e1.jpg') },
  ];



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
        <Link href="/item1edit">
        <AntDesign name="edit" size={24} color="white" />
        </Link>
      </ThemedView>

      <ThemedText style={styles.listingName}>{products[0].itemName}</ThemedText>

      <ThemedView style={styles.listingLayout}>

        

        <Image source={products[0].itemImage} style={styles.listingImage} />

      </ThemedView>

      <ThemedView style={styles.chatIcon }>
      <FontAwesome name="dollar" size={24} color="white" />
      <ThemedText> 50 </ThemedText>
      
      <Entypo name="chat" size={24} color="white" />
      <ThemedText> Message Dog Owner One </ThemedText>
      </ThemedView>


      <ThemedText style={styles.listingDescription}>This item I recently bought but I bought the wrong color. Brand new and never used!</ThemedText>
      
      
  
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
  },
  listingLayout: {
    flex: 1,  
    alignItems: 'center',  
    paddingVertical: 20,
  },
  listingName: {
    width: '45%',  
    marginVertical: 10, 
    marginHorizontal: 10, 
    alignItems: 'center',
    alignSelf: 'center',  
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: -50,
  },
  listingImage: {
    borderRadius: 40,
    width: 400,
    height: 400,
    resizeMode: 'cover',
  },
  listingDescription: {
    width: '45%',  
    marginVertical: 10, 
    marginHorizontal: 10, 
    alignItems: 'center',
    alignSelf: 'center',  
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  chatIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 10, 
    flexDirection: 'row',
    gap: 10,
  },
  messageSeller: {
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
    marginRight: 25,
  },
});
