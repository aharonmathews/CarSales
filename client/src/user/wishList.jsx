import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase"; // Adjust the import path as needed
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();
  const userId = "aharon@gmail.com"; // Replace with actual user ID

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const userDocRef = doc(db, "userinfo", userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const wishlist = userDoc.data().wishlist || [];
          if (wishlist.length > 0) {
            const carPromises = wishlist.map((carId) =>
              getDoc(doc(db, "cars", carId))
            );
            const carDocs = await Promise.all(carPromises);
            const cars = carDocs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setWishlistItems(cars);
          } else {
            setWishlistItems([]);
          }
        }
      } catch (error) {
        console.error("Error fetching wishlist: ", error);
      }
    };

    fetchWishlist();
  }, [userId]);

  const removeFromWishlist = async (id) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updatedWishlist);

    // Update the user's wishlist in Firestore
    try {
      const userDocRef = doc(db, "userinfo", userId);
      await updateDoc(userDocRef, {
        wishlist: updatedWishlist.map((item) => item.id),
      });
    } catch (error) {
      console.error("Error updating wishlist: ", error);
    }

    // If the wishlist is empty, redirect to another page (e.g., homepage)
    if (updatedWishlist.length === 0) {
      navigate("/"); // Redirect to homepage or any other route
    }
  };

  return (
    <>
      <Navbar />
      <div className="m-6">
        <div className="flex items-center justify-between">
          <div>
      <h1 className="text-2xl font-bold">Wishlist</h1>
      <p className="mb-4">You have {wishlistItems.length} saved items</p>
      </div>

          
      <button
      className="bg-black text-white px-4 py-2 rounded-md"onClick={() => navigate("/CompareCars")} >Compare
      </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded-lg shadow-lg"
              onClick={() => navigate(`/CarDetails/${item.name}`)}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h2 className="text-xl font-semibold">{item.name}</h2>
              {item.isVip && (
                <span className="text-yellow-500 font-bold">VIP</span>
              )}
              <ul className="mt-2">
                <li>Year: {item.year}</li>
                <li>Distance: {item.distance}</li>
                <li>Fuel: {item.fuel}</li>
                <li>Location: {item.location}</li>
                <li>Engine: {item.engine}</li>
                <li>Transmission: {item.transmission}</li>
              </ul>
              <p className="text-green-500 text-lg mt-2 font-bold">
                {item.price}
              </p>
              <button
                className="text-red-500 mt-2 underline"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromWishlist(item.id);
                }}
              >
                Remove from wishlist
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;