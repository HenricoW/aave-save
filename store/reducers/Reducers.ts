import { ethers } from "ethers";
import { initAppState } from "../../components/Layout";
import { allTokenData, tokenDataType, defaultUserAmounts, userDataType, AppStateType } from "../../utils/dummyData";
import { getTotTokensValue } from "../../utils/utilFunctions";
import { ProviderType, SignerType } from "../../web3/web3";

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

export const tokenDataReducer = (state: tokenDataType[], action: { type: string; payload: number[] }) => {
  if (action.payload.length !== state.length) return state;
  let newState = state;

  switch (action.type) {
    case "setSuppRates":
      for (let i = 0; i < state.length; i++) {
        newState[i].saveRate = action.payload[i];
      }
      return newState;
    case "setBorrRates":
      for (let i = 0; i < state.length; i++) {
        newState[i].borrRate = action.payload[i];
      }
      return newState;
    case "setPrices":
      for (let i = 0; i < state.length; i++) {
        newState[i].price = action.payload[i];
      }
      return newState;
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

const userReducer = (state: AppStateType, action: { type: string; payload: userDataType }) => {
  switch (action.type) {
    case "signIn":
      const userAmounts = getUserAmounts(action.payload, state.selectedToken);
      return { ...state, isUserConnected: true, userData: action.payload, userAmounts };
    case "signOut":
      return { ...state, isUserConnected: false, userData: initAppState.userData, userAmounts: defaultUserAmounts };
    case "setWalletAmts":
      const newUdata = { ...state.userData, wallet: action.payload.wallet }; // extract only wallet vals for update
      const uAmounts1 = getUserAmounts(newUdata, state.selectedToken);
      return { ...state, isUserConnected: true, userData: newUdata, userAmounts: uAmounts1 };
    case "setDepBorrAmts":
      // TODO
      return state;
    default:
      return state;
  }
};

const tokenReducer = (state: AppStateType, action: { type: string; payload: string }) => {
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

const web3Reducer = (
  state: AppStateType,
  action: { type: string; payload: { provider: ProviderType | null; signer: SignerType | null } }
) => {
  switch (action.type) {
    case "setWeb3":
      return { ...state, web3: { provider: action.payload.provider, signer: action.payload.signer } };
    case "clearWeb3":
      return { ...state, web3: { provider: null, signer: null } };
    default:
      return state;
  }
};

const contractsReducer = (
  state: AppStateType,
  action: {
    type: string;
    payload: {
      [contrName: string]: ethers.Contract;
    } | null;
  }
) => {
  switch (action.type) {
    case "setContracts":
      return { ...state, contracts: action.payload };
    case "clearContracts":
      return { ...state, contracts: null };
    default:
      return state;
  }
};

export type AppActionType = {
  type: string;
  payload: any;
  target: "user" | "token" | "web3" | "contracts";
};

export const appReducer = (state: typeof initAppState, action: AppActionType) => {
  switch (action.target) {
    case "user":
      return userReducer(state, { type: action.type, payload: action.payload });
    case "token":
      return tokenReducer(state, { type: action.type, payload: action.payload });
    case "web3":
      return web3Reducer(state, { type: action.type, payload: action.payload });
    case "contracts":
      return contractsReducer(state, { type: action.type, payload: action.payload });
    default:
      return state;
  }
};
