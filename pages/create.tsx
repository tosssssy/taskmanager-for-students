import React, { FC, useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import SubjectCreator from "./../components/create/SubjectCreator";
import DateListCreator from "../components/create/DateListCreator";
import { useCreateNewSchedule } from "./../components/create/useCreateNewSchedule";
import { NewSubjectType } from "../lib/types";

const CreateNewScheduler: FC = () => {
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
      />
      <button onClick={createNewSchedule}>完成</button>
    </Layout>
  );
};

export default CreateNewScheduler;
