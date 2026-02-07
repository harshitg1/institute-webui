import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Sparkle, Bolt, ShieldCheck, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { login } from '@/api/authApi';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
    if (errors[name as keyof LoginFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const result = await dispatch(login(formData));

      if (result) {
        const role = result.role;
        console.log('Login successful, redirecting to dashboard for role:', role);
        
        if (role === 'ORG_ADMIN') {
          navigate('/dashboard/admin');
        } else if (role === 'TUTOR') {
          navigate('/dashboard/tutor');
        } else if (role === 'STUDENT') {
          navigate('/dashboard/student');
        } else if (role === 'SUPER_ADMIN') {
          navigate('/dashboard/super-admin');
        }
      }
    } catch (err) {
      // Error is handled by Redux and catchAsync
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white to-blue-50 flex flex-col font-sans text-gray-800">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-8 py-6 border-b border-gray-100 shadow-sm bg-white/70 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-md flex items-center justify-center text-white shadow-md">
            <Sparkle className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-gray-900">SYNAPSE</span>
        </div>
        <a href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-600 hover:text-purple-700 transition-colors py-2 px-3 rounded-md hover:bg-indigo-50">
          <Home className="w-4 h-4" />
          Return Home
        </a>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex max-w-[1600px] mx-auto w-full p-4 lg:p-8 gap-16 items-center justify-center relative">
        {/* Abstract Background Elements (Subtle, Light) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-indigo-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
        </div>
        
        {/* Left Side: Structural Visual */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-between h-full max-h-[800px] bg-white border border-gray-200 rounded-lg p-12 relative overflow-hidden shadow-xl shadow-blue-100 z-10">
           <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50" />
           <div className="absolute -top-16 -right-16 w-64 h-64 bg-purple-300/30 blur-[70px] rounded-full mix-blend-multiply animate-pulse-light" />
           <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50/70 backdrop-blur-sm rounded-full border border-green-200 mb-6 shadow-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-md shadow-emerald-300 animate-pulse" />
                <span className="text-[11px] font-bold text-green-700 uppercase tracking-widest">Network Online</span>
              </div>
              <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4 drop-shadow-sm">
                Elevate Your Insight. <br /> Master the Digital Frontier.
              </h1>
              <p className="text-gray-600 text-base leading-relaxed max-w-md">
                Experience unparalleled analytical tools and real-time market intelligence. Engineered for leaders, designed for growth.
              </p>
           </div>
           
           <div className="relative z-10 grid grid-cols-2 gap-6 mt-16">
              <div className="p-5 rounded-lg bg-white/70 border border-blue-100 backdrop-blur-sm shadow-md">
                 <div className="text-3xl font-bold text-indigo-600 mb-1 flex items-center gap-2"><Bolt className="w-6 h-6" /> &lt; 5ms</div>
                 <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">Query Response</div>
              </div>
              <div className="p-5 rounded-lg bg-white/70 border border-purple-100 backdrop-blur-sm shadow-md">
                 <div className="text-3xl font-bold text-purple-600 mb-1 flex items-center gap-2"><ShieldCheck className="w-6 h-6" /> 99.99%</div>
                 <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">System Reliability</div>
              </div>
           </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex-1 flex items-center justify-center max-w-md mx-auto w-full z-10">
          <Card className="w-full border border-gray-200 shadow-2xl shadow-blue-100/50 bg-white rounded-lg p-6 sm:p-8">
            <CardHeader className="space-y-4 pb-8 px-0 pt-0">
              <CardTitle className="text-4xl font-extrabold tracking-tight text-gray-900 flex items-center gap-4">
                <Lock className="w-8 h-8 text-indigo-600" /> Access Portal
              </CardTitle>
              <CardDescription className="text-base font-medium text-gray-600">
                Securely sign in to your SYNAPSE account.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-center gap-3 shadow-sm">
                  <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
                  <p className="text-sm font-semibold text-red-700">
                    Authentication Failed: {error}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-bold uppercase tracking-wide text-gray-600">
                    Email Address
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-indigo-600" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-12 pr-4 h-12 bg-white border-gray-300 text-gray-900 font-medium text-base transition-all focus:bg-blue-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none rounded-md shadow-sm"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs font-semibold text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-bold uppercase tracking-wide text-gray-600">
                      Password
                    </Label>
                    <button
                      type="button"
                      onClick={() => console.log('Forgot password clicked')}
                      className="text-xs font-bold text-indigo-600 hover:text-purple-700 transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-indigo-600" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-12 pr-12 h-12 bg-white border-gray-300 text-gray-900 font-medium text-base transition-all focus:bg-blue-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none rounded-md shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs font-semibold text-red-600 mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center gap-3">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 bg-gray-100 text-indigo-600 focus:ring-indigo-600 cursor-pointer accent-indigo-600"
                  />
                  <label htmlFor="remember" className="text-sm font-semibold text-gray-700 select-none cursor-pointer">
                    Keep me signed in
                  </label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-br from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-extrabold text-base uppercase tracking-wider rounded-md shadow-lg shadow-indigo-300/60 transition-all duration-200 ease-in-out hover:scale-[1.005] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying Credentials...
                    </>
                  ) : 'Sign In'}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-8">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Or continue with
                </span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              {/* Google Login Button */}
              <Button
                type="button"
                onClick={handleGoogleLogin}
                variant="outline"
                className="w-full flex items-center justify-center gap-3 h-12 bg-white border border-gray-300 rounded-md hover:bg-blue-50 transition-all font-bold text-sm uppercase tracking-wider text-gray-700 shadow-md"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  ></path>
                </svg>
                <span>Sign in with Google</span>
              </Button>

              {/* Register Link */}
              <p className="mt-8 text-center text-base font-medium text-gray-600">
                New to SYNAPSE?{' '}
                <button
                  type="button"
                  onClick={() => console.log('Navigate to register')}
                  className="text-indigo-600 hover:text-purple-700 hover:underline font-bold ml-1 transition-colors"
                >
                  Create an Account
                </button>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-12 flex justify-center items-center border-t border-gray-100 bg-white/70 backdrop-blur-md">
        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
         Running on SYNAPSE ARCHITECTURE v3.1.2
        </p>
      </footer>
    </div>
  );
}