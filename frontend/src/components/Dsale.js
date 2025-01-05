import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Dsale() {
  const location = useLocation();
  const { godown } = location.state; // Access godown data from the state
  const [item, setItem] = useState('');
  const [userName, setUserName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [deliveryItems, setDeliveryItems] = useState([]);

  useEffect(() => {
    // Fetch delivery items from the database
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/deliveryItems`)
      .then((response) => {
        setDeliveryItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching delivery items:', error);
      });
  }, []);

  const handleAddItem = () => {
    if (!item.trim() || !userName.trim() || !mobileNumber.trim()) {
      return alert('Please fill out all fields.');
    }

    // Check if name exists in deliveryItems
    const matchingItem = deliveryItems.find(
      (deliveryItem) => deliveryItem.name.trim().toLowerCase() === item.trim().toLowerCase()
    );

    if (!matchingItem) {
      return alert('Item name does not exist in delivery items.');
    }

    // Add item to the sale collection
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/sales`, {
        name: item,
        userName,
        mobileNumber,
        godown: godown.name,
      })
      .then(() => {
        alert('Item added successfully.');
        setItem('');
        setUserName('');
        setMobileNumber('');
        // Remove item from deliveryItems
        axios
          .delete(`${process.env.REACT_APP_BACKEND_URL}/api/deliveryItems/${matchingItem._id}`)
          .then(() => {
            setDeliveryItems((prev) => prev.filter((i) => i._id !== matchingItem._id));
          })
          .catch((error) => {
            console.error('Error deleting item from delivery items:', error);
          });
      })
      .catch((error) => {
        console.error('Error adding item to sale:', error);
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.godownDetails}>
        <h2>{godown.name}</h2>
        <p>{godown.address}</p>
        <input
          type="text"
          placeholder="Enter item name"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Enter user name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Enter mobile number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          style={styles.input}
        />
        <br />
        <button onClick={handleAddItem} style={styles.button}>
          Add Item
        </button>
        {/*<h3>Delivery Items:</h3>
        <ul>
          {deliveryItems.map((deliveryItem) => (
            <li key={deliveryItem._id}>{deliveryItem.name}</li>
          ))}
        </ul>*/}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  godownDetails: {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    display: 'inline-block',
    background: '#fff',
  },
  input: {
    padding: '10px',
    width: '80%',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Dsale;
