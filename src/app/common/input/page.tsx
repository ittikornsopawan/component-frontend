"use client";

import React, { useState } from "react";
import { DemoLayout } from "@/components/common";
import { 
  TextInput, 
  PasswordInput, 
  NumberInput, 
  SearchInput,
  Select,
  MultiSelect,
  Combobox,
  Autocomplete,
  Checkbox,
  CheckboxGroup,
  Toggle,
  RadioGroup,
  DatePicker,
  DateRangePicker,
  TimePicker,
  DateTimePicker,
  FileUpload,
  FileUploadMultiple,
  DragAndDropUpload,
  ImageUpload,
  AvatarUpload,
  TextArea,
  TagInput,
  PhoneInput,
  OTPInput,
  ColorPicker,
  Slider,
  RangeSlider
} from "@/components/input";

const selectOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 4" },
];

const radioOptions = [
  { value: "alpha", label: "Alpha" },
  { value: "beta", label: "Beta" },
  { value: "gamma", label: "Gamma" },
];

const checkboxOptions = [
  { value: "docs", label: "Documentation" },
  { value: "code", label: "Source Code" },
  { value: "tests", label: "Test Suite" },
  { value: "deploy", label: "Deployment" },
];

const autocompleteOptions = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "nextjs", label: "Next.js" },
];

