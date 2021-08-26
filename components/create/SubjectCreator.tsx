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
      <select name="day" onChange={(e) => setDay(e.target.value)}>
        <option>曜日</option>
        <option value="Sun">日曜</option>
        <option value="Mon">月曜</option>
        <option value="Tue">火曜</option>
        <option value="Wed">水曜</option>
        <option value="Thu">木曜</option>
        <option value="Fri">金曜</option>
        <option value="Sat">土曜</option>
      </select>
      <select name="period" onChange={(e) => setPeriod(Number(e.target.value))}>
        <option>時限</option>
        <option value="1">1限目</option>
        <option value="2">2限目</option>
        <option value="3">3限目</option>
        <option value="4">4限目</option>
        <option value="5">5限目</option>
        <option value="6">6限目</option>
      </select>
      <input
        autoFocus
        onChange={(e) => setSubject(e.target.value)}
        placeholder="教科名"
        type="text"
        value={subject}
      />
      <button onClick={addSubject} disabled={!subject || !period || !day}>
        追加
      </button>

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
