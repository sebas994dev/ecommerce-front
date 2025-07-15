import axios from 'axios';

const API = 'http://localhost:8080/api/v1';

export const fetchCategorias = async () => {
  const res = await axios.get(`${API}/categorias`);
  return res.data; // debe devolver un array [{idCategoria, nombre}, ...]
};
