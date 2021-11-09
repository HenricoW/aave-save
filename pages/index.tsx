import { Stack } from "@chakra-ui/layout";
import type { NextPage } from "next";
import { createContext, useContext, useState } from "react";
import Head from "next/head";
import CoinRateCard from "../components/CoinRateCard";
import AccSummary from "../components/AccSummary";
import InteractionPanel from "../components/InteractionPanel";
import { allTokenData } from "../utils/dummyData";
import Layout, { AppContext } from "../components/Layout";

// app state independent of user action
export const TokenContext = createContext(allTokenData);

const Home: NextPage = () => {
  const [isInteractOpen, setIsInteractOpen] = useState(false);
  const { isUserConnected } = useContext(AppContext);

  return (
    <>
      <Head>
        <title>Crypto Saver</title>
        <meta name="description" content="Earn interest on your crypto assets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <TokenContext.Provider value={allTokenData}>
          {isUserConnected ? <AccSummary /> : null}
          {isUserConnected && isInteractOpen ? <InteractionPanel setIsInteractOpen={setIsInteractOpen} /> : null}
        </TokenContext.Provider>
        <Stack as="section" spacing={2} minW="100%">
          {allTokenData.map((tknInfo) => (
            <CoinRateCard key={tknInfo.ticker} tokenDetail={tknInfo} setIsInteractOpen={setIsInteractOpen} />
          ))}
        </Stack>
      </Layout>
    </>
  );
};

export default Home;
