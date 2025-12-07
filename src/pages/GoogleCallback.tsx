import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const { login } = useAuth();

  useEffect(() => {
    const handleGoogleCallback = () => {
      try {
        console.log('Google callback - URL params:', Object.fromEntries(searchParams.entries()));
        
        // Check for error in URL
        const error = searchParams.get('error');
        if (error) {
          console.log('Error in URL:', error);
          setStatus('error');
          setMessage('Error en la autenticación con Google');
          return;
        }

        // Get tokens and user data from URL parameters
        const token = searchParams.get('token');
        const refreshToken = searchParams.get('refreshToken');
        const userData = searchParams.get('user');
        const isNewUser = searchParams.get('isNewUser') === 'true';

        console.log('Token exists:', !!token);
        console.log('RefreshToken exists:', !!refreshToken);
        console.log('UserData exists:', !!userData);

        if (!token || !refreshToken || !userData) {
          setStatus('error');
          setMessage('No se recibieron los datos de autenticación');
          return;
        }

        // Parse user data
        const user = JSON.parse(userData);
        console.log('Parsed user:', user);

        // Use the login function from useAuth hook
        login(user, token, refreshToken);
        console.log('Login successful, redirecting...');

        setStatus('success');
        setMessage(isNewUser ? '¡Cuenta creada exitosamente!' : '¡Bienvenido de vuelta!');

        // Redirect to app dashboard
        setTimeout(() => {
          navigate('/app');
        }, 1500);

      } catch (error) {
        console.error('Google callback error:', error);
        setStatus('error');
        setMessage('Error procesando la autenticación');
      }
    };

    handleGoogleCallback();
  }, [searchParams, navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8">
        {status === 'loading' && (
          <>
            <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Procesando autenticación...
            </h2>
            <p className="text-muted-foreground">
              Por favor espera mientras verificamos tu cuenta de Google.
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              ¡Bienvenido a Zerlo!
            </h2>
            <p className="text-muted-foreground">
              {message}
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Error de autenticación
            </h2>
            <p className="text-muted-foreground mb-4">
              {message}
            </p>
            <button
              onClick={() => navigate('/')}
              className="btn-hero"
            >
              Volver al inicio
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GoogleCallback;
