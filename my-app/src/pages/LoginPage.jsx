import React from 'react';
import Header from '../widget/Header';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField'; // 引入输入框组件

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-r from-blue-500 via-white to-blue-300'>
      <div className='container mx-auto p-4'>
        <Header />
      </div>

      <div className='flex justify-center items-center flex-1'>
        <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md'>
          <h2 className='text-2xl font-bold text-gray-800 mb-6'>Welcome Back</h2>
          
          <form>
            {/* 替换为InputField组件 */}
            <InputField
              label="Email"
              type="email"
              placeholder="your@email.com"
            />
            
            {/* 替换为InputField组件 */}
            <InputField
              label="Password"
              type="password"
              placeholder="••••••••"
            />
            
            <button 
              type="submit"
              className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-300'
              onClick={(e) => {
                e.preventDefault();
                navigate('/dashboard'); // 登录后跳转
              }}
            >
              Sign In
            </button>
          </form>
          
          <div className='mt-4 text-center'>
            <a 
              href="#" 
              className='text-blue-500 hover:underline text-sm'
              onClick={() => navigate('/register')}
            >
              Create new account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;