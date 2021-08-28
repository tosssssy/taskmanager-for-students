import React from "react";
import { SubjectProps } from "../lib/types";


const Subject: React.FC<SubjectProps> = (props) => {
  return (
    <>
      <div>subjectコンポーネント</div>
      <div>{props.subject}</div>
    </>
  );
};

export default Subject;
