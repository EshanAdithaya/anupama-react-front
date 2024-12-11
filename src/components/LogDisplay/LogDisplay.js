import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LogDisplay = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/tickets/logs');
        setLogs(response.data);
      } catch (error) {
        console.error('Error fetching logs!', error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div>
      <h2>Logs</h2>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
};

export default LogDisplay;
