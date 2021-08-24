// pages/api/post/[id].ts

import prisma from "../../../lib/prisma";

// DELETE /api/post/:id
export default async function handle(req, res) {
  if (req.method === "DELETE") {
    const post = await prisma.post.deleteMany({});
    res.json(post);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
