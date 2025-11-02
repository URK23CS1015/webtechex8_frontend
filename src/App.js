import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseURL = 'http://localhost:5000'; // Change this URL when deployed

function App() {
  const [donations, setDonations] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const fetchDonations = async () => {
    const res = await axios.get(`${baseURL}/donations`);
    setDonations(res.data);
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!name || !amount) return alert('Fill all fields');
    await axios.post(`${baseURL}/donate`, { name, amount: Number(amount) });
    setName('');
    setAmount('');
    fetchDonations();
  };

  const handleDelete = async id => {
    await axios.delete(`${baseURL}/donation/${id}`);
    fetchDonations();
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: 'auto' }}>
      <h1>Donation Platform</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Your Name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          required 
          style={{ width: '100%', marginBottom: 10 }}
        />
        <input 
          type="number" 
          placeholder="Donation Amount" 
          value={amount} 
          onChange={e => setAmount(e.target.value)} 
          required 
          style={{ width: '100%', marginBottom: 10 }}
        />
        <button type="submit">Donate</button>
      </form>

      <h2>Donations</h2>
      <ul>
        {donations.map(d => (
          <li key={d._id}>
            {d.name} donated ${d.amount.toFixed(2)} 
            <button onClick={() => handleDelete(d._id)} style={{ marginLeft: 10 }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
