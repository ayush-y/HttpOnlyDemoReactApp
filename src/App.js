import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState('admin@test1.com');
  const [password, setPassword] = useState('12345');
  const [message, setMessage] = useState('');
  const [cookie, setCookie] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/signin/passenger', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Include credentials in the fetch request
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const content = await response.json();
      setMessage(`Response: ${JSON.stringify(content)}`);

      // Attempt to read the cookie from the document
      const jwtToken = document.cookie.split('; ').find(row => row.startsWith('JwtToken='));
      const jwtTokenValue = jwtToken ? jwtToken.split('=')[1] : 'No Token Found';
      setCookie(jwtTokenValue);

    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to send request.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <button type="submit">Sign In</button>
        </form>
        <p>{message}</p>
        <p>JWT Token from Cookie: {cookie}</p>
      </header>
    </div>
  );
}

export default App;
