import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { Button } from "@chakra-ui/button";
import { Progress } from "@chakra-ui/progress";
import { Box, Container, HStack, Text, VStack } from "@chakra-ui/layout";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { tokenData, userData } from "../utils/dummyData";
import InteractionInput from "./InteractionInput";

export type InteractionPanelProps = {
  setIsInteractOpen: Dispatch<SetStateAction<boolean>>;
};

const createInput = (
  title: string,
  helperText: string,
  helperAmount: string,
  topMargin: boolean,
  btnColor: string,
  warnValue: number,
  precision: number,
  btnText = "submit"
) => (
  <InteractionInput
    title={title}
    helperText={helperText}
    helperAmount={helperAmount}
    topMargin={topMargin}
    btnColor={btnColor}
    warnValue={warnValue}
    precision={precision}
    btnText={btnText}
  />
);

function InteractionPanel({ setIsInteractOpen }: InteractionPanelProps) {
  const decimals = tokenData[0].displayDecimals;
  const walletAmount = (userData.wallet["wBTC"] ? userData.wallet["wBTC"] : 0).toFixed(decimals);
  const depositAmount = (userData.deposits["wBTC"] ? userData.deposits["wBTC"] : 0).toFixed(decimals);

  return (
    <Container maxW="container.md" border="1px" borderColor="gray.600" borderRadius="md" p="4" mb="5">
      <Box d="flex" justifyContent="space-between" py={2} px={4}>
        <HStack spacing="3">
          <Image height="60px" width="60px" src={tokenData[0].imgUrl} />
          <Text fontWeight="bold" fontSize="lg">
            {tokenData[0].ticker}
          </Text>
        </HStack>
        <Box d="flex" justifyContent="space-between" flexBasis="45%">
          <VStack spacing="1">
            <Text fontSize="xs" color="gray.400">
              Savings APY
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="green.300">
              {tokenData[0].saveRate.toString()} %
            </Text>
          </VStack>
          <VStack spacing="1">
            <Text fontSize="xs" color="gray.400">
              Borrow APY
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="orange.300">
              {tokenData[0].borrRate.toString()} %
            </Text>
          </VStack>
        </Box>
      </Box>
      <Box d="flex" justifyContent="space-between" pb="2" px="5">
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
          <TabPanel className="savePanel">
            {createInput("Deposit", "Your Wallet", walletAmount, false, "green", parseFloat(walletAmount), decimals)}
            {createInput("Withdraw", "Available", depositAmount, true, "green", parseFloat(depositAmount), decimals)}
          </TabPanel>
          <TabPanel className="borrowPanel">
            {createInput("Borrow", "Available", depositAmount, false, "orange", parseFloat(depositAmount), decimals)}
            {createInput("Repay", "Your Wallet", walletAmount, true, "orange", parseFloat(walletAmount), decimals)}
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Container d="flex" flexDir="column" maxW="container.md" pt="2">
        <Box d="flex" alignItems="center" justifyContent="space-between">
          <Text py="3" color="gray.500">
            Updated Collateral:
          </Text>
          <Text py="3" fontWeight="bold">
            68 %
          </Text>
        </Box>
        <Progress colorScheme="green" size="lg" value={68} />
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
  );
}

export default InteractionPanel;
