import { Box, HStack, Text, VStack } from "@chakra-ui/layout";
import Image from "next/image";

export type CoinRateCardProps = {
  ticker: string;
  imgUrl: string;
  saveRate: number;
  borrRate: number;
};

function CoinRateCard({ ticker, imgUrl, saveRate, borrRate }: CoinRateCardProps) {
  return (
    <Box
      as="a"
      bg="gray.700"
      d="flex"
      justifyContent="space-between"
      py={2}
      px={8}
      border="1px"
      borderColor="gray.600"
      _hover={{
        background: "gray.600",
        cursor: "pointer",
      }}
    >
      <HStack spacing="3">
        <Image height="40px" width="40px" src={imgUrl} />
        <Text fontWeight="bold" fontSize="lg">
          {ticker}
        </Text>
      </HStack>
      <Box d="flex" justifyContent="space-between" flexBasis="40%">
        <VStack spacing="1">
          <Text fontSize="xs" color="gray.400">
            Savings APY
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            {saveRate.toString()} %
          </Text>
        </VStack>
        <VStack spacing="1">
          <Text fontSize="xs" color="gray.400">
            Borrow APY
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            {borrRate.toString()} %
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}

export default CoinRateCard;
