// pages/api/post/[id].ts

import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/client";

// DELETE /api/post/:id
export default async function handle(req, res) {
  const session = await getSession({ req });
  if (req.method === "DELETE") {
    const post = await prisma.post.deleteMany({
      where: { author: { email: session.user.email } },
    });
    res.json(post);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
