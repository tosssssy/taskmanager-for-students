import { options } from "next-auth/client";
import { useState } from "react";
import NewSubject from "./NewSubject";
import InputSubjectInfo from "./InputSubjectInfo";
import { NewSubjectType } from "../../lib/types";

type Props = {
  newSubjects: NewSubjectType[];
  setNewSubjects: React.Dispatch<React.SetStateAction<NewSubjectType[]>>;
};

const SubjectCreator = (props: Props) => {
  const { newSubjects, setNewSubjects } = props;
  const [name, setName] = useState("");
  const [period, setPeriod] = useState(Number);
  const [day, setDay] = useState("");
  const date: Date = null;

  const addSubject = () => {
    const newSubject: NewSubjectType = {
      newSubject: {
        name: name,
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
        name={name}
        setName={setName}
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
