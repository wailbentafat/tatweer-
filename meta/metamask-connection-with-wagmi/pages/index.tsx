/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChakraProvider } from "@chakra-ui/react";
import { useAccount, useConnect } from "wagmi";
import { Button, Flex, Img, Text } from "@chakra-ui/react";
import { Header } from "@/components";

export default function Home() {
  const router = useRouter();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      router.push("/home"); 
    }
  }, [isConnected, router]);

  return (
    <ChakraProvider>
      <Head>
        <title>wsslni</title>
      
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex bg="white" h="100vh" direction="column" justify="center">
        <Flex align="center" justify="space-around">
          <Flex w="full" top="0" position="absolute">
            <Header />
          </Flex>
          <Flex maxW="50rem" direction="column" px="24">
            <Text
              fontSize="5xl"
              color="purple.800"
              fontWeight="bold"
              lineHeight="3.328rem"
            >
             ai platform for focusiing on supply chain with blockchain
            </Text>
            <Text fontSize="md" color="purple.600" lineHeight="1.21rem" py="10">
             platform is succed platform 
            </Text>
            {connectors.map((connector, index) => (
              <Button
                key={+index}
                bgGradient="linear(to-r, purple.200, purple.600)"
                w="full"
                _hover={{ bgGradient: "linear(to-r, purple.300, purple.700)" }}
                _active={{ bgGradient: "linear(to-r, purple.400, purple.800)" }}
                _focus={{ boxShadow: "outline" }}
                h="2.75rem"
                position="relative"
                borderRadius="base"
                color="white"
                fontWeight="medium"
                fontSize="md"
                px="12"
                onClick={() => connect({ connector })}
                isDisabled={isConnected}
              >
                {isConnected ? "Already connected" : "Connect to wsslni"}
              </Button>
            ))}
          </Flex>
          <Flex minW="30rem">
           
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
