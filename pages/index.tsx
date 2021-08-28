import React from "react";
import Layout from "../components/Layout";
import { getSession, useSession } from "next-auth/client";
import Subject, { SubjectProps } from "../components/Subject";
import prisma from "./../lib/prisma";
import { GetServerSideProps } from "next";

//ユーザーのスケジュールを全取得
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (!session) {
    return { props: { subjects: [] } };
  }

  //ユーザーのスケジュール（subjectのリスト）
  const data = await prisma.subject.findMany({
    where: {
      author: { email: session.user.email },
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
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
      {props.subjects.map((subject, index) => {
        return (
          <>
            <Subject {...subject} key={index} />
          </>
        );
      })}
    </Layout>
  );
};

export default Top;
