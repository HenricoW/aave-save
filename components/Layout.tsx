import { Container } from "@chakra-ui/layout";
import React, { createContext } from "react";
import { appState, userData } from "../utils/dummyData";
import Navbar from "./Navbar";

export const initAppState = {
  ...appState,
  userData,
};

type LayoutProps = {
  children: React.ReactNode;
};

export const AppContext = createContext(initAppState);

function Layout(props: LayoutProps) {
  return (
    <>
      <AppContext.Provider value={initAppState}>
        <Navbar />

        <Container as="main" maxW="container.lg" p={5} d="flex" flexDir="column" alignItems="center">
          {props.children}
        </Container>

        <footer></footer>
      </AppContext.Provider>
    </>
  );
}

export default Layout;
