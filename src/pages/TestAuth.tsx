import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

const TestAuth = () => {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();
  const [testResult, setTestResult] = useState('');

  const testGoogleAuth = async () => {
    try {
      console.log('Testing Google auth...');
      const response = await fetch('http://localhost:3000/api/auth/google/login?redirect_uri=http://localhost:8082/test-auth');
      const data = await response.json();
      console.log('Google auth response:', data);
      setTestResult(JSON.stringify(data, null, 2));
      
      if (data.authUrl) {
        window.location.href = data.authUrl;
      }
    } catch (error) {
      console.error('Test error:', error);
      setTestResult(`Error: ${error}`);
    }
  };

  const testLogin = () => {
    const testUser = {
      id: 999,
      email: 'test@example.com',
      name: 'Test User',
      subscriptionPlan: 'free',
      storageUsed: 0,
      storageLimit: 5368709120,
      loginMethod: 'email'
    };
    
    login(testUser, 'test-token', 'test-refresh-token');
    setTestResult('Test login completed');
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Test de Autenticación</h1>
      
      <div className="space-y-4">
        <div className="p-4 border rounded">
          <h3 className="font-bold">Estado actual:</h3>
          <p>Autenticado: {isAuthenticated ? 'Sí' : 'No'}</p>
          <p>Usuario: {user ? user.email : 'Ninguno'}</p>
        </div>

        <div className="space-x-4">
          <button 
            onClick={testGoogleAuth}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Probar Google Auth
          </button>
          
          <button 
            onClick={testLogin}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Login de Prueba
          </button>
          
          <button 
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        {testResult && (
          <div className="p-4 bg-gray-100 rounded">
            <h3 className="font-bold">Resultado:</h3>
            <pre className="text-sm">{testResult}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestAuth;

