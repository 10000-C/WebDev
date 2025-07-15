import React, { useState, useEffect, useContext } from 'react';
import Header from '../widget/Header';
import ActivityCard from '../components/ActivityCard';
import { useApi } from '../context/ApiContext';
import SearchBox from '../components/SearchBox';
import Button from '../components/Button';

function ActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [triggerSearch, setTriggerSearch] = useState(0);
  const apiClient = useApi();

  // 获取活动数据
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const params = searchTerm ? { keyword: searchTerm } : {};
        const response = await apiClient.get('/activities/info', params);
        setActivities(response.data.data || []);
      } catch (err) {
        setError('获取活动数据失败: ' + err.message);
        console.error('API请求错误:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchActivities();
  }, [apiClient, triggerSearch]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setTriggerSearch(prev => prev + 1);
  };

  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-r from-blue-500 via-white to-blue-300'>
      <div className='container mx-auto p-4'>
        <Header />
      </div>
      
      {/* 搜索框 */}
      <div className="container mx-auto px-4 mt-4">
        <div className="mb-6">
          <SearchBox 
            value={searchTerm}
            onChange={handleSearch} 
            placeholder="输入活动名称搜索..."
          />
        </div>
      </div>
  
      <div className="flex-1 container mx-auto p-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* 活动顶栏 */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">所有活动</h1>
            <Button 
              variant="primary"
              onClick={() => console.log('跳转到创建活动页面')}
            >
              创建活动
            </Button>
          </div>
          
          {/* 加载状态 */}
          {loading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          
          {/* 错误提示 */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          {/* 活动列表 */}
          {!loading && !error && (
            <div className="space-y-4">
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    title={activity.name}
                    description={activity.description}
                    location={activity.location}
                    price={activity.price}
                    cuNumber={activity.currentParticipants}
                    limitNumber={activity.maxParticipants}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  暂无活动数据
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActivitiesPage;