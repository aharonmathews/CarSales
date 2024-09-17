// src/productViewService.js
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
// Function to log a product view
export const logProductView = async (productId) => {
  const productRef = doc(db, "productViews", productId);

  try {
    const docSnapshot = await getDoc(productRef);

    if (docSnapshot.exists()) {
      // If product exists, increment views
      await updateDoc(productRef, {
        views: docSnapshot.data().views + 1,
      });
    } else {
      // If it doesn't exist, create a new document with 1 view
      await setDoc(productRef, { views: 1 });
    }
  } catch (error) {
    console.error("Error logging product view:", error);
  }
};
export const fetchProductViews = async () => {
    const productViewsCollection = collection(db, "productViews");
  
    try {
      const querySnapshot = await getDocs(productViewsCollection);
      const productViews = querySnapshot.docs.map((doc) => ({
        productId: doc.id,
        ...doc.data(),
      }));
      return productViews;
    } catch (error) {
      console.error("Error fetching product views:", error);
      return [];
    }
  };