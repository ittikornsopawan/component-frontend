import Link from "next/link";
import { DemoLayout } from "@/components/common";

export default function DemoIndex() {
  const sections = [
    {
      id: "input",
      title: "Input System",
      description: "Complete form controls with liquid glass styling — text inputs, selects, date pickers, file uploads, and more.",
      icon: "📝",
      href: "/common/input",
      features: ["TextInput", "Select", "DatePicker", "FileUpload", "Toggle", "Checkbox", "RadioGroup", "TextArea", "TagInput", "OTPInput", "ColorPicker", "Slider"],
      color: "purple"
    },
    {
      id: "element",
      title: "Element System", 
      description: "Display and feedback components that form the visual backbone of your application.",
      icon: "🎨",
      href: "/common/element",
      features: ["Card", "Badge", "Alert", "StatCard", "List", "Panel", "Tabs", "Breadcrumb", "Pagination", "Avatar", "Skeleton", "EmptyState"],
      color: "blue"
    },
    {
      id: "document",
      title: "Document System",
      description: "Interactive document workspace with PDF viewing, annotations, and signature capture.",
      icon: "📄",
      href: "/common/document", 
      features: ["DocumentWorkspace", "SignaturePad", "AnnotationLayer", "FieldOverlay", "DocumentToolbar"],
      color: "emerald"
    },
    {
      id: "overlay",
      title: "Overlay System",
      description: "Floating UI layers that render correctly above any content.",
      icon: "🪟",
      href: "/common/overlay",
      features: ["Modal", "Drawer", "Dropdown", "Popover", "Tooltip", "ContextMenu", "Toast"],
      color: "amber"
    },
    {
      id: "layout",
      title: "Layout Theme",
      description: "Navigation and layout components for building complete application interfaces.",
      icon: "🏗️",
      href: "/common/layout",
      features: ["Sidenav", "Topnav", "ContextPanel", "AppLayout", "Breadcrumbs"],
      color: "indigo"
    },
    {
      id: "tokens",
      title: "Design Tokens",
      description: "The visual foundation — colors, spacing, typography, motion, and glass effects.",
      icon: "🎯",
      href: "/common/tokens",
      features: ["Color System", "Glass Surfaces", "Motion Tokens", "Typography", "Spacing Scale", "Z-Index"],
      color: "pink"
    }
  ];

  return (
    <DemoLayout 
      title="Component Library Demo"
      description="Explore the complete Liquid Glass UI framework with interactive demos of every component system."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link
            key={section.id}
            href={section.href}
            className="group block"
          >
            <div className={`
              bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 
              rounded-3xl p-6 hover:bg-white/75 dark:hover:bg-white/8 hover:shadow-xl 
              transition-all duration-200 hover:-translate-y-1
              hover:border-${section.color}-300/40 dark:hover:border-${section.color}-500/30
            `}>
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{section.icon}</div>
                <div className={`
                  w-8 h-8 rounded-xl bg-${section.color}-100/70 dark:bg-${section.color}-900/30 
                  flex items-center justify-center group-hover:scale-110 transition-transform duration-200
                `}>
                  <svg className={`w-4 h-4 text-${section.color}-600 dark:text-${section.color}-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <h3 className={`text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-${section.color}-600 dark:group-hover:text-${section.color}-400 transition-colors`}>
                {section.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                {section.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-1">
                {section.features.slice(0, 3).map((feature) => (
                  <span
                    key={feature}
                    className={`
                      px-2 py-1 text-xs font-medium rounded-lg
                      bg-${section.color}-50/60 dark:bg-${section.color}-900/20 
                      text-${section.color}-700 dark:text-${section.color}-300
                    `}
                  >
                    {feature}
                  </span>
                ))}
                {section.features.length > 3 && (
                  <span className="px-2 py-1 text-xs font-medium rounded-lg bg-gray-100/60 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400">
                    +{section.features.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Start Section */}
      <div className="mt-12 bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Quick Start</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">1. Explore Components</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Browse through each system to see all available components and their variants.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">2. Copy Examples</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Each demo includes ready-to-use code snippets that you can copy into your project.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">3. Customize & Build</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Use the design tokens and motion system to customize the look and feel.
            </p>
          </div>
        </div>
      </div>
    </DemoLayout>
  );
}
