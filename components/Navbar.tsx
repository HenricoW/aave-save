import { Button, IconButton } from "@chakra-ui/button";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Heading, HStack, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import Image from "next/image";
import { useContext } from "react";
import styles from "../styles/Navbar.module.css";
import { shortAddress, getUserWalletAmounts } from "../utils/utilFunctions";
// import { getUserBorrowedAmounts, getUserDepositAmounts } from "../utils/utilFunctions";
import { getWeb3 } from "../web3/web3";
import { AppContext, AppDispatchContext } from "./Layout";

function Navbar() {
  const { isUserConnected, userData } = useContext(AppContext);
  const appDispatch = useContext(AppDispatchContext);

  const userSignIn = async () => {
    const wallet = await getWeb3();
    const theUserData = { ...userData, address: await wallet.signer.getAddress() };

    // getUserWalletAmounts();
    // getUserDepositAmounts();
    // getUserBorrowedAmounts();

    // commit objects to state
    appDispatch({ type: "signIn", payload: theUserData, target: "user" });
    appDispatch({ type: "setWeb3", payload: wallet, target: "web3" });
  };

  return (
    <Box as="header" py={5} px={6} bg="gray.700">
      <Box as="nav" d="flex" alignItems="center" justifyContent="space-between">
        <HStack spacing="4">
          <Image height="40px" width="40px" src="/aave.7a37d675.svg" />
          <Heading size="md">Web3 Saver</Heading>
        </HStack>
        <HStack spacing={isUserConnected ? "4" : "2"}>
          {isUserConnected ? (
            <HStack spacing="3">
              <Image height="40px" width="40px" className={styles.accountImg} src={userData.blockie} />
              <Text>{shortAddress(userData.address)}</Text>
            </HStack>
          ) : (
            <Button variant="outline" colorScheme="twitter" onClick={userSignIn}>
              CONNECT
            </Button>
          )}
          <Menu>
            <MenuButton
              aria-label="Main menu"
              as={IconButton}
              icon={<HamburgerIcon />}
              variant="outline"
              colorScheme="twitter"
            >
              {/* MENU */}
            </MenuButton>
            <MenuList>
              <MenuItem>Save</MenuItem>
              <MenuItem>Swap</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Box>
    </Box>
  );
}

export default Navbar;
