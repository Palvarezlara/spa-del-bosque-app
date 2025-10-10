import { createContext, useContext, useState, useEffect, useMemo, use } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'spa-bosque-cart';

export const CartProvider = ({ children }) => {
    // Aquí inicializamos el estado del carrito con los datos del localStorage
    const [items, setItems] = useState(() => {
        try {
            const storedItems = localStorage.getItem(STORAGE_KEY);
            return storedItems ? JSON.parse(storedItems) : [];
        } catch {
            return [];
        }
    });

    //Agregar un item al carrito
    const addItem = (item) => {
        setItems((prev) => {
            const idx = prev.findIndex((i) => i.sku === item.sku);
            if (idx >= 0) {
                const copy = [...prev];
                const qty = (copy[idx].qty ?? 1) + (item.qty ?? 1);
                copy[idx] = { ...copy[idx], qty };
                return copy;
            }
            return [...prev, { ...item, qty: item.qty ?? 1 }];
        });
    };

    //Quitar item del carrito
    const removeBySku = (sku) =>
        setItems((prev) => prev.filter((i) => i.sku !== sku));

    //Vaciar el carrito
    const clear = () => setItems([]);

    //Cantidad total de items en el carrito
    const count = useMemo(
        () => items.reduce((n, i) => n + (i.qty ?? 1), 0),
        [items]
    );


    //Total CLP = suma de (precio * qty) de cada item
    const total = useMemo(
    () =>
      items.reduce(
        (sum, i) => sum + (i.precio ?? 0) * (i.qty ?? 1),
        0
      ),
    [items]
  );

    //Aquí cuando cambie los items lo guardamos en el localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const value = { items, addItem, removeBySku, clear, count, total };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;

}

export function useCart() {
  const ctx = useContext(CartContext);
  if (ctx === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
