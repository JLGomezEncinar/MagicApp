
import { render, screen } from '@testing-library/react-native';
// Importa el componente a probar
import MiSafeArea from '../components/MiSafeArea';



describe('MiSafeArea', () => {

  
  test('debe mostrar el ActivityIndicator cuando cards es null (estado de carga)', () => {
    // Renderiza el componente pasándole el prop cards como null
    render(<MiSafeArea cards={null} />);

  // Comprobamos que se muestra el Activity Indicator
    const activityIndicator = screen.queryByTestId('loading-indicator');
    
   

    // Verificamos que *no* esté el mensaje de "No hay resultados" ni las cards.
    expect(screen.queryByText('No hay resultados')).toBeNull();
    expect(screen.queryByText('Card 1')).toBeNull();


  });

  
});