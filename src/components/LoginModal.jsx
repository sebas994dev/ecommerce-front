// src/components/LoginModal.jsx
import { useState } from "react";
import { X, Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { login, register } from "../services/authService";

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "", name: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!formData.email || !formData.password) {
      setMessage("Completa todos los campos"); setMessageType("error"); return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setMessage("Email inválido"); setMessageType("error"); return false;
    }
    if (formData.password.length < 6) {
      setMessage("Contraseña mínima 6 caracteres"); setMessageType("error"); return false;
    }
    if (!isLogin) {
      if (!formData.name) {
        setMessage("Ingresa tu nombre"); setMessageType("error"); return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setMessage("Las contraseñas no coinciden"); setMessageType("error"); return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      if (isLogin) {
        const user = await login(formData.email, formData.password);
        setMessage("¡Inicio de sesión exitoso!"); setMessageType("success");
        localStorage.setItem("user", JSON.stringify(user));
        setTimeout(() => { onLoginSuccess(user); onClose(); }, 1200);
      } else {
        await register(formData.name, formData.email, formData.password);
        setMessage("¡Cuenta creada exitosamente!"); setMessageType("success");
        setTimeout(() => setIsLogin(true), 1200);
      }
    } catch (err) {
      setMessage(err.message); setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">{isLogin ? "Iniciar Sesión" : "Crear Cuenta"}</h2>

        {message && (
          <div className={`mb-4 p-3 rounded-md flex items-center gap-2 text-sm ${
            messageType === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}>
            {messageType === "success" ? <CheckCircle /> : <AlertCircle />}
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Nombre completo"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              disabled={isLoading}
            />
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="Correo"
              value={formData.email}
              onChange={handleChange}
              className="w-full border pl-10 pr-3 py-2 rounded-md"
              disabled={isLoading}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              className="w-full border pl-10 pr-10 py-2 rounded-md"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {!isLogin && (
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              disabled={isLoading}
            />
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            {isLoading ? "Cargando..." : isLogin ? "Iniciar sesión" : "Crear cuenta"}
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
            disabled={isLoading}
          >
            {isLogin ? "Crear cuenta" : "Iniciar sesión"}
          </button>
        </p>
      </div>
    </div>
  );
}
