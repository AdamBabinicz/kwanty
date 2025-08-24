
import { useQuantumContext } from '../contexts/QuantumContext';
import { useTranslation } from 'react-i18next';

export function useQuantumState() {
  const { state, dispatch } = useQuantumContext();
  const { i18n } = useTranslation();

  const setLanguage = async (language: 'pl' | 'en' | 'fi') => {
    try {
      // Update context first to prevent UI flickering
      dispatch({ type: 'SET_LANGUAGE', payload: language });
      
      // Then change i18n language if available
      if (i18n && i18n.changeLanguage) {
        await i18n.changeLanguage(language);
      }
    } catch (error) {
      console.error('Language change failed:', error);
      // Revert context change on error
      dispatch({ type: 'SET_LANGUAGE', payload: state.currentLanguage });
    }
  };

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const toggleAccessibility = () => {
    dispatch({ type: 'TOGGLE_ACCESSIBILITY' });
  };

  const setCurrentSection = (section: string) => {
    dispatch({ type: 'SET_SECTION', payload: section });
  };

  const measureQubit = (result: 0 | 1) => {
    dispatch({ type: 'INCREMENT_MEASUREMENT', payload: result });
  };

  const collapseWave = () => {
    dispatch({ type: 'COLLAPSE_WAVE' });
  };

  const updateMousePosition = (x: number, y: number) => {
    dispatch({ type: 'UPDATE_MOUSE_POSITION', payload: { x, y } });
  };

  return {
    ...state,
    setLanguage,
    toggleTheme,
    toggleAccessibility,
    setCurrentSection,
    measureQubit,
    collapseWave,
    updateMousePosition,
  };
}
