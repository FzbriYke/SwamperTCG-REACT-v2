import { createContext, useContext, useEffect, useState } from 'react';
import initialProducts from '../data/Products';

const ProductsContext = createContext(null);

const STORAGE_KEY = 'swamper_products';
const DEFAULT_FEATURED = [9, 10, 3, 4, 5, 6, 7, 8];

const seed = () =>
  initialProducts.map((p) => ({ ...p, destacada: DEFAULT_FEATURED.includes(p.id) }));
const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const saved = raw ? JSON.parse(raw) : null;
    return Array.isArray(saved) ? saved : seed();
  } catch {
    return seed();
  }
};

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(load);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);
  const addProduct = (data) =>
    setProducts((prev) => {
      const nextId = prev.reduce((max, p) => Math.max(max, p.id), 0) + 1;
      return [...prev, { ...data, id: nextId }];
    });
  const updateProduct = (id, changes) =>
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...changes } : p)));
  const deleteProduct = (id) =>
    setProducts((prev) => prev.filter((p) => p.id !== id));
  const adjustStock = (id, delta) =>
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, stock: Math.max(0, (p.stock ?? 0) + delta) } : p
      )
    );

  const resetProducts = () => setProducts(seed());

  return (
    <ProductsContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct, adjustStock, resetProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts debe usarse dentro de <ProductsProvider>.');
  return ctx;
};