import { createContext, useContext, useState } from "react";

export type BetSelection = {
  type: "market" | "player";
  selectionId: number;
  label: string;
  odds: number;
};

type BetSlipContextType = {
  selection: BetSelection | null;
  openBetSlip: (selection: BetSelection) => void;
  closeBetSlip: () => void;
};

const BetSlipContext = createContext<BetSlipContextType | null>(null);

export const BetSlipProvider = ({ children }: { children: React.ReactNode }) => {
  const [selection, setSelection] = useState<BetSelection | null>(null);

  const openBetSlip = (sel: BetSelection) => setSelection(sel);
  const closeBetSlip = () => setSelection(null);

  return (
    <BetSlipContext.Provider value={{ selection, openBetSlip, closeBetSlip }}>
      {children}
    </BetSlipContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBetSlip = () => {
  const ctx = useContext(BetSlipContext);
  if (!ctx) throw new Error("useBetSlip must be used inside BetSlipProvider");
  return ctx;
};
