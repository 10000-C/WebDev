import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../context/ApiContext';
import Header from '../widget/Header';
import Button from '../components/Button';
import CommentSection from '../widget/CommentSection';

function ActivityDetailPage() {
  const { activityId } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiClient = useApi();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);

  const handleAddComment = async (content) => {
    const userData = apiClient.getUserData();
    const userName = userData.name;
    const uid = userData.id;
    const newComment = {
      content: content,
      uid: uid,
      aid: activityId,
      username: userName,
    };
    try{
      await apiClient.post('/comment/create', newComment);
      const response = await apiClient.get('/comment/info', { aid: activityId });
      let commentData = response.data.data;
      setComments(commentData);
      console.log('评论添加成功:', commentData);
    }catch(error){
      console.error('Error adding comment:', error);
    }
    
  };
  useEffect(() => {
    const fetchActivityDetails = async () => {
      try {
        setLoading(true);
        const params = { aid: activityId };
        const response = await apiClient.get('/activities/info', params);
        setActivity(response.data.data || null);
      } catch (err) {
        setError('获取活动详情失败: ' + err.message);
        console.error('API请求错误:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchActivityDetails();
    const fetchComments = async () => {
      try {
        const response = await apiClient.get('/comment/info', { aid: activityId });
        setComments(response.data.data || []);
      } catch (err) {
        console.error('获取评论失败:', err);
      }

    };
    fetchComments();
  }, [apiClient, activityId, setComments]);

  const handleApplication = async () => {
    try {
      const params = { aid: activityId };
      await apiClient.get('/activities/application', params);
      alert('报名成功！');
      // 刷新详情数据
      const response = await apiClient.get('/activities/info', params);
      setActivity(response.data.data || null);
    } catch (error) {
      console.error('报名失败:', error);
      alert(`报名失败: ${error.message}`);
    }
  };

  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-r from-blue-500 via-white to-blue-300'>
      <div className='container mx-auto p-4'>
        <Header />
      </div>
      
      <div className="flex-1 container mx-auto p-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* 返回按钮 */}
          <Button 
            variant="text" 
            className="mb-4 flex items-center"
            onClick={() => navigate(-1)}
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回活动列表
          </Button>
          
          {loading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          {!loading && !error && activity && (
            <div className="bg-white rounded-xl shadow-md p-8">
              {/* 活动标题 */}
              <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">{activity.name}</h1>
              
              {/* 活动描述 */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-3">活动描述</h2>
                <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">
                  {activity.description}
                </p>
              </div>
              
              {/* 详细信息网格 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* 地点 */}
                <div className="flex items-start bg-blue-50 p-4 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">地点</h3>
                    <p className="text-gray-800 text-lg">{activity.location}</p>
                  </div>
                </div>
                
                {/* 费用 */}
                <div className="flex items-start bg-blue-50 p-4 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">费用</h3>
                    <p className="text-gray-800 text-lg">¥{activity.price}</p>
                  </div>
                </div>
                
                {/* 时间 */}
                <div className="flex items-start bg-blue-50 p-4 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">时间</h3>
                    <p className="text-gray-800 text-lg">{activity.date}</p>
                  </div>
                </div>
                
                {/* 参与人数 */}
                <div className="flex items-start bg-blue-50 p-4 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">参与人数</h3>
                    <p className="text-gray-800 text-lg">
                      <span className="text-blue-600 font-bold">{activity.currentParticipants}</span>
                      <span> / {activity.maxParticipants} 人</span>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* 报名按钮 */}
              <div className="flex justify-center mt-8 pt-6 border-t">
                <Button 
                  variant="primary" 
                  onClick={handleApplication}
                  className="px-8 py-3 text-lg font-bold"
                >
                  立即报名
                </Button>
              </div>
            

            {/* 新增评论区 */}
              <CommentSection 
                comments={comments} 
                onAddComment={handleAddComment} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActivityDetailPage;