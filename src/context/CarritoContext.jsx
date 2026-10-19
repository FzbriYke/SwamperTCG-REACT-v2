import { createContext, useContext, useEffect, useState } from 'react';
import { useProducts } from './ProductsContext';

const CarritoContext = createContext(null);
const CARRITO_KEY = 'swamper_carrito';
const readJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};
export function CarritoProvider({ children }) {
  const { products } = useProducts();
  const getStock = (id) => products.find((p) => p.id === id)?.stock ?? 0;
  const [items, setItems] = useState(() => readJSON(CARRITO_KEY, []));
  useEffect(() => {
    localStorage.setItem(CARRITO_KEY, JSON.stringify(items));
  }, [items]);

  const agregar = (id, cantidad = 1) => {
    const stock = getStock(id);
    if (stock < 1) return;
    setItems((prev) => {
      const existente = prev.find((i) => i.id === id);
      if (existente) {
        return prev.map((i) =>
          i.id === id ? { ...i, cantidad: Math.min(i.cantidad + cantidad, stock) } : i
        );
      }
      return [...prev, { id, cantidad: Math.min(cantidad, stock) }];
    });
  };

  const cambiarCantidad = (id, cantidad) => {
    const stock = getStock(id);
    const nueva = Math.max(1, Math.min(cantidad, stock));
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, cantidad: nueva } : i)));
  };

  const quitar = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };
  const vaciar = () => setItems([]);
  const cantidadDe = (id) => items.find((i) => i.id === id)?.cantidad ?? 0;
  const totalItems = items.reduce((suma, i) => suma + i.cantidad, 0);
  return (
    <CarritoContext.Provider
      value={{ items, agregar, cambiarCantidad, quitar, vaciar, cantidadDe, totalItems }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export const useCarrito = () => useContext(CarritoContext);