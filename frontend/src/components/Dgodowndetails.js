import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Dgodowndetails() {
  const location = useLocation();
  const { godown } = location.state; // Access godown data from the state
  const [item, setItem] = useState('');
  const [addedItems, setAddedItems] = useState([]);

  useEffect(() => {
    // Fetch items from the database for the current godown
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/items/${godown._id}`)
      .then(response => {
        setAddedItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, [godown]);

  const handleAddItem = () => {
    if (!item.trim()) return alert('Please enter an item.');

    // Save the item to the database
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/items`, {
      godownId: godown._id,
      name: item,
    })
      .then(response => {
        setAddedItems([...addedItems, response.data]); // Update items in state
        setItem(''); // Clear input field
      })
      .catch(error => {
        console.error('Error adding item:', error);
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
        <button onClick={handleAddItem} style={styles.button}>
          Add Item
        </button>
        <h3>Added Items:</h3>
        <ul>
          {addedItems.map((item) => (
            <li key={item._id}>{item.name}</li>
          ))}
        </ul>
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

export default Dgodowndetails;
