import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from '../useCartStore';

describe('useCartStore (Shopping Cart Core functionality)', () => {
    beforeEach(() => {
        useCartStore.getState().clearCart();
    });

    it('should start with an empty cart', () => {
        expect(useCartStore.getState().items).toHaveLength(0);
        expect(useCartStore.getState().getTotalItems()).toBe(0);
        expect(useCartStore.getState().getSubtotal()).toBe(0);
    });

    it('should add an item to the cart', () => {
        useCartStore.getState().addItem({
            productId: 'TEST_PROD_1',
            name: 'Test Hoodie',
            size: 'L',
            price: 100,
            quantity: 1,
            image: '/test.jpg'
        });

        const state = useCartStore.getState();
        expect(state.items).toHaveLength(1);
        expect(state.items[0].id).toBe('TEST_PROD_1-L');
        expect(state.getTotalItems()).toBe(1);
        expect(state.getSubtotal()).toBe(100);
    });

    it('should aggregate quantity when adding the same item size', () => {
        const item = {
            productId: 'TEST_PROD_1',
            name: 'Test Hoodie',
            size: 'L',
            price: 100,
            quantity: 1,
            image: '/test.jpg'
        };

        useCartStore.getState().addItem(item);
        useCartStore.getState().addItem(item);

        const state = useCartStore.getState();
        expect(state.items).toHaveLength(1); // Still 1 distinct item type
        expect(state.items[0].quantity).toBe(2);
        expect(state.getTotalItems()).toBe(2);
        expect(state.getSubtotal()).toBe(200);
    });

    it('should add separate items for different sizes of the same product', () => {
        useCartStore.getState().addItem({
            productId: 'TEST_PROD_1', name: 'Test Hoodie', size: 'L', price: 100, quantity: 1, image: ''
        });
        useCartStore.getState().addItem({
            productId: 'TEST_PROD_1', name: 'Test Hoodie', size: 'M', price: 100, quantity: 1, image: ''
        });

        const state = useCartStore.getState();
        expect(state.items).toHaveLength(2);
        expect(state.getTotalItems()).toBe(2);
    });

    it('should correctly remove items', () => {
        useCartStore.getState().addItem({
            productId: 'TEST_PROD_1', name: 'Test Hoodie', size: 'L', price: 100, quantity: 1, image: ''
        });
        expect(useCartStore.getState().items).toHaveLength(1);

        useCartStore.getState().removeItem('TEST_PROD_1-L');
        expect(useCartStore.getState().items).toHaveLength(0);
    });

    it('should update quantity correctly without dropping below 1', () => {
        useCartStore.getState().addItem({
            productId: 'TEST_PROD_1', name: 'Test Hoodie', size: 'L', price: 100, quantity: 2, image: ''
        });

        // Update to 5
        useCartStore.getState().updateQuantity('TEST_PROD_1-L', 5);
        expect(useCartStore.getState().items[0].quantity).toBe(5);

        // Attempt to update to 0 or negative (should lock at 1)
        useCartStore.getState().updateQuantity('TEST_PROD_1-L', -3);
        expect(useCartStore.getState().items[0].quantity).toBe(1);
    });
});
