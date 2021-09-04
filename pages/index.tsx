import React, { useState } from "react";
import Layout from "../components/Layout";
import { getSession, useSession } from "next-auth/client";
import {Subject} from "../components/Subject";
import prisma from "./../lib/prisma";
import { GetServerSideProps } from "next";
import { SubjectType } from "../lib/types";
import { Box, Flex, Link } from "@chakra-ui/react";
import {ChangeBtn} from "../components/top/changeBtn";
import {SelectBtn} from "../components/top/SelectBtn"

//ユーザーのスケジュールを全取得（subjectのリスト）
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) return { props: { subjects: [] } };

  const data = await prisma.subject.findMany({
    where: { author: { id: Number(session.user.id) } },
  });

  const subjects = JSON.parse(JSON.stringify(data));
  console.log(subjects);

  return { props: { subjects } };
};

type Props = {
  subjects: SubjectType[];
};

const Top: React.VFC<Props> = (props) => {
  const [session] = useSession();
  const {subjects} = props;

    // 0 埋め関数
    const toDoubleDigits = function (num) {
      num += "";
      if (num.length === 1) {
        num = "0" + num;
      }
      return num;
    };
  
    // 最初の日付
    let start:Date = new Date(subjects[0].date);
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
    let end :Date= new Date(subjects[subjects.length - 1].date);
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
    let endDate :string =
      end.getFullYear() +
      "-" +
      toDoubleDigits(end.getMonth() + 1) +
      "-" +
      toDoubleDigits(end.getDate());
  
    // 全データを格納
    let dateList: { date: string, day: number }[] = [];
  
    // 曜日！
    const selectDay = ["日", "月", "火", "水", "木", "金", "土"];
  
    // 配列の表示範囲
    const [firstYMD, setFirstYMD] = useState("2");
    const [lastYMD, setLastYMD] = useState("3");
  
    // 指定された範囲を dateList に配列で格納
    let loop: Date = new Date(start);
  
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
  if (!session) {
    return (
      <Layout>
        <div>ログインしてください</div>
      </Layout>
    );
  }
  return (
    <Layout>
      <Box ml={["15px", "10%", "14%", "27%"]} pb="70px">
        <ChangeBtn
          startDate={startDate}
          endDate={endDate}
          firstYMD={firstYMD}
          setFirstYMD={setFirstYMD}
          lastYMD={lastYMD}
          setLastYMD={setLastYMD}
          toDoubleDigits={toDoubleDigits}
        />
        <br />

        {/* div いらなそうなら消してくれ */}
        {/* 全日付 */}
        {dateList.map((oneday, index) => (
          <Box>
            {/* 範囲指定 */}
            {oneday.date >= firstYMD && oneday.date <= lastYMD && (
              <Box>
                <Flex key={index} fontSize={20}>
                  {oneday.date.slice(5, 10)}
                  {"("}
                  {selectDay[oneday.day] !== "日" ? (
                    selectDay[oneday.day] === "土" ? (
                      <Box color="blue.400">{selectDay[oneday.day]}</Box>
                    ) : (
                      <Box>{selectDay[oneday.day]}</Box>
                    )
                  ) : (
                    <Box color="red.400">{selectDay[oneday.day]}</Box>
                  )}
                  {")"}
                </Flex>
                <Flex flexWrap="wrap">
                  {subjects.map((lesson) => (
                    <Box>
                      {/* 授業がある日を表示 */}
                      {oneday.date === lesson.date.slice(0, 10) && (
                          <SelectBtn {...lesson} />
                      )}
                    </Box>
                  ))}
                </Flex>
                <Box mt="20px" border="1px" borderColor="blue.200"></Box>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Layout>
    );
  }

export default Top;
