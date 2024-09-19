import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Navbar from "./Navbar";

const DealershipDashboard = () => {
  const [selectedTime, setSelectedTime] = useState("All time");
  const navigate = useNavigate()

  // Sample Data for User Interactions
  const data = [
    { time: "All time", interactions: 100 },
    { time: "Past year", interactions: 120 },
    { time: "Past month", interactions: 400 },
    { time: "Past week", interactions: 50 },
  ];

  // Sample data based on selected time period (you can modify this to match your needs)
  const displayedData = [
    { name: "Jan", interactions: 100 },
    { name: "Feb", interactions: 120 },
    { name: "Mar", interactions: 400 },
    { name: "Apr", interactions: 500 },
    { name: "May", interactions: 450 },
    { name: "Jun", interactions: 300 },
    { name: "Jul", interactions: 100 },
  ];

  return (
    <>
    <Navbar />
    <div style={styles.dashboardContainer}>
      {/* Welcome Message */}
      <h1 style={styles.heading}>Welcome, {"Dealership"}</h1>

      {/* Buttons */}
      <div style={styles.buttonGroup}>
        <button style={styles.actionButton} onClick={() => navigate('/GarageManagement')} >Garage management</button>
        <button style={styles.actionButton} onClick={() => navigate('/AddNewVehicle')}>Add new vehicle</button>
      </div>

      {/* Boost Your Cars Button */}
      <div style={styles.boostButtonWrapper}>
        <button style={styles.boostButton}>Boost your cars!</button>
      </div>

      {/* Chart Heading */}
      <h2 style={styles.subheading}>User Interactions</h2>

      {/* Line Chart */}
      <div style={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={displayedData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="interactions"
              stroke="#ff4d4d"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Time Filters */}
      <div style={styles.filterGroup}>
        {data.map((item) => (
          <button
            key={item.time}
            onClick={() => setSelectedTime(item.time)}
            style={{
              ...styles.filterButton,
              backgroundColor: selectedTime === item.time ? "#ddd" : "#fff",
            }}
          >
            {item.time}
          </button>
        ))}
      </div>
    </div>
    </>
    
  );
};

// Styles (CSS in JS)
const styles = {
  dashboardContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    maxWidth: "900px",
    margin: "0 auto",
    textAlign: "center",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  subheading: {
    fontSize: "1.5rem",
    marginTop: "30px",
    marginBottom: "20px",
  },
  buttonGroup: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },
  actionButton: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "1px solid gray",
    cursor: "pointer",
    backgroundColor: "#fff",
    transition: "background-color 0.3s ease",
  },
  boostButtonWrapper: {
    marginBottom: "20px",
  },
  boostButton: {
    padding: "15px 40px",
    backgroundColor: "#00aaff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1.1rem",
    transition: "background-color 0.3s ease",
  },
  chartWrapper: {
    width: "100%",
    height: "300px",
    marginTop: "30px",
  },
  filterGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },
  filterButton: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid gray",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default DealershipDashboard;
