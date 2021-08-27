import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const postId = req.query.id;
  const post = await prisma.user.update({
    where: { id: Number(postId) },
    data: { email: "" },
  });
  res.json(post);
}
