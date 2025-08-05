import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900 p-4">
      {/* Wrapper with relative to control size */}
      <div className="relative max-w-5xl w-full rounded-xl">
        {/* Tilted lime background same size as content */}
        <div className="absolute inset-0 transform -skew-y-6 bg-lime-400 shadow-2xl z-0 rounded-xl" />

        {/* Foreground Register + Image */}
        <div className="relative z-10 flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-xl">
          {/* Register Form */}
          <div className="w-full md:w-1/2 p-10 bg-black">
            <h2 className="text-3xl font-bold text-lime-400 mb-6 text-center">Register</h2>
            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-400">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-700 bg-black text-white rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-lime-400"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-400">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-700 bg-black text-white rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-lime-400"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-400">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-700 bg-black text-white rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-lime-400"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FAF3DD] text-black py-2 rounded-md hover:bg-lime-400 transition-colors"
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-lime-300 hover:underline">
                Login here
              </Link>
            </p>
          </div>

          {/* Cartoon GIF Section */}
          <div className="hidden md:flex md:w-1/2 justify-center items-end bg-white p-4">
            <img
              src="https://i.pinimg.com/originals/02/fc/da/02fcda11cbfb2a84537f9d059b4c81b2.gif"
              alt="Cartoon character"
              className="h-[350px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
