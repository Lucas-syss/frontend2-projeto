import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Register from '../page';

vi.mock('next/link', () => {
    return {
        default: ({ children, href }: any) => <a href={href}>{children}</a>
    };
});

vi.mock('next-auth/react', () => ({
    signIn: vi.fn(),
}));

vi.mock('@/trpc/react', () => ({
    api: {
        auth: {
            register: {
                useMutation: () => ({
                    mutate: vi.fn(),
                    isPending: false,
                })
            }
        }
    }
}));

describe('Registration Form (Core Auth Functionality)', () => {
    it('renders all required form fields', () => {
        render(<Register />);

        expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Create Account/i })).toBeInTheDocument();
    });

    it('shows error if passwords do not match', async () => {
        render(<Register />);

        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'securepassword123' } });
        fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'wrongpassword' } });

        fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

        expect(await screen.findByText('Passwords do not match.')).toBeInTheDocument();
    });

    it('shows error if password is too short', async () => {
        render(<Register />);

        fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'short' } });
        fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'short' } });

        fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

        expect(await screen.findByText('Password must be at least 8 characters.')).toBeInTheDocument();
    });
});
