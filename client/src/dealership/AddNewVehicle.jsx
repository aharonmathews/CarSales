import React, { useState } from "react";
import { addVehicleToFirestore } from "../firestoreService"; // Firestore service for adding vehicle
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const AddNewVehicle = () => {
  const [formData, setFormData] = useState({
    id: Date.now(), // Unique identifier for each vehicle
    name: "",
    price: "",
    engine: "",
    fuelType: "",
    transmission: "",
    mileage: "",
    color: "",
    tyreSize: "",
    seatingCapacity: "",
    images: [],
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    try {
      const files = Array.from(e.target.files);
      if (files.length > 5) {
        setError("You can upload a maximum of 5 images.");
        return;
      }
      setFormData((prevState) => ({
        ...prevState,
        images: files,
      }));
    } catch (error) {
      setError("Error uploading images: " + error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.engine) {
      setError("Please fill in all required fields.");
      return;
    }
    setError(null); // Clear error if form is valid
    setPreviewMode(true); // Switch to preview mode after submission
  };

  const handleEdit = () => {
    setPreviewMode(false); // Allow editing
  };

  const handleFinalSave = async (e) => {
    try {
      await addVehicleToFirestore(formData); // Save vehicle to Firestore
      alert("Car details have been saved successfully!");
      navigate("/DealershipDashboard"); // Redirect to the inventory list after saving
    } catch (error) {
      setError("Error saving car details: " + error.message);
      console.error("Error adding vehicle:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
        {!previewMode ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Add New Vehicle</h2>

            {/* Car Name */}
            <div>
              <label className="block font-medium">Car Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block font-medium">Price (₹):</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Engine */}
            <div>
              <label className="block font-medium">Engine:</label>
              <input
                type="text"
                name="engine"
                value={formData.engine}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block font-medium">Fuel Type:</label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select fuel type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            {/* Transmission */}
            <div>
              <label className="block font-medium">Transmission:</label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select transmission</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>

            {/* Mileage */}
            <div>
              <label className="block font-medium">Mileage (kmpl):</label>
              <input
                type="number"
                name="mileage"
                value={formData.mileage}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Color */}
            <div>
              <label className="block font-medium">Color:</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Tyre Size */}
            <div>
              <label className="block font-medium">Tyre Size (inches):</label>
              <input
                type="text"
                name="tyreSize"
                value={formData.tyreSize}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Seating Capacity */}
            <div>
              <label className="block font-medium">Seating Capacity:</label>
              <input
                type="number"
                name="seatingCapacity"
                value={formData.seatingCapacity}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block font-medium">Upload Car Images:</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {error && <p className="text-red-600">{error}</p>}

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Preview Car Details
            </button>
          </form>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Preview Car Details</h2>

            <div className="space-y-4">
              <p><strong>Car Name:</strong> {formData.name}</p>
              <p><strong>Price:</strong> ₹{formData.price}</p>
              <p><strong>Engine:</strong> {formData.engine}</p>
              <p><strong>Fuel Type:</strong> {formData.fuelType}</p>
              <p><strong>Transmission:</strong> {formData.transmission}</p>
              <p><strong>Mileage:</strong> {formData.mileage} kmpl</p>
              <p><strong>Color:</strong> {formData.color}</p>
              <p><strong>Tyre Size:</strong> {formData.tyreSize} inches</p>
              <p><strong>Seating Capacity:</strong> {formData.seatingCapacity}</p>

              <div>
                <h3 className="font-medium">Uploaded Images</h3>
                <div className="flex space-x-4">
                  {formData.images.length > 0 ? (
                    formData.images.map((img, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(img)}
                        alt={`car-${index}`}
                        className="w-32 h-20 object-cover"
                      />
                    ))
                  ) : (
                    <p>No images uploaded</p>
                  )}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleEdit}
                  className="py-2 px-4 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={handleFinalSave}
                  className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Final Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddNewVehicle;
