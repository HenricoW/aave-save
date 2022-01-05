import { Dispatch, useContext, useEffect, useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Box, HStack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { getInputConfig, inputDispatchConfig } from "../utils/dummyData";
import NumInput from "./NumInput";
import { AppContext } from "./Layout";

type PanelInputGroupProps = {
  panelType: string;
  fieldsDispatch: Dispatch<{
    type: string;
    payload: number;
    origTotals: {
      totalDeposits: number;
      totalLoaned: number;
    };
  }>;
  onFormSubmit: (fieldAction: string, value: number) => Promise<void>;
};

type fieldAmtType = {
  [pos: string]: string;
};

const btnText = "submit";

function PanelInputGroup({ panelType, fieldsDispatch, onFormSubmit }: PanelInputGroupProps) {
  const [fieldAmt, setFieldAmt] = useState<fieldAmtType>({ top: "0", bottom: "0" });
  const [topOutOfRange, setTopOutOfRange] = useState(false);
  const [bottomOutOfRange, setBottomOutOfRange] = useState(false);

  const { selectedToken, userAmounts } = useContext(AppContext);
  const { price, displayDecimals } = selectedToken;
  const { totalDeposits, totalLoaned } = userAmounts;

  useEffect(() => {
    setFieldAmt({ top: "0", bottom: "0" });
  }, []);

  const fieldConfig = getInputConfig({ panelType, userAmounts, decimals: displayDecimals, price });

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

    // two way binding
    setFieldAmt({ ...fieldAmt, [pos]: val });

    // validation feedback
    const limitAmount = fieldConfig[pos].helperAmount;
    if (theVal > parseFloat(limitAmount) || theVal < 0) {
      selektah[pos](true);
    } else {
      selektah[pos](false);
    }

    if (panelType !== "fundingPanel") {
      const action = {
        type: inputDispatchConfig[panelType][pos],
        payload: theVal * price,
        origTotals: { totalDeposits, totalLoaned },
      };
      fieldsDispatch(action);
    }
  };

  // input field labels
  const inputLabels = (pos: "top" | "bottom") => {
    return (
      <Box d="flex" alignItems="center" justifyContent="space-between">
        <FormLabel>{fieldConfig[pos].title}</FormLabel>
        <Text fontSize="sm" color="gray.500">
          {fieldConfig[pos].helperText}: {fieldConfig[pos].helperAmount + " " + selectedToken.ticker}
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
            precision={displayDecimals}
            outOfRange={topOutOfRange}
          />
        </FormControl>
        <Button
          colorScheme={fieldConfig.btnColor}
          variant="outline"
          onClick={() => onFormSubmit(fieldConfig.top.ethRequest, +fieldAmt.top)}
        >
          {btnText.toUpperCase()}
        </Button>
      </HStack>
      <HStack alignItems="end">
        <FormControl id={panelType + "-bottom"} mt="6">
          {inputLabels("bottom")}
          <NumInput
            value={fieldAmt.bottom}
            onChange={(val) => handleChange(val, "bottom")}
            precision={displayDecimals}
            outOfRange={bottomOutOfRange}
          />
        </FormControl>
        <Button
          colorScheme={fieldConfig.btnColor}
          variant="outline"
          onClick={() => onFormSubmit(fieldConfig.bottom.ethRequest, +fieldAmt.bottom)}
        >
          {btnText.toUpperCase()}
        </Button>
      </HStack>
    </>
  );
}

export default PanelInputGroup;
