import { Button, IconButton } from "@chakra-ui/button";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Heading, HStack, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { appState, userData } from "../utils/dummyData";
import { shortAddress } from "../utils/utilFunctions";

function Navbar() {
  return (
    <Box as="header" py={5} px={6} bg="gray.700">
      <Box as="nav" d="flex" alignItems="center" justifyContent="space-between">
        <HStack spacing="4">
          <Image height="40px" width="40px" src="/aave.7a37d675.svg" />
          <Heading size="md">Web3 Saver</Heading>
        </HStack>
        <HStack spacing={appState.isUserConnected ? "4" : "2"}>
          {appState.isUserConnected ? (
            <HStack spacing="3">
              <Image height="40px" width="40px" className={styles.accountImg} src={userData.blockie} />
              <Text>{shortAddress(userData.address)}</Text>
            </HStack>
          ) : (
            <Button variant="outline" colorScheme="twitter">
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
