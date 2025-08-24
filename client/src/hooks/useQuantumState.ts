
import { useQuantumContext } from '../contexts/QuantumContext';
import { useTranslation } from 'react-i18next';

export function useQuantumState() {
  const { state, dispatch } = useQuantumContext();
  const { i18n } = useTranslation();

  const setLanguage = async (language: 'pl' | 'en' | 'fi') => {
    try {
      // First change i18n language
      await i18n.changeLanguage(language);
      // Then update context
      dispatch({ type: 'SET_LANGUAGE', payload: language });
    } catch (error) {
      console.error('Language change failed:', error);
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
