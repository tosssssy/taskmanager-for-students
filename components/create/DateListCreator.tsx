import { options } from "next-auth/client";
import { useState } from "react";
import { NewSubjectProps } from "../../pages/create";
import Subject from "../Subject";
import NewSubject from "./NewSubject";
import InputArea from "./InputArea";
import { useCreateDateList } from "./useCreateDateList";

type Props = {
  setDateList: React.Dispatch<React.SetStateAction<string[]>>;
};

const DateListCreator = (props: Props) => {
  const { setDateList } = props;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const onClick = () => {
    setDateList(useCreateDateList(startDate, endDate));
  };

  return (
    <>
      <p>例）2021/09/1</p>
      <input type="text" onChange={(e) => setStartDate(e.target.value)} />
      <p>例）2021/10/3</p>
      <input type="text" onChange={(e) => setEndDate(e.target.value)} />
      <button onClick={onClick}>送信</button>
      <br></br>
      <br></br>
    </>
  );
};

export default DateListCreator;
