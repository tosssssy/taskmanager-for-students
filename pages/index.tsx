import React from "react";
import Layout from "../components/Layout";
import { getSession, useSession } from "next-auth/client";
import Subject, { SubjectProps } from "../components/Subject";
import prisma from "./../lib/prisma";
import { GetServerSideProps } from "next";
import Router from "next/router";

//ユーザーのスケジュールを全取得
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (!session) {
    return { props: { subjects: [] } };
  }

  //ユーザーのスケジュール（postのリスト）
  const subjects = await prisma.subject.findMany({
    where: {
      author: { email: session.user.email },
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return { props: { subjects } };
};

//仮
async function deleteAllPost(): Promise<void> {
  await fetch(`http://localhost:3000/api/delete`, {
    method: "DELETE",
  });
  Router.push("/");
}

type Props = {
  subjects: SubjectProps[];
};

const Top: React.VFC<Props> = (props) => {
  const [session] = useSession();
  // const [status, setStatus] = useState(Number);
  // const [memo, setMemo] = useState("");
  if (!session) {
    return (
      <Layout>
        <div>ログインしてください</div>
      </Layout>
    );
  }
  return (
    <Layout>
      <button onClick={() => deleteAllPost()}>Delete</button>
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
