import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { NumberInput, NumberInputField } from "@chakra-ui/number-input";
import { Button } from "@chakra-ui/button";
import { Progress } from "@chakra-ui/progress";
import React from "react";
import { Box, Container, HStack, Text } from "@chakra-ui/layout";

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
      <Container maxW="container.md" pt="2">
        <Box d="flex" alignItems="center" justifyContent="space-between">
          <Text py="3" color="gray.500">
            Updated Collateral:
          </Text>
          <Text py="3" fontWeight="bold">
            68 %
          </Text>
        </Box>
        <Progress colorScheme="green" size="lg" value={68} />
      </Container>
    </Container>
  );
}

export default InteractionPanel;
