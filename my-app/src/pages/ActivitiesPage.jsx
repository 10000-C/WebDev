import React, { useState, useEffect, useContext } from 'react';
import Header from '../widget/Header';
import ActivityCard from '../components/ActivityCard';
import { useApi } from '../context/ApiContext';
import SearchBox from '../components/SearchBox';
import Button from '../components/Button';
import Modal from '../widget/Modal';
import ActivityForm from '../components/ActivityForm';
import { useNavigate } from 'react-router-dom';

function ActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [triggerSearch, setTriggerSearch] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isParticipant, setIsParticipant] = useState([]);// 下标为 aid
  const apiClient = useApi();
  const navigate = useNavigate();
  const userData = apiClient.getUserData();

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

  const handleFormSubmit = async (formData) => {
    try {
      await apiClient.post('/activities/create', formData);
      alert('活动创建成功！');
      setIsModalOpen(false); // 关闭模态框
      setTriggerSearch(prev => prev + 1); // 刷新活动列表
    } catch (error) {
      console.error('创建活动失败:', error);
      alert(`创建活动失败: ${error.message}`);
    }
  }; 
  const handleApplication = async (activity) => {
    const isParticipant = checkIsParticipant(activity);
    const activityId = activity.id;
    if(!isParticipant){
      try {
        console.log('申请活动:', activityId);
        const params = {aid: activityId};
        await apiClient.get('/activities/application', params);
        alert('报名成功！');
        setTriggerSearch(prev => prev + 1); // 刷新活动列表
      } catch (error) {
        console.error('报名失败:', error);
        alert(`报名失败: ${error.message}`);
      }
    }
    else{
      try {
        console.log('取消活动:', activityId);
        const params = {aid: activityId};
        await apiClient.get('/activities/cancel', params);
        alert('取消成功！');
        setTriggerSearch(prev => prev + 1); // 刷新活动列表
      } catch (error) {
        console.error('取消失败:', error);
        alert(`取消失败: ${error.message}`);
      }
    }
};
  const checkIsParticipant = (activity) => {
      console.log('activity', activity);
      if (!userData) {
         return false;
      }
      if(activity.participantList.length > 0) {
        for(const cuUid of activity.participantList)
          if(cuUid == userData.id)
            return true;
      }

      return false;
  }
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
              onClick={() => setIsModalOpen(true)}
            >
              创建活动
            </Button>
          </div>
          {/*模态框和表单 */}
          {isModalOpen && (
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <ActivityForm 
                onSubmit={handleFormSubmit} 
                onCancel={() => setIsModalOpen(false)} 
              />
            </Modal>
          )}
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
                    date={activity.date}
                    description={activity.description}
                    location={activity.location}
                    price={activity.price}
                    cuNumber={activity.currentParticipants}
                    limitNumber={activity.maxParticipants}
                    isParticipant={checkIsParticipant(activity)}
                    onApplyClick={() => handleApplication(activity)}
                    onDetailClick={() => navigate(`/activities/${activity.id}`)}
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

export default ActivitiesPage
