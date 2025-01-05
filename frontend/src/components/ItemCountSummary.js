import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ItemCountSummary = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from backend API
    axios.get('http://18.229.150.112:5000/api/items')
      .then(response => {
        setItems(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the items!', error);
        setLoading(false);
      });
  }, []);

  // Inline CSS Styles
  const containerStyle = {
    textAlign: 'center',
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#f4f4f9',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const headingStyle = {
    color: '#4CAF50',
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
  };

  const tdStyle = {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'center',
    fontSize: '1rem',
  };

  const loadingStyle = {
    fontSize: '1.5rem',
    color: '#ff5722',
  };

  if (loading) {
    return <div style={loadingStyle}>Loading...</div>;
  }

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Item Count Summary</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Item Name</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td style={tdStyle}>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemCountSummary;
