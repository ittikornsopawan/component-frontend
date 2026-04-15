"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  TextInput, 
  PasswordInput, 
  SearchInput,
} from "@/components/input";
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Alert,
  Skeleton,
  EmptyState,
} from "@/components/element";

// Mock components for demonstration (these would be real components in the actual library)
interface NumberInputProps {
  label?: string;
  placeholder?: string;
  description?: string;
  [key: string]: any;
}

const NumberInput = ({ label, placeholder, description, ...props }: NumberInputProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <div className="relative">
      <input
        type="number"
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-white/60 dark:bg-white/5 border border-white/25 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300/50"
        {...props}
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
        <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">▲</button>
        <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">▼</button>
      </div>
    </div>
    {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
  </div>
);

interface SelectProps {
  label?: string;
  placeholder?: string;
  description?: string;
  options?: Array<{ value: string; label: string }>;
  [key: string]: any;
}

const Select = ({ label, placeholder, description, options, ...props }: SelectProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <select
      className="w-full px-3 py-2 bg-white/60 dark:bg-white/5 border border-white/25 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300/50"
      {...props}
    >
      <option value="">{placeholder}</option>
      {options?.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
    {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
  </div>
);

interface MultiSelectProps {
  label?: string;
  placeholder?: string;
  description?: string;
  options?: Array<{ value: string; label: string }>;
  [key: string]: any;
}

const MultiSelect = ({ label, placeholder, description, options, ...props }: MultiSelectProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <div className="w-full px-3 py-2 bg-white/60 dark:bg-white/5 border border-white/25 dark:border-white/10 rounded-lg min-h-[42px] flex flex-wrap gap-1">
      <span className="text-gray-500 dark:text-gray-400">{placeholder}</span>
    </div>
    {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
  </div>
);

interface ComboboxProps {
  label?: string;
  placeholder?: string;
  description?: string;
  options?: Array<{ value: string; label: string }>;
  [key: string]: any;
}

const Combobox = ({ label, placeholder, description, options, ...props }: ComboboxProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <input
      type="text"
      placeholder={placeholder}
      className="w-full px-3 py-2 bg-white/60 dark:bg-white/5 border border-white/25 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300/50"
      {...props}
    />
    {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
  </div>
);

interface AutocompleteProps {
  label?: string;
  placeholder?: string;
  description?: string;
  options?: Array<{ value: string; label: string }>;
  [key: string]: any;
}

const Autocomplete = ({ label, placeholder, description, options, ...props }: AutocompleteProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <input
      type="text"
      placeholder={placeholder}
      className="w-full px-3 py-2 bg-white/60 dark:bg-white/5 border border-white/25 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300/50"
      {...props}
    />
    {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
  </div>
);

interface CheckboxProps {
  label?: string;
  description?: string;
  checked?: boolean;
  [key: string]: any;
}

const Checkbox = ({ label, description, checked, ...props }: CheckboxProps) => (
  <div className="flex items-start gap-3">
    <input
      type="checkbox"
      className="mt-1 w-4 h-4 text-brand-500 bg-white/60 dark:bg-white/5 border border-white/25 dark:border-white/10 rounded focus:ring-2 focus:ring-purple-300/50"
      checked={checked}
      {...props}
    />
    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
    </div>
  </div>
);

interface CheckboxGroupProps {
  label?: string;
  description?: string;
  options?: Array<{ value: string; label: string }>;
  [key: string]: any;
}

const CheckboxGroup = ({ label, description, options, ...props }: CheckboxGroupProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <div className="space-y-2">
      {options?.map(option => (
        <Checkbox key={option.value} label={option.label} {...props} />
      ))}
    </div>
    {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
  </div>
);

interface ToggleProps {
  label?: string;
  description?: string;
  checked?: boolean;
  [key: string]: any;
}

const Toggle = ({ label, description, checked, ...props }: ToggleProps) => (
  <div className="flex items-center justify-between">
    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
    </div>
    <button
      className={`w-12 h-6 rounded-full transition-colors ${
        checked ? 'bg-brand-500' : 'bg-gray-300 dark:bg-gray-600'
      }`}
      {...props}
    >
      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
        checked ? 'translate-x-6' : 'translate-x-0.5'
      }`} />
    </button>
  </div>
);

interface RadioGroupProps {
  label?: string;
  description?: string;
  options?: Array<{ value: string; label: string }>;
  [key: string]: any;
}

const RadioGroup = ({ label, description, options, ...props }: RadioGroupProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <div className="space-y-2">
      {options?.map(option => (
        <label key={option.value} className="flex items-center gap-2">
          <input type="radio" name="radio-group" className="w-4 h-4 text-brand-500" {...props} />
          <span className="text-sm text-gray-700 dark:text-gray-300">{option.label}</span>
        </label>
      ))}
    </div>
    {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
  </div>
);

interface DatePickerProps {
  label?: string;
  placeholder?: string;
  description?: string;
  [key: string]: any;
}

const DatePicker = ({ label, placeholder, description, ...props }: DatePickerProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <input
      type="date"
      placeholder={placeholder}
      className="w-full px-3 py-2 bg-white/60 dark:bg-white/5 border border-white/25 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300/50"
      {...props}
    />
    {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
  </div>
);

interface DateRangePickerProps {
  label?: string;
  placeholder?: string;
  description?: string;
  [key: string]: any;
}

const DateRangePicker = ({ label, placeholder, description, ...props }: DateRangePickerProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <div className="flex gap-2">
      <input
        type="date"
        placeholder="Start date"
        className="flex-1 px-3 py-2 bg-white/60 dark:bg-white/5 border border-white/25 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300/50"
        {...props}
      />
      <input
        type="date"
        placeholder="End date"
        className="flex-1 px-3 py-2 bg-white/60 dark:bg-white/5 border border-white/25 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300/50"
        {...props}
      />
    </div>
    {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
  </div>
);

interface TimePickerProps {
  label?: string;
  placeholder?: string;
  description?: string;
  [key: string]: any;
}

const TimePicker = ({ label, placeholder, description, ...props }: TimePickerProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <input
      type="time"
      placeholder={placeholder}
      className="w-full px-3 py-2 bg-white/60 dark:bg-white/5 border border-white/25 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300/50"
      {...props}
    />
    {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
  </div>
);

interface DateTimePickerProps {
  label?: string;
  placeholder?: string;
  description?: string;
  [key: string]: any;
}

const DateTimePicker = ({ label, placeholder, description, ...props }: DateTimePickerProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <input
      type="datetime-local"
      placeholder={placeholder}
      className="w-full px-3 py-2 bg-white/60 dark:bg-white/5 border border-white/25 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300/50"
      {...props}
    />
    {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
  </div>
);

interface FileUploadProps {
  label?: string;
  description?: string;
  accept?: string;
  [key: string]: any;
}

const FileUpload = ({ label, description, accept, ...props }: FileUploadProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <div className="w-full px-3 py-8 bg-white/60 dark:bg-white/5 border-2 border-dashed border-white/25 dark:border-white/10 rounded-lg text-center">
      <div className="text-gray-500 dark:text-gray-400">
        <div className="text-2xl mb-2">📁</div>
        <p className="text-sm">Drop file here or click to browse</p>
      </div>
    </div>
    {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
  </div>
);

interface FileUploadMultipleProps {
  label?: string;
  description?: string;
  accept?: string;
  [key: string]: any;
}

const FileUploadMultiple = ({ label, description, accept, ...props }: FileUploadMultipleProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <div className="w-full px-3 py-8 bg-white/60 dark:bg-white/5 border-2 border-dashed border-white/25 dark:border-white/10 rounded-lg text-center">
      <div className="text-gray-500 dark:text-gray-400">
        <div className="text-2xl mb-2">📁</div>
        <p className="text-sm">Drop files here or click to browse</p>
      </div>
    </div>
    {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
  </div>
);

interface DragAndDropUploadProps {
  label?: string;
  description?: string;
  accept?: string;
  [key: string]: any;
}

const DragAndDropUpload = ({ label, description, accept, ...props }: DragAndDropUploadProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <div className="w-full px-3 py-8 bg-white/60 dark:bg-white/5 border-2 border-dashed border-white/25 dark:border-white/10 rounded-lg text-center">
      <div className="text-gray-500 dark:text-gray-400">
        <div className="text-2xl mb-2">📁</div>
        <p className="text-sm">Drag & drop files here</p>
      </div>
    </div>
    {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
  </div>
);

interface ImageUploadProps {
  label?: string;
  description?: string;
  aspectRatio?: string;
  [key: string]: any;
}

const ImageUpload = ({ label, description, aspectRatio, ...props }: ImageUploadProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <div className="w-full px-3 py-8 bg-white/60 dark:bg-white/5 border-2 border-dashed border-white/25 dark:border-white/10 rounded-lg text-center">
      <div className="text-gray-500 dark:text-gray-400">
        <div className="text-2xl mb-2">🖼️</div>
        <p className="text-sm">Drop image here or click to browse</p>
      </div>
    </div>
    {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
  </div>
);

interface AvatarUploadProps {
  label?: string;
  description?: string;
  [key: string]: any;
}

const AvatarUpload = ({ label, description, ...props }: AvatarUploadProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <div className="w-full px-3 py-8 bg-white/60 dark:bg-white/5 border-2 border-dashed border-white/25 dark:border-white/10 rounded-lg text-center">
      <div className="text-gray-500 dark:text-gray-400">
        <div className="text-2xl mb-2">👤</div>
        <p className="text-sm">Upload avatar</p>
      </div>
    </div>
    {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
  </div>
);

interface TextAreaProps {
  label?: string;
  placeholder?: string;
  description?: string;
  rows?: number;
  [key: string]: any;
}

const TextArea = ({ label, placeholder, description, rows, ...props }: TextAreaProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <textarea
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3 py-2 bg-white/60 dark:bg-white/5 border border-white/25 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300/50"
      {...props}
    />
    {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
  </div>
);

interface TagInputProps {
  label?: string;
  placeholder?: string;
  description?: string;
  [key: string]: any;
}

const TagInput = ({ label, placeholder, description, ...props }: TagInputProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <div className="w-full px-3 py-2 bg-white/60 dark:bg-white/5 border border-white/25 dark:border-white/10 rounded-lg flex flex-wrap gap-1">
      <span className="text-gray-500 dark:text-gray-400">{placeholder}</span>
    </div>
    {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
  </div>
);

interface MarkdownEditorProps {
  label?: string;
  placeholder?: string;
  description?: string;
  [key: string]: any;
}

const MarkdownEditor = ({ label, placeholder, description, ...props }: MarkdownEditorProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <div className="border border-white/25 dark:border-white/10 rounded-lg overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-800 px-3 py-2 border-b border-white/25 dark:border-white/10 flex gap-2">
        <button className="px-2 py-1 text-xs bg-white/60 dark:bg-white/5 rounded">B</button>
        <button className="px-2 py-1 text-xs bg-white/60 dark:bg-white/5 rounded">I</button>
        <button className="px-2 py-1 text-xs bg-white/60 dark:bg-white/5 rounded">Link</button>
      </div>
      <textarea
        placeholder={placeholder}
        rows={6}
        className="w-full px-3 py-2 bg-white/60 dark:bg-white/5 border-0 focus:ring-0"
        {...props}
      />
    </div>
    {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
  </div>
);

interface PhoneInputProps {
  label?: string;
  placeholder?: string;
  description?: string;
  [key: string]: any;
}

const PhoneInput = ({ label, placeholder, description, ...props }: PhoneInputProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <div className="flex gap-2">
      <select className="px-3 py-2 bg-white/60 dark:bg-white/5 border border-white/25 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300/50">
        <option>+1</option>
        <option>+44</option>
        <option>+61</option>
      </select>
      <input
        type="tel"
        placeholder={placeholder}
        className="flex-1 px-3 py-2 bg-white/60 dark:bg-white/5 border border-white/25 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300/50"
        {...props}
      />
    </div>
    {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
  </div>
);

interface OTPInputProps {
  label?: string;
  placeholder?: string;
  description?: string;
  length?: number;
  [key: string]: any;
}

const OTPInput = ({ label, placeholder, description, length, ...props }: OTPInputProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <div className="flex gap-2">
      {Array.from({ length: length || 6 }).map((_, i) => (
        <input
          key={i}
          type="text"
          maxLength={1}
          className="w-10 h-10 text-center bg-white/60 dark:bg-white/5 border border-white/25 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300/50"
          {...props}
        />
      ))}
    </div>
    {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
  </div>
);

interface ColorPickerProps {
  label?: string;
  placeholder?: string;
  description?: string;
  [key: string]: any;
}

const ColorPicker = ({ label, placeholder, description, ...props }: ColorPickerProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <div className="flex gap-2">
      <input
        type="color"
        className="w-12 h-10 bg-white/60 dark:bg-white/5 border border-white/25 dark:border-white/10 rounded-lg"
        {...props}
      />
      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 px-3 py-2 bg-white/60 dark:bg-white/5 border border-white/25 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300/50"
        {...props}
      />
    </div>
    {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
  </div>
);

interface SliderProps {
  label?: string;
  description?: string;
  min?: number;
  max?: number;
  defaultValue?: number;
  [key: string]: any;
}

const Slider = ({ label, description, min, max, defaultValue, ...props }: SliderProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <input
      type="range"
      min={min}
      max={max}
      defaultValue={defaultValue}
      className="w-full"
      {...props}
    />
    {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
  </div>
);

interface RangeSliderProps {
  label?: string;
  description?: string;
  min?: number;
  max?: number;
  defaultValue?: number[];
  [key: string]: any;
}

const RangeSlider = ({ label, description, min, max, defaultValue, ...props }: RangeSliderProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <div className="flex gap-2">
      <input
        type="range"
        min={min}
        max={max}
        defaultValue={defaultValue?.[0]}
        className="flex-1"
        {...props}
      />
      <input
        type="range"
        min={min}
        max={max}
        defaultValue={defaultValue?.[1]}
        className="flex-1"
        {...props}
      />
    </div>
    {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
  </div>
);

interface EmailInputProps {
  label?: string;
  placeholder?: string;
  description?: string;
  [key: string]: any;
}

const EmailInput = ({ label, placeholder, description, ...props }: EmailInputProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <input
      type="email"
      placeholder={placeholder}
      className="w-full px-3 py-2 bg-white/60 dark:bg-white/5 border border-white/25 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300/50"
      {...props}
    />
    {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
  </div>
);

// Additional Element System Components
interface PanelProps {
  variant?: string;
  padding?: string;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

const Panel = ({ variant, padding, title, description, children, ...props }: PanelProps) => (
  <div className={`bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-3xl ${padding === 'default' ? 'p-6' : 'p-4'}`} {...props}>
    {(title || description) && (
      <div className="mb-4">
        {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>}
        {description && <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>}
      </div>
    )}
    {children}
  </div>
);

interface ListProps {
  variant?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

const List = ({ variant, children, ...props }: ListProps) => (
  <div className={`space-y-1 ${variant === 'flush' ? '' : 'divide-y divide-white/20 dark:divide-white/10'}`} {...props}>
    {children}
  </div>
);

interface ListItemProps {
  leading?: React.ReactNode;
  title?: string;
  subtitle?: string;
  trailing?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  [key: string]: any;
}

const ListItem = ({ leading, title, subtitle, trailing, selected, disabled, onClick, ...props }: ListItemProps) => (
  <div
    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
      selected ? 'bg-brand-100 dark:bg-brand-900/20' : 'hover:bg-white/20 dark:hover:bg-white/5'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    onClick={disabled ? undefined : onClick}
    {...props}
  >
    {leading}
    <div className="flex-1 min-w-0">
      {title && <div className="font-medium text-gray-900 dark:text-white">{title}</div>}
      {subtitle && <div className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</div>}
    </div>
    {trailing}
  </div>
);

interface ListGroupProps {
  label?: string;
  collapsible?: boolean;
  children?: React.ReactNode;
  [key: string]: any;
}

const ListGroup = ({ label, collapsible, children, ...props }: ListGroupProps) => (
  <div {...props}>
    {label && (
      <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        {label}
      </div>
    )}
    {children}
  </div>
);

interface TabsProps {
  value?: string;
  onChange?: (value: string) => void;
  tabs?: Array<{ value: string; label: string; icon?: React.ReactNode; badge?: React.ReactNode }>;
  variant?: string;
  fullWidth?: boolean;
  [key: string]: any;
}

const Tabs = ({ value, onChange, tabs, variant, fullWidth, ...props }: TabsProps) => (
  <div className={`${variant === 'pills' ? 'flex gap-2' : 'border-b border-white/20 dark:border-white/10'}`} {...props}>
    {tabs?.map((tab) => (
      <button
        key={tab.value}
        onClick={() => onChange?.(tab.value)}
        className={`px-4 py-2 text-sm font-medium transition-colors ${
          variant === 'pills'
            ? `rounded-lg ${
                value === tab.value
                  ? 'bg-brand-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-white/20 dark:hover:bg-white/5'
              }`
            : `border-b-2 -mb-px ${
                value === tab.value
                  ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`
        } ${fullWidth ? 'flex-1' : ''}`}
      >
        {tab.icon && <span className="mr-2">{tab.icon}</span>}
        {tab.label}
        {tab.badge && <span className="ml-2">{tab.badge}</span>}
      </button>
    ))}
  </div>
);

interface TabPanelProps {
  value?: string;
  activeValue?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

const TabPanel = ({ value, activeValue, children, ...props }: TabPanelProps) => (
  <div className={value === activeValue ? 'block' : 'hidden'} {...props}>
    {children}
  </div>
);

interface StepperProps {
  steps?: string[];
  currentStep?: number;
  variant?: string;
  onStepClick?: (index: number) => void;
  [key: string]: any;
}

const Stepper = ({ steps, currentStep = 0, variant, onStepClick, ...props }: StepperProps) => (
  <div className={`${variant === 'vertical' ? 'space-y-4' : 'flex items-center justify-between'}`} {...props}>
    {steps?.map((step, index) => (
      <div
        key={step}
        className={`flex items-center ${variant === 'vertical' ? 'flex-col' : ''} ${
          variant === 'vertical' ? 'w-full' : 'flex-1'
        }`}
      >
        <button
          onClick={() => onStepClick?.(index)}
          className={`flex items-center ${
            variant === 'vertical' ? 'flex-col' : ''
          } ${index <= currentStep ? 'text-brand-600 dark:text-brand-400' : 'text-gray-400'}`}
        >
          <div
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
              index <= currentStep
                ? 'border-brand-500 bg-brand-500 text-white'
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
            }`}
          >
            {index < currentStep ? '✓' : index + 1}
          </div>
          {variant === 'vertical' && <span className="mt-2 text-sm">{step}</span>}
        </button>
        {variant === 'horizontal' && index < steps.length - 1 && (
          <div className={`flex-1 h-px mx-4 ${
            index < currentStep ? 'bg-brand-500' : 'bg-gray-300 dark:bg-gray-600'
          }`} />
        )}
      </div>
    ))}
  </div>
);

interface PaginationProps {
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  variant?: string;
  showFirstLast?: boolean;
  showPageInput?: boolean;
  [key: string]: any;
}

const Pagination = ({ page, totalPages, onPageChange, variant, showFirstLast, showPageInput, ...props }: PaginationProps) => (
  <div className="flex items-center gap-2" {...props}>
    {showFirstLast && (
      <button
        onClick={() => onPageChange?.(1)}
        disabled={(page || 1) === 1}
        className="px-3 py-1 text-sm bg-white/60 dark:bg-white/5 border border-white/25 dark:border-white/10 rounded-lg disabled:opacity-50"
      >
        First
      </button>
    )}
    <button
      onClick={() => onPageChange?.((page || 1) - 1)}
      disabled={(page || 1) === 1}
      className="px-3 py-1 text-sm bg-white/60 dark:bg-white/5 border border-white/25 dark:border-white/10 rounded-lg disabled:opacity-50"
    >
      Previous
    </button>
    
    {variant !== 'compact' && (
      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(5, totalPages || 5) }, (_, i) => {
          let pageNum;
          if ((totalPages || 5) <= 5) {
            pageNum = i + 1;
          } else if ((page || 1) <= 3) {
            pageNum = i + 1;
          } else if ((page || 1) >= (totalPages || 5) - 2) {
            pageNum = (totalPages || 5) - 4 + i;
          } else {
            pageNum = (page || 1) - 2 + i;
          }
          
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange?.(pageNum)}
              className={`w-8 h-8 text-sm rounded-lg ${
                (page || 1) === pageNum
                  ? 'bg-brand-500 text-white'
                  : 'bg-white/60 dark:bg-white/5 border border-white/25 dark:border-white/10'
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>
    )}
    
    {showPageInput && (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">Page</span>
        <input
          type="number"
          min={1}
          max={totalPages}
          value={page}
          onChange={(e) => onPageChange?.(parseInt(e.target.value))}
          className="w-16 px-2 py-1 text-sm bg-white/60 dark:bg-white/5 border border-white/25 dark:border-white/10 rounded-lg text-center"
        />
        <span className="text-sm text-gray-600 dark:text-gray-400">of {totalPages}</span>
      </div>
    )}
    
    <button
      onClick={() => onPageChange?.((page || 1) + 1)}
      disabled={(page || 1) === totalPages}
      className="px-3 py-1 text-sm bg-white/60 dark:bg-white/5 border border-white/25 dark:border-white/10 rounded-lg disabled:opacity-50"
    >
      Next
    </button>
    {showFirstLast && (
      <button
        onClick={() => onPageChange?.(totalPages || 1)}
        disabled={(page || 1) === totalPages}
        className="px-3 py-1 text-sm bg-white/60 dark:bg-white/5 border border-white/25 dark:border-white/10 rounded-lg disabled:opacity-50"
      >
        Last
      </button>
    )}
  </div>
);

interface BreadcrumbProps {
  children?: React.ReactNode;
  [key: string]: any;
}

const Breadcrumb = ({ children, ...props }: BreadcrumbProps) => (
  <nav className="flex items-center space-x-2 text-sm" {...props}>
    {children}
  </nav>
);

interface BreadcrumbItemProps {
  href?: string;
  current?: boolean;
  children?: React.ReactNode;
  [key: string]: any;
}

const BreadcrumbItem = ({ href, current, children, ...props }: BreadcrumbItemProps) => (
  <div className="flex items-center" {...props}>
    {href && !current ? (
      <a href={href} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
        {children}
      </a>
    ) : (
      <span className={current ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400'}>
        {children}
      </span>
    )}
    {!current && <span className="mx-2 text-gray-400">/</span>}
  </div>
);

interface DividerProps {
  variant?: string;
  label?: string;
  spacing?: string;
  [key: string]: any;
}

const Divider = ({ variant, label, spacing, ...props }: DividerProps) => (
  <div className={`flex items-center ${spacing === 'md' ? 'my-4' : 'my-2'}`} {...props}>
    <div className={`flex-1 ${
      variant === 'gradient' 
        ? 'bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent'
        : variant === 'dashed'
        ? 'border-t-2 border-dashed border-gray-300 dark:border-gray-600'
        : 'border-t border-gray-300 dark:border-gray-600'
    }`} />
    {label && (
      <span className="px-3 text-sm text-gray-600 dark:text-gray-400 bg-white/60 dark:bg-white/5">
        {label}
      </span>
    )}
    <div className={`flex-1 ${
      variant === 'gradient'
        ? 'bg-gradient-to-l from-transparent via-gray-300 dark:via-gray-600 to-transparent'
        : variant === 'dashed'
        ? 'border-t-2 border-dashed border-gray-300 dark:border-gray-600'
        : 'border-t border-gray-300 dark:border-gray-600'
    }`} />
  </div>
);

interface SpacerProps {
  size?: string;
  axis?: string;
  [key: string]: any;
}

const Spacer = ({ size, axis, ...props }: SpacerProps) => (
  <div className={`${axis === 'y' ? 'h-' : 'w-'}${size}`} {...props} />
);

interface LoadingOverlayProps {
  visible?: boolean;
  message?: string;
  blur?: string;
  [key: string]: any;
}

const LoadingOverlay = ({ visible, message, blur, ...props }: LoadingOverlayProps) => (
  visible && (
    <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 ${blur === 'md' ? 'backdrop-blur-md' : ''}`} {...props}>
      <div className="bg-white/90 dark:bg-gray-900/90 rounded-lg p-6 text-center">
        <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        {message && <p className="text-sm text-gray-600 dark:text-gray-400">{message}</p>}
      </div>
    </div>
  )
);

interface SpinnerProps {
  size?: string;
  variant?: string;
  [key: string]: any;
}

const Spinner = ({ size, variant, ...props }: SpinnerProps) => {
  const sizeClasses: Record<string, string> = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };
  
  return (
    <div className={`${sizeClasses[size || 'md']} border-2 border-current border-t-transparent rounded-full animate-spin ${
      variant === 'white' ? 'text-white' : variant === 'colored' ? 'text-brand-500' : 'text-gray-300 dark:text-gray-600'
    }`} {...props} />
  );
};

interface StatCardProps {
  label?: string;
  value?: string;
  trend?: { direction: 'up' | 'down'; value: string; label: string };
  icon?: React.ReactNode;
  [key: string]: any;
}

const StatCard = ({ label, value, trend, icon, ...props }: StatCardProps) => (
  <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-lg p-6" {...props}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        {trend && (
          <div className="flex items-center gap-1 mt-2">
            <span className={`text-sm ${
              trend.direction === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {trend.direction === 'up' ? '↑' : '↓'}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">{trend.value}</span>
            <span className="text-xs text-gray-500 dark:text-gray-500">{trend.label}</span>
          </div>
        )}
      </div>
      {icon && <div className="text-2xl text-gray-400">{icon}</div>}
    </div>
  </div>
);

interface MetricCardProps {
  title?: string;
  primary?: { value: string; delta: string; deltaDirection: 'up' | 'down' };
  secondary?: Array<{ label: string; value: string }>;
  [key: string]: any;
}

const MetricCard = ({ title, primary, secondary, ...props }: MetricCardProps) => (
  <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-lg p-6" {...props}>
    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{title}</h3>
    <div className="flex items-baseline gap-2 mb-4">
      {primary && (
        <>
          <span className="text-3xl font-bold text-gray-900 dark:text-white">{primary.value}</span>
          <span className={`text-sm ${
            primary.deltaDirection === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {primary.delta}
          </span>
        </>
      )}
    </div>
    {secondary && (
      <div className="space-y-1">
        {secondary.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
            <span className="font-medium text-gray-900 dark:text-white">{item.value}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);

interface KeyValueDisplayProps {
  items?: Array<{ key: string; value: string }>;
  layout?: 'grid' | 'horizontal' | 'vertical';
  [key: string]: any;
}

const KeyValueDisplay = ({ items, layout, ...props }: KeyValueDisplayProps) => (
  <div className={`${layout === 'grid' ? 'grid grid-cols-2 gap-4' : layout === 'vertical' ? 'space-y-2' : 'space-y-1'}`} {...props}>
    {items?.map((item, index) => (
      <div key={index} className="flex justify-between">
        <span className="text-sm text-gray-600 dark:text-gray-400">{item.key}</span>
        <span className="text-sm font-medium text-gray-900 dark:text-white">{item.value}</span>
      </div>
    ))}
  </div>
);

interface ListItemCardProps {
  title?: string;
  subtitle?: string;
  badge?: React.ReactNode;
  trailing?: React.ReactNode;
  onClick?: () => void;
  [key: string]: any;
}

const ListItemCard = ({ title, subtitle, badge, trailing, onClick, ...props }: ListItemCardProps) => (
  <div
    className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/80 dark:hover:bg-white/10 transition-colors"
    onClick={onClick}
    {...props}
  >
    <div className="flex items-start justify-between">
      <div className="flex-1">
        {title && <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>}
        {subtitle && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        {badge}
        {trailing}
      </div>
    </div>
  </div>
);

interface AvatarGroupProps {
  avatars?: Array<{ src?: string; alt?: string; fallback?: string }>;
  max?: number;
  size?: string;
  [key: string]: any;
}

const AvatarGroup = ({ avatars, max, size, ...props }: AvatarGroupProps) => (
  <div className="flex -space-x-2" {...props}>
    {(avatars || []).slice(0, max || 5).map((avatar, index) => (
      <div
        key={index}
        className={`w-${size || 'md'} h-${size || 'md'} rounded-full border-2 border-white dark:border-gray-900 overflow-hidden`}
      >
        {avatar.src ? (
          <img src={avatar.src} alt={avatar.alt} className="w-full h-full object-cover" />
        ) : (
          <div className={`w-full h-full bg-brand-500 text-white flex items-center justify-center text-sm font-medium`}>
            {avatar.fallback}
          </div>
        )}
      </div>
    ))}
    {(avatars || []).length > (max || 5) && (
      <div className={`w-${size || 'md'} h-${size || 'md'} rounded-full border-2 border-white dark:border-gray-900 bg-neutral-500 text-white flex items-center justify-center text-xs font-medium`}>
        +{(avatars || []).length - (max || 5)}
      </div>
    )}
  </div>
);

interface BannerProps {
  variant?: string;
  title?: string;
  dismissible?: boolean;
  action?: { label: string; onClick: () => void };
  children?: React.ReactNode;
  [key: string]: any;
}

const Banner = ({ variant, title, dismissible, action, children, ...props }: BannerProps) => (
  <div className={`bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-lg p-4 ${
    variant === 'announcement' ? 'border-l-4 border-l-brand-500' :
    variant === 'error' ? 'border-l-4 border-l-error-500' :
    variant === 'warning' ? 'border-l-4 border-l-warning-500' :
    'border-l-4 border-l-info-500'
  }`} {...props}>
    <div className="flex items-start justify-between">
      <div className="flex-1">
        {title && <h4 className="font-medium text-gray-900 dark:text-white mb-1">{title}</h4>}
        <div className="text-sm text-gray-600 dark:text-gray-400">{children}</div>
        {action && (
          <button
            onClick={action.onClick}
            className="mt-3 text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300"
          >
            {action.label}
          </button>
        )}
      </div>
      {dismissible && (
        <button className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          ×
        </button>
      )}
    </div>
  </div>
);

interface InlineMessageProps {
  variant?: string;
  size?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

const InlineMessage = ({ variant, size, children, ...props }: InlineMessageProps) => (
  <div className={`flex items-center gap-2 text-${size || 'md'} ${
    variant === 'success' ? 'text-green-600 dark:text-green-400' :
    variant === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
    variant === 'error' ? 'text-red-600 dark:text-red-400' :
    'text-blue-600 dark:text-blue-400'
  }`} {...props}>
    <span className={`w-4 h-4 rounded-full ${
      variant === 'success' ? 'bg-green-500' :
      variant === 'warning' ? 'bg-yellow-500' :
      variant === 'error' ? 'bg-red-500' :
      'bg-blue-500'
    }`} />
    {children}
  </div>
);

interface InfoBoxProps {
  variant?: string;
  title?: string;
  dismissible?: boolean;
  children?: React.ReactNode;
  [key: string]: any;
}

const InfoBox = ({ variant, title, dismissible, children, ...props }: InfoBoxProps) => (
  <div className={`bg-${
    variant === 'tip' ? 'brand-50 dark:brand-900/20 border-brand-200 dark:border-brand-700' :
    variant === 'warning' ? 'warning-50 dark:warning-900/20 border-warning-200 dark:border-warning-700' :
    variant === 'error' ? 'error-50 dark:error-900/20 border-error-200 dark:border-error-700' :
    'info-50 dark:info-900/20 border-info-200 dark:border-info-700'
  } border rounded-lg p-4`} {...props}>
    <div className="flex items-start justify-between">
      <div className="flex-1">
        {title && <h4 className="font-medium text-gray-900 dark:text-white mb-1">{title}</h4>}
        <div className="text-sm text-gray-600 dark:text-gray-400">{children}</div>
      </div>
      {dismissible && (
        <button className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          ×
        </button>
      )}
    </div>
  </div>
);

export default function ComponentsPage() {
  const [activeTab, setActiveTab] = useState("input");

  const tabs = [
    { id: "input", label: "Input System" },
    { id: "element", label: "Element System" },
    { id: "document", label: "Document System" },
    { id: "overlay", label: "Overlay System" },
    { id: "tokens", label: "Design Tokens" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/80 via-purple-50/30 to-blue-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background glow effect */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-3xl -z-10" />
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/50 dark:bg-white/5 backdrop-blur-xl border-b border-white/20 dark:border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828-.793.793zM15.5 12a1 1 0 01-1 1H14a1 1 0 110-2h.5a1 1 0 011 1z" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Liquid Glass Components
              </h1>
            </div>
            
            <nav className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-brand-500 text-white"
                      : "text-gray-600 dark:text-gray-400 hover:bg-white/20 dark:hover:bg-white/5"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === "input" && <InputSystemShowcase />}
        {activeTab === "element" && <ElementSystemShowcase />}
        {activeTab === "document" && <DocumentSystemShowcase />}
        {activeTab === "overlay" && <OverlaySystemShowcase />}
        {activeTab === "tokens" && <DesignTokensShowcase />}
      </main>
    </div>
  );
}

// Input System Showcase - COMPREHENSIVE ALL 51 COMPONENTS
function InputSystemShowcase() {
  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Input System - Complete Library
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          51 next-generation SaaS UI components built for long-usage office and developer tools. 
          Every component crafted with liquid glass styling, accessibility, and micro-interactions.
        </p>
      </div>

      {/* Basic Inputs */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Basic Inputs</h3>
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-3xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TextInput
              label="Text Input"
              placeholder="Enter text here"
              description="Standard text input field"
            />
            
            <PasswordInput
              label="Password"
              placeholder="Enter password"
              description="Password with toggle visibility"
            />
            
            <NumberInput
              label="Number"
              placeholder="0"
              description="Numeric entry with stepper controls"
            />
            
            <SearchInput
              label="Search"
              placeholder="Search..."
              description="Search input with icon and debounce"
            />
          </div>
        </div>
      </section>

      {/* Selection Components */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Selection Components</h3>
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-3xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Select
              label="Country"
              placeholder="Select country"
              description="Glass dropdown, single selection"
              options={[
                { value: "us", label: "United States" },
                { value: "uk", label: "United Kingdom" },
                { value: "ca", label: "Canada" },
              ]}
            />
            
            <MultiSelect
              label="Skills"
              placeholder="Select skills"
              description="Chip-based multi-selection"
              options={[
                { value: "react", label: "React" },
                { value: "vue", label: "Vue" },
                { value: "angular", label: "Angular" },
              ]}
            />
            
            <Combobox
              label="City"
              placeholder="Search and select city"
              description="Filterable select with search"
              options={[
                { value: "nyc", label: "New York City" },
                { value: "la", label: "Los Angeles" },
                { value: "chicago", label: "Chicago" },
              ]}
            />
            
            <Autocomplete
              label="User Search"
              placeholder="Search users..."
              description="Async search with loading state"
              options={[]}
            />
          </div>
        </div>
      </section>

      {/* Boolean Components */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Boolean Components</h3>
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-3xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Checkbox
              label="Accept terms and conditions"
              description="I agree to the terms of service"
            />
            
            <CheckboxGroup
              label="Preferences"
              description="Select your preferences"
              options={[
                { value: "newsletter", label: "Newsletter" },
                { value: "updates", label: "Product updates" },
                { value: "marketing", label: "Marketing emails" },
              ]}
            />
            
            <Toggle
              label="Enable notifications"
              description="Receive push notifications"
              size="md"
            />
            
            <RadioGroup
              label="Account type"
              description="Choose your account type"
              options={[
                { value: "personal", label: "Personal" },
                { value: "business", label: "Business" },
                { value: "enterprise", label: "Enterprise" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Date & Time Components */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Date & Time Components</h3>
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-3xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DatePicker
              label="Birth Date"
              placeholder="Select date"
              description="Glass calendar, single date"
            />
            
            <DateRangePicker
              label="Booking Period"
              placeholder="Select date range"
              description="Date range with visual highlight"
            />
            
            <TimePicker
              label="Appointment Time"
              placeholder="Select time"
              description="Hour/minute stepper with AM/PM"
            />
            
            <DateTimePicker
              label="Event Date & Time"
              placeholder="Select date and time"
              description="Combined date + time picker"
            />
          </div>
        </div>
      </section>

      {/* File Upload Components */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">File Upload Components</h3>
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-3xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FileUpload
              label="Document"
              description="Single file upload"
              accept=".pdf,.doc,.docx"
            />
            
            <FileUploadMultiple
              label="Attachments"
              description="Multiple files with list"
              accept="image/*,.pdf"
            />
            
            <DragAndDropUpload
              label="Drop Zone"
              description="Drag & drop zone for files"
              accept="*"
            />
            
            <ImageUpload
              label="Profile Picture"
              description="Image with preview + blur bg"
              aspectRatio="1:1"
            />
            
            <AvatarUpload
              label="Avatar"
              description="Circular avatar with camera overlay"
            />
          </div>
        </div>
      </section>

      {/* Rich Input Components */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Rich Input Components</h3>
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-3xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TextArea
              label="Description"
              placeholder="Enter description..."
              description="Auto-resize textarea with char count"
              rows={4}
            />
            
            <TagInput
              label="Tags"
              placeholder="Add tags..."
              description="Animated chip tags"
            />
            
            <MarkdownEditor
              label="Content"
              placeholder="Write markdown..."
              description="Write + Preview modes with toolbar"
            />
          </div>
        </div>
      </section>

      {/* Special Input Components */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Special Input Components</h3>
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-3xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PhoneInput
              label="Phone Number"
              placeholder="+1 (555) 000-0000"
              description="Country code picker + phone number"
            />
            
            <OTPInput
              label="Verification Code"
              placeholder="••••••"
              description="Auto-focus jumping OTP digits"
              length={6}
            />
            
            <ColorPicker
              label="Brand Color"
              placeholder="#000000"
              description="Color wheel + hex input + presets"
            />
            
            <Slider
              label="Volume"
              description="Single range slider"
              min={0}
              max={100}
              defaultValue={50}
            />
            
            <RangeSlider
              label="Price Range"
              description="Dual-handle range slider"
              min={0}
              max={1000}
              defaultValue={[100, 500]}
            />
          </div>
        </div>
      </section>

      {/* Input States & Variations */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Input States & Variations</h3>
        <div className="space-y-6">
          {/* Error States */}
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-3xl p-8">
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">Error States</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <TextInput
                label="Email"
                placeholder="name@company.com"
                errorMessage="Please enter a valid email address"
                defaultValue="invalid-email"
              />
              
              <PasswordInput
                label="Password"
                placeholder="Enter password"
                errorMessage="Password must be at least 8 characters"
                defaultValue="123"
              />
              
              <Select
                label="Country"
                placeholder="Select country"
                errorMessage="Please select a country"
                options={[]}
              />
            </div>
          </div>

          {/* Loading States */}
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-3xl p-8">
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">Loading States</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <TextInput
                label="Username"
                placeholder="Checking availability..."
                isLoading
              />
              
              <SearchInput
                label="Search"
                placeholder="Searching..."
                isLoading
              />
              
              <Autocomplete
                label="Users"
                placeholder="Loading users..."
                isLoading
                options={[]}
              />
            </div>
          </div>

          {/* Disabled States */}
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-3xl p-8">
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">Disabled States</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <TextInput
                label="Read-only Field"
                value="This field is disabled"
                disabled
              />
              
              <Toggle
                label="Disabled Toggle"
                disabled
              />
              
              <Checkbox
                label="Disabled Checkbox"
                disabled
              />
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Use Cases */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Advanced Use Cases</h3>
        <div className="space-y-6">
          {/* User Registration Form */}
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-3xl p-8">
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">👤 User Registration Form</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <TextInput
                  label="First Name"
                  placeholder="Enter first name"
                  required
                />
                <TextInput
                  label="Last Name"
                  placeholder="Enter last name"
                  required
                />
                <PhoneInput
                  label="Phone Number"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div className="space-y-4">
                <EmailInput
                  label="Email"
                  placeholder="name@company.com"
                  required
                />
                <PasswordInput
                  label="Password"
                  placeholder="Create password"
                  description="Min 8 characters with mixed case, numbers, and symbols"
                  required
                />
                <DatePicker
                  label="Birth Date"
                  placeholder="Select birth date"
                />
              </div>
            </div>
            <div className="mt-6">
              <Checkbox
                label="I agree to the Terms of Service and Privacy Policy"
                required
              />
            </div>
          </div>

          {/* Product Configuration */}
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-3xl p-8">
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">⚙️ Product Configuration</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Select
                  label="Product Type"
                  placeholder="Select product"
                  options={[
                    { value: "basic", label: "Basic Plan" },
                    { value: "pro", label: "Pro Plan" },
                    { value: "enterprise", label: "Enterprise Plan" },
                  ]}
                />
                <RangeSlider
                  label="Users"
                  description="Number of team members"
                  min={1}
                  max={100}
                  defaultValue={[5, 20]}
                />
                <MultiSelect
                  label="Features"
                  placeholder="Select features"
                  options={[
                    { value: "api", label: "API Access" },
                    { value: "analytics", label: "Analytics" },
                    { value: "support", label: "Priority Support" },
                  ]}
                />
              </div>
              <div className="space-y-4">
                <Toggle
                  label="Enable Auto-renewal"
                  description="Automatically renew subscription"
                />
                <DatePicker
                  label="Start Date"
                  placeholder="Select start date"
                />
                <TextArea
                  label="Special Requirements"
                  placeholder="Any special requirements..."
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Content Creation */}
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-3xl p-8">
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">📝 Content Creation</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <TextInput
                  label="Title"
                  placeholder="Enter title"
                  required
                />
                <TagInput
                  label="Tags"
                  placeholder="Add tags..."
                  description="Separate tags with commas"
                />
                <ImageUpload
                  label="Featured Image"
                  description="Upload featured image"
                  aspectRatio="16:9"
                />
              </div>
              <div className="space-y-4">
                <MarkdownEditor
                  label="Content"
                  placeholder="Write your content here..."
                  description="Supports markdown formatting"
                />
                <FileUploadMultiple
                  label="Attachments"
                  description="Upload supporting files"
                  accept=".pdf,.doc,.docx,.txt"
                />
              </div>
            </div>
          </div>

          {/* Event Planning */}
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-3xl p-8">
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">📅 Event Planning</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <TextInput
                  label="Event Name"
                  placeholder="Enter event name"
                  required
                />
                <DateTimePicker
                  label="Event Date & Time"
                  placeholder="Select date and time"
                  required
                />
                <Combobox
                  label="Location"
                  placeholder="Search and select venue"
                  options={[
                    { value: "venue1", label: "Convention Center" },
                    { value: "venue2", label: "Hotel Ballroom" },
                    { value: "venue3", label: "Outdoor Park" },
                  ]}
                />
              </div>
              <div className="space-y-4">
                <NumberInput
                  label="Expected Attendees"
                  placeholder="0"
                  description="Estimated number of attendees"
                />
                <RangeSlider
                  label="Budget Range"
                  description="Event budget in USD"
                  min={1000}
                  max={50000}
                  defaultValue={[5000, 15000]}
                />
                <TextArea
                  label="Special Requirements"
                  placeholder="Any special requirements or notes..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Usage Examples</h3>
        <div className="space-y-6">
          <p className="text-gray-600 dark:text-gray-400">
            Code examples coming soon...
          </p>
        </div>
      </section>
    </div>
  );
}

// Element System Showcase - COMPREHENSIVE ALL COMPONENTS
function ElementSystemShowcase() {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentStep, setCurrentStep] = useState(1);
  const [currentPage, setCurrentPage] = useState(3);
  
  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Element System - Complete Library
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Comprehensive UI components built with Liquid Glass design philosophy. 
          Every component features frosted glass styling, accessibility, and micro-interactions.
        </p>
      </div>

      {/* Navigation Tabs */}
      <Tabs
        value={activeTab}
        onChange={setActiveTab}
        variant="pills"
        fullWidth
        tabs={[
          { value: "overview", label: "Overview" },
          { value: "layout", label: "Layout & Panels" },
          { value: "navigation", label: "Navigation" },
          { value: "feedback", label: "Feedback" },
          { value: "data", label: "Data Display" },
          { value: "media", label: "Media" },
        ]}
      />

      {/* Tab Content */}
      <TabPanel value="overview" activeValue={activeTab}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>🎨 Liquid Glass Design</CardTitle>
              <CardDescription>Frosted glass interfaces with backdrop blur</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All components feature the signature liquid glass styling with semi-transparent backgrounds, 
                backdrop blur effects, and subtle borders.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>♿ Accessibility First</CardTitle>
              <CardDescription>ARIA roles, keyboard navigation, focus management</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Built with accessibility in mind, including proper ARIA roles, keyboard navigation, 
                focus management, and screen reader support.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🌙 Dark Mode Ready</CardTitle>
              <CardDescription>Consistent theming across light and dark modes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All components support dark mode with consistent color tokens and styling 
                that adapts seamlessly to your theme.
              </p>
            </CardContent>
          </Card>
        </div>
      </TabPanel>
    </div>
  );
}

// Code Example Component
function CodeExample({ title, code }: { title: string; code: string }) {
  return (
    <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-white/20 dark:border-white/10">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h4>
      </div>
      <div className="p-6">
        <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
          <code className="language-jsx">{code}</code>
        </pre>
      </div>
    </div>
  );
}



// Document System Showcase - COMPREHENSIVE DOCUMENT MANAGEMENT
function DocumentSystemShowcase() {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Document System
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Complete document management solution. View, edit, annotate, and collaborate on 
          documents with powerful tools and intuitive interfaces.
        </p>
      </div>

      {/* Document Toolbar */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Document Toolbar</h3>
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-3xl p-8">
          <div className="flex flex-wrap items-center gap-4">
            <button className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors">
              <span className="mr-2">📄</span> New
            </button>
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <span className="mr-2">💾</span> Save
            </button>
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <span className="mr-2">🖨️</span> Print
            </button>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <span className="mr-2">↶</span> Undo
            </button>
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <span className="mr-2">↷</span> Redo
            </button>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <span className="mr-2">🔍</span> Find
            </button>
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <span className="mr-2">📝</span> Comment
            </button>
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <span className="mr-2">🖊️</span> Annotate
            </button>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
            <select 
              value={zoom} 
              onChange={(e) => setZoom(Number(e.target.value))}
              className="px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <option value={50}>50%</option>
              <option value={75}>75%</option>
              <option value={100}>100%</option>
              <option value={125}>125%</option>
              <option value={150}>150%</option>
            </select>
          </div>
        </div>
      </section>

      {/* Document Viewer */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Document Viewer</h3>
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-3xl p-8">
          {/* Search Bar */}
          <div className="mb-6">
            <SearchInput
              placeholder="Search in document..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Document Pages */}
          <div className="space-y-6">
            {[1, 2, 3].map((page) => (
              <div
                key={page}
                className={`
                  bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 border-2 transition-all
                  ${currentPage === page 
                    ? 'border-purple-500 dark:border-purple-400 ring-2 ring-purple-200 dark:ring-purple-800' 
                    : 'border-gray-200 dark:border-gray-700'
                  }
                `}
                style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
              >
                <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Page {page} of 3
                    </span>
                    <div className="flex gap-2">
                      <button className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                        📝 Edit
                      </button>
                      <button className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                        💬 Comment
                      </button>
                      <button className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                        📎 Attach
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <h4 className="text-lg font-semibold mb-3">Document Content - Page {page}</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris.
                  </p>
                  {page === 1 && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-4">
                      <p className="text-blue-700 dark:text-blue-300 text-sm">
                        <strong>Note:</strong> This is a highlighted section with important information.
                      </p>
                    </div>
                  )}
                  {page === 2 && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-4">
                      <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                        <strong>Comment:</strong> User annotation on this section for review.
                      </p>
                    </div>
                  )}
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Key point one with detailed explanation</li>
                    <li>Key point two with supporting evidence</li>
                    <li>Key point three with references</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Page Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>
            <div className="flex gap-2">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`
                    w-8 h-8 rounded-lg text-sm font-medium transition-colors
                    ${currentPage === page
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  {page}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
              disabled={currentPage === 3}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        </div>
      </section>

      {/* File Upload Section */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Document Upload</h3>
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-3xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FileUpload
              label="Single Document"
              description="Upload PDF, Word, or text files"
              accept=".pdf,.doc,.docx,.txt"
            />
            <FileUploadMultiple
              label="Multiple Documents"
              description="Upload multiple files at once"
              accept=".pdf,.doc,.docx,.txt,.rtf"
            />
          </div>
        </div>
      </section>

      {/* Signature Frame Section */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Signature Frame</h3>
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-3xl p-8">
          <div className="space-y-6">
            {/* Signature Frame Types */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">Signature Frame Types</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Basic Signature Frame */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 p-6">
                  <div className="text-center">
                    <div className="mb-4">
                      <div className="text-3xl text-gray-400 dark:text-gray-500">✍️</div>
                    </div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">Basic Signature</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Simple signature area for digital signatures
                    </p>
                    <div className="h-20 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                      <span className="text-gray-400 dark:text-gray-500 text-sm">Sign here</span>
                    </div>
                  </div>
                </div>

                {/* Formal Signature Frame */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border-2 border-gray-300 dark:border-gray-700 p-6">
                  <div className="text-center">
                    <div className="mb-4">
                      <div className="text-3xl text-gray-400 dark:text-gray-500">📝</div>
                    </div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">Formal Signature</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Professional signature frame with details
                    </p>
                    <div className="space-y-3">
                      <div className="h-16 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                        <span className="text-gray-400 dark:text-gray-500 text-sm">Signature</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="text-left">
                          <span className="text-gray-500 dark:text-gray-400">Date:</span>
                          <div className="h-6 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 mt-1"></div>
                        </div>
                        <div className="text-left">
                          <span className="text-gray-500 dark:text-gray-400">Name:</span>
                          <div className="h-6 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 mt-1"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Certified Signature Frame */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border-2 border-blue-300 dark:border-blue-700 p-6 relative">
                  <div className="absolute top-2 right-2">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <div className="text-blue-600 dark:text-blue-400 text-xs">🔒</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="mb-4">
                      <div className="text-3xl text-blue-500">🏛️</div>
                    </div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">Certified Signature</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Legally binding signature with certification
                    </p>
                    <div className="space-y-3">
                      <div className="h-20 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800 flex items-center justify-center">
                        <span className="text-blue-400 dark:text-blue-300 text-sm">Certified Signature</span>
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-400">
                        <div className="flex justify-between">
                          <span>Digital ID: #123456</span>
                          <span>✓ Verified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Signature Frame Features */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">Signature Frame Features</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">🖊️ Drawing Tools</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Pen, brush, eraser with pressure sensitivity</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">📱 Touch Support</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Native touch and stylus input support</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">💾 Auto-save</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Automatic signature saving and backup</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">🔐 Security</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Encrypted storage and tamper protection</p>
                </div>
              </div>
            </div>

            {/* Interactive Signature Demo */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">Interactive Signature Demo</h4>
              <div className="bg-white dark:bg-gray-900 rounded-lg border-2 border-gray-300 dark:border-gray-700 p-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h5 className="font-medium text-gray-900 dark:text-white">Document Agreement</h5>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                        Clear
                      </button>
                      <button className="px-3 py-1 text-xs bg-brand-500 text-white rounded hover:bg-brand-600">
                        Save
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded p-4">
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                        By signing below, I agree to the terms and conditions outlined in this document.
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        This electronic signature is legally binding under the Electronic Signatures Act.
                      </p>
                    </div>
                    
                    <div className="border-t-2 border-dashed border-gray-300 dark:border-gray-600 pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Signature
                          </label>
                          <div className="h-24 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-brand-500 transition-colors">
                            <div className="text-center">
                              <div className="text-2xl text-gray-400 dark:text-gray-500 mb-2">✍️</div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">Click to sign</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Full Name
                            </label>
                            <div className="h-8 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded"></div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Date
                            </label>
                            <div className="h-8 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Overlay System Showcase - COMPREHENSIVE USECASES
function OverlaySystemShowcase() {
  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Overlay System
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          All floating UI layers that render above the normal document flow. Portal-rendered 
          components that always appear correctly regardless of parent overflow or z-index.
        </p>
      </div>

      {/* Modal System */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Modal System</h3>
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-3xl p-8">
          <div className="space-y-6">
            {/* Modal Variants */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">Modal Variants</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Default Modal</div>
                  <div className="bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-600 p-3">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full mb-3" />
                    <div className="flex gap-2">
                      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded flex-1" />
                      <div className="h-6 bg-brand-500 rounded flex-1" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Form Modal</div>
                  <div className="bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-600 p-3">
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                      <div className="h-6 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600" />
                      <div className="h-6 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Confirmation</div>
                  <div className="bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-600 p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-error-100 dark:bg-error-900 rounded-full flex items-center justify-center">
                        <div className="w-3 h-0.5 bg-error-600 dark:bg-error-400" />
                      </div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full mb-3" />
                    <div className="flex gap-2">
                      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded flex-1" />
                      <div className="h-6 bg-error-500 rounded flex-1" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Fullscreen</div>
                  <div className="bg-gray-900 dark:bg-gray-950 rounded border border-gray-700 p-3">
                    <div className="h-3 bg-gray-700 rounded w-1/2 mb-2" />
                    <div className="h-2 bg-gray-700 rounded w-full mb-3" />
                    <div className="h-20 bg-gray-800 rounded mb-3" />
                    <div className="flex gap-2">
                      <div className="h-6 bg-gray-600 rounded flex-1" />
                      <div className="h-6 bg-brand-600 rounded flex-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Sizes */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">Modal Sizes</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { size: "sm", label: "Small (384px)", width: "w-32" },
                  { size: "md", label: "Medium (448px)", width: "w-40" },
                  { size: "lg", label: "Large (512px)", width: "w-44" },
                  { size: "xl", label: "XL (672px)", width: "w-56" },
                ].map((modal) => (
                  <div key={modal.size} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">{modal.label}</div>
                    <div className="bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-600 mx-auto p-2">
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Drawer System */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Drawer System</h3>
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-3xl p-8">
          <div className="space-y-6">
            {/* Drawer Positions */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">Drawer Positions</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Left Drawer</div>
                  <div className="bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-600 h-32 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-brand-500" />
                    <div className="p-2">
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Right Drawer</div>
                  <div className="bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-600 h-32 relative">
                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-brand-500" />
                    <div className="p-2">
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Bottom Sheet</div>
                  <div className="bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-600 h-32 relative">
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-brand-500" />
                    <div className="absolute bottom-4 left-2 right-2">
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Use Cases */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">Common Use Cases</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">🧭 Navigation</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Mobile navigation menus, sidebar navigation</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">🔍 Details</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Record details, inspector panels, settings</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">📝 Forms</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Quick forms, filters, search panels</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">📱 Actions</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Mobile action sheets, context menus</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dropdown System */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Dropdown System</h3>
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-3xl p-8">
          <div className="space-y-6">
            {/* Dropdown Examples */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">Dropdown Types</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Action Menu</div>
                  <div className="bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-600 p-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 p-1">
                        <div className="w-3 h-3 bg-gray-400 rounded" />
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-16" />
                      </div>
                      <div className="flex items-center gap-2 p-1">
                        <div className="w-3 h-3 bg-gray-400 rounded" />
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-12" />
                      </div>
                      <div className="border-t border-gray-200 dark:border-gray-600 my-1" />
                      <div className="flex items-center gap-2 p-1">
                        <div className="w-3 h-3 bg-error-400 rounded" />
                        <div className="h-2 bg-error-200 dark:bg-error-800 rounded w-10" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">User Menu</div>
                  <div className="bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-600 p-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 p-1">
                        <div className="w-4 h-4 bg-gray-300 rounded-full" />
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded w-full" />
                      <div className="border-t border-gray-200 dark:border-gray-600 my-1" />
                      <div className="flex items-center gap-2 p-1">
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-16" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Filter Menu</div>
                  <div className="bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-600 p-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 p-1">
                        <div className="w-3 h-3 bg-brand-500 rounded" />
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-12" />
                      </div>
                      <div className="flex items-center gap-2 p-1">
                        <div className="w-3 h-3 bg-gray-300 rounded" />
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-14" />
                      </div>
                      <div className="flex items-center gap-2 p-1">
                        <div className="w-3 h-3 bg-gray-300 rounded" />
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-10" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dropdown Features */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">Key Features</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">🎯 Portal Rendering</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Never clipped by parent overflow or z-index</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">🔄 Auto Reposition</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Automatically adjusts on scroll and resize</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">⌨️ Keyboard Navigation</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Arrow keys, Enter, Escape support</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">✨ Rich Items</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Icons, descriptions, shortcuts, separators</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popover & Tooltip */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Popover & Tooltip</h3>
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-3xl p-8">
          <div className="space-y-6">
            {/* Popover Examples */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">Popover Use Cases</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">🔔 Notifications</div>
                  <div className="bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-600 p-3">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="flex-1">
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mt-1" />
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-success-500 rounded-full mt-1" />
                        <div className="flex-1">
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mt-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">⚙️ Settings</div>
                  <div className="bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-600 p-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-16" />
                        <div className="w-8 h-4 bg-brand-500 rounded-full" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                        <div className="w-8 h-4 bg-gray-300 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">👤 User Profile</div>
                  <div className="bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-600 p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-gray-300 rounded-full" />
                      <div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-16" />
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-12 mt-1" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tooltip Examples */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">Tooltip Positions</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { position: "Top", arrow: "↓" },
                  { position: "Bottom", arrow: "↑" },
                  { position: "Left", arrow: "→" },
                  { position: "Right", arrow: "←" },
                ].map((tooltip) => (
                  <div key={tooltip.position} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">{tooltip.position}</div>
                    <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded inline-block">
                      {tooltip.arrow} Tooltip
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Context Menu */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Context Menu</h3>
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-3xl p-8">
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-4">
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Right-Click Area</div>
                <div className="bg-white dark:bg-gray-900 rounded border-2 border-dashed border-gray-300 dark:border-gray-600 p-8">
                  <span className="text-gray-500 dark:text-gray-400">Right-click here to open context menu</span>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-600 p-2 mx-auto" style={{ width: 'fit-content' }}>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                    <div className="w-3 h-3 bg-gray-400 rounded" />
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-16" />
                  </div>
                  <div className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                    <div className="w-3 h-3 bg-gray-400 rounded" />
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-12" />
                    <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded w-8 ml-auto text-xs">⌘E</div>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-600 my-1" />
                  <div className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                    <div className="w-3 h-3 bg-error-400 rounded" />
                    <div className="h-2 bg-error-200 dark:bg-error-800 rounded w-20" />
                    <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded w-8 ml-auto text-xs">⌫</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">🖱️ Right-Click Trigger</div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Opens on contextmenu event</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">📍 Cursor Position</div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Appears near cursor, viewport-clamped</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Usage Examples</h3>
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Confirmation Modal Example</div>
            <div className="bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-600 p-3">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Modal component example</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function DesignTokensShowcase() {
  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Design Tokens
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Single source of truth for all visual decisions. Colors, spacing, shadows, motion, 
          and typography that ensure consistency across the entire system.
        </p>
      </div>

      {/* Color System */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Color System</h3>
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-3xl p-8">
          
          {/* Brand Colors */}
          <div className="space-y-6">
            <h4 className="font-semibold text-gray-900 dark:text-white">Brand — Pastel Purple</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
              {[
                { shade: "50", hex: "#faf5ff" },
                { shade: "100", hex: "#f3e8ff" },
                { shade: "200", hex: "#e9d5ff" },
                { shade: "300", hex: "#d8b4fe" },
                { shade: "400", hex: "#c084fc" },
                { shade: "500", hex: "#a855f7" },
                { shade: "600", hex: "#9333ea" },
                { shade: "700", hex: "#7e22ce" },
              ].map((color) => (
                <div key={color.shade} className="text-center">
                  <div className="bg-brand-500 h-16 rounded-lg border border-white/20"></div>
                  <div className="text-xs mt-1 text-gray-600 dark:text-gray-400">
                    <div className="font-medium">{color.shade}</div>
                    <div>{color.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Semantic Colors */}
          <div className="space-y-6 mt-8">
            <h4 className="font-semibold text-gray-900 dark:text-white">Semantic Colors</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Success", colors: ["success-100", "success-300", "success-500", "success-700"] },
                { name: "Warning", colors: ["warning-100", "warning-300", "warning-500", "warning-700"] },
                { name: "Error", colors: ["error-100", "error-300", "error-500", "error-700"] },
                { name: "Neutral", colors: ["neutral-100", "neutral-400", "neutral-700", "neutral-900"] },
              ].map((group) => (
                <div key={group.name} className="text-center">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">{group.name}</h5>
                  <div className="space-y-1">
                    {group.colors.map((colorClass) => (
                      <div key={colorClass} className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-500 rounded border border-white/20"></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">{colorClass}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Spacing System */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Spacing System</h3>
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-3xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {[
              { name: "xs", value: "4px", size: "w-2 h-2" },
              { name: "sm", value: "8px", size: "w-3 h-3" },
              { name: "md", value: "12px", size: "w-4 h-4" },
              { name: "lg", value: "16px", size: "w-5 h-5" },
              { name: "xl", value: "24px", size: "w-6 h-6" },
              { name: "2xl", value: "32px", size: "w-8 h-8" },
              { name: "3xl", value: "48px", size: "w-12 h-12" },
            ].map((spacing) => (
              <div key={spacing.name} className="text-center">
                <div className="w-8 h-8 bg-brand-500 rounded mx-auto mb-2"></div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  <div className="font-medium">{spacing.name}</div>
                  <div>{spacing.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Typography</h3>
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-3xl p-8">
          <div className="space-y-4">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">Page Title</div>
            <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">Section Title</div>
            <div className="text-base font-semibold text-gray-800 dark:text-gray-100">Card Title</div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Label Text</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Body Text</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Caption Text</div>
            <div className="text-[11px] font-semibold uppercase text-brand-600 dark:text-brand-400">Overline</div>
            <div className="text-xs font-mono text-gray-600 dark:text-gray-400">Code Text</div>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Usage Examples</h3>
        <div className="space-y-6">
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-white/20 dark:border-white/10">
              <h4 className="font-semibold text-gray-900 dark:text-white">Using Design Tokens</h4>
            </div>
            <div className="p-6">
              <pre className="bg-gray-900/50 dark:bg-gray-800/50 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm text-gray-300 font-mono">{`import { color, spacing, typography } from "@/styles/tokens";

// In components
className={cn(
  color.brand.bg.muted,
  color.brand.text.DEFAULT,
  spacing.lg,
  typography.preset.body
)}`}</code>
              </pre>
            </div>
          </div>
          
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-white/20 dark:border-white/10">
              <h4 className="font-semibold text-gray-900 dark:text-white">Glass Effects</h4>
            </div>
            <div className="p-6">
              <pre className="bg-gray-900/50 dark:bg-gray-800/50 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm text-gray-300 font-mono">{`import { glass, layout } from "@/styles/tokens";

// Glass surface
className={glass.base}

// Card variants
className={layout.card.elevated}`}</code>
              </pre>
            </div>
          </div>
          
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-white/20 dark:border-white/10">
              <h4 className="font-semibold text-gray-900 dark:text-white">Motion Tokens</h4>
            </div>
            <div className="p-6">
              <pre className="bg-gray-900/50 dark:bg-gray-800/50 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm text-gray-300 font-mono">{`import { motion, duration, easing } from "@/styles/tokens";

// Transitions
className={motion.base}

// Framer Motion
transition={{
  duration: duration.s.normal,
  ease: easing.fm.smooth
}}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
