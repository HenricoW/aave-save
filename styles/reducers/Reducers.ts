import { fieldVals } from "../../components/InteractionPanel";

export const collateralReducer = (state: typeof fieldVals, action: { type: string; payload: number }) => {
  switch (action.type) {
    case "depositAdd":
      return { ...state, totalDeposits: fieldVals.totalDeposits + action.payload };
    case "depositSub":
      return { ...state, totalDeposits: fieldVals.totalDeposits - action.payload };
    case "loanedAdd":
      return { ...state, totalLoaned: fieldVals.totalLoaned + action.payload };
    case "loanedSub":
      return { ...state, totalLoaned: fieldVals.totalLoaned - action.payload };
    default:
      throw new Error("Collateral Reducer: unmatched case");
  }
};
