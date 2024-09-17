
import { collection, addDoc, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from './firebase'; // Import Firestore and Storage instance
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; 

// Function to upload a file to Firebase Storage and return the download URL
async function uploadFile(file) {
  const storageRef = ref(storage, `vehicles/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}

// Function to add a new vehicle to Firestore
export const addVehicleToFirestore = async (vehicle) => {
  try {
    // Upload images to Storage if present, store download URLs
    const imageURLs = [];
    if (vehicle.images && vehicle.images.length > 0) {
      for (const image of vehicle.images) {
        const downloadURL = await uploadFile(image);
        imageURLs.push(downloadURL);
      }
      vehicle.images = imageURLs;
    }

    const docRef = await addDoc(collection(db, 'vehicles'), vehicle);
    console.log('Vehicle added with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding vehicle: ', e);
  }
};
export const fetchVehiclesFromFirestore = async () => {
    const vehiclesCollection = collection(db, 'vehicles');
    const vehicleSnapshot = await getDocs(vehiclesCollection);
    const vehicleList = vehicleSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return vehicleList;
  };


export const fetchVehicleByIdFromFirestore = async (id) => {
    const docRef = doc(db, "vehicles", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id };
    } else {
      console.log("No such document!");
      return null;
    }
  };
