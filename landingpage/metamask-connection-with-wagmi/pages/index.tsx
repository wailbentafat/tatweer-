/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChakraProvider } from "@chakra-ui/react";
import { useAccount, useConnect } from "wagmi";
import { Button, Flex, Img, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { Header } from "@/components";
import { motion, AnimationProps } from "framer-motion";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

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
        <title>Raqeeb</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex 
        bg="linear-gradient(135deg, #f6f8ff 0%, #ffffff 100%)"
        h="100vh" 
        direction="column" 
        justify="center"
        position="relative"
        overflow="hidden"
      >
        <Flex align="center" justify="space-around">
          <Flex w="full" top="0" position="absolute">
            <Header />
          </Flex>
          <Flex 
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 } as any}
            maxW="50rem" 
            direction="column" 
            px="24"
          >
            <Text
              fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
              color="purple.800"
              fontWeight="bold"
              lineHeight="1.2"
              as={motion.h1}
              animation={`${fadeIn} 1s ease-out`}
            >
              Revolutionizing Supply Chain with Blockchain & AI
            </Text>
            <Text 
              fontSize="xl"
              color="purple.600"
              lineHeight="1.6"
              py="10"
              as={motion.p}
              animation={`${fadeIn} 1s ease-out 0.3s`}
            >
              Raqeeb is an innovative platform that combines the power of artificial intelligence 
              and blockchain technology to bring transparency, efficiency, and trust to supply chain management.
            </Text>
            {connectors.map((connector, index) => (
              <Button
                key={+index}
                bgGradient="linear(to-r, purple.400, purple.800)"
                w="full"
                _hover={{ 
                  bgGradient: "linear(to-r, purple.500, purple.900)",
                  transform: "translateY(-2px)",
                  boxShadow: "xl"
                }}
                _active={{ 
                  bgGradient: "linear(to-r, purple.600, purple.900)",
                  transform: "translateY(0)"
                }}
                _focus={{ boxShadow: "outline" }}
                h="3.5rem"
                position="relative"
                borderRadius="lg"
                color="white"
                fontWeight="bold"
                fontSize="lg"
                px="12"
                onClick={() => connect({ connector })}
                isDisabled={isConnected}
                transition="all 0.3s ease"
                as={motion.button}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isConnected ? "Already connected" : "Connect to Raqeeb"}
              </Button>
            ))}
          </Flex>
          <Flex 
            minW="30rem"
            as={motion.div}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 } as any}
          >
            <Img 
              src="/supply-chain-illustration.svg" 
              alt="Supply Chain Illustration"
              w="full"
              h="auto"
            />
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
