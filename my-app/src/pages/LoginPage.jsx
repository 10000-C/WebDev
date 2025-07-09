import React ,{useState} from 'react';
import Header from '../widget/Header';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField'; // 引入输入框组件
import { useApi } from '../context/ApiContext';
function LoginPage() {
  const navigate = useNavigate();
  const apiClient = useApi();
  const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
  
  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      email: formData.email,
      password: formData.password,
    };
    apiClient.clearToken();
    try {
      const response = await apiClient.post('/user/login', data);
      apiClient.setToken(response.data.token);
      alert('Login successful!');
      navigate('/'); // 登录成功后重定向到首页
    } catch (error) {
      console.error('Login failed:', error);
      alert(`Login failed: ${error.response?.data?.message || error.message}`);
    }
    
  };
  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-r from-blue-500 via-white to-blue-300'>
      <div className='container mx-auto p-4'>
        <Header />
      </div>

      <div className='flex justify-center items-center flex-1'>
        <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md'>
          <h2 className='text-2xl font-bold text-gray-800 mb-6'>Welcome Back</h2>
          
          <form onSubmit={handleSubmit}>
            <InputField
              label="Email"
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email} // 绑定值
              onChange={handleChange}
              required
            />
            
            <InputField
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password} // 绑定值
              onChange={handleChange}
              required
            />
            
            <button 
              type="submit"
              className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-300'
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