// pages/create.tsx

import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import { useSession } from "next-auth/client";
import { SubjectProps } from "../components/Subject";

// export type NewSubjectProps = {
//   newSubject: Pick<SubjectProps, "subject" | "period" | "day">
// }

export type NewSubjectProps = {
  newSubject: Pick<SubjectProps, "subject" | "period" | "day">;
};

const CreateNewScheduler: React.FC = () => {
  const [session] = useSession();
  const [newSubjects, setNewSubjects] = useState<Array<NewSubjectProps>>([]);

  //スケジュール新規作成
  const createNewSchedule = async () => {
    // e.preventDefault();
    try {
      const body = newSubjects;
      await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
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
      {/* <div>スケジュールの新規作成がここでできる</div>
      <div>
        <form onSubmit={createNewSchedule}>
          <h1>New Draft</h1>
          <input
            autoFocus
            onChange={(e) => setSubject(e.target.value)}
            placeholder="subject"
            type="text"
            value={subject}
          />
          <input
            onChange={(e) => setPeriod(e.target.valueAsNumber)}
            placeholder="Period"
            type="number"
            value={period}
          />
          <textarea
            cols={50}
            onChange={(e) => setDay(e.target.value)}
            placeholder="Day"
            rows={1}
            value={day}
          />
          <input disabled={!status || !subject} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </div> */}
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="number"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default CreateNewScheduler;
