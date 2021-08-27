// pages/create.tsx

import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import { useSession } from "next-auth/client";
import { SubjectProps } from "../components/Subject";
import SubjectCreator from "./../components/create/SubjectCreator";
import CalenderCreator from "./../components/create/CalenderCreator";

// export type NewSubjectProps = {
//   newSubject: Pick<SubjectProps, "subject" | "period" | "day">
// }

export type NewSubjectProps = {
  newSubject: Pick<SubjectProps, "subject" | "date" | "period" | "day">;
};

const CreateNewScheduler: React.FC = () => {
  const [session] = useSession();
  const [newSubjects, setNewSubjects] = useState<Array<NewSubjectProps>>([]);
  const [calender, setCalender] = useState<Array<string>>([]);

  //スケジュール新規作成
  const createNewSchedule = async () => {
    // e.preventDefault();
    // try {
    //   const body = newSubjects;
    //   await fetch("/api/post", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(body),
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
    console.log(newSubjects);
  };

  if (!session) {
    return (
      <Layout>
        <div>ログインしてください</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SubjectCreator
        newSubjects={newSubjects}
        setNewSubjects={setNewSubjects}
        createNewSchedule={createNewSchedule}
      />
      <CalenderCreator setCalender={setCalender} />
    </Layout>
  );
};

export default CreateNewScheduler;
