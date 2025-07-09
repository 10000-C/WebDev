// src/context/ApiContext.jsx
import React, { createContext, useContext } from 'react';
import ApiClient from '../util/ApiClient'; // 引入 ApiClient 实例
const ApiContext = createContext(null);

export const ApiProvider = ({ children }) => {
  // 全局共享同一个 ApiClient 实例
  const apiClient = new ApiClient();
  return (
    <ApiContext.Provider value={apiClient}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);