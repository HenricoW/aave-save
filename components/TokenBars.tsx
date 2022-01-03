import { Stack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { TokenContext } from "../pages";
import CoinRateCard from "./CoinRateCard";
import { AppContext } from "./Layout";

export type TokenBarsPropsType = {
  setIsInteractOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function TokenBars({ setIsInteractOpen }: TokenBarsPropsType) {
  const tokenData = useContext(TokenContext);

  const { userData } = useContext(AppContext); // hack to get tokenData up to date :( -dispatch in [AccSummary.tsx] not triggering update in this comp's data

  return (
    <Stack as="section" spacing={2} minW="100%">
      {tokenData.map((tknInfo) => (
        <CoinRateCard key={tknInfo.ticker} tokenDetail={tknInfo} setIsInteractOpen={setIsInteractOpen} />
      ))}
    </Stack>
  );
}

export default TokenBars;
