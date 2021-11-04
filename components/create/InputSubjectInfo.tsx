import { Dispatch, FC, SetStateAction } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Flex, Button, Input, Text, chakra } from "@chakra-ui/react";

type Props = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  period: number;
  setPeriod: Dispatch<SetStateAction<number>>;
  day: string;
  setDay: Dispatch<SetStateAction<string>>;
  addSubject: any;
};

export const InputSubjectInfo: FC<Props> = ({
  name,
  setName,
  period,
  setPeriod,
  day,
  setDay,
  addSubject,
}) => {
  return (
    <>
      <Text my="30px" ml="10%" pr="10%" color="blackAlpha.800" fontSize="sm">
        ②授業の曜日、時限を選択し、教科名を入力して下さい
      </Text>

      <Flex m={["0px 10%", "0px 15%"]} maxW="700px">
        <chakra.select
          minW="50px"
          border="rgb(226,232,240) 2px solid"
          _focus={{
            border: "rgb(130,179,225) 2px solid",
          }}
          borderRadius="5px"
          onChange={(e) => setDay(e.target.value)}
        >
          <option value="Sun">日</option>
          <option value="Mon">月</option>
          <option value="Tue">火</option>
          <option value="Wed">水</option>
          <option value="Thu">木</option>
          <option value="Fri">金</option>
          <option value="Sat">土</option>
        </chakra.select>
        <chakra.select
          minW="50px"
          border="rgb(226,232,240) 2px solid"
          _focus={{
            border: "rgb(130,179,225) 2px solid",
          }}
          borderRadius="5px"
          onChange={(e) => setPeriod(Number(e.target.value))}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </chakra.select>
        <Input
          placeholder="例）数学"
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          minW="70px"
          rightIcon={<AddIcon />}
          colorScheme="blue"
          variant="outline"
          _hover={{ bg: "blue.500", color: "white" }}
          onClick={addSubject}
          disabled={!name || !period || !day}
        >
          追加
        </Button>
      </Flex>
    </>
  );
};