export default function InputDemo() {
  const [textValue, setTextValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [numberValue, setNumberValue] = useState(50);
  const [searchValue, setSearchValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [multiSelectValue, setMultiSelectValue] = useState<string[]>([]);
  const [comboboxValue, setComboboxValue] = useState("");
  const [autocompleteValue, setAutocompleteValue] = useState("");
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [checkboxGroupValue, setCheckboxGroupValue] = useState<string[]>([]);
  const [toggleValue, setToggleValue] = useState(false);
  const [radioValue, setRadioValue] = useState("");
  const [dateValue, setDateValue] = useState<Date | null>(new Date());
  const [dateRangeValue, setDateRangeValue] = useState<{ from: Date | null; to: Date | null }>();
  const [timeValue, setTimeValue] = useState<{ hours: number; minutes: number; period?: 'AM' | 'PM' }>({ hours: 12, minutes: 0, period: 'PM' });
  const [dateTimeValue, setDateTimeValue] = useState<{ date: Date | null; hours: number; minutes: number; period: 'AM' | 'PM' }>({ date: new Date(), hours: 12, minutes: 0, period: 'PM' });
  const [textAreaValue, setTextAreaValue] = useState("");
  const [tagInputValue, setTagInputValue] = useState<string[]>(["tag1", "tag2"]);
  const [phoneValue, setPhoneValue] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [colorValue, setColorValue] = useState("#8b5cf6");
  const [sliderValue, setSliderValue] = useState(50);
  const [rangeSliderValue, setRangeSliderValue] = useState<[number, number]>([30, 70]);

  return (
    <DemoLayout 
      title="Input System"
      description="Complete form controls with liquid glass styling. Every component features focus states, error handling, loading states, and accessibility."
      currentSection="input"
    >
      {/* Text Inputs */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Text Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Text Input</label>
            <TextInput
              label="Name"
              placeholder="Enter your name"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              helperText="This is a helper text"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password Input</label>
            <PasswordInput
              label="Password"
              placeholder="Enter password"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              helperText="Must be at least 8 characters"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Number Input</label>
            <NumberInput
              label="Quantity"
              value={numberValue}
              onChange={(value) => setNumberValue(value || 0)}
              min={0}
              max={100}
              helperText="Between 0 and 100"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Search Input</label>
            <SearchInput
              placeholder="Search components..."
              value={searchValue}
              onChange={setSearchValue}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Text Area</label>
            <TextArea
              label="Description"
              placeholder="Enter a detailed description"
              value={textAreaValue}
              onChange={(e) => setTextAreaValue(e.target.value)}
              autoResize
              helperText="Supports auto-resize"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Input</label>
            <PhoneInput
              label="Phone Number"
              value={phoneValue}
              onChange={setPhoneValue}
              helperText="International format supported"
            />
          </div>
        </div>
      </section>

      {/* Selection Inputs */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Selection Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Select</label>
            <Select
              label="Category"
              options={selectOptions}
              value={selectValue}
              onChange={setSelectValue}
              placeholder="Choose an option"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Multi Select</label>
            <MultiSelect
              label="Tags"
              options={selectOptions}
              value={multiSelectValue}
              onChange={setMultiSelectValue}
              placeholder="Select multiple"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Combobox</label>
            <Combobox
              label="Framework"
              options={selectOptions}
              value={comboboxValue}
              onChange={setComboboxValue}
              placeholder="Type or select"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Autocomplete</label>
            <Autocomplete
              label="Technology"
              options={autocompleteOptions}
              value={autocompleteValue}
              onChange={setAutocompleteValue}
              placeholder="Search and select"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Radio Group</label>
            <RadioGroup
              label="Plan"
              options={radioOptions}
              value={radioValue}
              onChange={setRadioValue}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Checkbox Group</label>
            <CheckboxGroup
              label="Features"
              options={checkboxOptions}
              value={checkboxGroupValue}
              onChange={setCheckboxGroupValue}
            />
          </div>
        </div>
      </section>

      {/* Boolean Controls */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Boolean Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Single Checkbox</label>
            <Checkbox
              label="I agree to the terms"
              checked={checkboxValue}
              onChange={(e) => setCheckboxValue(e.target.checked)}
              helperText="Required to continue"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Toggle Switch</label>
            <Toggle
              label="Enable notifications"
              checked={toggleValue}
              onChange={setToggleValue}
              helperText="Get updates via email"
            />
          </div>
        </div>
      </section>

      {/* Date & Time */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Date & Time</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date Picker</label>
            <DatePicker
              label="Birthday"
              value={dateValue}
              onChange={(date) => setDateValue(date)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date Range Picker</label>
            <DateRangePicker
              label="Booking Period"
              value={dateRangeValue}
              onChange={setDateRangeValue}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Time Picker</label>
            <TimePicker
              label="Appointment Time"
              value={timeValue}
              onChange={setTimeValue}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date Time Picker</label>
            <DateTimePicker
              label="Meeting"
              value={dateTimeValue}
              onChange={setDateTimeValue}
            />
          </div>
        </div>
      </section>

      {/* File Uploads */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">File Uploads</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">File Upload</label>
            <FileUpload
              label="Document"
              accept=".pdf,.doc,.docx"
              maxSizeMB={10}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Multiple Files</label>
            <FileUploadMultiple
              label="Attachments"
              accept=".jpg,.png,.pdf"
              maxFiles={5}
              maxSizeMB={5}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Drag & Drop</label>
            <DragAndDropUpload
              label="Project Files"
              accept=".zip,.pdf,.doc"
              maxSizeMB={50}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Image Upload</label>
            <ImageUpload
              label="Cover Image"
              aspectRatio="video"
              maxSizeMB={5}
            />
          </div>
        </div>
      </section>

      {/* Special Inputs */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Special Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tag Input</label>
            <TagInput
              label="Tags"
              value={tagInputValue}
              onChange={setTagInputValue}
              placeholder="Add tags..."
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">OTP Input</label>
            <OTPInput
              label="Verification Code"
              value={otpValue}
              onChange={setOtpValue}
              length={6}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Color Picker</label>
            <ColorPicker
              label="Theme Color"
              value={colorValue}
              onChange={setColorValue}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Slider</label>
            <Slider
              label="Volume"
              value={sliderValue}
              onChange={setSliderValue}
              min={0}
              max={100}
              showValue
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Range Slider</label>
            <RangeSlider
              label="Price Range"
              value={rangeSliderValue}
              onChange={setRangeSliderValue}
              min={0}
              max={100}
            />
          </div>
        </div>
      </section>

      {/* States Demo */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Input States</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Error State</label>
            <TextInput
              label="Email"
              placeholder="Enter email"
              errorMessage="Please enter a valid email address"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Loading State</label>
            <TextInput
              label="Username"
              placeholder="Checking availability..."
              isLoading
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Disabled State</label>
            <TextInput
              label="Read-only Field"
              value="This field is disabled"
              disabled
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Required Field</label>
            <TextInput
              label="Full Name"
              placeholder="Required"
              required
            />
          </div>
        </div>
      </section>
    </DemoLayout>
  );
}
