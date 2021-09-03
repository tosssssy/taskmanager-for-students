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
import { useState } from "react";
import { SubjectProps, UpdateSubjectTypes } from "../lib/types";

const Subject: React.FC<SubjectProps> = (props) => {
  const [status, setStatus] = useState(props.status || 0);
  const [memo, setMemo] = useState(props.memo || "");

  const updateSubject = async () => {
    try {
      const body: UpdateSubjectTypes = {
        updateData: {
          id: props.id,
          status: status,
          memo: memo,
        },
      };

      const result = await fetch("http://localhost:3000/api/update/subject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Popover placement="bottom" closeOnBlur={true}>
        <PopoverTrigger>
          <Button backgroundColor="red" w={"140px"}>
            {props.name}
          </Button>
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
            <Textarea
              placeholder={props.memo || "メモを追加"}
              onChange={(e) => setMemo(e.target.value)}
            />
          </PopoverBody>
          <PopoverFooter border="0" d="flex" justifyContent="flex-end" pb={4}>
            <Button size="sm" colorScheme="blue" onClick={updateSubject}>
              Save
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default Subject;
