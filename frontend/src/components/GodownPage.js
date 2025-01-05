import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const GodownPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const godown = location.state.godown;

  const handleDeliveryClick = () => {
    navigate('/delivery', { state: { godown } });
  };

  const handleInventoryClick = () => {
    navigate('/inventory', { state: { godown } });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Godown Dashboard</h2>
      <p style={styles.paragraph}><strong>Name:</strong> {godown.name}</p>
      <p style={styles.paragraph}><strong>Address:</strong> {godown.address}</p>

      <div style={styles.buttonContainer}>
        <button onClick={handleDeliveryClick} style={styles.button}>Delivery</button>
        <button onClick={handleInventoryClick} style={styles.button}>Inventory</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px',
  },
  header: {
    color: '#3f51b5',
    marginBottom: '20px',
    fontSize: '2.5rem',
    fontFamily: 'Arial, sans-serif',
  },
  paragraph: {
    fontSize: '1.2rem',
    color: '#333',
    marginBottom: '10px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
    marginTop: '20px',
  },
  button: {
    backgroundColor: '#4caf50',
    color: '#fff',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
};

export default GodownPage;
