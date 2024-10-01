import React, { useState } from "react";
import { addVehicleToFirestore } from "../firestoreService";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

const AddNewVehicle = () => {
  const [formData, setFormData] = useState({
    id: Date.now(),
    dealership: "",
    name:"",
    user_clicked:"",
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
    RC_copy:[],
    idcard:[],
    reg_no: "",
    reg_date: "",
    owner_name: "",
    owner_count:"",
    current_state: "",
    permanent_state: "",
    permanent_pincode: "",
    chassis_no: "",
    engine_no: "",
    vehicle_manufacturer_name: "",
    model: "",
    body_type: "",
    vehicle_class_desc: "",
    vehicle_gross_weight: "",
    cubic_cap: "",
    insurance_upto: "",
    insurance_company_name: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value || "", // Ensuring no null values, using empty string
    }));
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
          "x-rapidapi-key": "982f38509dmsh844fbbf7c08fc90p153a53jsnde9936e206f2",
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
        {/* Vehicle Information Form */}
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Add New Vehicle</h2>

          {/* Input for searching by plate number */}
          <div className="text-center mb-8">
            <input
              type="text"
              name="reg_no"
              placeholder="Enter Plate Number"
              value={formData.reg_no}
              onChange={handleChange}
              className="p-3 w-full border rounded-lg"
            />
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={fetchVehicleInfo}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg"
                disabled={loading}
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </div>

          {/* Show message for vehicle search */}
          {vehicleFound && <p className="text-green-500">Vehicle found</p>}
          {!vehicleFound && error && <p className="text-red-500">{error}</p>}

          {/* Vehicle Details Fields */}
          {Object.keys(formData).map(
            (key) =>
              key !== "id" &&
              key !== "images" && (
                <div key={key}>
                  <label className="block font-medium">
                    {key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
                  </label>
                  <input
                    type={typeof formData[key] === "number" ? "number" : "text"}
                    name={key}
                    value={formData[key] || ""} // Ensuring no null values
                    onChange={handleChange}
                    className="p-3 w-full border rounded-lg"
                  />
                </div>
              )
          )}

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Preview Details
          </button>
        </form>

        {/* Preview Mode */}
        {previewMode && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Preview Vehicle Details</h2>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
            <button onClick={handleFinalSave} className="bg-green-500 text-white px-4 py-2 rounded">
              Save Vehicle
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AddNewVehicle;
