import React from 'react';
import Button from './Button';

const ActivityCard = ({ 
  title,
  description,
  location,
  price,
  date, 
  cuNumber,
  limitNumber,
  onDetailClick,
  onApplyClick
}) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-md p-6 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center w-full transition-all duration-300 hover:shadow-lg"
    >
      {/* 左侧活动信息 */}
      <div className="flex-1 mb-4 md:mb-0">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-3">{description}</p>
        
        <div className="flex flex-wrap gap-4">
          {/* 日期信息 */}
          <div className="flex items-center">
            <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-600">{date}</span>
          </div>
          
          <div className="flex items-center">
            <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-gray-600">{location}</span>
          </div>
          
          <div className="flex items-center">
            <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-600">{price}</span>
          </div>
        </div>
      </div>
      
      {/* 右侧按钮区域*/}
      <div className="flex flex-col items-end space-y-2">
        <div className="mb-2">
          <span className="text-blue-600 font-bold">{cuNumber}</span>
          <span className="text-gray-500"> / {limitNumber} 人</span>
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onDetailClick && onDetailClick();
          }}
        >
          查看详情
        </Button>
        
        <Button 
          variant="primary" 
          size="sm"
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onApplyClick && onApplyClick();
          }}
        >
          报名
        </Button>
      </div>
    </div>
  );
};

export default ActivityCard;