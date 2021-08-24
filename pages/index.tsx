import React from "react";
import Layout from "../components/Layout";
import { getSession, useSession } from "next-auth/client";
import { PostProps } from "../components/Post";
import prisma from "./../lib/prisma";
import { GetServerSideProps } from "next";

//ユーザーのスケジュールを全取得
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (session) {
    //ユーザーのスケジュール（postのリスト）
    const subjects = await prisma.post.findMany({
      where: {
        author: { email: session.user.email },
      },
      include: {
        author: {
          select: { name: true },
        },
      },
    });

    return {
      props: { subjects },
    };
  }
  return {
    props: { subjects: [] },
  };
};

type Props = {
  subjects: PostProps[];
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
      {props.subjects.map((subject) => {
        return (
          <>
            <div className="subject" key={subject.id}>
              <div>{subject.author.name}</div>
              <div>{`subjectid=${subject.id}`}</div>
              <div>{`status=${subject.status}`}</div>
              <div>{`title=${subject.title}`}</div>
              <div>{subject.memo}</div>
            </div>
            <style jsx>
              {`
                .subject {
                  display: flex;
                  flex-direction: column;
                  margin: 20px;
                  background-color: white;
                }
              `}
            </style>
          </>
        );
      })}
    </Layout>
  );
};

export default Top;
