import { useState } from "react";
import { NewSubjectProps } from "../../pages/create";
import Subject from "../Subject";

type Props = {
  newSubjects: NewSubjectProps[];
  setNewSubjects: React.Dispatch<React.SetStateAction<NewSubjectProps[]>>;
  createNewSchedule: () => Promise<void>;
};

const SubjectCreator: React.FC<Props> = (props) => {
  const { newSubjects, setNewSubjects, createNewSchedule } = props;
  const [subject, setSubject] = useState("");
  const [period, setPeriod] = useState(Number);
  const [day, setDay] = useState("");

  //並べ替えてから親のコンポーネントに渡す関数
  const submitToParent = () => {
    // ------------------
    // 並べ替え処理
    // ------------------
    createNewSchedule();
  };

  const addSubject = () => {
    const newSubject = {
      newSubject: {
        subject: subject,
        period: period,
        day: day,
      },
    };
    setNewSubjects(newSubjects.concat(newSubject));
  };
  return (
    <>
      <button onClick={submitToParent}>完成</button>
    </>
  );
};

export default SubjectCreator;
