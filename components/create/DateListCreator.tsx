import { useState } from "react";
import { useCreateDateList } from "./useCreateDateList";

type Props = {
  setDateList: React.Dispatch<React.SetStateAction<Date[]>>;
};

const DateListCreator = (props: Props) => {
  const { setDateList } = props;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hasRegistered, setHasRegistered] = useState(false);

  const onClick = () => {
    setHasRegistered(true);
    setDateList(useCreateDateList(startDate, endDate));
  };

  return (
    <>
      {!hasRegistered ? (
        <div>
          <input type="date" onChange={(e) => setStartDate(e.target.value)} />
          <input type="date" onChange={(e) => setEndDate(e.target.value)} />
          <button onClick={onClick}>送信</button>
          <br></br>
          <br></br>
        </div>
      ) : (
        <div>{`${startDate} ~ ${endDate}`}</div>
      )}
    </>
  );
};

export default DateListCreator;
