import React from 'react';
import axios from 'axios';

const ControlPanel = ({ onStart, onStop }) => {
  const handleStart = async () => {
    try {
      await axios.post('http://localhost:8080/api/tickets/start');
      onStart();
    } catch (error) {
      console.error('Error starting the system!', error);
    }
  };

  const handleStop = async () => {
    try {
      await axios.post('http://localhost:8080/api/tickets/stop');
      onStop();
    } catch (error) {
      console.error('Error stopping the system!', error);
    }
  };

  return (
    <div>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
};

export default ControlPanel;
