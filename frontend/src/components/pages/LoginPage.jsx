import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 px-4">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl p-8 shadow-xl"
      >
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-indigo-600">
            🇮🇳 Agency CRM
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Welcome back! Sign in to manage your leads.
          </p>
        </div>

        {error && (
          <div className="mb-4 text-xs text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-sm">

          <div>
            <label className="block text-xs font-medium mb-2 text-gray-600">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                required
                value={form.email}
                onChange={handleChange('email')}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all"
                placeholder="you@agency.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-2 text-gray-600">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                required
                value={form.password}
                onChange={handleChange('password')}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium shadow-md hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing you in...' : 'Sign in'}
          </button>
        </form>

        <p className="text-xs text-center text-gray-400 mt-6">
          Secure access • Indian SaaS CRM
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;