import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { Button } from "@chakra-ui/button";
import { Box, Container, HStack, Text, VStack } from "@chakra-ui/layout";
import Image from "next/image";
import { createContext, Dispatch, SetStateAction, useContext, useReducer, useState } from "react";
import { defaultUserAmounts, ZERO_ADDR } from "../utils/dummyData";
import PanelInputGroup from "./PanelInputGroup";
import { collateralReducer } from "../store/reducers/Reducers";
import CollateralBar from "./CollateralBar";
import { AppContext } from "./Layout";
import { ethers, Signer } from "ethers";
import { userAccABI } from "../utils/ABIs";
import { toWei } from "../utils/utilFunctions";

export type InteractionPanelProps = {
  setIsInteractOpen: Dispatch<SetStateAction<boolean>>;
  isInteractOpen: boolean;
};

export const collateralContext = createContext(defaultUserAmounts); // for separate coll calcs

function InteractionPanel({ setIsInteractOpen, isInteractOpen }: InteractionPanelProps) {
  const { selectedToken, userAmounts, isUserConnected, userData, web3, contracts } = useContext(AppContext);
  const [usrFieldState, fieldsDispatch] = useReducer(collateralReducer, userAmounts);

  const [isAccOpsOpen, setIsAccOpsOpen] = useState(false);

  const accContr = new ethers.Contract(userData.appWallet, userAccABI, web3?.signer as Signer);

  const onFormSubmit = async (fieldAction: string, value: number) => {
    const tckr = selectedToken.ticker;
    if (contracts) {
      const tknAddr = contracts[tckr].address;
      const cTknAddr = contracts[`c${tckr}`].address;
      const val = tckr === "wBTC" ? toWei(value, 8) : toWei(value);

      switch (fieldAction) {
        case "fundAccount":
          await contracts[tckr].connect(web3?.signer as Signer).approve(accContr.address, val);
          await accContr.fundAccount(tknAddr, val, { gasLimit: 80_000 });
          break;
        case "drawDown":
        case "deposit":
          await accContr.deposit(cTknAddr, val);
          break;
        case "depositSub":
        case "loanedAdd":
        case "loanedSub":
        default:
          return;
      }
    }
  };

  return (
    <collateralContext.Provider value={usrFieldState}>
      {isUserConnected ? (
        <Container maxW="container.md" border="1px" borderColor="gray.600" borderRadius="md" p="4" mb="5">
          <Box d="flex" justifyContent="space-between" py={2} px={4}>
            <HStack spacing="3">
              <Image height="60px" width="60px" src={selectedToken.imgUrl} />
              <Text fontWeight="bold" fontSize="lg">
                {selectedToken.ticker}
              </Text>
            </HStack>
            <Box d="flex" justifyContent="space-between" flexBasis="45%">
              <VStack spacing="1">
                <Text fontSize="xs" color="gray.400">
                  Savings APY
                </Text>
                <Text fontSize="lg" fontWeight="bold" color="green.300">
                  {selectedToken.saveRate.toFixed(2)} %
                </Text>
              </VStack>
              <VStack spacing="1">
                <Text fontSize="xs" color="gray.400">
                  Borrow APY
                </Text>
                <Text fontSize="lg" fontWeight="bold" color="orange.300">
                  {selectedToken.borrRate.toFixed(2)} %
                </Text>
              </VStack>
            </Box>
          </Box>
          <Box d="flex" justifyContent="space-between" pt="1" px="5">
            <Text fontSize="lg" textAlign="center">
              COLLATERAL LIMIT:
            </Text>
            <Text fontSize="lg" textAlign="center" fontWeight="bold">
              80 %
            </Text>
          </Box>

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
              <PanelInputGroup panelType={"fundingPanel"} fieldsDispatch={fieldsDispatch} onFormSubmit={onFormSubmit} />
            </Box>
          ) : (
            <Tabs align="center" colorScheme="twitter">
              <TabList>
                <Tab>Save</Tab>
                <Tab>Borrow</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <PanelInputGroup
                    panelType={"savePanel"}
                    fieldsDispatch={fieldsDispatch}
                    onFormSubmit={onFormSubmit}
                  />
                </TabPanel>
                <TabPanel>
                  <PanelInputGroup
                    panelType={"borrowPanel"}
                    fieldsDispatch={fieldsDispatch}
                    onFormSubmit={onFormSubmit}
                  />
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
