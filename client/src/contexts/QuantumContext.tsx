import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface QuantumState {
  currentLanguage: "pl" | "en" | "fi";
  isAccessibilityMode: boolean;
  currentSection: string;
  measurementCount: {
    state0: number;
    state1: number;
  };
  isWaveCollapsed: boolean;
  mousePosition: { x: number; y: number };
}

type QuantumAction =
  | { type: "SET_LANGUAGE"; payload: "pl" | "en" | "fi" }
  | { type: "TOGGLE_ACCESSIBILITY" }
  | { type: "SET_SECTION"; payload: string }
  | { type: "INCREMENT_MEASUREMENT"; payload: 0 | 1 }
  | { type: "COLLAPSE_WAVE" }
  | { type: "UPDATE_MOUSE_POSITION"; payload: { x: number; y: number } };

const initialState: QuantumState = {
  currentLanguage: "pl",
  isAccessibilityMode: false,
  currentSection: "hero",
  measurementCount: { state0: 0, state1: 0 },
  isWaveCollapsed: false,
  mousePosition: { x: 0, y: 0 },
};

function quantumReducer(
  state: QuantumState,
  action: QuantumAction
): QuantumState {
  switch (action.type) {
    case "SET_LANGUAGE":
      return { ...state, currentLanguage: action.payload };
    case "TOGGLE_ACCESSIBILITY":
      return { ...state, isAccessibilityMode: !state.isAccessibilityMode };
    case "SET_SECTION":
      return { ...state, currentSection: action.payload };
    case "INCREMENT_MEASUREMENT":
      return {
        ...state,
        measurementCount: {
          ...state.measurementCount,
          [action.payload === 0 ? "state0" : "state1"]:
            state.measurementCount[action.payload === 0 ? "state0" : "state1"] +
            1,
        },
      };
    case "COLLAPSE_WAVE":
      return { ...state, isWaveCollapsed: true };
    case "UPDATE_MOUSE_POSITION":
      return { ...state, mousePosition: action.payload };
    default:
      return state;
  }
}

interface QuantumContextType {
  state: QuantumState;
  dispatch: React.Dispatch<QuantumAction>;
}

const QuantumContext = createContext<QuantumContextType | undefined>(undefined);

export function QuantumContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quantumReducer, initialState);

  return (
    <QuantumContext.Provider value={{ state, dispatch }}>
      {children}
    </QuantumContext.Provider>
  );
}

export function useQuantumContext() {
  const context = useContext(QuantumContext);
  if (context === undefined) {
    throw new Error(
      "useQuantumContext must be used within a QuantumContextProvider"
    );
  }
  return context;
}
