import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const VehicleDetails = ({ vehicles, hideVehicle, addHiddenVehicleBack, editVehicle }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const vehicle = vehicles.find((v) => v.id === Number(id));
  if (!vehicle) return <p>Vehicle not found!</p>;

  const handleHide = () => {
    hideVehicle(vehicle.id);
    navigate('/');
  };

  return (
    <div>
      <h2>{vehicle.name}</h2>
      <p>Price: {vehicle.price}</p>
      <p>Engine: {vehicle.engine}</p>
      {/* Add more details as needed */}
      <button onClick={handleHide}>Hide Vehicle</button>
      <button onClick={() => navigate('/')}>Back to Inventory</button>
    </div>
  );
};

export default VehicleDetails;

