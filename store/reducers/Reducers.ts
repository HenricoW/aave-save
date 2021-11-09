import { initAppState } from "../../components/Layout";
import { allTokenData, tokenDataType, defaultUserAmounts, userDataType } from "../../utils/dummyData";
import { getTotTokensValue } from "../../utils/utilFunctions";

export const collateralReducer = (
  state: typeof defaultUserAmounts,
  action: { type: string; payload: number; origTotals: { totalDeposits: number; totalLoaned: number } }
) => {
  switch (action.type) {
    case "depositAdd":
      return { ...state, totalDeposits: action.origTotals.totalDeposits + action.payload };
    case "depositSub":
      return { ...state, totalDeposits: action.origTotals.totalDeposits - action.payload };
    case "loanedAdd":
      return { ...state, totalLoaned: action.origTotals.totalLoaned + action.payload };
    case "loanedSub":
      return { ...state, totalLoaned: action.origTotals.totalLoaned - action.payload };
    default:
      return state;
  }
};

export const getUserAmounts = (userData: userDataType, tknData: tokenDataType) => {
  const decimals = tknData.displayDecimals;
  const walletAmount = (userData.wallet[tknData.ticker] ? userData.wallet[tknData.ticker] : 0).toFixed(decimals);
  const borrowedAmount = (userData.borrowed[tknData.ticker] ? userData.borrowed[tknData.ticker] : 0).toFixed(decimals);
  const depositAmount = (userData.deposits[tknData.ticker] ? userData.deposits[tknData.ticker] : 0).toFixed(decimals);

  const totalDeposits = getTotTokensValue(allTokenData, userData.deposits);
  const totalLoaned = getTotTokensValue(allTokenData, userData.borrowed);

  return {
    walletAmount,
    depositAmount,
    borrowedAmount,
    totalDeposits,
    totalLoaned,
  };
};

const userReducer = (state: typeof initAppState, action: { type: string; payload: typeof initAppState.userData }) => {
  switch (action.type) {
    case "signIn":
      const userAmounts = getUserAmounts(action.payload, state.selectedToken); // set user amounts
      return { ...state, isUserConnected: true, userData: action.payload, userAmounts };
    case "signOut":
      return { ...state, isUserConnected: false, userData: initAppState.userData, userAmounts: defaultUserAmounts };
    case "updateAmounts":
      // TODO
      return state;
    default:
      return state;
  }
};

const tokenReducer = (state: typeof initAppState, action: { type: string; payload: string }) => {
  switch (action.type) {
    case "selectToken":
      const tData = allTokenData.find((tkn) => tkn.ticker === action.payload);
      const tknData = typeof tData === "undefined" ? allTokenData[0] : tData;
      const userAmounts = getUserAmounts(state.userData, tknData); // set user amounts
      return { ...state, selectedTicker: action.payload, selectedToken: tknData, userAmounts };
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
