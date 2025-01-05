import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const InventoryPage = () => {
  const location = useLocation();
  const godown = location.state?.godown; // Retrieve the godown data

  const [deliveryItems, setDeliveryItems] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDeliveryItems = async () => {
      if (!godown) {
        setMessage("No godown selected.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/getDeliveryItems", {
          params: { godown: godown.name } // Pass godown name as a query parameter
        });

        if (response.data.success) {
          setDeliveryItems(response.data.data);
        } else {
          setMessage(response.data.message || "No delivery items found.");
        }
      } catch (error) {
        console.error("Error fetching delivery items:", error);
        setMessage("An error occurred while fetching the data.");
      }
    };

    fetchDeliveryItems();
  }, [godown]); // Depend on godown to refetch if it changes

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Inventory Page</h2>
      {godown && (
        <div style={styles.godownDetails}>
          <p style={styles.godownText}><strong>Godown Name:</strong> {godown.name}</p>
          <p style={styles.godownText}><strong>Godown Address:</strong> {godown.address}</p>
        </div>
      )}
      {message && <p style={styles.message}>{message}</p>}

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Item Name</th>
           {/* <th style={styles.tableHeader}>Date</th>
            <th style={styles.tableHeader}>Time</th>*/}
          </tr>
        </thead>
        <tbody>
          {deliveryItems.length === 0 ? (
            <tr>
              <td style={styles.noItemsText} colSpan="1">No items available</td>
            </tr>
          ) : (
            deliveryItems.map((item, index) => (
              <tr key={index} style={styles.tableRow}>
                <td>{item.name}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    color: '#3f51b5',
    fontSize: '2rem',
    marginBottom: '20px',
    textAlign: 'center',
  },
  godownDetails: {
    backgroundColor: '#ffffff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '80%',
    maxWidth: '500px',
    marginBottom: '20px',
  },
  godownText: {
    fontSize: '1.1rem',
    color: '#333',
    margin: '5px 0',
  },
  message: {
    fontSize: '1.2rem',
    color: '#d32f2f',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  table: {
    width: '80%',
    maxWidth: '800px',
    borderCollapse: 'collapse',
    margin: '20px 0',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  tableHeader: {
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '12px 20px',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
  noItemsText: {
    textAlign: 'center',
    padding: '12px 0',
    fontSize: '1.1rem',
    color: '#555',
  },
};

export default InventoryPage;
