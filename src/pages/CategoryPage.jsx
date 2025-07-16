import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const API = 'http://localhost:8080/api/v1';

const CategoryPage = () => {
  const { idCategoria } = useParams();
  const location = useLocation();
  const nombreCategoria = location.state?.nombreCategoria || ''; // 👈 nombre recibido

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API}/productos/categoria/${idCategoria}`);
        setProductos(response.data);
      } catch (err) {
        console.error('Error cargando productos por categoría', err);
        setError('No se pudieron cargar los productos.');
      } finally {
        setLoading(false);
      }
    };

    if (idCategoria) {
      fetchProductos();
    }
  }, [idCategoria]);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6">
        Productos de la categoría: {nombreCategoria || 'Cargando...'}
      </h2>
      {productos.length === 0 ? (
        <p>No hay productos en esta categoría.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {productos.map((producto) => (
            <ProductCard key={producto.idProducto} producto={producto} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
