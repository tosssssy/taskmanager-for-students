// pages/api/post/index.ts

import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  //TODO subjectのオブジェクトを受け取り、一気に登録する処理に変更
  const { subject, period, day } = req.body;
  const status = 0;
  const memo = "";
  const session = await getSession({ req });
  const result = await prisma.subject.create({
    data: {
      subject: subject,
      period: period,
      day: day,
      status: status,
      memo: memo,
      author: { connect: { email: session.user.email } },
    },
  });
  res.json(result);
}
