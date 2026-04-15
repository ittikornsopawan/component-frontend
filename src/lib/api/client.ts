import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// ─── API Configuration ────────────────────────────────────────────────────────

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const API_TIMEOUT = 30000; // 30 seconds

// ─── Error Types ───────────────────────────────────────────────────────────────

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// ─── API Client Class ─────────────────────────────────────────────────────────

class ApiClient {
  private client: AxiosInstance;
  private refreshTokenPromise?: Promise<string>;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  // ─── Request Interceptors ───────────────────────────────────────────────────

  private setupInterceptors() {
    // Request interceptor - Add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add request timestamp for debugging
        (config as any).metadata = { startTime: new Date() };
        
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - Handle errors and token refresh
    this.client.interceptors.response.use(
      (response) => {
        // Log response time for monitoring
        const endTime = new Date();
        const duration = endTime.getTime() - (response.config as any).metadata?.startTime?.getTime();
        console.log(`API Response: ${response.config.method?.toUpperCase()} ${response.config.url} - ${duration}ms`);
        
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized - Token refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newToken = await this.refreshToken();
            this.setAuthToken(newToken);
            
            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return this.client(originalRequest);
          } catch (refreshError) {
            // Refresh failed - redirect to login
            this.handleAuthFailure();
            return Promise.reject(refreshError);
          }
        }

        // Handle other errors
        return this.handleError(error);
      }
    );
  }

  // ─── Token Management ───────────────────────────────────────────────────────

  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  }

  private setAuthToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('auth_token', token);
  }

  private async refreshToken(): Promise<string> {
    // Prevent multiple refresh attempts
    if (this.refreshTokenPromise) {
      return this.refreshTokenPromise;
    }

    this.refreshTokenPromise = this.performTokenRefresh();
    
    try {
      const token = await this.refreshTokenPromise;
      return token;
    } finally {
      this.refreshTokenPromise = undefined;
    }
  }

  private async performTokenRefresh(): Promise<string> {
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
        refreshToken,
      });

      const { accessToken } = response.data;
      this.setAuthToken(accessToken);
      
      return accessToken;
    } catch (error) {
      throw new Error('Token refresh failed');
    }
  }

  private handleAuthFailure(): void {
    // Clear tokens
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    
    // Redirect to login (or emit event for routing)
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  // ─── Error Handling ─────────────────────────────────────────────────────────

  private handleError(error: any): Promise<ApiError> {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      const message = data?.message || `HTTP ${status} Error`;
      const code = data?.code;
      const details = data?.details;

      return Promise.reject(new ApiError(message, status, code, details));
    } else if (error.request) {
      // Network error
      return Promise.reject(new ApiError('Network error - please check your connection'));
    } else {
      // Other error
      return Promise.reject(new ApiError(error.message || 'Unknown error occurred'));
    }
  }

  // ─── HTTP Methods ───────────────────────────────────────────────────────────

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  // ─── File Upload ───────────────────────────────────────────────────────────

  async uploadFile<T = any>(url: string, file: File, onProgress?: (progress: number) => void): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    };

    const response = await this.client.post<T>(url, formData, config);
    return response.data;
  }

  // ─── Utility Methods ───────────────────────────────────────────────────────

  setBaseURL(baseURL: string): void {
    this.client.defaults.baseURL = baseURL;
  }

  setTimeout(timeout: number): void {
    this.client.defaults.timeout = timeout;
  }

  setDefaultHeader(key: string, value: string): void {
    this.client.defaults.headers.common[key] = value;
  }

  removeDefaultHeader(key: string): void {
    delete this.client.defaults.headers.common[key];
  }
}

// ─── Export Types ─────────────────────────────────────────────────────────────

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  code?: string;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ─── Mock Services (for development) ───────────────────────────────────────────

export class MockApiClient {
  private delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Mock data storage
  private documents = [
    {
      id: 'doc-1',
      name: 'Employment Agreement.pdf',
      fileUrl: '/sample-document.pdf',
      fileSize: 2546576, // 2.4MB
      uploadedAt: new Date('2024-04-01'),
      status: 'completed',
      signers: [
        { id: 'signer-1', name: 'John Doe', email: 'john@example.com', role: 'primary', order: 1, status: 'signed' },
        { id: 'signer-2', name: 'Jane Smith', email: 'jane@example.com', role: 'secondary', order: 2, status: 'signed' }
      ],
      witnesses: [],
      auditTrail: [],
      certificate: { id: 'cert-1', selfSigned: true },
      lockedAt: new Date('2024-04-01T10:30:00'),
      completedAt: new Date('2024-04-01T10:45:00')
    },
    {
      id: 'doc-2',
      name: 'NDA Template.pdf',
      fileUrl: '/sample-document.pdf',
      fileSize: 1258291, // 1.2MB
      uploadedAt: new Date('2024-04-02'),
      status: 'pending',
      signers: [
        { id: 'signer-3', name: 'Mike Johnson', email: 'mike@example.com', role: 'primary', order: 1, status: 'pending' }
      ],
      witnesses: [],
      auditTrail: [],
      certificate: null,
      lockedAt: null,
      completedAt: null
    },
    {
      id: 'doc-3',
      name: 'Service Contract.pdf',
      fileUrl: '/sample-document.pdf',
      fileSize: 3984592, // 3.8MB
      uploadedAt: new Date('2024-04-03'),
      status: 'draft',
      signers: [
        { id: 'signer-4', name: 'Sarah Wilson', email: 'sarah@example.com', role: 'primary', order: 1, status: 'pending' },
        { id: 'signer-5', name: 'Tom Brown', email: 'tom@example.com', role: 'secondary', order: 2, status: 'pending' }
      ],
      witnesses: [],
      auditTrail: [],
      certificate: null,
      lockedAt: null,
      completedAt: null
    }
  ];

