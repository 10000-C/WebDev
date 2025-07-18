import axios from 'axios';

class ApiClient {
  constructor() {
    // 使用环境变量或默认值
    const baseURL = import.meta.env.VITE_API_BASE_URL || 
                    window.env?.REACT_APP_API_BASE_URL || 
                    'http://127.0.0.1:7001/';
    
    this.instance = axios.create({
      baseURL,
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' }
    });  // <-- 添加闭合括号

    window.addEventListener('storage', (event) => {
      if (event.key === 'jwtToken') {
      }
    });

    // 请求拦截器：自动注入JWT
    this.instance.interceptors.request.use(
      config => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    // 响应拦截器：处理401错误
    this.instance.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          this.handleUnauthorized();
        }
        return Promise.reject(error);
      }
    );
  }

  setUserData(data) {
    localStorage.setItem('userData',JSON.stringify(data));
  }  
  setToken(token) {
    localStorage.setItem('jwtToken', token);
  }
  getUserData() {
    const data = localStorage.getItem('userData');
    try {
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Failed to parse userData:', e);
      return null;
    }
  }  
  getToken() {
    return localStorage.getItem('jwtToken');
  }

  clearUserData() {
    localStorage.removeItem('userData');
  }
  clearToken() {
    localStorage.removeItem('jwtToken');
  }

  handleUnauthorized() {
    this.clearToken();
    console.warn('Session expired, please login again');
    // 实际应用中应重定向到登录页
    // window.location.href = '/login';
  }

  async handleResponse(promise) {
    try {
      const response = await promise;
      const data = response.data;// 后端返回的信息存储在response.data中
      if(!data.success) {
        throw new Error(data.message);
      }
      return response;
    } catch (error) {
      if (error.response?.status === 401) {
        this.handleUnauthorized();
      }
      throw error;
    }
  }
  async get(url, params = {}) {
    return await this.handleResponse(this.instance.get(url, { params }));
  }

  async post(url, data) {
    return await this.handleResponse(this.instance.post(url, data));
  }

  put(url, data) {
    return this.instance.put(url, data);
  }

  delete(url) {
    return this.instance.delete(url);
  }
}

export default ApiClient;