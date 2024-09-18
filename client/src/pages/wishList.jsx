import React from "react";

const Wishlist = () => {
  // Sample wishlist data
  const wishlistItems = [
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
      image: "CardPlaceHoldr.jpg", // Replace with actual image links
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
      image: "CardPlaceHoldr.jpg",
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
      image: "CardPlaceHoldr.jpg",
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
      image: "CardPlaceHoldr.jpg",
      isVip: false,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Wishlist</h1>
      <p className="mb-4">You have {wishlistItems.length} saved items</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg shadow-lg">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h2 className="text-xl font-semibold">{item.name}</h2>
            {item.isVip && <span className="text-yellow-500 font-bold">VIP</span>}
            <ul className="mt-2">
              <li>Year: {item.year}</li>
              <li>Distance: {item.distance}</li>
              <li>Fuel: {item.fuel}</li>
              <li>Location: {item.location}</li>
              <li>Engine: {item.engine}</li>
              <li>Transmission: {item.transmission}</li>
            </ul>
            <p className="text-green-500 text-lg mt-2 font-bold">{item.price}</p>
            <button className="text-red-500 mt-2 underline">Remove from wishlist</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
