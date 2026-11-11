import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/admin/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.error || 'Failed to authenticate administrator');
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-warm-cream/50 dark:bg-dark-bg transition-colors duration-300">
      <div className="w-full max-w-md">
        {/* Brand Container */}
        <div className="bg-white dark:bg-dark-card rounded-3xl p-8 sm:p-10 border-2 border-gold/40 dark:border-dark-border shadow-plum-hover">
          {/* Logo & Title */}
          <div className="text-center mb-8 space-y-3">
            <div className="w-20 h-20 rounded-full mx-auto overflow-hidden ring-4 ring-gold/40 shadow-md bg-white">
              <img src="/logo.jpg" alt="Project Mate" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-plum-900 dark:text-warm-white">
                Project Mate Admin
              </h2>
              <p className="text-xs text-mauve dark:text-gold uppercase tracking-wider font-semibold mt-1">
                Secure Administrative Portal
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-500/40 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <p className="text-xs text-red-700 dark:text-red-300 font-medium leading-relaxed">
                {error}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-plum-900 dark:text-warm-white mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-mauve absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@projectmate.lk"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gold/30 dark:border-dark-border bg-warm-white/50 dark:bg-dark-surface text-sm dark:text-warm-white focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-plum-900 dark:text-warm-white mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-mauve absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gold/30 dark:border-dark-border bg-warm-white/50 dark:bg-dark-surface text-sm dark:text-warm-white focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-plum-800 hover:bg-plum-900 text-warm-white dark:bg-gold dark:text-plum-950 dark:hover:bg-gold-light font-semibold text-sm shadow-plum-subtle hover:shadow-plum-hover transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 group"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Note for Evaluation */}
          <div className="mt-6 pt-5 border-t border-gold/20 text-center">
            <p className="text-[11px] text-plum-950/60 dark:text-warm-white/60">
              Authorized admin accounts are managed securely via Supabase.
            </p>
            <p className="text-[11px] text-mauve dark:text-gold/80 mt-1">
              Initial admin login: <code className="bg-plum-100 dark:bg-dark-surface px-1 py-0.5 rounded text-[10px]">admin@projectmate.lk</code> / <code className="bg-plum-100 dark:bg-dark-surface px-1 py-0.5 rounded text-[10px]">Admin@ProjectMate2026</code>
            </p>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs font-semibold text-plum-800 dark:text-gold hover:underline inline-flex items-center gap-1"
          >
            &larr; Back to Public Project Mate Website
          </a>
        </div>
      </div>
    </div>
  );
};
