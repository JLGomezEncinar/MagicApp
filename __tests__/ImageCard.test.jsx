// ImageCard.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert, Platform } from 'react-native';
import ImageCard from '../components/ImageCard';
import { CartProvider, useCart } from '../components/CartContext';

// Mock del contexto del carrito
jest.mock('../components/CartContext', () => ({
  useCart: jest.fn(),
}));

// Mock de Platform
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
  select: jest.fn(),
}));

// Mock de Alert
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

// Mock de window.confirm para web
const mockConfirm = jest.fn();
Object.defineProperty(global, 'window', {
  value: {
    confirm: mockConfirm,
  },
  writable: true,
});

describe('ImageCard Component', () => {
  const mockAddToCart = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    useCart.mockReturnValue({ addToCart: mockAddToCart });
  });

  const defaultProps = {
    image: 'https://example.com/image.jpg',
    title: 'Producto Test',
    description: 'Descripción del producto',
    backgroundColor: '#FFFFFF',
    onPress: jest.fn(),
  };

  const renderComponent = (props = {}) => {
    return render(<ImageCard {...defaultProps} {...props} />);
  };

 



  test('debería mostrar el título correctamente', () => {
    const { getByText } = renderComponent({ title: 'Nuevo Producto' });
    
    expect(getByText('Nuevo Producto')).toBeTruthy();
  });
});