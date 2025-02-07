import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { Button, Flex, Img, Text, Icon } from "@chakra-ui/react";
import {
  useAccount,
  useDisconnect,
} from "wagmi";

export const Header = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <Flex
      h="max-content"
      w="full"
      justify="space-between"
      align="center"
      px="24"
      pt="4"
    >
      <Flex align="center" gap="10">
        <Img src="/images/metamask.svg" boxSize="14" />
        <Text fontSize="xl" fontWeight="bold" color="black">
          MetaMask Connection
        </Text>
      </Flex>
      <Flex align="center" gap="10">
        <Icon as={FaUserAlt} boxSize="5" color="gray.500" />
        <Text color="black" fontWeight="medium">
          {isConnected && `Ethereum Address: ${address}`}
        </Text>
        <Button
          _hover={{ opacity: "80%" }}
          _focus={{
            border: "0.125rem solid white",
            color: "white",
            bgColor: "transparent",
          }}
          _active={{ color: "black" }}
          _focusVisible={{}}
          _focusWithin={{}}
          borderRadius="base"
          bg="black"
          border="0.125rem solid"
          borderColor="transparent"
          color="white"
          px="9"
          h="2.75rem"
          fontSize="md"
          fontWeight="normal"
          textDecoration="none"
          onClick={() => disconnect()}
          isDisabled={!isConnected}
        >
          Disconnect
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
