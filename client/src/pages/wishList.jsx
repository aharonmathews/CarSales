import React, { useState } from "react";

const Wishlist = () => {
  // State to manage the wishlist items
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Suzuki SX4",
      year: 2014,
      price: "$29,000",
      distance: "59,000 km",
      fuel: "Petrol",
      location: "Hawaii",
      engine: "1.6L",
      transmission: "AMT",
      imageUrl: "link-to-suzuki-image", // Replace with actual image links
      isVip: true,
    },
    {
      id: 2,
      name: "Toyota Land Cruiser",
      year: 2017,
      price: "$24,000",
      distance: "20,000 km",
      fuel: "Petrol",
      location: "Indiana",
      engine: "2.7L",
      transmission: "Automatic",
      imageUrl: "link-to-toyota-land-cruiser-image",
      isVip: false,
    },
    {
      id: 3,
      name: "Toyota Celica",
      year: 1999,
      price: "$13,000",
      distance: "152,000 km",
      fuel: "Petrol",
      location: "Illinois",
      engine: "1.8L",
      transmission: "AMT",
      imageUrl: "link-to-toyota-celica-image",
      isVip: false,
    },
    {
      id: 4,
      name: "Kia Cerato",
      year: 2019,
      price: "$27,000",
      distance: "150,000 km",
      fuel: "Petrol",
      location: "Connecticut",
      engine: "2.0L",
      transmission: "Automatic",
      imageUrl: "link-to-kia-cerato-image",
      isVip: false,
    },
  ]);

  // Function to remove an item from the wishlist
  const removeFromWishlist = (id) => {
    // Filter out the item with the specified ID
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updatedWishlist);
  };

  return (
    <div className="wishlist-container">
      <h2>Wishlist</h2>
      <p>You have {wishlistItems.length} saved items</p>
      <div className="wishlist-grid">
        {wishlistItems.map((item) => (
          <div className="wishlist-item" key={item.id}>
            {item.isVip && <span className="vip-badge">VIP</span>}
            <img src={item.imageUrl} alt={item.name} className="car-image" />
            <h3>{item.name}</h3>
            <p>{item.year}</p>
            <p>{item.distance}</p>
            <p>{item.fuel}</p>
            <p>{item.location}</p>
            <p>{item.engine}</p>
            <p>{item.transmission}</p>
            <p className="price">{item.price}</p>
            <button
              onClick={() => removeFromWishlist(item.id)}
              className="remove-btn"
            >
              Remove from wishlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
