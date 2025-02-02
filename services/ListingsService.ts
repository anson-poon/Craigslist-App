import { collection, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

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
  };
};

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