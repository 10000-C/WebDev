// src/components/ActivityForm.jsx
import React, { useState } from 'react';
import InputField from './InputField';
import Button from './Button';

const ActivityForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    price: '',
    maxParticipants: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-xl font-bold mb-4">创建活动</h3>

      <InputField
        label="活动名称"
        name="name"
        placeholder="输入活动名称"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <InputField
        label="描述"
        name="description"
        placeholder="输入活动描述"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <InputField
        label="地点"
        name="location"
        placeholder="输入活动地点"
        value={formData.location}
        onChange={handleChange}
        required
      />

      <InputField
        label="价格"
        name="price"
        type="number"
        placeholder="输入价格"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <InputField
        label="最大参与人数"
        name="maxParticipants"
        type="number"
        placeholder="输入最大人数"
        value={formData.maxParticipants}
        onChange={handleChange}
        required
      />

      <div className="flex justify-end gap-4 mt-6">
        <Button variant="outline" onClick={onCancel} type="button">
          取消
        </Button>
        <Button variant="primary" type="submit">
          提交
        </Button>
      </div>
    </form>
  );
};

export default ActivityForm;