import { ethers, Signer } from "ethers";
import React, { createContext, useContext } from "react";
import { userAccABI } from "../utils/ABIs";
import { getUserDepositAmounts, getWalletBalances, toWei } from "../utils/utilFunctions";
import { AppContext, AppDispatchContext } from "./Layout";

export const PanelInputCtxt = createContext<(fieldAction: string, value: number) => Promise<void>>(async () => {});

function ContractActions({ children }: { children: React.ReactNode }) {
  const { selectedToken, userData, web3, contracts } = useContext(AppContext);
  const appDispatch = useContext(AppDispatchContext);

  const accContr = new ethers.Contract(userData.appWallet, userAccABI, web3?.signer as Signer);

  const updateVals = async () => {
    if (contracts) {
      const payload = await getWalletBalances(userData.address, contracts);
      const payload2 = await getUserDepositAmounts(userData.appWallet, contracts);
      appDispatch({ type: "setWalletAmts", payload, target: "user" }); // trigger app-wide reload
      appDispatch({ type: "setAccAmts", payload: payload2, target: "user" });
    }
  };

  const onFormSubmit = async (fieldAction: string, value: number) => {
    const tckr = selectedToken.ticker;
    if (contracts) {
      const tknAddr = contracts[tckr].address;
      const cTknAddr = contracts[`c${tckr}`].address;
      const val = tckr === "wBTC" ? toWei(value, 8) : toWei(value);

      console.log("field action: ", fieldAction);

      switch (fieldAction) {
        case "fundAccount":
          await (await contracts[tckr].connect(web3?.signer as Signer).approve(accContr.address, val)).wait();
          await (await accContr.fundAccount(tknAddr, val, { gasLimit: 80_000 })).wait();
          break;
        case "drawDown":
          await (await accContr.drawDown(tknAddr, val, { gasLimit: 180_000 })).wait();
          break;
        case "deposit":
          await (await accContr.deposit(cTknAddr, val)).wait();
          break;
        case "withdraw":
          await (await accContr.withdraw(cTknAddr, val, { gasLimit: 280_000 })).wait();
          break;
        case "borrow":
          await (await accContr.borrow(cTknAddr, val, { gasLimit: 380_000 })).wait();
          break;
        case "repay":
          await (await accContr.repay(cTknAddr, val)).wait();
          break;
        default:
          return;
      }
      console.log("Updating values");
      await updateVals();
    }
  };

  return (
    <>
      <PanelInputCtxt.Provider value={onFormSubmit}>{children}</PanelInputCtxt.Provider>
    </>
  );
}

export default ContractActions;
