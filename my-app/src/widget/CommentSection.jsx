import React, { useState } from 'react';
import Comment from './Comment';
import Button from './Button';

const CommentSection = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="mt-8 pt-8 border-t border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-6">评论区</h3>
      
      {/* 评论表单 */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex items-start mb-4">
          {/* 当前用户头像 */}
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
          
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="写下你的评论..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              rows="3"
            />
          </div>
        </div>
        <div className="text-right">
          <Button type="submit" variant="primary">发表评论</Button>
        </div>
      </form>
      
      {/* 评论列表 */}
      <div>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <Comment
              key={index}
              username={comment.username}
              content={comment.content}
              time={comment.time}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">暂无评论，快来发表第一条评论吧！</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;