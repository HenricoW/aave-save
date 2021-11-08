import { userAmounts } from "../../components/InteractionPanel";

export const collateralReducer = (state: typeof userAmounts, action: { type: string; payload: number }) => {
  switch (action.type) {
    case "depositAdd":
      return { ...state, totalDeposits: userAmounts.totalDeposits + action.payload };
    case "depositSub":
      return { ...state, totalDeposits: userAmounts.totalDeposits - action.payload };
    case "loanedAdd":
      return { ...state, totalLoaned: userAmounts.totalLoaned + action.payload };
    case "loanedSub":
      return { ...state, totalLoaned: userAmounts.totalLoaned - action.payload };
    default:
      throw new Error("Collateral Reducer: unmatched case");
  }
};
