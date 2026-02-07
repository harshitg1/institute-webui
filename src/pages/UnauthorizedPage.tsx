import { useNavigate } from "react-router-dom";
import { ShieldAlert, ArrowLeft, Home, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl shadow-slate-200 border border-slate-100 p-10 text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 bg-rose-500 rounded-3xl rotate-12 opacity-10 animate-pulse" />
          <div className="relative bg-white rounded-2xl border border-rose-100 shadow-xl h-full w-full flex items-center justify-center text-rose-500">
            <Lock className="w-10 h-10" />
          </div>
          <div className="absolute -top-2 -right-2 bg-rose-500 text-white p-1.5 rounded-full shadow-lg">
            <ShieldAlert className="w-4 h-4" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight uppercase">Protocol Violation</h1>
          <p className="text-slate-500 font-medium leading-relaxed">
            Your current authorization level does not permit access to this sector of the architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 pt-4">
          <Button 
            onClick={() => navigate(-1)}
            className="h-14 rounded-xl bg-slate-900 text-white font-bold uppercase tracking-widest text-xs shadow-xl shadow-slate-300 transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous Node
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="h-14 rounded-xl border-slate-100 text-slate-500 font-bold uppercase tracking-widest text-xs hover:bg-slate-50 transition-all"
          >
            <Home className="w-4 h-4 mr-2" />
            System Home
          </Button>
        </div>

        <div className="pt-6 border-t border-slate-50">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
            If you believe this is an error, please contact your <br />
            <span className="text-slate-900">Architecture Administrator</span>
           </p>
        </div>
      </div>
    </div>
  );
}
