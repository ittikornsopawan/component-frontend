"use client";

import React, { useState } from "react";
import { DemoLayout } from "@/components/common";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ConfirmationModal,
  Drawer,
  Dropdown,
  Popover,
  Tooltip,
  ContextMenu,
  type DropdownItem,
  type ContextMenuItem,
} from "@/components/overlay";

export default function OverlayDemo() {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setConfirmationOpen(false);
    // Toast would be shown here in a real app
  };

  const dropdownItems: (DropdownItem | "separator")[] = [
    { id: "edit", label: "Edit", icon: "✏️" },
    { id: "copy", label: "Copy", icon: "📋" },
    "separator",
    { id: "delete", label: "Delete", icon: "🗑️", danger: true },
  ];

  const contextMenuItems: (ContextMenuItem | "separator")[] = [
    { id: "open", label: "Open", icon: "📂" },
    { id: "edit", label: "Edit", icon: "✏️", shortcut: "⌘E" },
    "separator",
    { id: "delete", label: "Move to Trash", icon: "🗑️", danger: true, shortcut: "⌫" },
  ];

  return (
    <DemoLayout 
      title="Overlay System"
      description="Floating UI layers that render correctly above any content. Modals, drawers, tooltips, and more with portal rendering and proper z-index management."
      currentSection="overlay"
    >
      {/* Modals Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Modals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Standard Modal</h3>
            <button
              onClick={() => setModalOpen(true)}
              className="px-6 py-3 bg-purple-500/20 text-purple-700 dark:text-purple-300 rounded-xl hover:bg-purple-500/30 transition-colors font-medium"
            >
              Open Modal
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Standard modal with header, body, and footer sections.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Confirmation Modal</h3>
            <button
              onClick={() => setConfirmationOpen(true)}
              className="px-6 py-3 bg-red-500/20 text-red-700 dark:text-red-300 rounded-xl hover:bg-red-500/30 transition-colors font-medium"
            >
              Delete Item
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Destructive action confirmation with loading state.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Toast Notifications</h3>
            <button
              onClick={() => alert('Toast would be shown here')}
              className="px-6 py-3 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 rounded-xl hover:bg-emerald-500/30 transition-colors font-medium"
            >
              Show Toast
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Auto-dismissing notifications with actions.
            </p>
          </div>
        </div>
      </section>

      {/* Drawers Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Drawers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Left Drawer</h3>
            <button
              onClick={() => setDrawerOpen(true)}
              className="px-6 py-3 bg-blue-500/20 text-blue-700 dark:text-blue-300 rounded-xl hover:bg-blue-500/30 transition-colors font-medium"
            >
              Open Left Drawer
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Navigation panel sliding in from the left.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Right Drawer</h3>
            <button
              onClick={() => setRightDrawerOpen(true)}
              className="px-6 py-3 bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 rounded-xl hover:bg-indigo-500/30 transition-colors font-medium"
            >
              Open Right Drawer
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Detail panel sliding in from the right.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Bottom Sheet</h3>
            <button
              onClick={() => setBottomDrawerOpen(true)}
              className="px-6 py-3 bg-amber-500/20 text-amber-700 dark:text-amber-300 rounded-xl hover:bg-amber-500/30 transition-colors font-medium"
            >
              Open Bottom Sheet
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Mobile-style action sheet from bottom.
            </p>
          </div>
        </div>
      </section>

      {/* Tooltips & Popovers */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Tooltips & Popovers</h2>
        <div className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <Tooltip content="This is a tooltip" placement="top">
              <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">Top Tooltip</button>
            </Tooltip>
            <Tooltip content="Bottom tooltip" placement="bottom">
              <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">Bottom</button>
            </Tooltip>
            <Tooltip content="Left tooltip" placement="left">
              <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">Left</button>
            </Tooltip>
            <Tooltip content="Right tooltip" placement="right">
              <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">Right</button>
            </Tooltip>
          </div>

          <div className="flex flex-wrap gap-4">
            <Popover
              trigger={<button className="px-4 py-2 bg-purple-500/20 text-purple-700 rounded-lg">Simple Popover</button>}
              content={<p className="p-4 text-sm bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-xl">This is a simple popover content.</p>}
              placement="bottom-start"
            />

            <Popover
              trigger={<button className="px-4 py-2 bg-blue-500/20 text-blue-700 rounded-lg">Menu Popover</button>}
              content={
                <div className="p-2 bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-xl">
                  <button className="w-full px-3 py-2 text-left hover:bg-white/40 dark:hover:bg-white/8 rounded transition-colors">✏️ Edit</button>
                  <button className="w-full px-3 py-2 text-left hover:bg-white/40 dark:hover:bg-white/8 rounded transition-colors">📋 Copy</button>
                  <div className="border-t border-white/20 dark:border-white/10 my-1"></div>
                  <button className="w-full px-3 py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors">🗑️ Delete</button>
                </div>
              }
              placement="bottom-start"
            />
          </div>
        </div>
      </section>

      {/* Dropdowns */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Dropdowns</h2>
        <div className="flex flex-wrap gap-4">
          <Dropdown
            trigger={<button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">Actions ▾</button>}
            placement="bottom-start"
            items={dropdownItems}
          />
          
          <Dropdown
            trigger={<button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">Menu ▾</button>}
            placement="bottom-end"
            items={[
              { id: "profile", label: "Profile", icon: "👤" },
              { id: "settings", label: "Settings", icon: "⚙️" },
              "separator",
              { id: "logout", label: "Logout", icon: "🚪" },
            ]}
          />
        </div>
      </section>

      {/* Context Menu */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Context Menu</h2>
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-8">
          <ContextMenu
            items={contextMenuItems}
          >
            <div className="text-center text-gray-600 dark:text-gray-400">
              <div className="text-4xl mb-2">📁</div>
              <p>Right-click this area to open context menu</p>
              <p className="text-sm mt-2">Works with keyboard shortcuts and destructive actions</p>
            </div>
          </ContextMenu>
        </div>
      </section>

      {/* Modal Components */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} size="md">
        <ModalHeader title="Modal Title" onClose={() => setModalOpen(false)} />
        <ModalBody>
          <div className="space-y-4">
            <p>This is a standard modal dialog with glass styling and backdrop blur.</p>
            <p>It can contain any content you need - forms, information, or complex UI.</p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm font-mono">Modal features:</p>
              <ul className="text-sm mt-2 space-y-1">
                <li>• Portal rendering</li>
                <li>• Backdrop click to close</li>
                <li>• ESC key support</li>
                <li>• Focus trap</li>
                <li>• Multiple sizes</li>
              </ul>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => setModalOpen(false)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => setModalOpen(false)}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Save Changes
          </button>
        </ModalFooter>
      </Modal>

      <ConfirmationModal
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        onConfirm={handleConfirm}
        variant="danger"
        title="Delete Project"
        description='Are you sure you want to delete "Brand Refresh"? This action cannot be undone.'
        confirmLabel="Delete permanently"
        loading={loading}
      />

      {/* Drawer Components */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        position="left"
        size="md"
        title="Navigation"
      >
        <div className="space-y-4">
          <a href="#" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            🏠 Dashboard
          </a>
          <a href="#" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            📊 Analytics
          </a>
          <a href="#" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            ⚙️ Settings
          </a>
          <a href="#" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            📧 Messages
          </a>
        </div>
      </Drawer>

      <Drawer
        open={rightDrawerOpen}
        onClose={() => setRightDrawerOpen(false)}
        position="right"
        size="lg"
        title="Project Details"
      >
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Brand Refresh</h3>
            <p className="text-gray-600 dark:text-gray-400">Complete brand identity overhaul</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Team</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-200 dark:bg-purple-800 rounded-full flex items-center justify-center text-sm">AL</div>
                <span className="text-gray-700 dark:text-gray-300">Alice Lead</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-200 dark:bg-blue-800 rounded-full flex items-center justify-center text-sm">BM</div>
                <span className="text-gray-700 dark:text-gray-300">Bob Manager</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Timeline</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Start</span>
                <span className="text-gray-700 dark:text-gray-300">Jan 15</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">End</span>
                <span className="text-gray-700 dark:text-gray-300">Mar 30</span>
              </div>
            </div>
          </div>
        </div>
      </Drawer>

      <Drawer
        open={bottomDrawerOpen}
        onClose={() => setBottomDrawerOpen(false)}
        position="bottom"
        size="md"
        title="Actions"
      >
        <div className="space-y-2">
          <button className="w-full px-4 py-3 text-left bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            📤 Share Project
          </button>
          <button className="w-full px-4 py-3 text-left bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            📋 Duplicate Project
          </button>
          <button className="w-full px-4 py-3 text-left bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            📥 Export Data
          </button>
          <button className="w-full px-4 py-3 text-left text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
            🗑️ Delete Project
          </button>
        </div>
      </Drawer>
    </DemoLayout>
  );
}
