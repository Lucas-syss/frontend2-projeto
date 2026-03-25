import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface LocalCartItem {
    id: string; 
    productId: string;
    name: string;
    size: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartStore {
    items: LocalCartItem[];
    addItem: (item: Omit<LocalCartItem, 'id'>) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getSubtotal: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => {
                const id = `${item.productId}-${item.size}`;
                const existingItem = get().items.find((i) => i.id === id);

                if (existingItem) {
                    set({
                        items: get().items.map((i) =>
                            i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i
                        ),
                    });
                } else {
                    set({ items: [...get().items, { ...item, id }] });
                }
            },
            removeItem: (id) =>
                set({ items: get().items.filter((i) => i.id !== id) }),
            updateQuantity: (id, quantity) =>
                set({
                    items: get().items.map((i) =>
                        i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
                    ),
                }),
            clearCart: () => set({ items: [] }),
            getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
            getSubtotal: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
        }),
        {
            name: 'stonesaints-cart',
        }
    )
);
