import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { Button } from "@chakra-ui/button";
import { Box, Container } from "@chakra-ui/layout";
import { createContext, Dispatch, SetStateAction, useContext, useReducer, useState } from "react";
import { defaultUserAmounts, ZERO_ADDR } from "../utils/dummyData";
import PanelInputGroup from "./PanelInputGroup";
import { collateralReducer } from "../store/reducers/Reducers";
import CollateralBar from "./CollateralBar";
import { AppContext } from "./Layout";
import TokenData from "./TokenData";

export type InteractionPanelProps = {
  setIsInteractOpen: Dispatch<SetStateAction<boolean>>;
  isInteractOpen: boolean;
};

export const collateralContext = createContext(defaultUserAmounts); // for separate coll calcs

function InteractionPanel({ setIsInteractOpen, isInteractOpen }: InteractionPanelProps) {
  const { userAmounts, isUserConnected, userData } = useContext(AppContext);
  const [usrFieldState, fieldsDispatch] = useReducer(collateralReducer, userAmounts);

  const [isAccOpsOpen, setIsAccOpsOpen] = useState(false);

  return (
    <collateralContext.Provider value={usrFieldState}>
      {isUserConnected ? (
        <Container maxW="container.md" border="1px" borderColor="gray.600" borderRadius="md" p="4" mb="5">
          <TokenData />
          {userData.appWallet === ZERO_ADDR ? null : (
            <Box d="flex" justifyContent="center" mt="2">
              <Button
                variant="outline"
                colorScheme="twitter"
                my="1"
                onClick={() => {
                  setIsInteractOpen(true);
                  isInteractOpen ? setIsAccOpsOpen(!isAccOpsOpen) : setIsAccOpsOpen(true);
                }}
              >
                {isAccOpsOpen ? "Switch to SAVE AND BORROW" : "Switch to ADD/REMOVE FUNDS"}
              </Button>
            </Box>
          )}

          {isAccOpsOpen ? (
            <Box mt="2">
              <PanelInputGroup panelType={"fundingPanel"} fieldsDispatch={fieldsDispatch} />
            </Box>
          ) : (
            <Tabs align="center" colorScheme="twitter">
              <TabList>
                <Tab>Save</Tab>
                <Tab>Borrow</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <PanelInputGroup panelType={"savePanel"} fieldsDispatch={fieldsDispatch} />
                </TabPanel>
                <TabPanel>
                  <PanelInputGroup panelType={"borrowPanel"} fieldsDispatch={fieldsDispatch} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          )}

          <Container d="flex" flexDir="column" maxW="container.md" pt="2">
            {isAccOpsOpen ? null : <CollateralBar />}
            <Button
              variant="outline"
              colorScheme="red"
              d="block"
              mt="8"
              mx="auto"
              w="40"
              onClick={() => setIsInteractOpen(false)}
            >
              CLOSE
            </Button>
          </Container>
        </Container>
      ) : null}
    </collateralContext.Provider>
  );
}

export default InteractionPanel;
