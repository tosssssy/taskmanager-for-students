import React, { FC, useState } from "react";
import Layout from "../components/Layout";
import { getSession } from "next-auth/client";
import { Subject } from "../components/top/Subject";
import prisma from "./../lib/prisma";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { SubjectType } from "../lib/types";
import { Box, Flex, Link } from "@chakra-ui/react";
import { Pagination } from "../components/top/Pagination";

//ユーザーのスケジュールを全取得（subjectのリスト）
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
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

const Top: FC<Props> = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { subjects } = props;
  const [dateList, setDatelist] = useState<
    Array<{ date: string; day: number }>
  >([]);

  if (!subjects.length) {
    return (
      <Layout>
        <div>新規作成してください</div>;
      </Layout>
    );
  }

  // 曜日！
  const Day = ["日", "月", "火", "水", "木", "金", "土"];

  // 配列の表示範囲
  const [firstYMD, setFirstYMD] = useState("2");
  const [lastYMD, setLastYMD] = useState("3");

  return (
    <Layout>
      <Box textAlign="right" fontSize="25px" p="15px">
        {firstYMD.slice(0, 4)}
      </Box>
      <Box p={"30px 20px 70px 20px"} minW={"375px"} maxW={"840px"} m={"auto"}>
        {/* 全日付 */}
        {dateList.map((oneday, index) => (
          <Box>
            {/* 範囲指定 */}
            {oneday.date >= firstYMD && oneday.date <= lastYMD && (
              <Box>
                <Flex key={index} fontSize={20}>
                  {oneday.date.slice(5, 10)}
                  {"("}
                  {Day[oneday.day] !== "日" ? (
                    Day[oneday.day] === "土" ? (
                      <Box color="blue.400">{Day[oneday.day]}</Box>
                    ) : (
                      <Box>{Day[oneday.day]}</Box>
                    )
                  ) : (
                    <Box color="red.400">{Day[oneday.day]}</Box>
                  )}
                  {")"}
                </Flex>
                <Flex flexWrap="wrap">
                  {subjects.map((lesson) => (
                    <Box>
                      {/* 授業がある日を表示 */}
                      {oneday.date === String(lesson.date).slice(0, 10) && (
                        <Subject {...lesson} />
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
      <Pagination
        dateList={dateList}
        setDateList={setDatelist}
        subjects={subjects}
        firstYMD={firstYMD}
        setFirstYMD={setFirstYMD}
        lastYMD={lastYMD}
        setLastYMD={setLastYMD}
      />
    </Layout>
  );
};

export default Top;
