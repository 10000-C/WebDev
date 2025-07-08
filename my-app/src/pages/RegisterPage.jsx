import React, { useState } from 'react';
import Header from '../widget/Header';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField'; // 引入新组件
import bcry from 'bcryptjs'; // 引入bcrypt用于密码哈希

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    const salt = bcry.genSaltSync(10);
    const hashedPassword = bcry.hashSync(formData.password, salt);

    const data={
        username: formData.username,
        email: formData.email,
        password: hashedPassword,
    };

    // todo: send data to backend for registration
    navigate('/login');
  };

  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-r from-blue-500 via-white to-blue-300'>
      <div className='container mx-auto p-4'>
        <Header />
      </div>

      <div className='flex justify-center items-center flex-1 py-8'>
        <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md'>
          <h2 className='text-2xl font-bold text-gray-800 mb-6'>Create Account</h2>
          
          <form onSubmit={handleSubmit}>
            {/* 使用InputField组件 */}
            <InputField
              label="Username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            
            <InputField
              label="Email"
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            
            <InputField
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              minLength="6"
              required
            />
            
            <InputField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            
            <button 
              type="submit" //标注了type="submit"的按钮会在点击时触发onSubmit
              className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-300'
            >
              Create Account
            </button>
          </form>
          
          <div className='mt-4 text-center'>
            <p className='text-gray-600 text-sm'>
              Already have an account? 
              <a 
                href="#" 
                className='text-blue-500 hover:underline ml-1'
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/login');
                }}
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;