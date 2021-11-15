import { Container } from "@chakra-ui/layout";
import React, { createContext, useReducer } from "react";
import { AppActionType, appReducer } from "../store/reducers/Reducers";
import { allTokenData, appData, AppStateType, defaultUserAmounts, userData } from "../utils/dummyData";
import Navbar from "./Navbar";

export const initAppState: AppStateType = {
  ...appData,
  userData,
  selectedToken: allTokenData[0], // default value
  userAmounts: defaultUserAmounts,
  web3: {
    provider: null,
    signer: null,
  },
};

type LayoutProps = {
  children: React.ReactNode;
};

let dummyDisp: React.Dispatch<AppActionType> = () => {};

export const AppContext = createContext<AppStateType>(initAppState);
export const AppDispatchContext = createContext(dummyDisp);

function Layout(props: LayoutProps) {
  const [appState, appDispatch] = useReducer(appReducer, initAppState);

  return (
    <>
      <AppContext.Provider value={appState}>
        <AppDispatchContext.Provider value={appDispatch}>
          <Navbar />

          <Container as="main" maxW="container.lg" p={5} d="flex" flexDir="column" alignItems="center">
            {props.children}
          </Container>
        </AppDispatchContext.Provider>
      </AppContext.Provider>

      <footer></footer>
    </>
  );
}

export default Layout;
