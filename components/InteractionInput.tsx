import React, { useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { NumberInput, NumberInputField } from "@chakra-ui/number-input";
import { Box, HStack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

type InteractionInputProps = {
  title: string;
  helperText: string;
  helperAmount: string;
  topMargin: boolean;
  btnColor: string;
  warnValue: number;
  precision: number;
  btnText: string;
};

function InteractionInput({
  title,
  helperText,
  helperAmount,
  topMargin,
  btnColor,
  warnValue,
  precision,
  btnText,
}: InteractionInputProps) {
  const [inputVal, setInputVal] = useState<string>();
  const [exceedsRange, setExceedsRange] = useState(false);

  const handleChange = (val: string) => {
    setExceedsRange(false);
    let theVal = parseFloat(val);
    if (theVal > warnValue || theVal < 0) setExceedsRange(true);
  };

  return (
    <HStack alignItems="end">
      <FormControl id="withdraw" mt={topMargin ? "8" : "0"}>
        <Box d="flex" alignItems="center" justifyContent="space-between">
          <FormLabel>{title}</FormLabel>
          <Text fontSize="sm" color="gray.500">
            {helperText}: {helperAmount}
          </Text>
        </Box>
        <NumberInput
          value={inputVal}
          onChange={(val) => handleChange(val)}
          precision={precision}
          keepWithinRange={false}
          clampValueOnBlur={false}
          isInvalid={exceedsRange}
          focusBorderColor={exceedsRange ? "red.600" : "blue.500"}
        >
          <NumberInputField />
        </NumberInput>
      </FormControl>
      <Button colorScheme={btnColor} variant="outline">
        {btnText.toUpperCase()}
      </Button>
    </HStack>
  );
}

export default InteractionInput;
