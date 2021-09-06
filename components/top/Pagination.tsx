import { useState, useEffect } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Button, Box, Flex } from "@chakra-ui/react";

export const Pagination = ({
  subjects,
  dateList,
  setDateList,
  firstYMD,
  lastYMD,
  setFirstYMD,
  setLastYMD,
}) => {
  // 0 埋め関数
  const toDoubleDigits = function (num) {
    num += "";
    if (num.length === 1) {
      num = "0" + num;
    }
    return num;
  };

  // 最初の日付
  let start: Date = new Date(subjects[0].date);
  // 最初の日付を日曜に
  while (true) {
    if (start.getDay() === 0) break;
    start = new Date(
      start.getFullYear(),
      toDoubleDigits(start.getMonth()),
      toDoubleDigits(start.getDate() - 1)
    );
  }
  let startDate: string =
    start.getFullYear() +
    "-" +
    toDoubleDigits(start.getMonth() + 1) +
    "-" +
    toDoubleDigits(start.getDate());

  // 終わりの日付
  let end: Date = new Date(subjects[subjects.length - 1].date);
  // 最後の授業が土曜日の時の処理
  if (end.getDay() === 0) {
    end = new Date(subjects[subjects.length - 2].date);
  }

  // 最後の日を土曜に
  if (end.getDay() !== 6) {
    while (true) {
      if (end.getDay() === 6) break;
      end = new Date(
        end.getFullYear(),
        toDoubleDigits(end.getMonth()),
        toDoubleDigits(end.getDate() + 1)
      );
    }
  }
  let endDate: string =
    end.getFullYear() +
    "-" +
    toDoubleDigits(end.getMonth() + 1) +
    "-" +
    toDoubleDigits(end.getDate());

  // 指定された範囲を dateList に配列で格納
  useEffect(() => {
    while (loop <= end) {
      let loopDate: string =
        loop.getFullYear() +
        "-" +
        toDoubleDigits(loop.getMonth() + 1) +
        "-" +
        toDoubleDigits(loop.getDate());
      let loopDay: number = loop.getDay();
      // dateList.push(loopDate)
      dateList = dateList.concat({ date: loopDate, day: loopDay });
      //dateList = dateList.concat({ date: loopDate, day: loopDay });
      let newDate: number = loop.setDate(loop.getDate() + 1);
      loop = new Date(newDate);
    }
    setDateList(dateList);
  }, []);
  let loop: Date = new Date(start);

  let thisMonday = new Date();

  // 今週の日曜
  while (true) {
    if (thisMonday.getDay() === 0) break;
    thisMonday = new Date(
      thisMonday.getFullYear(),
      toDoubleDigits(thisMonday.getMonth()),
      toDoubleDigits(thisMonday.getDate() - 1)
    );
  }

  // 今週から何週目か
  const [cnt, setCnt] = useState(0);

  // < , > 押すと発動
  useEffect(() => {
    const showMonthDate = () => {
      // cnt 週間後の Date オブジェクトを作成
      let myDate = new Date(thisMonday.getTime() + 604800000 * cnt);

      // その週の日曜
      setFirstYMD(
        myDate.getFullYear() +
          "-" +
          toDoubleDigits(myDate.getMonth() + 1) +
          "-" +
          toDoubleDigits(myDate.getDate())
      );

      // その週の土曜
      myDate.setDate(myDate.getDate() + 6);

      setLastYMD(
        myDate.getFullYear() +
          "-" +
          toDoubleDigits(myDate.getMonth() + 1) +
          "-" +
          toDoubleDigits(myDate.getDate())
      );
    };
    showMonthDate();
  }, [cnt]);

  // {{"", "",""}} これでレスポンシブになる

  // onClick 動かないとき タイプミス
  return (
    <Box>
      {!(startDate >= firstYMD) && (
        <button onClick={() => setCnt(cnt - 1)}>
          <ArrowLeftIcon
            position="fixed"
            top="90%"
            left={["10%", "20%", "25%", "38%", "42%"]}
            zIndex="10"
            font-size={"50px"}
            color="blue.400"
            ontouchstart=""
            opacity="0.8"
            _hover={{ opacity: 0.4, transition: "0.5s" }}
            _active={{ opacity: 0.2, color: "red" }}
          />
        </button>
      )}
      <button onClick={() => setCnt(0)}>
        <Button
          colorScheme="blue"
          position="fixed"
          top="91%"
          left={["43%", "45%", "48%", "48%", "48%"]}
          zIndex="10"
          opacity="0.8"
          _hover={{ opacity: 0.4, transition: "0.5s" }}
          _active={{ opacity: 0.2, bg: "red" }}
        >
          今週
        </Button>
      </button>
      {!(endDate <= lastYMD) && (
        <button onClick={() => setCnt(cnt + 1)}>
          <ArrowRightIcon
            position="fixed"
            top="90%"
            left={["80%", "70%", "69%", "58%", "55%"]}
            zIndex="10"
            font-size={"50px"}
            color="blue.400"
            opacity="0.8"
            _hover={{ opacity: 0.4, transition: "0.5s" }}
            _active={{ opacity: 0.2, color: "red" }}
          />
        </button>
      )}
      <Box position="fixed" top="5%" left="40%">
        {firstYMD.slice(0, 4)}
      </Box>
    </Box>
  );
};