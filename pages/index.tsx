import React from "react";
import Layout from "../components/Layout";
import { getSession, useSession } from "next-auth/client";
import Subject from "../components/Subject";
import prisma from "./../lib/prisma";
import { GetServerSideProps } from "next";
import { SubjectProps } from "../lib/types";
import { Flex } from "@chakra-ui/react";

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
  subjects: SubjectProps[];
};

const Top: React.VFC<Props> = (props) => {
  const [session] = useSession();
  if (!session) {
    return (
      <Layout>
        <div>ログインしてください</div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div>課題管理がここでできる</div>
      <Flex direction={"column"}>
        {props.subjects.map((subject, index) => {
          return (
            <>
              <Subject {...subject} key={index} />
            </>
          );
        })}
      </Flex>
    </Layout>
  );
};

export default Top;
