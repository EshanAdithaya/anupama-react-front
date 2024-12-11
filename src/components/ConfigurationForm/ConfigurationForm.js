import React, { useState } from 'react';
import axios from 'axios';

const ConfigurationForm = ({ onSubmit }) => {
  const [config, setConfig] = useState({
    totalTickets: '',
    ticketReleaseRate: '',
    customerRetrievalRate: '',
    maxTicketCapacity: '',
  });

  // Handle input changes
  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    setConfig({ ...config, [name]: value });
  };

  // Submit form and send configuration to Spring Boot API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/tickets/configure', config);
      console.log(response.data);
      onSubmit(config); // Pass config to parent
    } catch (error) {
      console.error('There was an error configuring the system!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        name="totalTickets"
        value={config.totalTickets}
        onChange={handleConfigChange}
        placeholder="Total Tickets"
      />
      <input
        type="number"
        name="ticketReleaseRate"
        value={config.ticketReleaseRate}
        onChange={handleConfigChange}
        placeholder="Ticket Release Rate"
      />
      <input
        type="number"
        name="customerRetrievalRate"
        value={config.customerRetrievalRate}
        onChange={handleConfigChange}
        placeholder="Customer Retrieval Rate"
      />
      <input
        type="number"
        name="maxTicketCapacity"
        value={config.maxTicketCapacity}
        onChange={handleConfigChange}
        placeholder="Max Ticket Capacity"
      />
      <button type="submit">Configure</button>
    </form>
  );
};

export default ConfigurationForm;
