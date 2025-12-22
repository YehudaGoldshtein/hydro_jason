import { createContext, useContext, useState, ReactNode } from 'react';

interface SelectedVariantContextType {
  selectedVariantIndex: number;
  setSelectedVariantIndex: (index: number) => void;
}

const SelectedVariantContext = createContext<SelectedVariantContextType | undefined>(undefined);

export function SelectedVariantProvider({ children }: { children: ReactNode }) {
  // Default to index 0 (₪199 - first variant)
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(0);

  return (
    <SelectedVariantContext.Provider value={{ selectedVariantIndex, setSelectedVariantIndex }}>
      {children}
    </SelectedVariantContext.Provider>
  );
}

export function useSelectedVariant() {
  const context = useContext(SelectedVariantContext);
  if (context === undefined) {
    throw new Error('useSelectedVariant must be used within a SelectedVariantProvider');
  }
  return context;
}

