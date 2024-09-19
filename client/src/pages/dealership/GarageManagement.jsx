import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AddNewVehicle from './AddNewVehicle';
import VehicleDetails from './VehicleDetails';
import { fetchVehiclesFromFirestore, addVehicleToFirestore } from '../../firestoreService'; // Firestore functions
import Navbar from './Navbar';

function GarageManagement() {
  const [vehicles, setVehicles] = useState([]);
  const [hiddenVehicles, setHiddenVehicles] = useState([]);

  useEffect(() => {
    const getVehicles = async () => {
      const vehiclesList = await fetchVehiclesFromFirestore();
      setVehicles(vehiclesList);
    };
    getVehicles();
  }, []);

  const addVehicle = async (newVehicle) => {
    try {
      await addVehicleToFirestore(newVehicle);
      setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  const hideVehicle = (vehicleId) => {
    const hiddenVehicle = vehicles.find((v) => v.id === vehicleId);
    if (hiddenVehicle) {
      setHiddenVehicles([...hiddenVehicles, hiddenVehicle]);
      setVehicles(vehicles.filter((v) => v.id !== vehicleId));
    }
  };

  const addHiddenVehicleBack = (vehicleId) => {
    const vehicle = hiddenVehicles.find((v) => v.id === vehicleId);
    if (vehicle) {
      setVehicles([...vehicles, vehicle]);
      setHiddenVehicles(hiddenVehicles.filter((v) => v.id !== vehicleId));
    }
  };

  const editVehicle = (vehicleId, updatedVehicle) => {
    setVehicles(
      vehicles.map((v) => (v.id === vehicleId ? updatedVehicle : v))
    );
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.title}>Inventory</h2>
        <Routes>
          <Route
            path="/"
            element={
              <InventoryList
                vehicles={vehicles}
                hiddenVehicles={hiddenVehicles}
              />
            }
          />
          <Route
            path="/add-vehicle"
            element={<AddNewVehicle addVehicle={addVehicle} />}
          />
          <Route
            path="/vehicle/:id"
            element={
              <VehicleDetails
                vehicles={vehicles}
                hideVehicle={hideVehicle}
                addHiddenVehicleBack={addHiddenVehicleBack}
                editVehicle={editVehicle}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

const InventoryList = ({ vehicles, hiddenVehicles }) => {
  return (
    <div>
      <h2 style={styles.sectionTitle}>All cars</h2>
      <div style={styles.grid}>
        {vehicles.length === 0 ? (
          <p>No cars available.</p>
        ) : (
          vehicles.map((vehicle) => (
            <div key={vehicle.id} style={styles.card}>
              <Link to={`/vehicle/${vehicle.id}`} style={styles.cardLink}>
                {vehicle.images && vehicle.images.length > 0 && (
                  <img
                    src={vehicle.images[0]}
                    alt="car"
                    style={styles.image}
                  />
                )}
                <p style={styles.cardName}>{vehicle.name}</p>
                <p style={styles.cardModel}>${vehicle.model}</p>
              </Link>
            </div>
          ))
        )}
      </div>

      <h2 style={styles.sectionTitle}>Hidden cars</h2>
      <div style={styles.grid}>
        {hiddenVehicles.length === 0 ? (
          <p>No hidden cars.</p>
        ) : (
          hiddenVehicles.map((vehicle) => (
            <div key={vehicle.id} style={styles.card}>
              <Link to={`/vehicle/${vehicle.id}`} style={styles.cardLink}>
                {vehicle.images && vehicle.images.length > 0 && (
                  <img
                    src={vehicle.images[0]}
                    alt="car"
                    style={styles.image}
                  />
                )}
                <p style={styles.cardName}>{vehicle.name}</p>
                <p style={styles.cardModel}>${vehicle.model}</p>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
    marginBottom: '20px',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  navIcons: {
    display: 'flex',
    gap: '20px',
  },
  container: {
    width: '80%',
    margin: '0 auto',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginBottom: '40px',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
  },
  cardLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  cardName: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '10px 0 5px',
  },
  cardModel: {
    fontSize: '16px',
    color: '#777',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
  },
};

export default GarageManagement;
