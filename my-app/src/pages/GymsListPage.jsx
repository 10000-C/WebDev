import React, { useState, useEffect, useContext } from 'react';
import Header from '../widget/Header';
import GymCard from '../components/GymCard';
import { useApi } from '../context/ApiContext'; // 导入API上下文
import SearchBox from '../components/SearchBox';

function GymsListPage() {
  const [gyms, setGyms] = useState([]); // 存储健身房数据
  const [loading, setLoading] = useState(true); // 加载状态
  const [error, setError] = useState(null); // 错误信息
  const apiClient = useApi(); // 获取API客户端实例
  const [triggerSearch, setTriggerSearch] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const fetchGyms = async () => {
      try {
        setLoading(true);
        const params = searchTerm ? { keyword: searchTerm } : {};
        const response = await apiClient.get('/gyms/info', params);
        setGyms(response.data.data);
      } catch (err) {
        setError('Error: ' + err.message);
        console.error('API请求错误:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGyms();
  }, [apiClient, triggerSearch, searchTerm]); 

   const handleSearchTrigger = (term) => {
    setSearchTerm(term);
    setTriggerSearch(prev => prev + 1); // 更新触发标志
  };
  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-r from-blue-500 via-white to-blue-300'>
      <div className='container mx-auto p-4'>
        <Header />
      </div>
      
      {/* 搜索框 */}
      <div className="container mx-auto px-4">
      <div className="mb-6">
        <SearchBox 
          value={searchTerm}
          onChange={handleSearchTrigger} 
          placeholder="press Enter to search gym..."
        />
      </div>
      </div>
  
      <div className="flex-1 container mx-auto p-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-pink-500 text-center mb-6">Gyms List</h1>
          
          {/* 加载状态 */}
          {loading && <div className="text-center py-8">loading...</div>}
          
          {/* 错误提示 */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          {/* 数据展示 */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gyms.length > 0 ? (
                gyms.map((gym) => (
                  <GymCard  
                    key={gym.id}
                    name={gym.name}
                    description={gym.description}
                    location={gym.location || "Unknown location"} 
                    price={gym.price || "Price not available"}   
                    image={gym.imageUrl}
                    rating={gym.rating || 0}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  Can't find data.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GymsListPage;