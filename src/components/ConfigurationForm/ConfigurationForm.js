import React, { useState } from 'react';
import './ConfigurationStyles.css'; // Import the CSS file

const ConfigurationForm = ({ onSubmit }) => {
  const [vendorCount, setVendorCount] = useState(1); // Starts with one vendor
  const [customerCount, setCustomerCount] = useState(1); // Starts with one customer
  const [config, setConfig] = useState({
    totalTickets: '',
    ticketReleaseRate: '',
    customerRetrievalRate: '', // Shared retrieval rate for all customers
    maxTicketCapacity: '',
  });

  // Handle input changes for global configuration
  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    setConfig({ ...config, [name]: value });
  };

  // Increase vendor count
  const addVendor = () => {
    setVendorCount(vendorCount + 1);
  };

  // Decrease vendor count (minimum of 1)
  const removeVendor = () => {
    if (vendorCount > 1) {
      setVendorCount(vendorCount - 1);
    }
  };

  // Increase customer count
  const addCustomer = () => {
    setCustomerCount(customerCount + 1);
  };

  // Decrease customer count (minimum of 1)
  const removeCustomer = () => {
    if (customerCount > 1) {
      setCustomerCount(customerCount - 1);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const vendors = Array(vendorCount).fill({ ticketReleaseRate: config.ticketReleaseRate });
    const customers = Array(customerCount).fill({ customerRetrievalRate: config.customerRetrievalRate });

    // Prepare the data to send
    const dataToSend = {
      ...config,
      vendors,
      customers,
    };

    // Send the data to the backend using fetch
    fetch('http://localhost:8080/api/tickets/configure', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend), // Send the configuration data as JSON
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error configuring the system');
        }
      })
      .then(data => {
        console.log('System Configured:', data);
        onSubmit(data); // Call the onSubmit function if needed
      })
      .catch(error => {
        console.error('Error configuring the system:', error);
        alert('There was an error configuring the system!');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Configuration Settings</h2>
      <label>
        Total amount of Tickets:
        <input
          type="number"
          name="totalTickets"
          value={config.totalTickets}
          onChange={handleConfigChange}
          className="input-field"
          required
        />
      </label>
      <label>
        Ticket Release Rate:
        <input
          type="number"
          name="ticketReleaseRate"
          value={config.ticketReleaseRate}
          onChange={handleConfigChange}
          className="input-field"
          required
        />
      </label>
      <label>
        Customer Retrieval Rate:
        <input
          type="number"
          name="customerRetrievalRate"
          value={config.customerRetrievalRate}
          onChange={handleConfigChange}
          className="input-field"
          required
        />
      </label>
      <label>
        Maximum Ticket Capacity:
        <input
          type="number"
          name="maxTicketCapacity"
          value={config.maxTicketCapacity}
          onChange={handleConfigChange}
          className="input-field"
          required
        />
      </label>

      <h3>Add Vendors</h3>
      <div className="count">
        <button type="button" onClick={addVendor} className="add-button">+</button>
        <span>{vendorCount} Vendors</span>
        <button type="button" onClick={removeVendor} className="remove-button">-</button>
      </div>

      <h3>Add Customers</h3>
      <div className="count">
        <button type="button" onClick={addCustomer} className="add-button">+</button>
        <span>{customerCount} Customers</span>
        <button type="button" onClick={removeCustomer} className="remove-button"> - </button>
      </div>
      <br />
      <button type="submit" className="configure-button">
        Configure
      </button>
    </form>
  );
};

export default ConfigurationForm;
