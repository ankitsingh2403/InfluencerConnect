import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/login', form);
      console.log('Login response:', res.data); // Debug log

      if (res.data?.token && res.data?.user) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/dashboard');
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900 p-4 relative overflow-hidden">
      <div className="flex max-w-5xl w-full bg-white rounded-xl shadow-lg overflow-hidden z-10">
        <div className="hidden md:flex md:w-1/2 justify-center items-end bg-white p-4">
          <img
            src="https://cdn.dribbble.com/userupload/22909107/file/original-634e979dc90b5ca84c3382bfe11636cd.gif"
            alt="Cartoon character"
            className="h-[350px] object-contain"
          />
        </div>

        <div className="w-full md:w-1/2 p-10 bg-black">
          <h2 className="text-3xl font-bold text-lime-400 mb-6 text-center">
            Admin Login
          </h2>
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-lime-400"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-lime-400"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FAF3DD] text-black font-semibold py-2 rounded-md hover:bg-lime-400 transition-colors"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-lime-300 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
