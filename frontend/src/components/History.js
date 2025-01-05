// History.js
import React, { useState, useEffect } from 'react';

const History = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    // Fetch sales data from the backend
    const fetchSalesData = async () => {
      try {
        const response = await fetch('http://18.231.120.244:5000/api/sales');
        const data = await response.json();
        setSalesData(data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <div>
      <h1>Sales History</h1>
      {salesData.length === 0 ? (
        <p>Loading...</p>
      ) : (
        salesData.map((godownData) => (
          <div key={godownData._id}>
            <h2>Godown: {godownData._id}</h2>
            <ul>
              {godownData.sales.map((sale) => (
                <li key={sale._id}>
                  <p>Name: {sale.name}</p>
                  <p>Username: {sale.userName}</p>
                  <p>Mobile Number: {sale.mobileNumber}</p>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default History;
