import {
    Box,
    Button,
    Flex,
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
    Textarea
  } from "@chakra-ui/react";
  import React, { useState } from "react";
import { SubjectType } from "../../lib/types";

  
  export const SelectBtn: React.FC<SubjectType>  = (props)=> {
    const [state, setState] = useState("white");
    const [memo, setMemo] = useState("");
  
    let WordColor = "black.500";
    if (state !== "white") {
      WordColor = "white";
    }
  
    let borderColor = "gray";
    if (memo) {
      borderColor = "yellow.400";
    }
  
    return (
      <Flex flexDirection="column">
      <Box color="gray" textAlign="center">
        {props.period + "時限"}
      </Box>
      <Box mr={2}>
        <Popover placement="bottom" closeOnBlur={true}>
          <PopoverTrigger>
            <Button
              bg={state}
              w="100%"
              color={WordColor}
              boxShadow="lg"
              border="double"
              borderColor={borderColor}
              _hover={{ opacity: 0.6 }}
              _active={{ opacity: 0.4 }}
            >
              {props.name}
            </Button>
          </PopoverTrigger>
  
          <PopoverContent color="gray" borderColor="blue.800">
            <PopoverHeader pt={4} fontWeight="bold" border="0">
              <RadioGroup defaultValue="3">
                <Stack spacing={5} direction="row">
                    <Radio colorScheme="red" value="1" onChange={() => setState("#d95759")}>
                      途中
                    </Radio>
                    <Radio colorScheme="green" value="2" onChange={() => setState("#59d957")}>
                      提出済み
                    </Radio>
                    <Radio colorScheme="gray" value="3" onChange={() => setState("gray")}>
                      無し
                    </Radio>
                </Stack>
              </RadioGroup>
            </PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
  
            <PopoverBody>
              <Textarea
                isInvalid
                placeholder="メモを追加"
                onChange={(e) => setMemo(e.target.value)}
              />
            </PopoverBody>
  
            <PopoverFooter border="0" d="flex" justifyContent="flex-end" pb={4}>
              <Button size="sm" colorScheme="blue">
                Save
              </Button>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </Box>
      </Flex>
    );
  }
  