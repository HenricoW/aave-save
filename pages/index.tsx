import { Stack } from "@chakra-ui/layout";
import type { NextPage } from "next";
import React, { createContext, useReducer, useState } from "react";
import Head from "next/head";
import CoinRateCard from "../components/CoinRateCard";
import AccSummary from "../components/AccSummary";
import InteractionPanel from "../components/InteractionPanel";
import { allTokenData } from "../utils/dummyData";
import Layout from "../components/Layout";
import { tokenDataReducer } from "../store/reducers/Reducers";
import TokenBars from "../components/TokenBars";

// app state independent of user action
export const TokenContext = createContext(allTokenData);
export const TokenDispatchContext = createContext<React.Dispatch<{ type: string; payload: number[] }>>(() => {});

const Home: NextPage = () => {
  const [isInteractOpen, setIsInteractOpen] = useState(false);
  const [tokenData, tokenDataDispatch] = useReducer(tokenDataReducer, allTokenData);

  return (
    <>
      <Head>
        <title>Crypto Saver</title>
        <meta name="description" content="Earn interest on your crypto assets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <TokenContext.Provider value={tokenData}>
          <TokenDispatchContext.Provider value={tokenDataDispatch}>
            <AccSummary />
            {isInteractOpen ? <InteractionPanel setIsInteractOpen={setIsInteractOpen} /> : null}
          </TokenDispatchContext.Provider>
          <TokenBars setIsInteractOpen={setIsInteractOpen} />
        </TokenContext.Provider>
      </Layout>
    </>
  );
};

export default Home;
