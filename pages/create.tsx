// pages/create.tsx

import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import { useSession } from "next-auth/client";

const CreateNewScheduler: React.FC = () => {
  const [session] = useSession();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(Number);
  const [memo, setMemo] = useState("");

  //スケジュール新規作成
  const createNewSchedule = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, status, memo };
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
      <div>スケジュールの新規作成がここでできる</div>
      <div>
        <form onSubmit={createNewSchedule}>
          <h1>New Draft</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <input
            onChange={(e) => setStatus(e.target.valueAsNumber)}
            placeholder="Status"
            type="number"
            value={status}
          />
          <textarea
            cols={50}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="Memo"
            rows={1}
            value={memo}
          />
          <input disabled={!status || !title} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </div>
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
