import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { Button, Flex, Text, Icon } from "@chakra-ui/react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

export const Header = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });
  const { disconnect } = useDisconnect();

  const handleConnection = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <Flex
      bg="linear-gradient(to-r, #f6f8ff, #C39BD3)"
      h="max-content"
      w="full"
      justify="space-between"
      align="center"
      px="8"
      py="4"
      shadow="md"
    >
      <Text fontSize="2xl" fontWeight="bold">
        Raqeeb
      </Text>
      <Flex align="center" gap="6">
        {isConnected && (
          <Text color="black" fontWeight="medium" mr="4">
            Ethereum Address: {address}
          </Text>
        )}
        <Button
          _hover={{ opacity: "0.8" }}
          _focus={{
            border: "0.125rem solid white",
            color: "white",
            bgColor: "transparent",
          }}
          _active={{ color: "black" }}
          borderRadius="base"
          bg="black"
          color="white"
          px="6"
          py="2"
          fontSize="md"
          fontWeight="normal"
          onClick={handleConnection}
        >
          {isConnected ? "Disconnect" : "Connect"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;


