import { userAmounts } from "../../components/InteractionPanel";
import { initAppState } from "../../components/Layout";
import { allTokenData } from "../../utils/dummyData";

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
      return state;
  }
};

const userReducer = (state: typeof initAppState, action: { type: string; payload: typeof initAppState.userData }) => {
  switch (action.type) {
    case "signIn":
      return { ...state, isUserConnected: true, userData: action.payload };
    case "signOut":
      return { ...state, isUserConnected: false, userData: initAppState.userData };
    default:
      return state;
  }
};

const tokenReducer = (state: typeof initAppState, action: { type: string; payload: string }) => {
  switch (action.type) {
    case "selectToken":
      const tData = allTokenData.find((tkn) => tkn.ticker === action.payload);
      const tknData = typeof tData === "undefined" ? allTokenData[0] : tData;
      return { ...state, selectedTicker: action.payload, selectedToken: tknData };
    default:
      return state;
  }
};

export const appReducer = (
  state: typeof initAppState,
  action: { type: string; payload: any; target: "user" | "token" }
) => {
  switch (action.target) {
    case "user":
      return userReducer(state, { type: action.type, payload: action.payload });
    case "token":
      return tokenReducer(state, { type: action.type, payload: action.payload });
    default:
      return state;
  }
};
