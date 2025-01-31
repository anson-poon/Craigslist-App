// Skeleton Code Used and Modified
//Source URL: https://docs.expo.dev/router/introduction/

import { StyleSheet, Image, Platform, FlatList, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Link } from 'expo-router';

// FlatList Class Use: https://reactnative.dev/docs/flatlist

export default function ProfileHome() {

  // Example products for placeholder UI view and const fundamentals
  // Source URL: https://reactnative.dev/docs/intro-react
  const products = [
    { id: '1', itemName: 'New Spatulas', itemImage: require('@/assets/images/e1.jpg') },
    { id: '2', itemName: 'Baking Set', itemImage: require('@/assets/images/e2.jpg') },
    { id: '3', itemName: 'Pots & Pans', itemImage: require('@/assets/images/e3.png') },
    { id: '4', itemName: 'Cooking Essentials', itemImage: require('@/assets/images/e4.jpg') },
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

        

      <ThemedView style={styles.listingLayout}>

              <ThemedView style={styles.titleContainer}>
                
                <ThemedText type="title">Dog Owner One's Active Listings </ThemedText>
                <ThemedText>Click to to view or edit the active listing!</ThemedText>
        
              </ThemedView>

              <FlatList
                data={products}

                keyExtractor={(item) => item.id}
                numColumns={2} 

                renderItem={({ item }) => (

                  // asChild for use and implementation
                  // Source URL: https://react-twc.vercel.app/docs/guides/as-child-prop
                  <Link 
                  href={{pathname: `/item1`, }} asChild
            
                >

                  <View style={styles.listingName}>

                    <Image source={item.itemImage} style={styles.listingImage} />
                    <ThemedText>{item.itemName}</ThemedText>

                  </View>

                  </Link>
                )}
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
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',  
    gap: 8,
    marginBottom: 10,
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
  },
  listingImage: {
    borderRadius: 40,
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
});