  private templates = [
    {
      id: 'template-1',
      name: 'Employment Agreement',
      description: 'Standard employment contract template',
      category: 'HR',
      fileUrl: '/sample-document.pdf',
      thumbnailUrl: '/api/placeholder/200/280',
      fields: [],
      version: 1,
      active: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      createdBy: 'admin-1'
    },
    {
      id: 'template-2',
      name: 'NDA Template',
      description: 'Non-disclosure agreement template',
      category: 'Legal',
      fileUrl: '/sample-document.pdf',
      thumbnailUrl: '/api/placeholder/200/280',
      fields: [],
      version: 1,
      active: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      createdBy: 'admin-1'
    }
  ];

  async get<T>(url: string, options?: any): Promise<T> {
    await this.delay();
    
    // Mock document retrieval
    if (url.includes('/documents/')) {
      const docId = url.split('/').pop();
      const doc = this.documents.find(d => d.id === docId);
      if (doc) return doc as T;
    }
    
    // Mock documents list
    if (url.includes('/documents')) {
      return {
        data: this.documents,
        pagination: { page: 1, limit: 10, total: this.documents.length, totalPages: 1 }
      } as T;
    }
    
    // Mock templates
    if (url.includes('/templates')) {
      return {
        data: this.templates,
        pagination: { page: 1, limit: 10, total: this.templates.length, totalPages: 1 }
      } as T;
    }
    
    throw new Error('Mock API endpoint not implemented');
  }

  async post<T>(url: string, data?: any): Promise<T> {
    await this.delay();
    
    // Mock authentication
    if (url.includes('/auth/login')) {
      return {
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        user: { id: 'user-1', name: 'Demo User', email: 'demo@example.com', role: 'user' }
      } as T;
    }
    
    // Mock document creation
    if (url.includes('/documents/upload')) {
      const newDoc = {
        id: `doc-${Date.now()}`,
        name: data?.name || 'Uploaded Document.pdf',
        fileUrl: URL.createObjectURL(data?.file || new Blob()),
        fileSize: data?.file?.size || 1000000,
        uploadedAt: new Date(),
        status: 'draft',
        signers: [],
        witnesses: [],
        auditTrail: [],
        certificate: null,
        lockedAt: null,
        completedAt: null
      };
      this.documents.push(newDoc);
      return newDoc as T;
    }
    
    throw new Error('Mock API endpoint not implemented');
  }

  async put<T>(url: string, data?: any): Promise<T> {
    await this.delay();
    // Mock implementation
    return {} as T;
  }

  async patch<T>(url: string, data?: any): Promise<T> {
    await this.delay();
    
    // Mock document update
    if (url.includes('/documents/')) {
      const parts = url.split('/');
      const docId = parts[2];
      const doc = this.documents.find(d => d.id === docId);
      if (doc) {
        Object.assign(doc, data);
        return doc as T;
      }
    }
    
    return {} as T;
  }

  async delete<T>(url: string): Promise<T> {
    await this.delay();
    
    // Mock document deletion
    if (url.includes('/documents/')) {
      const docId = url.split('/').pop();
      const index = this.documents.findIndex(d => d.id === docId);
      if (index > -1) {
        this.documents.splice(index, 1);
      }
    }
    
    return {} as T;
  }

  async uploadFile<T>(url: string, file: File, onProgress?: (progress: number) => void): Promise<T> {
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await this.delay(50);
      onProgress?.(i);
    }
    
    // Mock response
    const newDoc = {
      id: `doc-${Date.now()}`,
      name: file.name,
      fileUrl: URL.createObjectURL(file),
      fileSize: file.size,
      uploadedAt: new Date(),
      status: 'draft',
      signers: [],
      witnesses: [],
      auditTrail: [],
      certificate: null,
      lockedAt: null,
      completedAt: null
    };
    
    this.documents.push(newDoc);
    return newDoc as T;
  }
}

// ─── Export Mock API as Default ───────────────────────────────────────────────

export const mockApiClient = new MockApiClient();
export const apiClient = mockApiClient;

// ─── Export Real API (for future use) ─────────────────────────────────────────--

export const realApiClient = new ApiClient();
