import { Stack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { TokenContext } from "../pages";
import CoinRateCard from "./CoinRateCard";

export type TokenBarsPropsType = {
  setIsInteractOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function TokenBars({ setIsInteractOpen }: TokenBarsPropsType) {
  const tokenData = useContext(TokenContext);

  return (
    <Stack as="section" spacing={2} minW="100%">
      {tokenData.map((tknInfo) => (
        <CoinRateCard key={tknInfo.ticker} tokenDetail={tknInfo} setIsInteractOpen={setIsInteractOpen} />
      ))}
    </Stack>
  );
}

export default TokenBars;
