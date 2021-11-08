import { Dispatch, useContext, useEffect, useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Box, HStack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { userTokenAmountsContext } from "./InteractionPanel";
import { getInputConfig, getTokenData, inputDispatchConfig } from "../utils/dummyData";
import NumInput from "./NumInput";
import { AppContext } from "./Layout";

type InteractionInputProps = {
  panelType: string;
  fieldsDispatch: Dispatch<{
    type: string;
    payload: number;
  }>;
};

type fieldAmtType = {
  [pos: string]: string;
};

const btnText = "submit";

function InteractionInput({ panelType, fieldsDispatch }: InteractionInputProps) {
  const [fieldAmt, setFieldAmt] = useState<fieldAmtType>({ top: "0", bottom: "0" });
  const [topOutOfRange, setTopOutOfRange] = useState(false);
  const [bottomOutOfRange, setBottomOutOfRange] = useState(false);

  const { walletAmount, depositAmount, borrowedAmount, decimals, totalDeposits, totalLoaned } =
    useContext(userTokenAmountsContext);
  const { selectedToken } = useContext(AppContext);
  const { price } = getTokenData(selectedToken);

  useEffect(() => {
    setFieldAmt({ top: "0", bottom: "0" });
  }, []);

  const configArgs = { panelType, totalDeposits, totalLoaned, decimals, price };
  const fieldConfig = getInputConfig({ ...configArgs, walletAmount, depositAmount, borrowedAmount });

  // input change handler
  const handleChange = (val: string, pos: "top" | "bottom") => {
    if (val === "") return;
    const theVal = parseFloat(val);
    const selektah: {
      [pos: string]: (arg: boolean) => void;
    } = {
      top: (arg) => setTopOutOfRange(arg),
      bottom: (arg) => setBottomOutOfRange(arg),
    };

    setFieldAmt({ ...fieldAmt, [pos]: val });

    // validation feedback
    const limitAmount = fieldConfig[pos].helperAmount;
    if (theVal > parseFloat(limitAmount) || theVal < 0) {
      selektah[pos](true);
    } else {
      selektah[pos](false);
    }

    const action = { type: inputDispatchConfig[panelType][pos], payload: theVal * price };
    fieldsDispatch(action);
  };

  // input field labels
  const inputLabels = (pos: "top" | "bottom") => {
    return (
      <Box d="flex" alignItems="center" justifyContent="space-between">
        <FormLabel>{fieldConfig[pos].title}</FormLabel>
        <Text fontSize="sm" color="gray.500">
          {fieldConfig[pos].helperText}: {fieldConfig[pos].helperAmount}
        </Text>
      </Box>
    );
  };

  return (
    <>
      <HStack alignItems="end">
        <FormControl id={panelType + "-top"} mt="0">
          {inputLabels("top")}
          <NumInput
            value={fieldAmt.top}
            onChange={(val) => handleChange(val, "top")}
            precision={decimals}
            outOfRange={topOutOfRange}
          />
        </FormControl>
        <Button colorScheme={fieldConfig.btnColor} variant="outline">
          {btnText.toUpperCase()}
        </Button>
      </HStack>
      <HStack alignItems="end">
        <FormControl id={panelType + "-bottom"} mt="6">
          {inputLabels("bottom")}
          <NumInput
            value={fieldAmt.bottom}
            onChange={(val) => handleChange(val, "bottom")}
            precision={decimals}
            outOfRange={bottomOutOfRange}
          />
        </FormControl>
        <Button colorScheme={fieldConfig.btnColor} variant="outline">
          {btnText.toUpperCase()}
        </Button>
      </HStack>
    </>
  );
}

export default InteractionInput;
