// pages/api/post/index.ts

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  for (let i = 0; i < req.body.length; i++) {
    const { name, date, period, day } = req.body[i].newSubject;
    await prisma.subject.create({
      data: {
        name: name,
        date: date,
        period: period,
        day: day,
        author: { connect: { id: Number(session.user.id) } },
      },
    });
  }
  res.end();
}
