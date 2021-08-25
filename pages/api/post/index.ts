// pages/api/post/index.ts

import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { subject, period, day, status, memo } = req.body;

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
