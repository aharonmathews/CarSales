import React, { useState, useEffect } from "react";
import { addVehicleToFirestore } from "../firestoreService";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const AddNewVehicle = () => {
  const [formData, setFormData] = useState({
    id: Date.now(),
    name: "",
    overview: "",
    price: "",
    engine: "",
    fuelType: "",
    transmission: "",
    mileage: "",
    color: "",
    tyreSize: "",
    seatingCapacity: "",
    images: [],
    reg_no: "", // Registration/plate number input
    reg_date: "", // Vehicle registration date
    owner_name: "", // Vehicle owner name
    owner_father_name: "", // Owner's father name
    current_address_line1: "", // Owner's current address line 1
    current_address_line2: "", // Owner's current address line 2
    current_district_name: "", // Owner's current district name
    current_state: "", // Owner's current state
    current_pincode: "", // Owner's current pincode
    permanent_address_line1: "", // Owner's permanent address line 1
    permanent_address_line2: "", // Owner's permanent address line 2
    permanent_district_name: "", // Owner's permanent district
    permanent_state: "", // Owner's permanent state
    permanent_pincode: "", // Owner's permanent pincode
    chassis_no: "", // Vehicle chassis number
    engine_no: "", // Vehicle engine number
    vehicle_manufacturer_name: "", // Vehicle manufacturer name
    model: "", // Vehicle model
    body_type: "", // Vehicle body type
    vehicle_class_desc: "", // Vehicle class description
    vehicle_gross_weight: "", // Vehicle gross weight
    cubic_cap: "", // Vehicle cubic capacity
    insurance_upto: "", // Insurance validity
    insurance_company_name: "", // Insurance company name
    permit_valid_upto: "", // Permit validity
    pucc_upto: "", // PUCC validity
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [username, setUsername] = useState("");
  const [vehicleCount, setVehicleCount] = useState(0);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value || "", // Ensuring no null values, using empty string
    }));
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...formData.images];
      newImages[index] = URL.createObjectURL(file); // Create a temporary URL for image preview
      setFormData((prevState) => ({
        ...prevState,
        images: newImages,
      }));
    }
  };

  const fetchVehicleInfo = async () => {
    setLoading(true);
    setError(null);
    setVehicleFound(false); // Reset vehicle found status before the API call
    try {
      const options = {
        method: "POST",
        url: "https://rto-vehicle-information-verification-india.p.rapidapi.com/api/v1/rc/vehicleinfo",
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-host":
            "rto-vehicle-information-verification-india.p.rapidapi.com",
          "x-rapidapi-key": "9ecdfee856msh15ac3884659cc13p1cdfb6jsn23ddb3f38179", // Replace with your actual API key
        },
        data: {
          reg_no: formData.reg_no,
          consent: "Y",
          consent_text: "I hereby declare my consent agreement for fetching my information via AITAN Labs API",
        },
      };

      const response = await axios.request(options);
      const vehicleData = response.data.result;

      if (vehicleData) {
        setFormData((prevState) => ({
          ...prevState,
          ...vehicleData,
        }));
        setVehicleFound(true); // Vehicle found
      } else {
        setError("No vehicle found");
        setVehicleFound(false); // No vehicle found
      }
    } catch (error) {
      setError("Failed to fetch vehicle info: " + error.message);
      setVehicleFound(false);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setPreviewMode(true);
  };

  const handleFinalSave = async () => {
    try {
      await addVehicleToFirestore(formData);
      alert("Vehicle details saved successfully!");
      navigate("/DealershipDashboard");
    } catch (error) {
      setError("Error saving vehicle details: " + error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        {/* Plate Number Input */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold mb-4">Search Vehicle by Plate Number</h2>
          <input
            type="text"
            name="reg_no"
            placeholder="Enter Plate Number"
            value={formData.reg_no}
            onChange={handleChange}
            className="p-3 w-full border rounded-lg"
          />
          <button
            onClick={fetchVehicleInfo}
            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg"
          >
            Search
          </button>
          {loading && <p>Loading vehicle info...</p>}
          {error && <p className="text-red-500">{error}</p>}
        </div>

        {/* Vehicle Information Form */}
        {!loading && formData.reg_no && (
          <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Add New Vehicle</h2>

            <div>
              <label className="block font-medium">Car Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="p-3 w-full border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium">Overview</label>
              <textarea
                name="overview"
                value={formData.overview}
                onChange={handleChange}
                className="p-3 w-full border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium">Engine</label>
              <input
                type="text"
                name="engine"
                value={formData.engine}
                onChange={handleChange}
                className="p-3 w-full border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium">Fuel Type</label>
              <input
                type="text"
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                className="p-3 w-full border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium">Mileage (km/l)</label>
              <input
                type="number"
                name="mileage"
                value={formData.mileage}
                onChange={handleChange}
                className="p-3 w-full border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium">Color</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="p-3 w-full border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium">Tyre Size</label>
              <input
                type="text"
                name="tyreSize"
                value={formData.tyreSize}
                onChange={handleChange}
                className="p-3 w-full border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium">Seating Capacity</label>
              <input
                type="number"
                name="seatingCapacity"
                value={formData.seatingCapacity}
                onChange={handleChange}
                className="p-3 w-full border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium">Chassis Number</label>
              <input
                type="text"
                name="chassis_no"
                value={formData.chassis_no}
                onChange={handleChange}
                className="p-3 w-full border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium">Engine Number</label>
              <input
                type="text"
                name="engine_no"
                value={formData.engine_no}
                onChange={handleChange}
                className="p-3 w-full border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium">Manufacturer</label>
              <input
                type="text"
                name="vehicle_manufacturer_name"
                value={formData.vehicle_manufacturer_name}
                onChange={handleChange}
                className="p-3 w-full border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium">Model</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="p-3 w-full border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium">Body Type</label>
              <input
                type="text"
                name="body_type"
                value={formData.body_type}
                onChange={handleChange}
                className="p-3 w-full border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium">Vehicle Class Description</label>
              <input
                type="text"
                name="vehicle_class_desc"
                value={formData.vehicle_class_desc}
                onChange={handleChange}
                className="p-3 w-full border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium">Vehicle Gross Weight (kg)</label>
              <input
                type="number"
                name="vehicle_gross_weight"
                value={formData.vehicle_gross_weight}
                onChange={handleChange}
                className="p-3 w-full border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium">Cubic Capacity (cc)</label>
              <input
                type="number"
                name="cubic_cap"
                value={formData.cubic_cap}
                onChange={handleChange}
                className="p-3 w-full border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium">Insurance Valid Until</label>
              <input
                type="date"
                name="insurance_upto"
                value={formData.insurance_upto}
                onChange={handleChange}
                className="p-3 w-full border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium">Insurance Company Name</label>
              <input
                type="text"
                name="insurance_company_name"
                value={formData.insurance_company_name}
                onChange={handleChange}
                className="p-3 w-full border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium">Permit Valid Until</label>
              <input
                type="date"
                name="permit_valid_upto"
                value={formData.permit_valid_upto}
                onChange={handleChange}
                className="p-3 w-full border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium">PUCC Valid Until</label>
              <input
                type="date"
                name="pucc_upto"
                value={formData.pucc_upto}
                onChange={handleChange}
                className="p-3 w-full border rounded-lg"
              />
            </div>



            {/* Add other vehicle fields similar to the car name */}
            {/* ... */}

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Preview Details
            </button>
          </form>
        )}

        {/* Preview Mode */}
        {previewMode && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Preview Vehicle Details</h2>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
            <button onClick={handleFinalSave} className="bg-green-500 text-white px-4 py-2 rounded">
              Save Vehicle
            </button>
            <button onClick={() => setPreviewMode(false)} className="bg-red-500 text-white px-4 py-2 rounded">
              Edit
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AddNewVehicle;
