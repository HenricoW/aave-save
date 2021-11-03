import { Box, Container, Heading, Text } from "@chakra-ui/layout";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/progress";
import Image from "next/image";
import style from "../styles/AccSummary.module.css";
import React from "react";

function AccSummary() {
  return (
    <Container
      className="accountSummary"
      as="section"
      maxW="container.md"
      bg="gray.800"
      border="1px"
      borderColor="gray.600"
      borderRadius="md"
      mx="10"
      mb="5"
      p="4"
    >
      {/* <Heading fontSize="2xl" mb="4" textAlign="center">
        Your Account
      </Heading> */}
      <Box d="flex" flexWrap="wrap" justifyContent="space-around">
        <Box className="accountValues" d="flex" alignItems="center">
          <Image src="/blockie_ex.png" width="70px" height="70px" className={style.blockieImg} />
          <Box d="flex" flexDir="column" pb="2" ml="4">
            <Text maxW="260px" isTruncated>
              0x8ae5071cE61a20B57Cab10c5E97196CC7fFa243A
            </Text>
            <Box d="flex" alignItems="center" justifyContent="space-between" flexGrow={1}>
              <Text fontSize="sm" color="gray.500">
                Total Deposits:
              </Text>
              <Text fontSize="sm" fontWeight="bold">
                $ 1000.00
              </Text>
            </Box>
            <Box d="flex" alignItems="center" justifyContent="space-between" flexGrow={1}>
              <Text fontSize="sm" color="gray.500">
                Total Borrowed:
              </Text>
              <Text fontSize="sm" fontWeight="bold">
                $ 433.48
              </Text>
            </Box>
          </Box>
        </Box>
        <Box className="collGraph" d="flex" flexDir="column" alignItems="center" ml="4">
          <CircularProgress size="95px" thickness="15px" value={43} color="green.500" mb="2">
            <CircularProgressLabel>43%</CircularProgressLabel>
          </CircularProgress>
          <Text fontSize="sm" color="gray.500">
            Collateral Rate
          </Text>
        </Box>
      </Box>
    </Container>
  );
}

export default AccSummary;
