import React, { useState, useEffect } from 'react';
import UpdateItem from './components/UpdateItem';


const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {

  const [door, setDoor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchDoor = async () => {
      try {
        const response = await fetch(`${API_URI}/1`); 
        if (!response.ok) {
          throw new Error('Failed to fetch door data');
        }
        const data = await response.json();
        setDoor(data); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchDoor();
  }, []);

 
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
    
      {door && <UpdateItem item={door} setItem={setDoor} />}
    </div>
  );
}

export default App;
