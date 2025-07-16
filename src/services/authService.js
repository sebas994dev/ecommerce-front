// src/services/authService.js
export const login = async (email, password) => {
  const response = await fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo: email, contraseña: password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error al iniciar sesión');
  // Agregamos tipo user
  return { ...data, tipo: 'user' };
};

export const loginAdmin = async (email, password) => {
  const response = await fetch('http://localhost:8080/api/auth/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo: email, contraseña: password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error al iniciar sesión como admin');
  // Agregamos tipo admin
  return { ...data, tipo: 'admin' };
};

export const register = async (name, email, password) => {
  const response = await fetch('http://localhost:8080/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre: name, correo: email, contraseña: password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error al registrarse');
  return data;
};
