import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import { useSession } from "next-auth/client";
import { SubjectProps } from "../components/Subject";
import SubjectCreator from "./../components/create/SubjectCreator";
import DateListCreator from "../components/create/DateListCreator";
import { useCreateNewSchedule } from "./../components/create/useCreateNewSchedule";

export type NewSubjectProps = {
  newSubject: Pick<SubjectProps, "subject" | "date" | "period" | "day">;
};

const CreateNewScheduler: React.FC = () => {
  const [session] = useSession();
  const [newSubjects, setNewSubjects] = useState<Array<NewSubjectProps>>([]);
  const [dateList, setDateList] = useState<Array<Date>>([]);

  const createNewSchedule = async () => {
    try {
      deleteAllPost();
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

  async function deleteAllPost(): Promise<void> {
    await fetch(`http://localhost:3000/api/delete`, {
      method: "DELETE",
    });
  }

  if (!session) {
    return (
      <Layout>
        <div>ログインしてください</div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* {dateList.length < 1 ? ( */}
      <DateListCreator setDateList={setDateList} />
      {/* ) : null} */}
      {/* {dateList[0]}
        {dateList[dateList.length - 1]} */}

      <SubjectCreator
        newSubjects={newSubjects}
        setNewSubjects={setNewSubjects}
      />
      <button onClick={createNewSchedule}>完成</button>
    </Layout>
  );
};

export default CreateNewScheduler;
