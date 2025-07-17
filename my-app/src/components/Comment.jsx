import React from 'react';

const Comment = ({ username, content, time }) => {
  // 格式化时间显示
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-100">
      <div className="flex items-start">
        {/* 用户头像 */}
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-bold text-gray-800">{username}</h4>
            <span className="text-gray-500 text-sm">{formatTime(time)}</span>
          </div>
          <p className="text-gray-700">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;