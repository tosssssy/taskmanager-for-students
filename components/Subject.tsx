import React from "react";
import Router from "next/router";

export type SubjectProps = {
  id: number;
  author: {
    name: string;
    email: string;
  } | null;
  subject: string;
  date: Date;
  period: number;
  day: string;
  status: number;
  memo?: string;
};

const Subject: React.FC<SubjectProps> = (props) => {
  return (
    <>
      <div>subjectコンポーネント</div>
      <div>{props.subject}</div>
    </>
  );
};

export default Subject;
