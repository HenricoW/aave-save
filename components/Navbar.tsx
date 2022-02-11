import { Button, IconButton } from "@chakra-ui/button";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Heading, HStack, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import styles from "../styles/Navbar.module.css";
import { shortAddress } from "../utils/utilFunctions";
import { getContracts, getWeb3 } from "../web3/web3";
import { AppContext, AppDispatchContext } from "./Layout";

function Navbar() {
  const { isUserConnected, userData, web3 } = useContext(AppContext);
  const appDispatch = useContext(AppDispatchContext);

  const [netwName, setNetwName] = useState("");

  const userSignIn = async () => {
    const wallet = await getWeb3();
    const userAddy = await wallet.signer.getAddress();
    const theUserData = { ...userData, address: userAddy };

    appDispatch({ type: "setWeb3", payload: wallet, target: "web3" });

    // contracts
    const netw = await wallet.provider?.getNetwork();
    netw.chainId === 4 || netw.chainId === 42 ? setNetwName(netw.name) : setNetwName("Unsupported Network");

    const contracts = await getContracts(netw.chainId, wallet.provider);
    appDispatch({ type: "setContracts", payload: contracts, target: "contracts" });
    console.log("w3saver Addr: ", contracts.w3Saver.address);

    // account info
    const userAccAddr = await contracts["w3Saver"].getAccAddr(userAddy);
    appDispatch({ type: "signIn", payload: { ...theUserData, appWallet: userAccAddr }, target: "user" });
    window.localStorage.setItem("userData", JSON.stringify({ isUserConnected: true, userAddr: userAddy }));

    console.log("user account address: ", userAccAddr);
    console.log("user addr: ", userAddy);
  };

  useEffect(() => {
    const userData = window.localStorage.getItem("userData") || "";
    const userDataObj = JSON.parse(userData);

    // if (userDataObj?.isUserConnected) userSignIn();

    // rerender pg on Acc change
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accs: string[]) => {
        console.log("account change detected", accs[0]);
        userSignIn();
      });
    }
  }, []);

  // reload on network change
  if (web3.provider && web3.provider.listenerCount("network") < 1) {
    web3.provider.on("network", (newNetw, oldNetw) => {
      console.log("network change detected");
      if (oldNetw) window.location.reload();
    });
  }

  return (
    <Box as="header" py={5} px={6} bg="gray.700">
      <Box as="nav" d="flex" alignItems="center" justifyContent="space-between">
        <HStack spacing="4">
          <Image height="40px" width="40px" src="/aave.7a37d675.svg" />
          <Heading size="md">Web3 Saver</Heading>
        </HStack>
        <HStack spacing={isUserConnected ? "4" : "2"}>
          {isUserConnected ? (
            <>
              <Text
                border="1px"
                borderColor="gray.400"
                p="2"
                borderRadius="md"
                background={(netwName.length > 12 ? "orange" : "green") + ".700"}
              >
                {netwName}
              </Text>
              <HStack spacing="3">
                <Image height="40px" width="40px" className={styles.accountImg} src={userData.blockie} />
                <Text>{shortAddress(userData.address)}</Text>
              </HStack>
            </>
          ) : (
            <Button variant="outline" colorScheme="twitter" onClick={userSignIn}>
              CONNECT
            </Button>
          )}
          {/* <Menu>
            <MenuButton
              aria-label="Main menu"
              as={IconButton}
              icon={<HamburgerIcon />}
              variant="outline"
              colorScheme="twitter"
            >
            </MenuButton>
            <MenuList>
              <MenuItem>Save</MenuItem>
              <MenuItem>Swap</MenuItem>
            </MenuList>
          </Menu> */}
        </HStack>
      </Box>
    </Box>
  );
}

export default Navbar;
