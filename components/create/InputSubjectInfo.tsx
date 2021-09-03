import { Dispatch, SetStateAction } from "react";

type Props = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  period: number;
  setPeriod: Dispatch<SetStateAction<number>>;
  day: string;
  setDay: Dispatch<SetStateAction<string>>;
  addSubject: any;
};

const InputSubjectInfo = (props: Props) => {
  const { name, setName, period, setPeriod, day, setDay, addSubject } = props;
  return (
    <>
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
        onChange={(e) => setName(e.target.value)}
        placeholder="教科名"
        type="text"
        value={name}
      />
      <button onClick={addSubject} disabled={!name || !period || !day}>
        追加
      </button>
    </>
  );
};

export default InputSubjectInfo;
