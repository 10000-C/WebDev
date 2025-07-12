import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ApiProvider } from './context/ApiContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const TokenChecker = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {

      const tokenExpiration = JSON.parse(atob(token.split('.')[1])).exp * 1000;
      
      if (Date.now() > tokenExpiration) { // date.now()返回时间戳
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userData');
        console.warn('Token expired, redirecting to login');
        alert('Please login again.');
        navigate('/login');
      }
    }
  }, []); 

  return null; // 不渲染任何内容
};

function App() {
  return (
    <ApiProvider>
      <Router>

        {/* Token检查器 */}
        <TokenChecker />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </ApiProvider>
  );
}

export default App;