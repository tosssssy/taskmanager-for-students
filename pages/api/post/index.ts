// pages/api/post/index.ts

import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { title, status, memo } = req.body;

  const session = await getSession({ req });
  const result = await prisma.post.create({
    data: {
      title: title,
      status: status,
      memo: memo,
      author: { connect: { email: session?.user?.email || undefined } },
    },
  });
  res.json(result);
}
