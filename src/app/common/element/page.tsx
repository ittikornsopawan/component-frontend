"use client";

import React, { useState } from "react";
import { DemoLayout } from "@/components/common";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Alert,
  Banner,
  StatCard,
  List,
  ListItem,
  ListGroup,
  Avatar,
  AvatarGroup,
  Skeleton,
  Spinner,
  EmptyState,
  Panel,
  Breadcrumb,
  BreadcrumbItem,
  Pagination,
  Stepper,
  Tabs,
  TabPanel,
  LoadingOverlay,
  Tooltip,
  Popover,
  PopoverContent,
  PopoverItem,
  PopoverDivider,
} from "@/components/element";

export default function ElementDemo() {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingState, setLoadingState] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Components", href: "/common" },
    { label: "Element System" }
  ];

  const tabs = [
    { value: "overview", label: "Overview" },
    { value: "analytics", label: "Analytics", badge: "3" },
    { value: "settings", label: "Settings" },
    { value: "reports", label: "Reports" }
  ];

  const statCards = [
    {
      label: "Total Revenue",
      value: "$124,530",
      trend: { direction: "up" as const, value: "+12.4%", label: "vs last month" },
      icon: "💰"
    },
    {
      label: "Active Users",
      value: "8,492",
      trend: { direction: "up" as const, value: "+8.1%", label: "vs last month" },
      icon: "👥"
    },
    {
      label: "Conversion Rate",
      value: "4.6%",
      trend: { direction: "down" as const, value: "-0.3%", label: "vs last month" },
      icon: "📈"
    },
    {
      label: "Avg Response Time",
      value: "1.2s",
      trend: { direction: "flat" as const, value: "±0ms", label: "vs last month" },
      icon: "⚡"
    }
  ];

  const listItems = [
    {
      title: "Project Alpha",
      subtitle: "Due tomorrow",
      badge: { variant: "warning" as const, label: "In Progress" },
      trailing: "⋯"
    },
    {
      title: "Brand Refresh",
      subtitle: "Due next week",
      badge: { variant: "success" as const, label: "On Track" },
      trailing: "⋯"
    },
    {
      title: "Website Redesign",
      subtitle: "Due next month",
      badge: { variant: "info" as const, label: "Planning" },
      trailing: "⋯"
    }
  ];

  const avatarGroup = [
    { fallback: "AL", src: undefined },
    { fallback: "BM", src: undefined },
    { fallback: "CJ", src: undefined },
    { fallback: "DK", src: undefined },
    { fallback: "EF", src: undefined }
  ];

  return (
    <DemoLayout 
      title="Element System"
      description="Display and feedback components that form the visual backbone of your application. Cards, badges, alerts, and more with liquid glass styling."
      currentSection="element"
    >
      {/* Cards Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card variant="default">
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>Standard glass card with header and content</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                This is a standard card with the default glass treatment. It has proper spacing, 
                blur effects, and subtle borders.
              </p>
            </CardContent>
            <CardFooter>
              <button className="px-4 py-2 bg-purple-500/20 text-purple-700 rounded-lg hover:bg-purple-500/30 transition-colors">
                Action
              </button>
            </CardFooter>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Elevated Card</CardTitle>
              <CardDescription>More prominent with stronger depth</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                This card uses the elevated variant with stronger shadow and background opacity 
                for more prominence.
              </p>
            </CardContent>
          </Card>

          <Card variant="clickable">
            <CardHeader>
              <CardTitle>Clickable Card</CardTitle>
              <CardDescription>Entire card is interactive</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                This entire card can be clicked. It has hover effects and proper cursor styling.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Badges Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Badges & Tags</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Badge Variants</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="neutral">Neutral</Badge>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Badge Sizes</h3>
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="sm">Small</Badge>
              <Badge variant="primary" size="md">Medium</Badge>
              <Badge variant="primary" size="lg">Large</Badge>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Special Badges</h3>
            <div className="flex items-center gap-4">
              <Badge variant="primary" dot>Dotted Badge</Badge>
              <div className="relative">
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">Notification</span>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alerts & Feedback */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Alerts & Feedback</h2>
        <div className="space-y-4">
          <Alert variant="info" title="Information" dismissible>
            This is an informational alert message. It provides context and guidance to the user.
          </Alert>
          
          <Alert variant="success" title="Success!" dismissible>
            Your changes have been saved successfully. The operation completed without any issues.
          </Alert>
          
          <Alert variant="warning" title="Warning" dismissible>
            Please review your input. Some fields may contain errors or missing information.
          </Alert>
          
          <Alert variant="error" title="Error" dismissible>
            Unable to save changes. Please check your connection and try again.
          </Alert>

          <Banner variant="announcement" dismissible action={{ label: "Learn More", href: "#" }}>
            New features have been added to the platform. Check out the latest updates.
          </Banner>
        </div>
      </section>

      {/* Stat Cards */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Stat Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, index) => (
            <StatCard
              key={index}
              label={stat.label}
              value={stat.value}
              trend={stat.trend}
              icon={<span className="text-2xl">{stat.icon}</span>}
            />
          ))}
        </div>
      </section>

      {/* Lists */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Lists</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <List variant="default">
            {listItems.map((item, index) => (
              <ListItem
                key={index}
                title={item.title}
                subtitle={item.subtitle}
                selected={index === 0}
                trailing={
                  <div className="flex items-center gap-2">
                    <Badge variant={item.badge.variant as any}>{item.badge.label}</Badge>
                    <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">{item.trailing}</button>
                  </div>
                }
              />
            ))}
          </List>

          <List variant="bordered">
            <ListGroup label="Recent Projects" collapsible>
              {listItems.map((item, index) => (
                <ListItem
                  key={index}
                  title={item.title}
                  subtitle={item.subtitle}
                  selected={index === 0}
                  trailing={<Badge variant={item.badge.variant as any}>{item.badge.label}</Badge>}
                />
              ))}
            </ListGroup>
          </List>
        </div>
      </section>

      {/* Avatars */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Avatars</h2>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Sizes</h3>
            <div className="flex items-center gap-3">
              <Avatar fallback="XS" size="xs" />
              <Avatar fallback="SM" size="sm" />
              <Avatar fallback="MD" size="md" />
              <Avatar fallback="LG" size="lg" />
              <Avatar fallback="XL" size="xl" />
              <Avatar fallback="2XL" size="2xl" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Avatar Group</h3>
            <AvatarGroup avatars={avatarGroup} max={4} size="md" />
          </div>

          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">With Status</h3>
            <Avatar fallback="JD" size="lg" ring status="online" />
            <Avatar fallback="AS" size="lg" ring status="away" />
            <Avatar fallback="MK" size="lg" ring status="busy" />
            <Avatar fallback="TL" size="lg" ring status="offline" />
          </div>
        </div>
      </section>

      {/* Loading States */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Loading States</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Spinners</h3>
            <div className="flex items-center gap-4">
              <Spinner size="xs" />
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
              <Spinner size="xl" />
              <Spinner size="lg" variant="white" className="bg-gray-900 p-2 rounded" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Skeletons</h3>
            <div className="space-y-3">
              <Skeleton height="h-4" width="w-3/4" />
              <Skeleton height="h-4" width="w-full" />
              <Skeleton height="h-4" width="w-5/6" />
              <div className="grid grid-cols-3 gap-4 mt-4">
                <Skeleton.Card />
                <Skeleton.Card />
                <Skeleton.Card />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Loading Overlay</h3>
            <div className="relative h-32 bg-white/60 dark:bg-white/5 rounded-2xl border border-white/20">
              <LoadingOverlay visible message="Loading content..." />
              <div className="p-4 opacity-30">
                <p>Content being loaded...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Navigation</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Breadcrumb</h3>
            <Breadcrumb>
              {breadcrumbItems.map((item, index) => (
                <BreadcrumbItem 
                  key={index} 
                  href={item.href}
                  current={index === breadcrumbItems.length - 1}
                >
                  {item.label}
                </BreadcrumbItem>
              ))}
            </Breadcrumb>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Tabs</h3>
            <Tabs
              value={activeTab}
              onChange={setActiveTab}
              tabs={tabs}
              fullWidth
            />
            <div className="mt-4">
              <TabPanel value="overview" activeValue={activeTab}>
                <div className="p-4 bg-white/40 dark:bg-white/5 rounded-xl">
                  <p>Overview content goes here...</p>
                </div>
              </TabPanel>
              <TabPanel value="analytics" activeValue={activeTab}>
                <div className="p-4 bg-white/40 dark:bg-white/5 rounded-xl">
                  <p>Analytics content goes here...</p>
                </div>
              </TabPanel>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Pagination</h3>
            <Pagination
              page={currentPage}
              totalPages={20}
              onPageChange={setCurrentPage}
              variant="default"
              showFirstLast
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Stepper</h3>
            <Stepper
              steps={["Account", "Plan", "Payment", "Confirm"]}
              currentStep={1}
              variant="horizontal"
            />
          </div>
        </div>
      </section>

      {/* Overlays */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Overlays</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Tooltip</h3>
            <div className="flex gap-4">
              <Tooltip content="This is a tooltip" position="top">
                <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">Hover me</button>
              </Tooltip>
              <Tooltip content="Bottom tooltip" position="bottom">
                <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">Bottom</button>
              </Tooltip>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Popover</h3>
            <Popover
              trigger={<button className="px-4 py-2 bg-purple-500/20 text-purple-700 rounded-lg">Open Popover</button>}
              position="bottom-start"
            >
              <PopoverContent>
                <PopoverItem label="Edit" />
                <PopoverItem label="Copy" />
                <PopoverDivider />
                <PopoverItem label="Delete" destructive />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </section>

      {/* Panels */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Panels</h2>
        <Panel variant="default" padding="md">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Panel Section</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Panels are structural containers for grouping related content. They provide
              consistent spacing and visual hierarchy.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-white/40 dark:bg-white/5 rounded-lg">
                <p className="text-sm">Nested content</p>
              </div>
              <div className="p-3 bg-white/40 dark:bg-white/5 rounded-lg">
                <p className="text-sm">Another item</p>
              </div>
            </div>
          </div>
        </Panel>
      </section>

      {/* Empty States */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Empty States</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EmptyState
            title="No results found"
            description="Try adjusting your search terms or filters."
            action={{ label: "Clear filters", onClick: () => {} }}
            variant="search"
          />
          <EmptyState
            title="No data yet"
            description="Start by adding your first item to see it here."
            action={{ label: "Add item", onClick: () => {} }}
            variant="default"
          />
        </div>
      </section>
    </DemoLayout>
  );
}
