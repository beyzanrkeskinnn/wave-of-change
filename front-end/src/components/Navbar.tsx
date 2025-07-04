"use client";

import { Box, Container, Flex, Link } from "@chakra-ui/react";
import { isDevnetEnvironment } from "@/lib/contract-utils";
import { useDevnetWallet } from "@/lib/devnet-wallet-context";
import { DevnetWalletButton } from "./DevnetWalletButton";
import { ConnectWalletButton } from "./ConnectWallet";

export const Navbar = () => {
  const { currentWallet, wallets, setCurrentWallet } = useDevnetWallet();

  return (
    <Box as="nav" bg="rgba(255, 255, 255, 0.9)" backdropFilter="blur(10px)" boxShadow="0 4px 20px rgba(0, 119, 190, 0.1)" position="sticky" top="0" zIndex="1000">
      <Container maxW="container.xl">
        <Flex justify="space-between" h={16} align="center">
          <Flex align="center">
            <Flex
              bg="ocean.500"
              color="white"
              borderRadius="full"
              w="52px"
              h="52px"
              justify="center"
              align="center"
              fontSize="2xl"
              fontWeight="bold"
              shrink="0"
              boxShadow="0 4px 12px rgba(0, 119, 190, 0.3)"
              className="floating-element"
            >
              🌊
            </Flex>
            <Link href="/" textDecoration="none">
              <Box fontSize="lg" fontWeight="bold" color="ocean.700" ml={4}>
                OceanSave
              </Box>
            </Link>
          </Flex>
          <Flex align="center" gap={4}>
            {isDevnetEnvironment() ? (
              <DevnetWalletButton
                currentWallet={currentWallet}
                wallets={wallets}
                onWalletSelect={setCurrentWallet}
              />
            ) : (
              <ConnectWalletButton />
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
