// src/components/UpdateDoor.jsx

import React, { useState, useEffect } from 'react';

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

const UpdateDoor = ({ door, setDoor }) => {
  const [formValues, setFormValues] = useState({
    doorName: '',
    doorDescription: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateErrorMessage, setUpdateErrorMessage] = useState(null);
  const [updateSuccessMessage, setUpdateSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (door) {
      setFormValues({
        doorName: door.name || '',
        doorDescription: door.description || '',
      });
      setIsLoading(false);
    }
  }, [door]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!door?.id) {
      return; 
    }

    setIsUpdating(true);
    setUpdateErrorMessage(null);
    setUpdateSuccessMessage(null);

    try {
      const response = await fetch(`${API_URI}/${door.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error(`Update failed: ${response.status} ${response.statusText}`);
      }

      const updatedDoor = await response.json(); 
      setDoor(updatedDoor); 
      setUpdateSuccessMessage('Door updated successfully!');
    } catch (err) {
      setUpdateErrorMessage(err.message);
    } finally {
      setIsUpdating(false); 
    }
  };

  if (isLoading) {
    return <p>Loading door details...</p>; 
  }

  return (
    <div>
      <h2>Update Door</h2>

      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="doorName">Name:</label>
          <input
            type="text"
            id="doorName"
            name="doorName"
            value={formValues.doorName}
            onChange={handleFieldChange}
            required
          />
        </div>

        <div>
          <label htmlFor="doorDescription">Description:</label>
          <textarea
            id="doorDescription"
            name="doorDescription"
            value={formValues.doorDescription}
            onChange={handleFieldChange}
            required
          ></textarea>
        </div>

        <button type="submit" disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update Door'}
        </button>
      </form>

      {updateSuccessMessage && <p style={{ color: 'green' }}>{updateSuccessMessage}</p>}
      {updateErrorMessage && <p style={{ color: 'red' }}>{updateErrorMessage}</p>}
    </div>
  );
};

export default UpdateDoor;
