"use client";

import React, { useRef, useState, useCallback } from "react";
import { Upload, File, X, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api/endpoints";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PDFUploadProps {
  onUploadSuccess?: (document: any) => void;
  onUploadError?: (error: string) => void;
  className?: string;
  maxSize?: number; // in MB
  acceptedFormats?: string[];
  disabled?: boolean;
}

interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────────

const DEFAULT_MAX_SIZE = 10; // 10MB
const DEFAULT_ACCEPTED_FORMATS = ['application/pdf'];

// ─── PDF Upload Component ───────────────────────────────────────────────────────

export function PDFUpload({
  onUploadSuccess,
  onUploadError,
  className,
  maxSize = DEFAULT_MAX_SIZE,
  acceptedFormats = DEFAULT_ACCEPTED_FORMATS,
  disabled = false,
}: PDFUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // ─── File Validation ─────────────────────────────────────────────────────────

  const validateFile = useCallback((file: File): string[] => {
    const errors: string[] = [];

    // Check file type
    if (!acceptedFormats.includes(file.type)) {
      errors.push(`Invalid file type. Only PDF files are allowed.`);
    }

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      errors.push(`File size exceeds ${maxSize}MB limit. Current size: ${fileSizeMB.toFixed(2)}MB`);
    }

    // Check file extension
    const extension = file.name.toLowerCase().split('.').pop();
    if (extension !== 'pdf') {
      errors.push('Invalid file extension. Only .pdf files are allowed.');
    }

    return errors;
  }, [acceptedFormats, maxSize]);

  // ─── File Upload ─────────────────────────────────────────────────────────────

  const uploadFile = useCallback(async (file: File) => {
    setIsUploading(true);
    setError(null);
    setValidationErrors([]);

    try {
      // Validate file
      const errors = validateFile(file);
      if (errors.length > 0) {
        setValidationErrors(errors);
        onUploadError?.(errors[0]);
        return;
      }

      // Start upload
      setUploadedFile(file);
      
      const document = await api.documents.uploadDocument(file, (progress) => {
        setUploadProgress({
          loaded: progress,
          total: 100,
          percentage: progress,
        });
      });

      // Success
      setUploadProgress({ loaded: 100, total: 100, percentage: 100 });
      onUploadSuccess?.(document);
      
      // Reset after success
      setTimeout(() => {
        setUploadedFile(null);
        setUploadProgress(null);
      }, 2000);

    } catch (err: any) {
      const errorMessage = err.message || 'Upload failed. Please try again.';
      setError(errorMessage);
      onUploadError?.(errorMessage);
      setUploadedFile(null);
      setUploadProgress(null);
    } finally {
      setIsUploading(false);
    }
  }, [validateFile, onUploadSuccess, onUploadError]);

  // ─── Event Handlers ─────────────────────────────────────────────────────────

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    uploadFile(file);
  }, [uploadFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (disabled || isUploading) return;
    
    handleFileSelect(e.dataTransfer.files);
  }, [disabled, isUploading, handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && !isUploading) {
      setIsDragging(true);
    }
  }, [disabled, isUploading]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  }, [handleFileSelect]);

  const handleClick = useCallback(() => {
    if (!disabled && !isUploading) {
      fileInputRef.current?.click();
    }
  }, [disabled, isUploading]);

  const clearError = useCallback(() => {
    setError(null);
    setValidationErrors([]);
  }, []);

  const removeFile = useCallback(() => {
    setUploadedFile(null);
    setUploadProgress(null);
    clearError();
  }, [clearError]);

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className={cn("w-full", className)}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFormats.join(',')}
        onChange={handleInputChange}
        className="hidden"
        disabled={disabled || isUploading}
      />

      {/* Upload area */}
      <div
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200",
          isDragging
            ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
            : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500",
          (disabled || isUploading) && "opacity-50 cursor-not-allowed",
          !disabled && !isUploading && "cursor-pointer"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        {/* Upload content */}
        {!uploadedFile && !isUploading && (
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Upload className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </div>
            
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Drop your PDF here
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                or click to browse files
              </p>
            </div>

            <div className="text-xs text-gray-400 dark:text-gray-500">
              <p>Maximum file size: {maxSize}MB</p>
              <p>Accepted formats: PDF only</p>
            </div>
          </div>
        )}

        {/* Uploading state */}
        {isUploading && (
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-purple-500 animate-spin" />
            </div>
            
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Uploading document...
              </p>
              
              {uploadProgress && (
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress.percentage}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {uploadProgress.percentage}% complete
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Success state */}
        {uploadedFile && !isUploading && uploadProgress?.percentage === 100 && (
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Upload successful!
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {uploadedFile.name}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Error display */}
      {(error || validationErrors.length > 0) && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              {error && (
                <p className="text-sm font-medium text-red-800 dark:text-red-200">
                  {error}
                </p>
              )}
              {validationErrors.length > 0 && (
                <ul className="mt-1 text-sm text-red-700 dark:text-red-300 space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-400 mt-0.5">•</span>
                      <span>{error}</span>
                    </li>
                  ))}
                </ul>
              )}
              <button
                onClick={clearError}
                className="mt-2 text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* File info (when uploaded but not complete) */}
      {uploadedFile && isUploading && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <File className="w-5 h-5 text-blue-500" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200 truncate">
                  {uploadedFile.name}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            {!isUploading && (
              <button
                onClick={removeFile}
                className="p-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Export Types ─────────────────────────────────────────────────────────────

export type { PDFUploadProps };
