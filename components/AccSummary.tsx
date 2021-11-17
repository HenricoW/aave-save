import { Box, Container, Text } from "@chakra-ui/layout";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/progress";
import Image from "next/image";
import style from "../styles/AccSummary.module.css";
import React, { useContext, useEffect } from "react";
import { AppContext, AppDispatchContext } from "./Layout";
import { getWalletBalances } from "../utils/utilFunctions";

function AccSummary() {
  const { userData, userAmounts, isUserConnected, contracts } = useContext(AppContext);
  const appDispatch = useContext(AppDispatchContext);

  useEffect(() => {
    if (contracts) {
      (async () => {
        const payload = await getWalletBalances(userData.address, contracts);
        appDispatch({ type: "setWalletAmts", payload, target: "user" });
      })();
    }
  }, [contracts]);

  const { totalDeposits, totalLoaned } = userAmounts;
  const userCollateral = (totalLoaned / totalDeposits) * 100;

  return (
    <>
      {isUserConnected ? (
        <Container
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
          <Box d="flex" flexWrap="wrap" justifyContent="space-around">
            <Box className="accountValues" d="flex" alignItems="center">
              <Image src={userData.blockie} width="70px" height="70px" className={style.blockieImg} />
              <Box d="flex" flexDir="column" pb="2" ml="4">
                <Text maxW="260px" isTruncated>
                  {userData.address}
                </Text>
                <Box d="flex" alignItems="center" justifyContent="space-between" flexGrow={1}>
                  <Text fontSize="sm" color="gray.500">
                    Total Deposits:
                  </Text>
                  <Text fontSize="sm" fontWeight="bold">
                    $ {totalDeposits.toFixed(2)}
                  </Text>
                </Box>
                <Box d="flex" alignItems="center" justifyContent="space-between" flexGrow={1}>
                  <Text fontSize="sm" color="gray.500">
                    Total Borrowed:
                  </Text>
                  <Text fontSize="sm" fontWeight="bold">
                    $ {totalLoaned.toFixed(2)}
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box className="collGraph" d="flex" flexDir="column" alignItems="center" ml="4">
              <CircularProgress size="95px" thickness="15px" value={userCollateral} color="green.400" mb="2">
                <CircularProgressLabel>{userCollateral.toFixed(0)}%</CircularProgressLabel>
              </CircularProgress>
              <Text fontSize="sm" color="gray.500">
                Collateral Rate
              </Text>
            </Box>
          </Box>
        </Container>
      ) : null}
    </>
  );
}

export default AccSummary;
