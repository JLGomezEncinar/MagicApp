import { render, fireEvent } from '@testing-library/react-native';
import MiTopBar from '../components/MiTopBar'; 



// Mock para los hooks de expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/',
}));

// Mock para useParams
jest.mock('../components/ParamsProvider', () => ({
  useParams: () => ({ setParams: jest.fn() }),
}));

// Mock para useCart
jest.mock('../components/CartContext', () => ({
  useCart: () => ({ cart: {} }), // Simula un carrito vacío
}));

// Mock para MiLink y MiTouchable (componentes hijos)

jest.mock('../components/MiLink', () => 'MiLink');
jest.mock('../components/MiTouchable', () => 'MiTouchable');




describe('MiTopBar', () => {
  
  test('debe llamar a la función onSearch con el texto correcto al presionar el botón', () => {
    // 1. Mock de la función que esperamos que se llame
    const mockOnSearch = jest.fn();
    const searchText = 'producto de prueba';

    // 2. Renderiza el componente con las props mínimas
    const { getByTestId } = render(
      <MiTopBar 
        linkText="Test Link" 
        linkTo="/" 
        onPress={jest.fn()} 
        onSearch={mockOnSearch} 
        rightIcon={null} 
      />
    );

    // 3. Obtiene los elementos por su testID
    const searchInput = getByTestId('search-input');
    const searchButton = getByTestId('search-button');

    // 4. Simula el ingreso de texto en el TextInput
    fireEvent.changeText(searchInput, searchText);

    // 5. Simula la pulsación del botón de búsqueda
    fireEvent.press(searchButton);

    // 6. Afirma que la función mockOnSearch fue llamada con el texto esperado una vez
    expect(mockOnSearch).toHaveBeenCalledWith(searchText);
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });
});
