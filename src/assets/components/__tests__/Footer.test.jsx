import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders without crashing', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('displays the Quick Links section with all links', () => {
    render(<Footer />);
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Shop' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
  });

  it('displays the contact information', () => {
    render(<Footer />);
    expect(screen.getByText(/info@contentcorner\.com/)).toBeInTheDocument();
    expect(screen.getByText(/\(555\) 123-4567/)).toBeInTheDocument();
  });

  it('displays the default store name and current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${year} Content Corner`))).toBeInTheDocument();
  });

  it('displays a custom store name and year from props', () => {
    render(<Footer storeName="BuzzBoard" year={2026} />);
    expect(screen.getByText(/2026 BuzzBoard\. All rights reserved\./)).toBeInTheDocument();
  });
});