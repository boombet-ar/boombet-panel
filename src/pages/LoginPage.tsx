import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { afAdminLogin } from '../services/api';

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await afAdminLogin(username, password);
      
      if (data.token) {
        login(data.token);
      } else {
        setError(data.message || 'Error en el inicio de sesión.');
      }
    } catch (err: any) {
      setError(err.message || 'No se pudo conectar al servidor. Inténtalo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-boombet-dark-900 text-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-boombet-dark-800 rounded-lg shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-boombet-green">
            BoomBet
          </h2>
          <p className="mt-2 text-gray-400">Panel de Administración de Afiliados</p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 text-sm text-center text-red-200 bg-red-800 bg-opacity-50 rounded-lg">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">
              Usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-white bg-boombet-dark-700 border border-boombet-dark-700 rounded-md shadow-sm focus:outline-none focus:ring-boombet-green focus:border-boombet-green"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-white bg-boombet-dark-700 border border-boombet-dark-700 rounded-md shadow-sm focus:outline-none focus:ring-boombet-green focus:border-boombet-green"
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-boombet-green-500 hover:bg-boombet-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-boombet-green focus:ring-offset-boombet-dark-900 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}