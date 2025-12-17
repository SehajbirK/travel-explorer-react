import { db, wishlistCollection, addDoc, getDocs, deleteDoc, doc } from "../firebase";

// Add city to wishlist
export const addToWishlist = async (city) => {
  try {
    await addDoc(wishlistCollection, { city });
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// Get all wishlist cities
export const getWishlist = async () => {
  try {
    const snapshot = await getDocs(wishlistCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    return [];
  }
};

// Remove city from wishlist
export const removeFromWishlist = async (id) => {
  try {
    await deleteDoc(doc(db, "wishlist", id));
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
};
