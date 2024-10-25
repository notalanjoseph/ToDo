import { useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const response = await api.post('/users/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      localStorage.setItem('token', response.data.access_token);
      navigate('/home');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users', { email: username, password });
      alert('User signed up successfully');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <form>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <div>
        <button type="submit" onClick={handleLogin}>Log In</button>
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    </form>
  );
};

export default Auth;
