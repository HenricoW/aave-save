import { Stack } from "@chakra-ui/layout";
import type { NextPage } from "next";
import { createContext, useContext, useState } from "react";
import Head from "next/head";
import CoinRateCard from "../components/CoinRateCard";
import AccSummary from "../components/AccSummary";
import InteractionPanel from "../components/InteractionPanel";
import { allTokenData } from "../utils/dummyData";
import Layout, { AppContext } from "../components/Layout";

export const TokenContext = createContext(allTokenData);

const Home: NextPage = () => {
  const [isInteractOpen, setIsInteractOpen] = useState(false);
  const { isUserConnected } = useContext(AppContext);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <TokenContext.Provider value={allTokenData}>
          {isUserConnected ? <AccSummary /> : null}
          {isUserConnected && isInteractOpen ? <InteractionPanel setIsInteractOpen={setIsInteractOpen} /> : null}
        </TokenContext.Provider>
        <Stack as="section" spacing={2} minW="100%">
          {allTokenData.map((tknInfo) => (
            <CoinRateCard
              key={tknInfo.ticker}
              ticker={tknInfo.ticker}
              imgUrl={tknInfo.imgUrl}
              saveRate={tknInfo.saveRate}
              borrRate={tknInfo.borrRate}
              setIsInteractOpen={setIsInteractOpen}
            />
          ))}
        </Stack>
      </Layout>
    </>
  );
};

export default Home;
