import React, { useState } from "react";
import { addVehicleToFirestore } from '../../firestoreService'; // Firestore service for adding vehicle
import { useNavigate } from "react-router-dom";

const AddNewVehicle = () => {
  const [formData, setFormData] = useState({
    id: Date.now(),  // Unique identifier for each vehicle
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
    <div className="car-form-container">
      {!previewMode ? (
        <form onSubmit={handleSubmit} className="car-form">
          <h2>Add New Vehicle</h2>

          {/* Car Name */}
          <label>Car Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          {/* Price */}
          <label>Price (₹):</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          {/* Engine */}
          <label>Engine:</label>
          <input
            type="text"
            name="engine"
            value={formData.engine}
            onChange={handleChange}
            required
          />

          {/* Fuel Type */}
          <label>Fuel Type:</label>
          <select
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            required
          >
            <option value="">Select fuel type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>

          {/* Transmission */}
          <label>Transmission:</label>
          <select
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            required
          >
            <option value="">Select transmission</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>

          {/* Mileage */}
          <label>Mileage (kmpl):</label>
          <input
            type="number"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
            required
          />

          {/* Color */}
          <label>Color:</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            required
          />

          {/* Tyre Size */}
          <label>Tyre Size (inches):</label>
          <input
            type="text"
            name="tyreSize"
            value={formData.tyreSize}
            onChange={handleChange}
            required
          />

          {/* Seating Capacity */}
          <label>Seating Capacity:</label>
          <input
            type="number"
            name="seatingCapacity"
            value={formData.seatingCapacity}
            onChange={handleChange}
            required
          />

          {/* Image Upload */}
          <label>Upload Car Images:</label>
          <input type="file" multiple accept="image/*" onChange={handleFileChange} />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit">Preview Car Details</button>
        </form>
      ) : (
        <div className="car-preview">
          <h2>Preview Car Details</h2>

          {/* Car Details Preview */}
          <p><strong>Car Name:</strong> {formData.name}</p>
          <p><strong>Price:</strong> ₹{formData.price}</p>
          <p><strong>Engine:</strong> {formData.engine}</p>
          <p><strong>Fuel Type:</strong> {formData.fuelType}</p>
          <p><strong>Transmission:</strong> {formData.transmission}</p>
          <p><strong>Mileage:</strong> {formData.mileage} kmpl</p>
          <p><strong>Color:</strong> {formData.color}</p>
          <p><strong>Tyre Size:</strong> {formData.tyreSize} inches</p>
          <p><strong>Seating Capacity:</strong> {formData.seatingCapacity}</p>

          {/* Image Preview */}
          <div className="image-preview">
            <h3>Uploaded Images</h3>
            {formData.images.length > 0 ? (
              formData.images.map((img, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(img)}
                  alt={`car-${index}`}
                  className="preview-img"
                />
              ))
            ) : (
              <p>No images uploaded</p>
            )}
          </div>

          <div className="buttons">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleFinalSave}>Final Save</button>
          </div>
        </div>
      )}
      <style>{`
        .car-form-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        h2 {
          margin-bottom: 20px;
          font-size: 1.8rem;
        }

        label {
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
        }

        input, select {
          width: 100%;
          padding: 10px;
          margin-bottom: 20px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        button {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background-color: #0056b3;
        }

        .image-preview {
          margin: 20px 0;
        }

        .preview-img {
          width: 150px;
          height: 100px;
          object-fit: cover;
          margin-right: 10px;
        }

        .buttons {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

export default AddNewVehicle;
