import { db, wishlistCollection, addDoc, getDocs, deleteDoc, doc } from "../firebase";
import { auth } from "../firebase";

export const addToWishlist = async (city) => {
  if (!auth.currentUser) {
    return { success: false, error: "Please log in to save to wishlist." };
  }

  try {
    await addDoc(wishlistCollection, {
      city,
      uid: auth.currentUser.uid
    });
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
};
