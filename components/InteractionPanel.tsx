import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { Button } from "@chakra-ui/button";
import { Box, Container, HStack, Text, VStack } from "@chakra-ui/layout";
import Image from "next/image";
import { createContext, Dispatch, SetStateAction, useReducer } from "react";
import { appState, getTokenData, getUserAmounts } from "../utils/dummyData";
import InteractionInput from "./InteractionInput";
import { collateralReducer } from "../styles/reducers/Reducers";
import CollateralBar from "./CollateralBar";

export type InteractionPanelProps = {
  setIsInteractOpen: Dispatch<SetStateAction<boolean>>;
};

const tknData = getTokenData(appState.selectedToken);
export const userAmounts = getUserAmounts();
export const userTokenAmountsContext = createContext(userAmounts);

function InteractionPanel({ setIsInteractOpen }: InteractionPanelProps) {
  const [usrFieldState, fieldsDispatch] = useReducer(collateralReducer, userAmounts);

  return (
    <userTokenAmountsContext.Provider value={usrFieldState}>
      <Container maxW="container.md" border="1px" borderColor="gray.600" borderRadius="md" p="4" mb="5">
        <Box d="flex" justifyContent="space-between" py={2} px={4}>
          <HStack spacing="3">
            <Image height="60px" width="60px" src={tknData.imgUrl} />
            <Text fontWeight="bold" fontSize="lg">
              {tknData.ticker}
            </Text>
          </HStack>
          <Box d="flex" justifyContent="space-between" flexBasis="45%">
            <VStack spacing="1">
              <Text fontSize="xs" color="gray.400">
                Savings APY
              </Text>
              <Text fontSize="lg" fontWeight="bold" color="green.300">
                {tknData.saveRate.toString()} %
              </Text>
            </VStack>
            <VStack spacing="1">
              <Text fontSize="xs" color="gray.400">
                Borrow APY
              </Text>
              <Text fontSize="lg" fontWeight="bold" color="orange.300">
                {tknData.borrRate.toString()} %
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
        <Tabs align="center" colorScheme="twitter">
          <TabList>
            <Tab>Save</Tab>
            <Tab>Borrow</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <InteractionInput panelType={"savePanel"} fieldsDispatch={fieldsDispatch} />
            </TabPanel>
            <TabPanel>
              <InteractionInput panelType={"borrowPanel"} fieldsDispatch={fieldsDispatch} />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Container d="flex" flexDir="column" maxW="container.md" pt="2">
          <CollateralBar />
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
    </userTokenAmountsContext.Provider>
  );
}

export default InteractionPanel;
