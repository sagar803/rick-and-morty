import React, { useState } from 'react';
import { RefreshCw } from 'react-feather';

export const Status = ({ filteredStatus, setFilteredStatus }) => {
  const statusOptions = ["Alive", "Dead", "Unknown"];

  const handleStatusChange = (status) => {
    setFilteredStatus(status);
  };


  return (
    <div>
      <h5 style={{ display: 'inline' }}>Status</h5>
      <div style={{ float: 'right', cursor:'pointer'}} onClick={() => setFilteredStatus('')} ><RefreshCw size={15} /></div>
      {statusOptions.map((status) => (
        <div key={status}>
          <input
            type="radio"
            id={status}
            value={status}
            checked={filteredStatus === status}
            onChange={() => handleStatusChange(status)}
          />
          <label htmlFor={status}>{status}</label>
        </div>
      ))}
    </div>
  );
};

