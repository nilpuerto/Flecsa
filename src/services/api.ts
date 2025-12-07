const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type') || '';
    let data: any = null;
    try {
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        // If HTML or empty, wrap as error-friendly text
        data = { raw: text };
      }
    } catch (e) {
      // Fallback if body isn't JSON
      data = { raw: 'no-body' };
    }

    if (!response.ok) {
      const message = (data && (data.error || data.message)) || 'Error en la petición';
      return { error: message };
    }
    
    return { data, message: data?.message };
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ email, password }),
    });
    return this.handleResponse(response);
  }

  async register(email: string, password: string, name?: string) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ email, password, name }),
    });
    return this.handleResponse(response);
  }

  async logout() {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ refreshToken }),
    });
    return this.handleResponse(response);
  }

  // Document endpoints
  async uploadDocument(file: File, metadata?: {
    provider?: string;
    invoiceNumber?: string;
    currency?: string;
    amount?: string;
    issueDate?: string;
  }) {
    const formData = new FormData();
    formData.append('document', file);
    
    if (metadata) {
      Object.entries(metadata).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
    }

    const response = await fetch(`${API_BASE_URL}/documents/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });
    return this.handleResponse(response);
  }

  async getDocuments(page = 1, limit = 20, search = '') {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
    });

    const response = await fetch(`${API_BASE_URL}/documents?${params}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getTags() {
    const response = await fetch(`${API_BASE_URL}/documents/tags`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getDocument(id: string) {
    const response = await fetch(`${API_BASE_URL}/documents/${id}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async updateDocument(id: string, payload: { filename?: string; issueDate?: string }) {
    const response = await fetch(`${API_BASE_URL}/documents/${id}`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    return this.handleResponse(response);
  }

  getPreviewUrl(id: string) {
    const token = localStorage.getItem('token');
    const sep = '?';
    return `${API_BASE_URL}/documents/${id}/preview${token ? `${sep}token=${encodeURIComponent(token)}` : ''}`;
  }

  getDownloadUrl(id: string) {
    const token = localStorage.getItem('token');
    const sep = '?';
    return `${API_BASE_URL}/documents/${id}/download${token ? `${sep}token=${encodeURIComponent(token)}` : ''}`;
  }

  async deleteDocument(id: string) {
    const response = await fetch(`${API_BASE_URL}/documents/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Search endpoints
  async searchDocuments(query: string, filters?: {
    dateFrom?: string;
    dateTo?: string;
    provider?: string;
    minAmount?: number;
    maxAmount?: number;
    currency?: string;
  }, limit = 20, offset = 0) {
    const response = await fetch(`${API_BASE_URL}/search`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({
        query,
        filters,
        limit,
        offset,
      }),
    });
    return this.handleResponse(response);
  }

  async smartSearch(query: string, limit = 20, offset = 0) {
    const response = await fetch(`${API_BASE_URL}/search/smart`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({
        query,
        limit,
        offset,
      }),
    });
    return this.handleResponse(response);
  }

  async getSearchSuggestions(query: string) {
    const response = await fetch(`${API_BASE_URL}/search/suggestions?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // User profile and credits
  async getUserProfile() {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Payment endpoints
  async createCheckoutSession(data: { type: 'credits' | 'subscription'; amount?: number; price: number; planId?: string }) {
    const response = await fetch(`${API_BASE_URL}/payments/create-checkout-session`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }
}

export const apiService = new ApiService();
export default apiService;
