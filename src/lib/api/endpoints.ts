import { apiClient, ApiResponse, PaginatedResponse } from './client';
import type {
  ESignDocument,
  Signer,
  Witness,
  DigitalCertificate,
  AuditEntry,
  Template,
  SigningState,
  DocumentField,
} from '@/components/document/types';

// ─── Document Endpoints ─────────────────────────────────────────────────────────

export const documentsApi = {
  // Upload and create document
  uploadDocument: async (file: File, onProgress?: (progress: number) => void) => {
    return apiClient.uploadFile<ESignDocument>('/documents/upload', file, onProgress);
  },

  // Get document by ID
  getDocument: async (id: string) => {
    return apiClient.get<ESignDocument>(`/documents/${id}`);
  },

  // Get user's documents
  getDocuments: async (page = 1, limit = 10) => {
    return apiClient.get<PaginatedResponse<ESignDocument>>(`/documents?page=${page}&limit=${limit}`);
  },

  // Update document
  updateDocument: async (id: string, data: Partial<ESignDocument>) => {
    return apiClient.patch<ESignDocument>(`/documents/${id}`, data);
  },

  // Delete document
  deleteDocument: async (id: string) => {
    return apiClient.delete(`/documents/${id}`);
  },

  // Lock document (after signing)
  lockDocument: async (id: string) => {
    return apiClient.post<ESignDocument>(`/documents/${id}/lock`);
  },

  // Download signed document
  downloadDocument: async (id: string) => {
    return apiClient.get<Blob>(`/documents/${id}/download`, {
      responseType: 'blob',
    });
  },

  // Get document audit trail
  getAuditTrail: async (id: string) => {
    return apiClient.get<AuditEntry[]>(`/documents/${id}/audit-trail`);
  },
};

// ─── Signer Endpoints ─────────────────────────────────────────────────────────

export const signersApi = {
  // Add signer to document
  addSigner: async (documentId: string, signer: Omit<Signer, 'id'>) => {
    return apiClient.post<Signer>(`/documents/${documentId}/signers`, signer);
  },

  // Update signer
  updateSigner: async (documentId: string, signerId: string, data: Partial<Signer>) => {
    return apiClient.patch<Signer>(`/documents/${documentId}/signers/${signerId}`, data);
  },

  // Remove signer
  removeSigner: async (documentId: string, signerId: string) => {
    return apiClient.delete(`/documents/${documentId}/signers/${signerId}`);
  },

  // Get signer details
  getSigner: async (documentId: string, signerId: string) => {
    return apiClient.get<Signer>(`/documents/${documentId}/signers/${signerId}`);
  },

  // Send signing invitation
  sendInvitation: async (documentId: string, signerId: string) => {
    return apiClient.post(`/documents/${documentId}/signers/${signerId}/invite`);
  },

  // Resend invitation
  resendInvitation: async (documentId: string, signerId: string) => {
    return apiClient.post(`/documents/${documentId}/signers/${signerId}/resend`);
  },
};

// ─── Witness Endpoints ───────────────────────────────────────────────────────

export const witnessesApi = {
  // Add witness to signer
  addWitness: async (documentId: string, signerId: string, witness: Omit<Witness, 'id'>) => {
    return apiClient.post<Witness>(`/documents/${documentId}/signers/${signerId}/witnesses`, witness);
  },

  // Update witness
  updateWitness: async (documentId: string, signerId: string, witnessId: string, data: Partial<Witness>) => {
    return apiClient.patch<Witness>(`/documents/${documentId}/signers/${signerId}/witnesses/${witnessId}`, data);
  },

  // Remove witness
  removeWitness: async (documentId: string, signerId: string, witnessId: string) => {
    return apiClient.delete(`/documents/${documentId}/signers/${signerId}/witnesses/${witnessId}`);
  },
};

// ─── Signing Workflow Endpoints ───────────────────────────────────────────────

export const signingApi = {
  // Start signing process
  startSigning: async (documentId: string, signerId: string) => {
    return apiClient.post<SigningState>(`/documents/${documentId}/signers/${signerId}/sign`);
  },

  // Accept terms
  acceptTerms: async (documentId: string, signerId: string) => {
    return apiClient.post<SigningState>(`/documents/${documentId}/signers/${signerId}/accept-terms`);
  },

  // Submit signature
  submitSignature: async (documentId: string, signerId: string, signatureData: string) => {
    return apiClient.post<SigningState>(`/documents/${documentId}/signers/${signerId}/signature`, {
      signatureData,
    });
  },

  // Submit witness signature
  submitWitnessSignature: async (documentId: string, signerId: string, witnessId: string, signatureData: string) => {
    return apiClient.post<SigningState>(`/documents/${documentId}/signers/${signerId}/witnesses/${witnessId}/signature`, {
      signatureData,
    });
  },

  // Confirm signing
  confirmSigning: async (documentId: string, signerId: string) => {
    return apiClient.post<SigningState>(`/documents/${documentId}/signers/${signerId}/confirm`);
  },

  // Get signing state
  getSigningState: async (documentId: string, signerId: string) => {
    return apiClient.get<SigningState>(`/documents/${documentId}/signers/${signerId}/state`);
  },

  // Decline to sign
  declineSigning: async (documentId: string, signerId: string, reason: string) => {
    return apiClient.post<SigningState>(`/documents/${documentId}/signers/${signerId}/decline`, { reason });
  },
};

// ─── Certificate Endpoints ───────────────────────────────────────────────────

