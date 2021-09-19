import React, { FC, useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import SubjectCreator from "./../components/create/SubjectCreator";
import { DateListCreator } from "../components/create/DateListCreator";
import { useCreateNewSchedule } from "./../components/create/useCreateNewSchedule";
import { NewSubjectType } from "../lib/types";
import { Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

const CreateNewScheduler: FC = (props) => {
  const [newSubjects, setNewSubjects] = useState<Array<NewSubjectType>>([]);
  const [dateList, setDateList] = useState<Array<Date>>([]);

  // ユーザーの全データを削除してから新規作成
  const createNewSchedule = async () => {
    try {
      await fetch("api/delete", { method: "DELETE" });

      const body = useCreateNewSchedule(dateList, newSubjects);

      await fetch("/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
    Router.push("/");
  };

  return (
    <Layout>
      <DateListCreator setDateList={setDateList} />

      <SubjectCreator
        newSubjects={newSubjects}
        setNewSubjects={setNewSubjects}
        createNewSchedule={createNewSchedule}
      />

      <Text my="30px" ml="10%" pr="10%" color="blackAlpha.800" fontSize="sm">
        ③時間割を確認し、完成ボタンを押して下さい。
      </Text>
      <Button
        minW="70px"
        ml={["10%", "15%"]}
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        borderColor="red.700"
        _hover={{
          opacity: 0.8,
        }}
        onClick={createNewSchedule}
      >
        完成
      </Button>
    </Layout>
  );
};

export default CreateNewScheduler;
