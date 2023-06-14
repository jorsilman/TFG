import React, { useState } from 'react';
import ApiService from '../ApiService';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await ApiService.login(username, password);
      console.log(response); 
      
    } catch (error) {
      setError(error.message); 
      
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form>
        <div>
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div>{error}</div>}
        <button type="button" onClick={handleLogin}>
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default Login;
