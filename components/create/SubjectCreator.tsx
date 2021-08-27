import { options } from "next-auth/client";
import { useState } from "react";
import { NewSubjectProps } from "../../pages/create";
import Subject from "../Subject";
import NewSubject from "./NewSubject";
import InputArea from "./InputArea";

type Props = {
  newSubjects: NewSubjectProps[];
  setNewSubjects: React.Dispatch<React.SetStateAction<NewSubjectProps[]>>;
};

const SubjectCreator = (props: Props) => {
  const { newSubjects, setNewSubjects } = props;
  const [subject, setSubject] = useState("");
  const [date, setdate] = useState("");
  const [period, setPeriod] = useState(Number);
  const [day, setDay] = useState("");

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
      <InputArea
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
