// import { motion } from 'framer-motion';
// import { Home, LayoutDashboard, Search, MoveLeft } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { Button } from '@/components/ui/button';
// import type { RootState } from '@/store/store';
// import { getDashboardPathByRole } from '@/config/routes.config';

// export default function NotFoundPage() {
//   const navigate = useNavigate();
//   const user = useSelector((state: RootState) => state.auth.user);
//   const dashboardPath = user ? getDashboardPathByRole(user.role) : '/login';

//   return (
//     <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 overflow-hidden relative">
//       {/* Background Decorative Elements */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
//         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
//         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
//       </div>

//       <div className="max-w-2xl w-full text-center relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="space-y-8"
//         >
//           {/* 404 Visual */}
//           <div className="relative inline-block">
//             <motion.h1 
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//               transition={{ 
//                 type: "spring",
//                 stiffness: 100,
//                 damping: 10,
//                 delay: 0.2
//               }}
//               className="text-[12rem] md:text-[16rem] font-black text-white/5 leading-none select-none"
//             >
//               404
//             </motion.h1>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <motion.div
//                 animate={{ 
//                   y: [0, -10, 0],
//                   rotate: [0, 5, -5, 0]
//                 }}
//                 transition={{ 
//                   duration: 6,
//                   repeat: Infinity,
//                   ease: "easeInOut"
//                 }}
//                 className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden group"
//               >
//                 <Search className="w-20 h-20 text-purple-500 group-hover:scale-110 transition-transform duration-500" />
//                 <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent" />
//               </motion.div>
//             </div>
//           </div>

//           {/* Text Content */}
//           <div className="space-y-4">
//             <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
//               Lost in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400">Digital Void?</span>
//             </h2>
//             <p className="text-slate-400 text-lg max-w-md mx-auto leading-relaxed">
//               We couldn't find the page you're looking for. It might have been moved, deleted, or never existed in the first place.
//             </p>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
//             <Button
//               variant="outline"
//               size="lg"
//               onClick={() => navigate(-1)}
//               className="w-full sm:w-auto border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all rounded-xl h-14 px-8 flex items-center gap-2 group"
//             >
//               <MoveLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
//               Go Back
//             </Button>

//             <Link to="/" className="w-full sm:w-auto">
//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="w-full border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-all rounded-xl h-14 px-8 flex items-center gap-2"
//               >
//                 <Home className="w-4 h-4" />
//                 Home
//               </Button>
//             </Link>

//             <Link to={dashboardPath} className="w-full sm:w-auto">
//               <Button
//                 size="lg"
//                 className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-900/40 border-0 rounded-xl h-14 px-8 flex items-center gap-2 transition-all active:scale-95"
//               >
//                 <LayoutDashboard className="w-4 h-4" />
//                 Dashboard
//               </Button>
//             </Link>
//           </div>

//           {/* Subtle footer */}
//           <p className="text-slate-600 text-xs font-medium uppercase tracking-[0.2em] pt-8">
//             Lavender Market • Error Protocol 404
//           </p>
//         </motion.div>
//       </div>

