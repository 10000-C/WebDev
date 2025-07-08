import React from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom'; // 引入路由导航钩子

function Header() {
  const navigate = useNavigate(); // 获取导航函数

  return (
    <div className='flex justify-between items-center h-10'>
      <div className='flex items-center' onClick={() => navigate('/')}>
        <img
           src="src/assets/react.svg"
           alt="logo"
           className='h-8 w-8'
        />
        <h1 className='ml-4 text-4xl font-black text-black'>Baller</h1>
      </div>
      <nav className='flex items-center'>
        {/* 登录按钮 - 添加onClick事件 */}
        <div className='mr-4'>
          <Button 
            variant='outline' 
            size='md'
            onClick={() => navigate('/login')} // 跳转到登录页
          >
            Login
          </Button>
        </div>
        {/* 注册按钮 - 同样处理 */}
        <div>
          <Button 
            variant='primary' 
            size='md'
            onClick={() => navigate('/register')} // 示例注册页跳转
          >
            Register
          </Button>
        </div>
      </nav>
    </div>
  );
}

export default Header;