import { Dispatch, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";
import { ChevronDownIcon, AddIcon, CheckIcon } from "@chakra-ui/icons";
import { Box, Flex, Button, Input, Text, Select } from "@chakra-ui/react";

type Props = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  period: number;
  setPeriod: Dispatch<SetStateAction<number>>;
  day: string;
  setDay: Dispatch<SetStateAction<string>>;
  addSubject: any;
};

const InputSubjectInfo = (props: Props) => {
  const { name, setName, period, setPeriod, day, setDay, addSubject } = props;
  return (
    <>
      <Text
        mt="30px"
        mb="25px"
        ml="10%"
        pr="10%"
        color="blackAlpha.800"
        fontSize="sm"
      >
        ②授業の曜日、時限を選択し、教科名を入力して下さい
      </Text>

      <Flex m={["0px 10%", "0px 15%", "0px 20%", "0px 26%"]} maxW="700px">
        <Select
          placeholder="曜日"
          bg="white"
          w="80px"
          onChange={(e) => setDay(e.target.value)}
        >
          <option value="Sun">日</option>
          <option value="Mon">月</option>
          <option value="Tue">火</option>
          <option value="Wed">水</option>
          <option value="Thu">木</option>
          <option value="Fri">金</option>
          <option value="Sat">土</option>
        </Select>
        <Select
          placeholder="時限"
          bg="white"
          w="80px"
          onChange={(e) => setPeriod(Number(e.target.value))}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </Select>
        <Input
          placeholder="例）数学"
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          w="80px"
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

export default InputSubjectInfo;