//       {/* Floating particles (Decorative) */}
//       {[...Array(6)].map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute w-1 h-1 bg-white/20 rounded-full"
//           animate={{
//             y: [0, -1000],
//             opacity: [0, 1, 0],
//             x: Math.random() * 200 - 100
//           }}
//           transition={{
//             duration: 5 + Math.random() * 10,
//             repeat: Infinity,
//             delay: Math.random() * 10,
//             ease: "linear"
//           }}
//           style={{
//             left: `${Math.random() * 100}%`,
//             bottom: -10
//           }}
//         />
//       ))}
//     </div>
//   );
// }
import { useState } from 'react';
import { Mail, Phone, Clock, MapPin, Send, Plus, Minus, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ContactFormData {
  fullName: string;
  email: string;
  topic: string;
  message: string;
}

interface ContactFormErrors {
  fullName?: string;
  email?: string;
  topic?: string;
  message?: string;
}

interface ContactInfo {
  icon: React.ReactNode;
  label: string;
  value: string;
  bgColor: string;
  textColor: string;
}

export default function ContactSupport() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    topic: '',
    message: ''
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mapZoom, setMapZoom] = useState(12);

  const contactInfoCards: ContactInfo[] = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: 'support@lavender.in',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Call',
      value: '+91-8800-LVNDR',
      bgColor: 'bg-teal-100',
      textColor: 'text-teal-600'
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: 'Hours',
      value: '9 AM - 6 PM IST',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    }
  ];

  const validateForm = (): boolean => {
    const newErrors: ContactFormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.topic.trim()) {
      newErrors.topic = 'Topic of interest is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof ContactFormErrors]) {
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

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSuccess(true);
      setFormData({ fullName: '', email: '', topic: '', message: '' });

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      {/* Main Content */}
      <main className="pt-10 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Section */}
            <div className="space-y-10">
              {/* Header */}
              <div className="space-y-4">
                <div className="inline-block px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-bold tracking-wider text-[10px] uppercase">
                  Contact Support
                </div>
                <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                  Let's grow your <span className="text-purple-600 dark:text-purple-400">portfolio</span> together.
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md">
                  Connect with India's leading trading academy. Our friendly experts are here to help you navigate the markets.
                </p>
              </div>

              {/* Contact Form */}
              <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-white/80 dark:border-white/10 shadow-lg rounded-2xl">
                <CardContent className="p-10">
                  {success && (
                    <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                      <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                        ✓ Message sent successfully! We'll get back to you soon.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6" role="form">
                    {/* Name and Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="fullName" className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          Full Name
                        </Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          placeholder="e.g. Rahul Sharma"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="bg-white/50 dark:bg-white/5 border-purple-200 dark:border-white/10 rounded-xl h-14 focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-all"
                        />
                        {errors.fullName && (
                          <p className="text-xs text-red-500 font-medium">{errors.fullName}</p>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="rahul@domain.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="bg-white/50 dark:bg-white/5 border-purple-200 dark:border-white/10 rounded-xl h-14 focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-all"
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500 font-medium">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Topic */}
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="topic" className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Topic of Interest
                      </Label>
                      <Input
                        id="topic"
                        name="topic"
                        placeholder="Advanced Options Trading"
                        value={formData.topic}
                        onChange={handleInputChange}
                        className="bg-white/50 dark:bg-white/5 border-purple-200 dark:border-white/10 rounded-xl h-14 focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-all"
                      />
                      {errors.topic && (
                        <p className="text-xs text-red-500 font-medium">{errors.topic}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        How can we help?
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Share your trading goals or questions..."
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="bg-white/50 dark:bg-white/5 border-purple-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-all resize-none"
                      />
                      {errors.message && (
                        <p className="text-xs text-red-500 font-medium">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-500/20 active:scale-[0.98] disabled:opacity-50"
                    >
                      <Send className="w-5 h-5" />
                      {loading ? 'SENDING...' : 'SEND MESSAGE'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {contactInfoCards.map((info, idx) => (
                  <Card
                    key={idx}
                    className="bg-white/60 dark:bg-slate-900/60 border-purple-200 dark:border-white/10 hover:shadow-lg transition-all"
                  >
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className={`${info.bgColor} dark:bg-opacity-20 p-3 rounded-lg flex items-center justify-center ${info.textColor}`}>
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 dark:text-gray-500">
                          {info.label}
                        </p>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {info.value}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Section - Map */}
            <div className="h-svh flex flex-col gap-6">
              {/* Header */}
              <div className="flex items-center justify-between px-2">
                <div className="flex flex-col">
                  <h3 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    KANPUR CAMPUS
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    KAKADEO
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-teal-600 bg-teal-100 dark:bg-teal-900/30 dark:text-teal-400 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-400 animate-pulse"></span>
                  OPEN FOR VISITS
                </div>
              </div>

              {/* Map Container */}
              <Card className="relative flex-1 rounded-[2rem] overflow-hidden border-purple-200 dark:border-white/10 shadow-xl bg-purple-100 dark:bg-slate-800">
                <div className="absolute inset-0 z-0">
                  <img
                    alt="Modern light map of Mumbai"
                    src="/kanpur.png"
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-purple-100 dark:from-slate-800 to-transparent z-10"></div>

                {/* Map Marker */}
                <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                  <div className="relative">
                    <div className="absolute -inset-4 rounded-full bg-purple-600/20 blur-xl"></div>
                    <div className="relative w-7 h-7 rounded-full bg-purple-600 border-4 border-white shadow-xl dark:bg-purple-500"></div>
                  </div>
                  <div className="mt-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-5 py-3 rounded-2xl border border-purple-200 dark:border-white/10 shadow-2xl">
                    <p className="text-xs font-bold text-gray-900 dark:text-white">LAVENDER TOWER</p>
                    <p className="text-[10px] text-gray-600 dark:text-gray-400 font-medium uppercase tracking-tight">
                      Financial District, Hub 5
                    </p>
                  </div>
                </div>

                {/* Address Card */}
                <div className="absolute bottom-8 right-8 z-20">
                  <Card className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-purple-200 dark:border-white/10 shadow-2xl max-w-[240px]">
                    <CardContent className="p-6">
                      <p className="text-[10px] text-teal-600 dark:text-teal-400 font-black uppercase mb-2 tracking-widest">
                        Office HQ
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                        Lavender Tower, 4th Floor, G Block, BKC, Mumbai, Maharashtra 400051
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </Card>

              {/* Bottom Section */}
              <div className="flex items-center justify-between px-2 pt-6 border-t border-purple-200 dark:border-white/10">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    <img
                      alt="Trader 1"
                      className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmblNBkvcBZSf5j7t4uDWWUgkbXIcAq6704AM1H0hN1BP0SaQg7ocEGaYdH8uCEgC36cYEeUUy9vnUre3M2xC9yblzuE7YQNXsYFWXG792nZ_jo3azTZvoDvyciG8V2jFX7yAKXPTQeyDBOv9HXRb12XwFHEbIT3rPMNYW9dbqtcAjuk6CejwL9vFS6zmIcJo8cTJ2KSEMJoGp8hRy-McOiDwNni3lUIDZt44ZVyCFpC-2DZjOdS20uKIDg_Y7li9kBSzOyZG7HyL3"
                    />
                    <img
                      alt="Trader 2"
                      className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3V0x9Sa504Eq3Gv6N1XbIjua6wqp4lU2fM-QQ2Vg7gtpxf5siaLvv5vHl76N3yMDI5F7_r_5rBPUtioeWKaZ_I3pncQbN-TrWJ6PGI-QLm7oD2_ToGG-0qoIgcosQQmNJIMcTO7gcsZol20eWzYOTp4A-NpFvlMZKuPSHZDzK2vcrO0dQpDrpWVL6cTW4T93S-AKgjQwd9Hf0wyemKd33oztByD-d0v17tEHHpnhGaSHuNsQ2n0VjTm_Hjblgdrgx_ZZyeIh8pf0S"
                    />
                    <img
                      alt="Trader 3"
                      className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNRHFnw6G55g6G1-Yvd8mscVIaHIwIbPIXQ81lZInX6cFUsQfdbP6vqSeVYxcIUOmyYM1E1CYdxJcDS5J3ESkyPPEX6f4ZkJcsSKlHsaw9LoCbapKtve2U3NRVSLJc4VjNSAnwxB5i7ciZWDOo8g_u6Jdf_xarBuoybKe3IpxFCcao3mmBA_K6Z6D8fJ3js4wljabQlDCwaA4i6jFhMIfM6Cy0tG6egF39uVgZYxSnp5OnP4s2yhNAYqjFpCar_xTiNTCyOThT0f3Y"
                    />
                    <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-purple-600 dark:bg-purple-500 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                      +5k
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Join our growing trading family
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-gray-600 dark:text-gray-400 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Accent Bar */}
      <div className="fixed bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-600/30 via-teal-600/30 to-purple-600/30"></div>
    </div>
  );
}