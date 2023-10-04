import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [data, setData] = useState([]);
  const fetchdata = async () => {
    await axios
      .get("http://localhost:3000/orders")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  };
  useEffect(fetchdata(), []); // Modify this based on your Redux state structure

  

  const handleDeleteOrder = (orderId) => {
    axios
      .delete(`/api/orders/${orderId}`)
      .then((response) => {
        setOrders(orders.filter((order) => order._id !== orderId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Details</th>
            <th>Destination</th>
            <th>Status</th>
            <th>Current Warehouse</th>
            <th>Expected Arrival Time</th>
            <th>Current Location</th>
            <th>Other Information</th>
            <th>Qty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.shareableID}</td>
              <td>{order.name}</td>
              <td>{order.details}</td>
              <td>
                {order.destination.to} - {order.destination.from}
              </td>
              <td>
                {order.status.map((status) => (
                  <div key={status._id}>
                    <p>{status.statusTitle}</p>
                    <p>Arrival Date: {status.arrivalDate}</p>
                    <p>Departure Date: {status.departureDate}</p>
                  </div>
                ))}
              </td>
              <td>{order.currentWarehouse}</td>
              <td>{order.expectedArrivalTime}</td>
              <td>
                <p>Warehouse Name: {order.currentLocation.warehouseName}</p>
                <p>Arrival Date: {order.currentLocation.arrivalDate}</p>
                <p>Departure Date: {order.currentLocation.departureDate}</p>
              </td>
              <td>{/* Render other information fields here */}</td>
              <td>{order.qty}</td>
              <td>
                <button onClick={() => handleDeleteOrder(order._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
