import { render } from '@testing-library/react-native';
import ImageCard from '../components/ImageCard'; 



// Mock para useWindowDimensions
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.useWindowDimensions = () => ({ width: 400, height: 800 }); // Valor fijo para pruebas necesario para el test
  return RN;
});

// Mock para el hook useCart
jest.mock('../components/CartContext', () => ({
  useCart: () => ({
    addToCart: jest.fn(),
  }),
}));


describe('ImageCard', () => {
  // Define un conjunto básico de props
  const mockProps = {
    image: 'http://test.com/img.jpg',
    title: 'Tarjeta de Prueba', // Este es el valor que vamos a buscar
    description: 'Descripción de prueba',
    backgroundColor: '#fff',
    onPress: jest.fn(),
  };

  test('debe mostrar el título de la tarjeta correctamente', () => {
    // Renderiza el componente con las props
    const { getByText } = render(<ImageCard {...mockProps} />);

    // Usa getByText para encontrar el elemento de texto que contiene el título
    // Si el texto se encuentra, el test pasa. Si no, falla.
    const titleElement = getByText('Tarjeta de Prueba');

    // Afirmación: verifica que el elemento existe
    expect(titleElement).toBeDefined();
    
    // Afirmación adicional: verifica que el texto es exactamente lo que esperábamos
    expect(titleElement.props.children).toBe('Tarjeta de Prueba');
  });
  
  
});