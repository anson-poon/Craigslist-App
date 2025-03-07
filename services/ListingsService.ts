import { collection, getDocs, query, orderBy} from "firebase/firestore";
import { FIREBASE_DB } from "../firebaseConfig";
import { doc, getDoc, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";


/*
  ListingService is a collection of functions that interact with the Firestore database
*/

// Helper function to format listing data
const formatListing = (doc: any) => {
  const data = doc.data();
  return {
    id: doc.id,
    productName: data.productName,
    price: data.price,
    imageUrl: data.imageUrl,
    description: data.description,
    category: data.category,
    isNew: data.isNew,
    userID: data.userID,
    dateCreated: data.dateCreated ? data.dateCreated.toDate() : null,
    tags: data.tags || []
  };
};

/*
Creates a New Listing
  Source URL: https://firebase.google.com/docs/firestore/manage-data/add-data
  Timestamps Source URL: https://firebase.google.com/docs/reference/kotlin/com/google/firebase/Timestamp
*/
export async function createNewListing(listingSpecs: any) {
  try {

    /* Must turn on Firestore => Rules =>  allow write: if true; */
    const newlyCreatedListing = await addDoc(collection(FIREBASE_DB, "listings"), {
      productName: listingSpecs.productName,
      category: listingSpecs.category,
      description: listingSpecs.description,
      imageUrl: listingSpecs.imageUrl,
      isNew: listingSpecs.isNew,
      price: listingSpecs.price,
      userID: listingSpecs.userID,
      dateCreated: Timestamp.now(),
      tags: listingSpecs.tags || []
    });

    console.log("This item's listing ID is:", newlyCreatedListing.id);
    return newlyCreatedListing.id;

  } catch (error) {
    console.error("Issues created with your listing, please check again!", error);
    return null;
  }
}

/*
  Delete an Existing Listing
  Source URL: https://firebase.google.com/docs/firestore/manage-data/delete-data
*/
export async function deleteExistingListing(id: string) {
  try {
    await deleteDoc(doc(FIREBASE_DB, "listings", id));
    console.log("Deleted this listing:", id);

  } catch (error) {
    console.error("This listing does not exist!!", error);
  }
}


/*
  Update an Existing Listing 
  Source URL: https://firebase.google.com/docs/firestore/manage-data/add-data
*/
export async function updateExistingListing(id: string, updateThese: any) {
  try {
    await updateDoc(doc(FIREBASE_DB, "listings", id), updateThese);
    console.log(`Successfully updated listing id number ${id} and its data fields of`, updateThese);

  } catch (error) {
    console.error("This listing does not exist!!", error);
  }
}

/*
  Retrieves a list of all listings
  Returns an array of listing objects
*/
export async function getListingsList() {
  try {
    const listingsCol = collection(FIREBASE_DB, "listings");
    const listingsSnapshot = await getDocs(listingsCol);
    return listingsSnapshot.docs.map(formatListing);
  
  } catch (error) {
    console.error("Error fetching listings:", error);
    return [];
  }
}

/*
  Retrieves a listing by its ID
  Returns a listing object if the listing exists, otherwise it returns null.
*/
export async function getListingByID(id: string) {
  try {
    const listingDoc = doc(FIREBASE_DB, "listings", id);
    const listingSnapshot = await getDoc(listingDoc);

    if (listingSnapshot.exists()) {
      return formatListing(listingSnapshot);
    } else {
      console.warn(`Listing with ID ${id} not found.`);
      return null;
    }
  
  } catch (error) {
    console.error(`Error fetching listing with ID ${id}:`, error);
    return null;
  }
}

/*
  Retrieves a listing by its name
  Returns a listing object if the listing exists, otherwise it returns null.
*/
export async function getListingByName(name: string) {
  try {
    const listingsCol = collection(FIREBASE_DB, "listings");
    const listingsSnapshot = await getDocs(listingsCol);
    const listing = listingsSnapshot.docs.find((doc) =>
      doc.data().productName.toLowerCase().includes(name.toLowerCase())
    );
    if (listing) {
      return formatListing(listing);
    } else {
      console.warn(`Listing with name containing "${name}" not found.`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching listing with name containing "${name}":`, error);
    return null;
  }

}

import { where } from "firebase/firestore";

/*
  Retrieve listings by tag(s)
  Returns a list of listings with specified tags 
*/
export async function getListingsByTags(tag: string) {
  try {
    const listingsCol = collection(FIREBASE_DB, "listings");

    // Specified query 
    const thisQuery = query(listingsCol, where("tags", "array-contains", tag));

    const listingsSnapshot = await getDocs(thisQuery);
    return listingsSnapshot.docs.map(formatListing);
  
  } catch (error) {
    console.error(`No listing(s) found`, error);
    return [];
  }
}


/*
  Sort by Newest 
  Source URL: https://firebase.google.com/docs/firestore/query-data/order-limit-data
  Source URL: https://firebase.google.com/docs/firestore/query-data/get-data
*/

export async function getListingsListSortedByNewest() {
  try {
    const listingsCol = collection(FIREBASE_DB, "listings"); 

    // Specified query 
    const thisQuery = query(listingsCol, orderBy("dateCreated", "desc")); 

    const listingsSnapshot = await getDocs(thisQuery);
    return listingsSnapshot.docs.map(formatListing);

  } catch (error) {
    console.error("Error fetching sorted listings:", error);
    return [];
  }
}

/*
  Sort by Oldest
  Source URL: https://firebase.google.com/docs/firestore/query-data/order-limit-data
  Source URL: https://firebase.google.com/docs/firestore/query-data/get-data
*/
export async function getListingsListSortedByOldest() {
  try {
    const listingsCol = collection(FIREBASE_DB, "listings"); 

    // Specified query 
    const thisQuery = query(listingsCol, orderBy("dateCreated", "asc")); 

    const listingsSnapshot = await getDocs(thisQuery);
    return listingsSnapshot.docs.map(formatListing);

  } catch (error) {
    console.error("Error fetching sorted listings:", error);
    return [];
  }
}

/*
  Sort by Expensive
  Source URL: https://firebase.google.com/docs/firestore/query-data/order-limit-data
  Source URL: https://firebase.google.com/docs/firestore/query-data/get-data
*/
export async function getListingsListSortedByExpensive() {
  try {
    const listingsCol = collection(FIREBASE_DB, "listings"); 

    // Specified query
    const thisQuery = query(listingsCol, orderBy("price", "desc")); 

    const listingsSnapshot = await getDocs(thisQuery);
    return listingsSnapshot.docs.map(formatListing);

  } catch (error) {
    console.error("Error fetching sorted listings:", error);
    return [];
  }
}

/*
  Sort by Cheapest
  Source URL: https://firebase.google.com/docs/firestore/query-data/order-limit-data
  Source URL: https://firebase.google.com/docs/firestore/query-data/get-data
*/
export async function getListingsListSortedByCheapest() {
  try {
    const listingsCol = collection(FIREBASE_DB, "listings"); 

    // Specified query
    const thisQuery = query(listingsCol, orderBy("price", "asc")); 

    const listingsSnapshot = await getDocs(thisQuery);
    return listingsSnapshot.docs.map(formatListing);

  } catch (error) {
    console.error("Error fetching sorted listings:", error);
    return [];
  }
}


/////////////////////////// FILTER ///////////////////////////////////////////////////////////

/*
  Filtered by Hundred Dollars Plus
  Source URL: https://firebase.google.com/docs/firestore/query-data/order-limit-data
  Source URL: https://firebase.google.com/docs/firestore/query-data/get-data
*/

export async function getListingsListingsFilteredByHundredPlus() {
  try {
    const listingsCol = collection(FIREBASE_DB, "listings"); 

    // Specified query 
    const thisQuery = query(listingsCol, where("price", ">", 100));

    const listingsSnapshot = await getDocs(thisQuery);
    return listingsSnapshot.docs.map(formatListing);

  } catch (error) {
    console.error("Error fetching filtered listings:", error);
    return [];
  }
}

/*
  Filtered by Hundred Dollars Less
  Source URL: https://firebase.google.com/docs/firestore/query-data/order-limit-data
  Source URL: https://firebase.google.com/docs/firestore/query-data/get-data
*/

export async function getListingsListingsFilteredByHundredLess() {
  try {
    const listingsCol = collection(FIREBASE_DB, "listings"); 

    // Specified query 
    const thisQuery = query(listingsCol, where("price", "<", 100));

    const listingsSnapshot = await getDocs(thisQuery);
    return listingsSnapshot.docs.map(formatListing);

  } catch (error) {
    console.error("Error fetching sorted listings:", error);
    return [];
  }
}

/*
  Filtered by Used
  Source URL: https://firebase.google.com/docs/firestore/query-data/order-limit-data
  Source URL: https://firebase.google.com/docs/firestore/query-data/get-data
*/

export async function getListingsListFilteredByUsed() {
  try {
    const listingsCol = collection(FIREBASE_DB, "listings"); 

    // Specified query 
    const thisQuery = query(listingsCol, where("isNew", "==", false));

    const listingsSnapshot = await getDocs(thisQuery);
    return listingsSnapshot.docs.map(formatListing);

  } catch (error) {
    console.error("Error fetching sorted listings:", error);
    return [];
  }
}

/*
  Filtered by New
  Source URL: https://firebase.google.com/docs/firestore/query-data/order-limit-data
  Source URL: https://firebase.google.com/docs/firestore/query-data/get-data
*/

export async function getListingsListFilteredByNew() {
  try {
    const listingsCol = collection(FIREBASE_DB, "listings"); 

    // Specified query 
    const thisQuery = query(listingsCol, where("isNew", "==", true)); 

    const listingsSnapshot = await getDocs(thisQuery);
    return listingsSnapshot.docs.map(formatListing);

  } catch (error) {
    console.error("Error fetching sorted listings:", error);
    return [];
  }
}
