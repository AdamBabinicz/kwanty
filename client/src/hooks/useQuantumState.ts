import { useQuantumContext } from '../contexts/QuantumContext';

export function useQuantumState() {
  const { state, dispatch } = useQuantumContext();

  const setLanguage = (language: 'pl' | 'en' | 'fi') => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
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
