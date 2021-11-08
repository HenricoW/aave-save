import { Container } from "@chakra-ui/layout";
import React, { createContext } from "react";
import { appState } from "../utils/dummyData";
import Navbar from "./Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

export const AppContext = createContext(appState);

function Layout(props: LayoutProps) {
  return (
    <>
      <AppContext.Provider value={appState}>
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
