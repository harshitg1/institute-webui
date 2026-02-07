import { useState, useRef } from 'react';
import { X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface StudentFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  course: string;
  accessLevel: 'standard' | 'premium';
  profilePicture: File | null;
}

interface StudentFormErrors {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  course?: string;
  profilePicture?: string;
}

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StudentFormData) => Promise<void>;
}

export default function AddStudentModal({
  isOpen,
  onClose,
  onSubmit
}: AddStudentModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<StudentFormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    course: '',
    accessLevel: 'standard',
    profilePicture: null
  });

  const [errors, setErrors] = useState<StudentFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const courses = [
    { value: 'nifty', label: 'Nifty Pro Trading' },
    { value: 'options', label: 'Options Trading Masterclass' },
    { value: 'technical', label: 'Technical Analysis Foundation' },
    { value: 'crypto', label: 'Crypto Fundamentals' }
  ];

  const validateForm = (): boolean => {
    const newErrors: StudentFormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?1?\d{9,15}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!formData.course) {
      newErrors.course = 'Please select a course';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof StudentFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          profilePicture: 'Please select an image file'
        }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          profilePicture: 'File size must be less than 5MB'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        profilePicture: file
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      setErrors(prev => ({
        ...prev,
        profilePicture: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await onSubmit(formData);
      handleClose();
    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      course: '',
      accessLevel: 'standard',
      profilePicture: null
    });
    setErrors({});
    setPreviewUrl(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-[800px] max-h-[90vh] overflow-y-auto rounded-2xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-3 p-8 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex flex-col gap-1">
            <h2 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight">
              Add New Student
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-normal">
              Enter the details to enroll a new member to the institute.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-8 space-y-8 overflow-y-auto flex-1">
          
          {/* Personal Information Section */}
          <section>
            <h3 className="text-purple-600 dark:text-purple-400 text-xs font-bold tracking-widest uppercase mb-6">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Profile Picture Upload */}
              <div className="flex flex-col">
                <Label className="text-slate-900 dark:text-gray-200 text-base font-medium mb-3">
                  Profile Picture
                </Label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-purple-300 dark:border-gray-700 px-4 py-8 bg-purple-50 dark:bg-purple-950/20 cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-950/40 transition-colors"
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-purple-200 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      <Upload className="w-8 h-8" />
                    </div>
                  )}
                  <div className="flex flex-col items-center gap-1 text-center">
                    <p className="text-slate-900 dark:text-gray-200 text-sm font-bold">
                      {previewUrl ? 'Change Photo' : 'Upload Photo'}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                      Drag or click to browse
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    Select File
                  </Button>
                </div>
                {errors.profilePicture && (
                  <p className="text-xs text-red-500 font-medium mt-2">{errors.profilePicture}</p>
                )}
              </div>

              {/* Text Fields */}
              <div className="space-y-4">
                <div className="flex flex-col">
                  <Label htmlFor="fullName" className="text-slate-900 dark:text-gray-200 text-base font-medium mb-2">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Enter student's full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="bg-white/50 dark:bg-gray-800 border-purple-300 dark:border-gray-700 rounded-xl h-14 focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-all"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-500 font-medium mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <Label htmlFor="email" className="text-slate-900 dark:text-gray-200 text-base font-medium mb-2">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="student@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-white/50 dark:bg-gray-800 border-purple-300 dark:border-gray-700 rounded-xl h-14 focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-all"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 font-medium mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <Label htmlFor="phoneNumber" className="text-slate-900 dark:text-gray-200 text-base font-medium mb-2">
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="bg-white/50 dark:bg-gray-800 border-purple-300 dark:border-gray-700 rounded-xl h-14 focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-all"
                  />
                  {errors.phoneNumber && (
                    <p className="text-xs text-red-500 font-medium mt-1">{errors.phoneNumber}</p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Course & Access Level Section */}
          <section>
            <h3 className="text-purple-600 dark:text-purple-400 text-xs font-bold tracking-widest uppercase mb-6">
              Course & Access Level
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Course Selection */}
              <div className="flex flex-col">
                <Label className="text-slate-900 dark:text-gray-200 text-base font-medium mb-2">
                  Course Selection
                </Label>
                <Select value={formData.course} onValueChange={(value) => {
                  setFormData(prev => ({ ...prev, course: value }));
                  if (errors.course) {
                    setErrors(prev => ({ ...prev, course: undefined }));
                  }
                }}>
                  <SelectTrigger className="bg-white/50 dark:bg-gray-800 border-purple-300 dark:border-gray-700 rounded-xl h-14 focus:ring-2 focus:ring-purple-600/20">
                    <SelectValue placeholder="Choose a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map(course => (
                      <SelectItem key={course.value} value={course.value}>
                        {course.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.course && (
                  <p className="text-xs text-red-500 font-medium mt-1">{errors.course}</p>
                )}
              </div>

              {/* Access Level Toggle */}
              <div className="flex flex-col">
                <Label className="text-slate-900 dark:text-gray-200 text-base font-medium mb-2">
                  Access Level
                </Label>
                <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl h-14 border border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, accessLevel: 'standard' }))}
                    className={`flex-1 rounded-lg font-bold text-sm transition-all ${
                      formData.accessLevel === 'standard'
                        ? 'bg-white dark:bg-gray-700 shadow-sm text-purple-600 dark:text-white'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, accessLevel: 'premium' }))}
                    className={`flex-1 rounded-lg font-bold text-sm transition-all ${
                      formData.accessLevel === 'premium'
                        ? 'bg-white dark:bg-gray-700 shadow-sm text-purple-600 dark:text-white'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    Premium
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="p-8 border-t border-gray-200/50 dark:border-gray-700/50 flex items-center justify-end gap-4 bg-white/30 dark:bg-gray-900/30">
          <Button
            variant="ghost"
            onClick={handleClose}
            disabled={loading}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-bold text-sm"
          >
            CANCEL
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-teal-600 hover:opacity-90 text-white font-bold text-sm px-8 h-12 rounded-lg shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'ADDING...' : 'ADD STUDENT'}
          </Button>
        </div>
      </div>
    </div>
  );
}
