// pages/api/post/index.ts

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  await prisma.subject.createMany({
    data: [...req.body],
  });
  res.end();
}
