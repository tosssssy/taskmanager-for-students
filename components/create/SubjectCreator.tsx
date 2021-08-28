import { options } from "next-auth/client";
import { useState } from "react";
import Subject from "../Subject";
import NewSubject from "./NewSubject";
import InputSubjectInfo from "./InputSubjectInfo";
import { NewSubjectProps } from "../../lib/types";

type Props = {
  newSubjects: NewSubjectProps[];
  setNewSubjects: React.Dispatch<React.SetStateAction<NewSubjectProps[]>>;
};

const SubjectCreator = (props: Props) => {
  const { newSubjects, setNewSubjects } = props;
  const [subject, setSubject] = useState("");
  const [period, setPeriod] = useState(Number);
  const [day, setDay] = useState("");
  const date: Date = null;

  const addSubject = () => {
    const newSubject: NewSubjectProps = {
      newSubject: {
        subject: subject,
        date: date,
        period: period,
        day: day,
      },
    };
    setNewSubjects(newSubjects.concat(newSubject));
  };

  const deleteSubject = (key: number) => {
    const newList = newSubjects.filter((_, index) => {
      return index !== key;
    });
    setNewSubjects(newList);
  };

  const newSubjectsView = newSubjects.map((subject, index) => {
    return (
      <>
        <div key={index}>
          <NewSubject
            subject={subject}
            deleteSubject={() => deleteSubject(index)}
          />
        </div>
      </>
    );
  });

  return (
    <>
      <InputSubjectInfo
        subject={subject}
        setSubject={setSubject}
        period={period}
        setPeriod={setPeriod}
        day={day}
        setDay={setDay}
        addSubject={addSubject}
      />

      {newSubjectsView}
    </>
  );
};

export default SubjectCreator;
