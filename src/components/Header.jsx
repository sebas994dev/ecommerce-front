import React, { useState, useEffect } from 'react';
import {
  ShoppingCart, User, Heart, Menu, X, Search,
  Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle, LogOut
} from 'lucide-react';

const DropdownCategorias = () => (
  <div className="relative group">
    <button className="text-gray-700 hover:text-red-500 transition font-medium">
      Categorías
    </button>
  </div>
);

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (message) {
      setMessage('');
      setMessageType('');
    }
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setMessage('Por favor completa todos los campos');
      setMessageType('error');
      return false;
    }
    if (!validateEmail(formData.email)) {
      setMessage('Por favor ingresa un email válido');
      setMessageType('error');
      return false;
    }
    if (formData.password.length < 6) {
      setMessage('La contraseña debe tener al menos 6 caracteres');
      setMessageType('error');
      return false;
    }
    if (!isLogin) {
      if (!formData.name) {
        setMessage('Por favor ingresa tu nombre completo');
        setMessageType('error');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setMessage('Las contraseñas no coinciden');
        setMessageType('error');
        return false;
      }
    }
    return true;
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          correo: formData.email,
          contraseña: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('¡Inicio de sesión exitoso!');
        setMessageType('success');
        localStorage.setItem('user', JSON.stringify(data));
        setTimeout(() => {
          onLoginSuccess(data);
          onClose();
        }, 1500);
      } else {
        setMessage(data.message || 'Credenciales incorrectas');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMessage('Error de conexión');
      setMessageType('error');
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.name,
          correo: formData.email,
          contraseña: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('¡Cuenta creada exitosamente!');
        setMessageType('success');
        setTimeout(() => {
          setIsLogin(true);
          setFormData({ email: formData.email, password: '', confirmPassword: '', name: '' });
        }, 1500);
      } else {
        setMessage(data.message || 'Error al crear la cuenta');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      setMessage('Error de conexión');
      setMessageType('error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      isLogin ? await handleLogin() : await handleRegister();
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: '', password: '', confirmPassword: '', name: '' });
    setMessage('');
    setMessageType('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-30">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" disabled={isLoading}>
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </h2>

        {message && (
          <div className={`mb-4 p-3 rounded-md flex items-center gap-2 ${
            messageType === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : messageType === 'error'
              ? 'bg-red-50 text-red-800 border border-red-200'
              : 'bg-yellow-50 text-yellow-800 border border-yellow-200'
          }`}>
            {messageType === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="text-sm">{message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Tu nombre completo" required disabled={isLoading} />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <div className="relative">
              <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md" placeholder="tu@email.com" required disabled={isLoading} />
              <Mail className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 pl-10 pr-10 border border-gray-300 rounded-md"
                placeholder="Tu contraseña" required disabled={isLoading} />
              <Lock className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400" disabled={isLoading}>
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
              <input type={showPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md"
                placeholder="Confirma tu contraseña" required disabled={isLoading} />
            </div>
          )}
          <button type="submit" disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md font-medium ${isLoading ? 'bg-gray-400 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
            {isLoading ? (isLogin ? 'Iniciando...' : 'Creando...') : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            <button onClick={toggleMode} className="text-blue-600 hover:text-blue-800 ml-1 font-medium" disabled={isLoading}>
              {isLogin ? 'Crear cuenta' : 'Iniciar sesión'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <>
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-gray-800">MiExpress</a>

          <div className="hidden md:flex flex-1 mx-8">
            <div className="relative w-full">
              <input type="text" placeholder="¿Qué buscas?" className="w-full border rounded-full px-4 py-2 pl-10 focus:outline-none" />
              <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Heart className="text-gray-600 hover:text-red-500 cursor-pointer w-8 h-8" />
            <ShoppingCart className="text-gray-600 hover:text-blue-500 cursor-pointer w-8 h-8" />
            {!user ? (
              <button onClick={() => setShowLoginModal(true)} className="flex items-center gap-2">
                <User className="text-gray-600 hover:text-blue-500 w-8 h-8" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <User className="text-blue-600 w-8 h-8" />
                <span className="text-sm font-medium">{user.nombre}</span>
                <button onClick={handleLogout} className="text-gray-500 hover:text-red-600">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        <nav className="hidden md:flex items-center justify-center gap-10 pb-2 text-base font-medium">
          <DropdownCategorias />
          {[
            { label: 'Packs de ofertas', href: '/ofertas', destacado: true },
            { label: 'Choice', href: '/choice' },
            { label: 'SuperOfertas', href: '/superofertas' },
            { label: 'AliExpress Business', href: '/business' },
            { label: 'Hogar y jardín', href: '/hogar' }
          ].map(({ label, href, destacado }) => (
            <a key={label} href={href} className={`hover:text-red-500 transition ${destacado ? 'text-red-500 font-semibold' : 'text-gray-700'}`}>
              {label}
            </a>
          ))}
        </nav>
      </header>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Header;
