// src/components/ActivityForm.jsx
import React, { useState } from 'react';
import InputField from './InputField';
import Button from './Button';

// 日期验证工具函数
const isValidDate = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

const ActivityForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    date: '', // 确保包含date字段
    price: '',
    maxParticipants: ''
  });

  const [errors, setErrors] = useState({}); // 错误状态

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // 清除该字段的错误状态
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 表单验证
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "活动名称不能为空";
    }
    if (!formData.description.trim()) {
      newErrors.description = "描述不能为空";
    }
    if (!formData.location.trim()) {
      newErrors.location = "地点不能为空";
    }
    if (!formData.date) {
      newErrors.date = "请选择日期";
    } else if (!isValidDate(formData.date)) {
      newErrors.date = "请输入有效的日期格式 (YYYY-MM-DD)";
    }
    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "请输入有效的价格";
    }
    if (!formData.maxParticipants || Number(formData.maxParticipants) <= 0) {
      newErrors.maxParticipants = "请输入有效的人数";
    }
    
    // 如果有错误则停止提交
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-6 text-center">创建活动</h3>

      <div className="space-y-4">
        <InputField
          label="活动名称"
          name="name"
          placeholder="输入活动名称"
          value={formData.name}
          onChange={handleChange}
          required
          error={errors.name}
        />

        <InputField
          label="描述"
          name="description"
          placeholder="输入活动描述"
          value={formData.description}
          onChange={handleChange}
          required
          textarea
          rows={3}
          error={errors.description}
        />

        <InputField
          label="地点"
          name="location"
          placeholder="输入活动地点"
          value={formData.location}
          onChange={handleChange}
          required
          error={errors.location}
        />

        <InputField
          label="日期"
          name="date"
          placeholder="输入活动日期 (YYYY-MM-DD)"
          value={formData.date}
          onChange={handleChange}
          required
          error={errors.date}
          infoText="请使用 YYYY-MM-DD 格式，例如：2023-10-15"
        />

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="价格"
            name="price"
            type="number"
            placeholder="输入价格"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            error={errors.price}
          />

          <InputField
            label="最大参与人数"
            name="maxParticipants"
            type="number"
            placeholder="输入最大人数"
            value={formData.maxParticipants}
            onChange={handleChange}
            required
            min="1"
            error={errors.maxParticipants}
          />
        </div>

        <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-gray-200">
          <Button variant="outline" onClick={onCancel} type="button">
            取消
          </Button>
          <Button variant="primary" type="submit">
            提交
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ActivityForm;