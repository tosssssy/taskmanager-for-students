import React from "react";
import Router from "next/router";
import { NewSubjectProps } from "../../pages/create";

const NewSubject: React.FC<NewSubjectProps> = (props) => {
  const { subject, week, period, day } = props.newSubject;
  return (
    <>
      <div>
        <div>{subject}</div>
        <div>{week}</div>
        <div>{period}</div>
        <div>{day}</div>
      </div>
    </>
  );
};

export default NewSubject;
