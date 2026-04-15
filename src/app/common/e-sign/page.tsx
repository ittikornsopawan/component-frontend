"use client";

import React, { useState } from "react";
import { PDFUpload } from "@/components/document";
import { PDFViewer } from "@/components/document";
import { DocumentWorkspace } from "@/components/document";
import { useToastHelpers, ToastProvider } from "@/lib/error/error-toast";
import { api } from "@/lib/api/endpoints";
import { 
  Upload, 
  FileText, 
  Users, 
  Shield, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Play,
  Eye,
  Settings,
  BarChart3
} from "lucide-react";

// ─── Sample Data (will be loaded from mock API) ───────────────────────────

const signingSteps = [
  { id: 1, title: "Review Document", description: "Read and understand the document", icon: Eye },
  { id: 2, title: "Accept Terms", description: "Agree to the terms and conditions", icon: CheckCircle },
  { id: 3, title: "Add Signature", description: "Draw or upload your signature", icon: FileText },
  { id: 4, title: "Witness Sign", description: "Get witness signature if required", icon: Users },
  { id: 5, title: "Complete", description: "Document is now legally binding", icon: Shield }
];

const features = [
  {
    title: "Multi-Step Workflow",
    description: "Guided signing process with review, acceptance, signature, and confirmation steps.",
    icon: Settings,
    status: "completed"
  },
  {
    title: "Digital Certificates", 
    description: "Self-signed digital certificates with cryptographic validation.",
    icon: Shield,
    status: "in-progress"
  },
  {
    title: "Witness Signatures",
    description: "Support for witness signatures with proper audit trails.",
    icon: Users,
    status: "planned"
  },
  {
    title: "Template System",
    description: "Reusable document templates with field placeholders.",
    icon: FileText,
    status: "planned"
  },
  {
    title: "Audit Trails",
    description: "Comprehensive logging of all document activities.",
    icon: BarChart3,
    status: "in-progress"
  },
  {
    title: "Email Notifications",
    description: "Automated email notifications for signing invitations.",
    icon: Clock,
    status: "planned"
  }
];

// ─── Demo Component ─────────────────────────────────────────────────────────

