import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { SubjectProps } from "../lib/types";

const Subject: React.FC<SubjectProps> = (props) => {
  return (
    <>
      <Popover placement="bottom" closeOnBlur={true}>
        <PopoverTrigger>
          <Button backgroundColor="red">{props.subject}</Button>
        </PopoverTrigger>
        <PopoverContent color="gray" borderColor="blue.800">
          <PopoverHeader pt={4} fontWeight="bold" border="0">
            <RadioGroup defaultValue="3">
              <Stack spacing={5} direction="row">
                <Radio colorScheme="yellow" value="1">
                  途中
                </Radio>
                <Radio colorScheme="green" value="2">
                  提出済み
                </Radio>
                <Radio colorScheme="gray" value="3">
                  無し
                </Radio>
              </Stack>
            </RadioGroup>
          </PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Textarea placeholder={props.memo || "メモを追加"} />
          </PopoverBody>
          <PopoverFooter border="0" d="flex" justifyContent="flex-end" pb={4}>
            <Button size="sm" colorScheme="blue">
              Save
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default Subject;
