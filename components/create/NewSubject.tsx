import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
import styled from "styled-components";
import { NewSubjectType } from "../../lib/types";

type Props = {
  subject: NewSubjectType;
  deleteSubject: any;
};

const NewSubject: React.FC<Props> = (props) => {
  const { name, period, day } = props.subject.newSubject;
  const { deleteSubject } = props;
  return (
    <>
      <Flex
        w="300px"
        m="10px 0"
        borderRadius="10px"
        bg="red.50"
        ml={["10%", "15%", "20%", "26%"]}
      >
        <Sitem>{day}</Sitem>
        <Sitem>{period}</Sitem>
        <Sitem>{name}</Sitem>
        <Sbutton onClick={deleteSubject}>×</Sbutton>
      </Flex>
    </>
  );
};

export default NewSubject;

const Sitem = styled.div`
  font-size: 18px;
  padding: 10px 0;
  margin-left: 20px;
  color: #444444;
`;
const Sbutton = styled(Sitem)`
  font-size: 150%;
  display: inline;
  padding: 0;
  margin: auto 10px 10px auto;

  &:hover {
    cursor: pointer;
    color: orange;
  }
`;
