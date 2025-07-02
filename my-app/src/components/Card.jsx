import React from 'react'

/**
 * props:
 * - image: 图片地址
 * - title: 标题
 * - description: 描述
 * - mode: 'avatar' | 'large'
 * - onClick: 点击事件处理函数
 */
function Card({ image, title, description, mode = 'avatar', onClick }) {
  return (
    <div
      className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center transition-transform duration-200 hover:scale-105 cursor-pointer max-w-xl mx-auto"
      onClick={onClick}
    >
      {mode === 'avatar' ? (
        <img
          src={image}
          alt="avatar"
          className="w-20 h-20 rounded-full mb-4 shadow"
        />
      ) : (
        <img
          src={image}
          alt="large"
          className="w-full h-48 object-cover rounded-xl mb-4 shadow"
        />
      )}
      <h2 className="text-2xl font-bold text-blue-400 mb-2 text-center">{title}</h2>
      <p className="text-lg text-gray-600 text-center">{description}</p>
    </div>
  )
}

export default Card