export const certificatesApi = {
  // Generate self-signed certificate
  generateCertificate: async (signerId: string, signerInfo: { name: string; email: string }) => {
    return apiClient.post<DigitalCertificate>('/certificates/generate', {
      signerId,
      signerInfo,
    });
  },

  // Validate certificate
  validateCertificate: async (certificateId: string) => {
    return apiClient.post<{ valid: boolean; details: any }>(`/certificates/${certificateId}/validate`);
  },

  // Get certificate by ID
  getCertificate: async (certificateId: string) => {
    return apiClient.get<DigitalCertificate>(`/certificates/${certificateId}`);
  },

  // Revoke certificate
  revokeCertificate: async (certificateId: string, reason: string) => {
    return apiClient.post(`/certificates/${certificateId}/revoke`, { reason });
  },
};

// ─── Template Endpoints ───────────────────────────────────────────────────────

export const templatesApi = {
  // Get all templates
  getTemplates: async (category?: string, page = 1, limit = 10) => {
    const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
    if (category) params.append('category', category);
    
    return apiClient.get<PaginatedResponse<Template>>(`/templates?${params}`);
  },

  // Get template by ID
  getTemplate: async (id: string) => {
    return apiClient.get<Template>(`/templates/${id}`);
  },

  // Create new template
  createTemplate: async (template: Omit<Template, 'id' | 'createdAt' | 'updatedAt' | 'version'>) => {
    return apiClient.post<Template>('/templates', template);
  },

  // Update template
  updateTemplate: async (id: string, data: Partial<Template>) => {
    return apiClient.patch<Template>(`/templates/${id}`, data);
  },

  // Delete template
  deleteTemplate: async (id: string) => {
    return apiClient.delete(`/templates/${id}`);
  },

  // Upload template file
  uploadTemplateFile: async (file: File, onProgress?: (progress: number) => void) => {
    return apiClient.uploadFile<{ url: string; id: string }>('/templates/upload', file, onProgress);
  },

  // Create document from template
  createFromTemplate: async (templateId: string, documentName: string) => {
    return apiClient.post<ESignDocument>('/templates/create-document', {
      templateId,
      documentName,
    });
  },

  // Get template categories
  getCategories: async () => {
    return apiClient.get<string[]>('/templates/categories');
  },
};

// ─── Field Management Endpoints ───────────────────────────────────────────────

export const fieldsApi = {
  // Add field to document
  addField: async (documentId: string, field: Omit<DocumentField, 'id'>) => {
    return apiClient.post<DocumentField>(`/documents/${documentId}/fields`, field);
  },

  // Update field
  updateField: async (documentId: string, fieldId: string, data: Partial<DocumentField>) => {
    return apiClient.patch<DocumentField>(`/documents/${documentId}/fields/${fieldId}`, data);
  },

  // Delete field
  deleteField: async (documentId: string, fieldId: string) => {
    return apiClient.delete(`/documents/${documentId}/fields/${fieldId}`);
  },

  // Update field value
  updateFieldValue: async (documentId: string, fieldId: string, value: string) => {
    return apiClient.patch<DocumentField>(`/documents/${documentId}/fields/${fieldId}/value`, {
      value,
    });
  },

  // Get document fields
  getFields: async (documentId: string, pageIndex?: number) => {
    const params = pageIndex ? `?pageIndex=${pageIndex}` : '';
    return apiClient.get<DocumentField[]>(`/documents/${documentId}/fields${params}`);
  },
};

// ─── Authentication Endpoints ─────────────────────────────────────────────────

export const authApi = {
  // Login
  login: async (email: string, password: string) => {
    return apiClient.post<{ accessToken: string; refreshToken: string; user: any }>('/auth/login', {
      email,
      password,
    });
  },

  // Logout
  logout: async () => {
    return apiClient.post('/auth/logout');
  },

  // Refresh token
  refreshToken: async (refreshToken: string) => {
    return apiClient.post<{ accessToken: string }>('/auth/refresh', { refreshToken });
  },

  // Get current user
  getCurrentUser: async () => {
    return apiClient.get<any>('/auth/me');
  },

  // Register
  register: async (userData: { name: string; email: string; password: string }) => {
    return apiClient.post<{ accessToken: string; refreshToken: string; user: any }>('/auth/register', userData);
  },

  // Forgot password
  forgotPassword: async (email: string) => {
    return apiClient.post('/auth/forgot-password', { email });
  },

  // Reset password
  resetPassword: async (token: string, newPassword: string) => {
    return apiClient.post('/auth/reset-password', { token, newPassword });
  },
};

// ─── Notification Endpoints ───────────────────────────────────────────────────

export const notificationsApi = {
  // Get user notifications
  getNotifications: async (page = 1, limit = 10) => {
    return apiClient.get<PaginatedResponse<any>>(`/notifications?page=${page}&limit=${limit}`);
  },

  // Mark notification as read
  markAsRead: async (notificationId: string) => {
    return apiClient.patch(`/notifications/${notificationId}/read`);
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    return apiClient.patch('/notifications/read-all');
  },

  // Delete notification
  deleteNotification: async (notificationId: string) => {
    return apiClient.delete(`/notifications/${notificationId}`);
  },
};

// ─── Export all APIs ─────────────────────────────────────────────────────────

export const api = {
  documents: documentsApi,
  signers: signersApi,
  witnesses: witnessesApi,
  signing: signingApi,
  certificates: certificatesApi,
  templates: templatesApi,
  fields: fieldsApi,
  auth: authApi,
  notifications: notificationsApi,
};
