import { createContext, useContext, useState, useEffect, useMemo} from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'spa-bosque-cart';

export const CartProvider = ({ children }) => {
    
    const [items, setItems] = useState(() => {
        try {
            const storedItems = localStorage.getItem(STORAGE_KEY);
            return storedItems ? JSON.parse(storedItems) : [];
        } catch {
            return [];
        }
    });

  
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

    const removeBySku = (sku) =>
        setItems((prev) => prev.filter((i) => i.sku !== sku));

    const clear = () => setItems([]);

    const setQty = (sku, qty) => {
      setItems((prev) => 
        prev.map((i) =>
          i.sku === sku ? {...i, qty: Math.max(1, Number(qty) || 1)} : i
        )
      );
    }

    const inc = (sku) =>
      setItems((prev) =>
        prev.map((i) => (i.sku === sku ? {...i, qty: (i.qty ?? 1) + 1} : i))
      );

    const dec = (sku) =>
      setItems((prev) =>
        prev.map((i) =>
          i.sku === sku ? {...i, qty: Math.max(1, (i.qty ?? 1) - 1)} : i
        )
      );  

    const count = useMemo(
        () => items.reduce((n, i) => n + (i.qty ?? 1), 0),
        [items]
    );

    const total = useMemo(
    () =>
      items.reduce(
        (sum, i) => sum + (i.precio ?? 0) * (i.qty ?? 1),
        0
      ),
    [items]
  );

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const value = { items, addItem, removeBySku, clear, setQty, inc, dec, count, total };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;

}

export function useCart() {
  const ctx = useContext(CartContext);
  if (ctx === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
