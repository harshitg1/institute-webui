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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="w-full max-w-[640px] max-h-[85vh] overflow-hidden rounded-lg bg-white border border-zinc-200 shadow-xl flex flex-col">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-6 py-5 border-b border-zinc-100">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-zinc-900 text-lg font-semibold">
              Add New Student
            </h2>
            <p className="text-zinc-500 text-[13px]">
              Enter the details to enroll a new member.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-zinc-400 hover:text-zinc-600 transition-colors p-1 -mr-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="px-6 py-5 space-y-6 overflow-y-auto flex-1">
          
          {/* Personal Information Section */}
          <section>
            <h3 className="text-zinc-500 text-[11px] font-medium tracking-wide uppercase mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Profile Picture Upload */}
              <div className="flex flex-col">
                <Label className="text-zinc-700 text-[13px] font-medium mb-2">
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
                  className="flex flex-col items-center gap-3 rounded-md border border-dashed border-zinc-300 px-4 py-5 bg-zinc-50/50 cursor-pointer hover:bg-zinc-100/50 transition-colors"
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-400">
                      <Upload className="w-5 h-5" />
                    </div>
                  )}
                  <div className="flex flex-col items-center gap-0.5 text-center">
                    <p className="text-zinc-700 text-[13px] font-medium">
                      {previewUrl ? 'Change Photo' : 'Upload Photo'}
                    </p>
                    <p className="text-zinc-400 text-[11px]">
                      Click to browse
                    </p>
                  </div>
                </div>
                {errors.profilePicture && (
                  <p className="text-[11px] text-red-500 mt-1.5">{errors.profilePicture}</p>
                )}
              </div>

              {/* Text Fields */}
              <div className="space-y-4">
                <div className="flex flex-col">
                  <Label htmlFor="fullName" className="text-zinc-700 text-[13px] font-medium mb-1.5">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Enter student's full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <Label htmlFor="email" className="text-zinc-700 text-[13px] font-medium mb-1.5">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="student@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <Label htmlFor="phoneNumber" className="text-zinc-700 text-[13px] font-medium mb-1.5">
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                  {errors.phoneNumber && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.phoneNumber}</p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Course & Access Level Section */}
          <section>
            <h3 className="text-zinc-500 text-[11px] font-medium tracking-wide uppercase mb-4">
              Course & Access Level
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Course Selection */}
              <div className="flex flex-col">
                <Label className="text-zinc-700 text-[13px] font-medium mb-1.5">
                  Course Selection
                </Label>
                <Select value={formData.course} onValueChange={(value) => {
                  setFormData(prev => ({ ...prev, course: value }));
                  if (errors.course) {
                    setErrors(prev => ({ ...prev, course: undefined }));
                  }
                }}>
                  <SelectTrigger className="h-9">
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
                  <p className="text-[11px] text-red-500 mt-1">{errors.course}</p>
                )}
              </div>

              {/* Access Level Toggle */}
              <div className="flex flex-col">
                <Label className="text-zinc-700 text-[13px] font-medium mb-1.5">
                  Access Level
                </Label>
                <div className="flex gap-1 bg-zinc-100 p-1 rounded-md h-9">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, accessLevel: 'standard' }))}
                    className={`flex-1 rounded text-[13px] font-medium transition-all ${
                      formData.accessLevel === 'standard'
                        ? 'bg-white shadow-sm text-zinc-900'
                        : 'text-zinc-500 hover:text-zinc-700'
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, accessLevel: 'premium' }))}
                    className={`flex-1 rounded text-[13px] font-medium transition-all ${
                      formData.accessLevel === 'premium'
                        ? 'bg-white shadow-sm text-zinc-900'
                        : 'text-zinc-500 hover:text-zinc-700'
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
        <div className="px-6 py-4 border-t border-zinc-100 flex items-center justify-end gap-3">
          <Button
            variant="ghost"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Student'}
          </Button>
        </div>
      </div>
    </div>
  );
}
