import { useState } from "react";
import { X, Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle, User, Shield } from "lucide-react";
import { login, loginAdmin, register } from "../services/authService";

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loginType, setLoginType] = useState("user");
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "", name: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (message) {
      setMessage("");
      setMessageType("");
    }
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
        const user = loginType === "admin"
          ? await loginAdmin(formData.email, formData.password)
          : await login(formData.email, formData.password);

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

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: "", password: "", confirmPassword: "", name: "" });
    setMessage("");
    setMessageType("");
    setLoginType("user");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">{isLogin ? "Iniciar Sesión" : "Crear Cuenta"}</h2>

        {isLogin && (
          <div className="mb-6 flex gap-2 p-1 bg-gray-100 rounded-lg">
            <button
              type="button"
              onClick={() => setLoginType("user")}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center gap-2 ${
                loginType === "user"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:text-blue-600"
              }`}
              disabled={isLoading}
            >
              <User className="w-4 h-4" /> Usuario
            </button>
            <button
              type="button"
              onClick={() => setLoginType("admin")}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center gap-2 ${
                loginType === "admin"
                  ? "bg-red-600 text-white"
                  : "text-gray-600 hover:text-red-600"
              }`}
              disabled={isLoading}
            >
              <Shield className="w-4 h-4" /> Admin
            </button>
          </div>
        )}

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
            className={`w-full py-2 rounded-md text-white font-medium ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : loginType === "admin"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading
              ? "Cargando..."
              : isLogin
              ? loginType === "admin"
                ? "Iniciar como Admin"
                : "Iniciar Sesión"
              : "Crear cuenta"}
          </button>
        </form>

        {loginType === "user" && (
          <p className="text-sm mt-4 text-center">
            {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
            <button
              onClick={toggleMode}
              className="text-blue-600 hover:underline"
              disabled={isLoading}
            >
              {isLogin ? "Crear cuenta" : "Iniciar sesión"}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
