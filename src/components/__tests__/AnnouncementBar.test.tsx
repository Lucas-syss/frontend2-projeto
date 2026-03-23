import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AnnouncementBar from '../AnnouncementBar';

describe('AnnouncementBar Component', () => {
    it('renders the shipping announcement text', () => {
        render(<AnnouncementBar />);
        expect(screen.getByText(/Free Worldwide Shipping on orders over \$150/i)).toBeInTheDocument();
    });
});
