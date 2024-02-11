import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingIndicator from './LoadingIndicator';
import '../styles/styles.scss';

const UserCard = () => {
  const [numUsers, setNumUsers] = useState(1);
  const [users, setUsers] = useState([]);
  const [fetching, setFetching] = useState(false);

  const handleChangeNumUsers = (event) => {
    setNumUsers(parseInt(event.target.value));
  };

  const fetchUsers = async () => {
    try {
      setFetching(true);
      const responses = await Promise.all(
        Array.from({ length: numUsers }, () =>
          axios.get('https://randomuser.me/api/')
        )
      );
      const fetchedUsers = responses.map((response) => response.data.results[0]);
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setFetching(false);
    }
  };

  const handleGenerateUsers = () => {
    fetchUsers();
  };

  return (
    <div className="user-container">
      <div className="user-controls">
        <div>
        <label htmlFor="numUsers">Number of users:</label>
        <input
          type="number"
          id="numUsers"
          value={numUsers}
          onChange={handleChangeNumUsers}
          min="1"
          max="10"
        />
        </div>
        <button onClick={handleGenerateUsers} disabled={fetching}>
          {fetching ? 'Fetching...' : 'Generate Users'}
        </button>
      </div>
      <div className="user-cards">
        {fetching ? (
          <LoadingIndicator />
        ) : users.length === 0 ? ( 
          <div className="no-users-message">
            Indica cuántos usuarios quieres generar y presiona el botón
          </div>
        ) : (
          users.map((user, index) => (
            
            <div className="user-card gradient-border"  key={index}>
              <img src={user.picture.large} alt="User" />
              <h2>{`${user.name.title} ${user.name.first} ${user.name.last}`}</h2>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              <p>Location: {`${user.location.city}, ${user.location.country}`}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserCard;
