import { Input } from "@chakra-ui/input";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React, { FC, useState } from "react";
import { useCreateDateList } from "./useCreateDateList";

type Props = {
  setDateList: React.Dispatch<React.SetStateAction<Date[]>>;
};

export const DateListCreator: FC<Props> = ({ setDateList }) => {
  const [startDate, setStartDate] = useState("");

  const onChange = (e: { target: { value: string } }) => {
    setDateList(useCreateDateList(startDate, e.target.value));
  };

  return (
    <>
      <Box>
        <Text my="30px" ml="10%" pr="10%" color="blackAlpha.800" fontSize="sm">
          ①授業の始まる日、終わる日を選択して下さい
        </Text>
        <Flex m={["0px 10%", "0px 15%"]} align={"center"} h="40px" maxW="700px">
          <Input
            type="date"
            bg="white"
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Text fontSize="38px" h="40px" mb="24px" color="blackAlpha.700">
            ~
          </Text>
          <Input type="date" bg="white" onChange={onChange} />
        </Flex>
      </Box>
    </>
  );
};
