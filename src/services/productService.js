import axios from 'axios';

const API = 'http://localhost:8080/api/v1';

export const fetchProductosPorCategoria = async (idCategoria) => {
  const res = await axios.get(`${API}/productos/categoria/${idCategoria}`);
  return res.data; // lista de productos
};