function ESignDemo() {
  const [activeTab, setActiveTab] = useState<'upload' | 'documents' | 'workflow' | 'demo'>('upload');
  const [uploadedDocument, setUploadedDocument] = useState<any>(null);
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [showWorkspace, setShowWorkspace] = useState(false);
  const [sampleDocuments, setSampleDocuments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError, showInfo } = useToastHelpers();

  // Load sample documents from mock API
  React.useEffect(() => {
    loadSampleDocuments();
  }, []);

  const loadSampleDocuments = async () => {
    setIsLoading(true);
    try {
      const response = await api.documents.getDocuments();
      setSampleDocuments(response.data);
    } catch (error) {
      console.error('Failed to load sample documents:', error);
      // Fallback to empty array
      setSampleDocuments([]);
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Event Handlers ─────────────────────────────────────────────────────

  const handleUploadSuccess = (document: any) => {
    setUploadedDocument(document);
    setPdfUrl(document.fileUrl || URL.createObjectURL(new Blob()));
    showSuccess(
      'Document uploaded successfully!',
      `Document "${document.name}" is ready for signing.`
    );
  };

  const handleUploadError = (error: string) => {
    showError('Upload failed', error);
  };

  const handleReset = () => {
    setUploadedDocument(null);
    setPdfUrl('');
    setShowWorkspace(false);
    showInfo('Reset complete', 'Ready to upload a new document');
  };

  const handleDemoDocument = (doc: any) => {
    setUploadedDocument(doc);
    setPdfUrl('/sample-document.pdf'); // Mock URL
    showInfo('Sample document loaded', `Viewing "${doc.name}"`);
  };

  // ─── Tab Content Components ───────────────────────────────────────────────

  const UploadTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Upload Document for E-Signature
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Upload a PDF document to start the e-signature process. Our system supports 
          multi-page PDFs with comprehensive validation and security features.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <PDFUpload
          onUploadSuccess={handleUploadSuccess}
          onUploadError={handleUploadError}
          maxSize={10}
        />
      </div>

      {/* Sample Documents */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
          Or try sample documents
        </h3>
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Loading documents...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sampleDocuments.map((doc: any) => (
              <div
                key={doc.id}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleDemoDocument(doc)}
              >
                <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
                  <FileText className="w-12 h-12 text-gray-400" />
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                  {doc.name}
                </h4>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{(doc.fileSize / (1024 * 1024)).toFixed(1)} MB</span>
                  <span className={`px-2 py-1 rounded-full ${
                    doc.status === 'completed' ? 'bg-green-100 text-green-700' :
                    doc.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {doc.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const DocumentsTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Document Management
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Manage all your e-signature documents with comprehensive tracking and status monitoring.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Documents
              </h3>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 text-sm bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                  Upload New
                </button>
                <button className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
                  Filter
                </button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Document</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Signers</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Uploaded</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {sampleDocuments.map((doc: any) => (
                  <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{doc.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{(doc.fileSize / (1024 * 1024)).toFixed(1)} MB</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        doc.status === 'completed' ? 'bg-green-100 text-green-700' :
                        doc.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {doc.signers?.map((s: any) => s.name).join(', ') || 'No signers'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(doc.uploadedAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleDemoDocument(doc)}
                          className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                          <Play className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const WorkflowTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Multi-Step Signing Workflow
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Our guided signing process ensures legal compliance and user understanding at every step.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="space-y-4">
          {signingSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Step {step.id}/5</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                </div>
                {index < signingSteps.length - 1 && (
                  <div className="flex-shrink-0">
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-6 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl">
          <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
            Workflow Features
          </h3>
          <ul className="space-y-2 text-purple-700 dark:text-purple-300">
            <li>✅ Step-by-step guidance with progress tracking</li>
            <li>✅ Terms and conditions acceptance</li>
            <li>✅ Digital signature capture with validation</li>
            <li>✅ Witness signature support</li>
            <li>✅ Final confirmation and certificate generation</li>
            <li>✅ Comprehensive audit trail logging</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const DemoTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Feature Demonstration
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore all the features of our e-signature system with interactive demonstrations.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    feature.status === 'completed' ? 'bg-green-100 text-green-700' :
                    feature.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {feature.status}
                  </span>
                  <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm">
                    Demo →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ES</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                E-Signature System
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Phase 1 Demo
              </span>
              {uploadedDocument && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowWorkspace(!showWorkspace)}
                    className="px-3 py-1 text-sm bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                  >
                    {showWorkspace ? 'Hide' : 'Show'} Workspace
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      {!uploadedDocument && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              {[
                { id: 'upload', label: 'Upload Document', icon: Upload },
                { id: 'documents', label: 'Document Library', icon: FileText },
                { id: 'workflow', label: 'Signing Workflow', icon: Users },
                { id: 'demo', label: 'Feature Demo', icon: Play }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!uploadedDocument ? (
          <>
            {activeTab === 'upload' && <UploadTab />}
            {activeTab === 'documents' && <DocumentsTab />}
            {activeTab === 'workflow' && <WorkflowTab />}
            {activeTab === 'demo' && <DemoTab />}
          </>
        ) : (
          <div className="space-y-6">
            {showWorkspace ? (
              <div className="h-[800px] bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <DocumentWorkspace />
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Document Preview
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {uploadedDocument.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>Size: {(uploadedDocument.fileSize / (1024 * 1024)).toFixed(2)} MB</span>
                    <span>•</span>
                    <span>Status: {uploadedDocument.status}</span>
                  </div>
                </div>

                <div className="h-[600px] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <PDFViewer
                    fileUrl={pdfUrl}
                    showControls={true}
                    showDownload={true}
                  />
                </div>
              </div>
            )}

            {/* Phase 1 Completion */}
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
                Phase 1 Complete! 🎉
              </h3>
              <div className="space-y-2 text-purple-700 dark:text-purple-300">
                <p>✅ PDF.js integration with multi-page support</p>
                <p>✅ File upload with validation and error handling</p>
                <p>✅ API client foundation with authentication</p>
                <p>✅ Comprehensive type system for e-signature</p>
                <p>✅ Error boundaries and toast notifications</p>
                <p>✅ Document workspace with annotation tools</p>
              </div>
              <div className="mt-4 pt-4 border-t border-purple-200 dark:border-purple-800">
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  Ready for Phase 2: Multi-step signing workflow with digital certificates and witness signatures.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Page Component with Toast Provider ─────────────────────────────────────

export default function ESignPage() {
  return (
    <ToastProvider>
      <ESignDemo />
    </ToastProvider>
  );
}
