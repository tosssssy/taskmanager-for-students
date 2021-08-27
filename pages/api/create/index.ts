// pages/api/post/index.ts

import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

//TODO subjectのオブジェクトを受け取り、一気に登録する処理に変更
export default async function (req, res) {
  const session = await getSession({ req });

  for (let i = 0; i < req.body.length; i++) {
    const { subject, date, period, day } = req.body[i].newSubject;
    await prisma.subject.create({
      data: {
        subject: subject,
        date: date,
        period: period,
        day: day,
        author: { connect: { email: session.user.email } },
      },
    });
  }
  res.end();
}
