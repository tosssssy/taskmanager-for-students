import { options } from "next-auth/client";
import { useState } from "react";
import { NewSubjectProps } from "../../pages/create";
import Subject from "../Subject";
import NewSubject from "./NewSubject";

type Props = {
  newSubjects: NewSubjectProps[];
  setNewSubjects: React.Dispatch<React.SetStateAction<NewSubjectProps[]>>;
  createNewSchedule: () => Promise<void>;
};

const SubjectCreator: React.FC<Props> = (props) => {
  const { newSubjects, setNewSubjects, createNewSchedule } = props;
  const [subject, setSubject] = useState("");
  const [week, setWeek] = useState(0);
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
    const newSubject: NewSubjectProps = {
      newSubject: {
        subject: subject,
        week: week,
        period: period,
        day: day,
      },
    };

    setNewSubjects(newSubjects.concat(newSubject));
  };
  return (
    <>
      <button onClick={submitToParent}>完成</button>
      <button onClick={addSubject} disabled={!subject || !period || !day}>
        追加
      </button>

      <input
        autoFocus
        onChange={(e) => setSubject(e.target.value)}
        placeholder="subject"
        type="text"
        value={subject}
      />
      <select name="period" onChange={(e) => setPeriod(Number(e.target.value))}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
      </select>

      <select name="day" onChange={(e) => setDay(e.target.value)}>
        <option>Sunday</option>
        <option>Monday</option>
        <option>Tuesday</option>
        <option>Wednesday</option>
        <option>Thursday</option>
        <option>Friday</option>
        <option>Saturday</option>
      </select>

      {newSubjects.map((subject, index) => {
        return (
          <>
            <NewSubject {...subject} key={index} />
          </>
        );
      })}
    </>
  );
};

export default SubjectCreator;
