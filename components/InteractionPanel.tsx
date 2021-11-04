import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { NumberInput, NumberInputField } from "@chakra-ui/number-input";
import { Button } from "@chakra-ui/button";
import { Progress } from "@chakra-ui/progress";
import { Box, Container, HStack, Text, VStack } from "@chakra-ui/layout";
import Image from "next/image";

const tokenDetail = {
  ticker: "wBTC",
  imgUrl: "/wBTC.svg",
  saveRate: 3.86,
  borrRate: 5.39,
};

const interactionInput = (
  title: string,
  helperText: string,
  helperAmount: string,
  topMargin: boolean,
  btnText = "submit"
) => (
  <HStack alignItems="end">
    <FormControl id="withdraw" mt={topMargin ? "8" : "0"}>
      <Box d="flex" alignItems="center" justifyContent="space-between">
        <FormLabel>{title}</FormLabel>
        <Text fontSize="sm" color="gray.500">
          {helperText}: {helperAmount}
        </Text>
      </Box>
      <NumberInput min={10}>
        <NumberInputField />
      </NumberInput>
    </FormControl>
    <Button colorScheme="twitter" variant="outline">
      {btnText.toUpperCase()}
    </Button>
  </HStack>
);

function InteractionPanel() {
  return (
    <Container maxW="container.md" border="1px" borderColor="gray.600" borderRadius="md" p="4" mb="5">
      <Box as="a" d="flex" justifyContent="space-between" py={2} px={4}>
        <HStack spacing="3">
          <Image height="60px" width="60px" src={tokenDetail.imgUrl} />
          <Text fontWeight="bold" fontSize="lg">
            {tokenDetail.ticker}
          </Text>
        </HStack>
        <Box d="flex" justifyContent="space-between" flexBasis="45%">
          <VStack spacing="1">
            <Text fontSize="xs" color="gray.400">
              Savings APY
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="green.300">
              {tokenDetail.saveRate.toString()} %
            </Text>
          </VStack>
          <VStack spacing="1">
            <Text fontSize="xs" color="gray.400">
              Borrow APY
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="orange.300">
              {tokenDetail.borrRate.toString()} %
            </Text>
          </VStack>
        </Box>
      </Box>
      <Tabs align="center" colorScheme="twitter">
        <TabList>
          <Tab>Save</Tab>
          <Tab>Borrow</Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="savePanel">
            {interactionInput("Deposit", "Your Wallet", (207.3).toString(), false)}
            {interactionInput("Withdraw", "Available", (1003.57).toString(), true)}
          </TabPanel>
          <TabPanel className="borrowPanel">
            {interactionInput("Borrow", "Available", (1003.57).toString(), false)}
            {interactionInput("Repay", "Your Wallet", (207.3).toString(), true)}
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
        <Button variant="outline" colorScheme="red" d="block" mt="8" mx="auto" w="40">
          CLOSE
        </Button>
      </Container>
    </Container>
  );
}

export default InteractionPanel;
