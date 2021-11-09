import { Container } from "@chakra-ui/layout";
import React, { createContext, useReducer } from "react";
import { appReducer } from "../store/reducers/Reducers";
import { allTokenData, appData, userData } from "../utils/dummyData";
import Navbar from "./Navbar";

export const initAppState = {
  ...appData,
  userData,
  selectedToken: allTokenData[0], // default value
};

type LayoutProps = {
  children: React.ReactNode;
};

let dummyDisp: React.Dispatch<{
  type: string;
  payload: any;
  target: "user" | "token";
}> = () => {};

export const AppContext = createContext(initAppState);
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
