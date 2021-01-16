import {
  FriendshipRepository,
  NotificationRepository,
  PostRepository,
} from "app/domain/repositories"
import { Id, idSchema, PostText, postTextSchema } from "app/domain/valueObjects"
import { Ctx } from "blitz"
import * as z from "zod"

const inputSchema = z.object({
  text: postTextSchema,
  postId: idSchema,
})

const createReply = async (input: z.infer<typeof inputSchema>, ctx: Ctx) => {
  inputSchema.parse(input)

  ctx.session.authorize()

  const text = new PostText(input.text)

  const postId = new Id(input.postId)

  const userId = new Id(ctx.session.userId)

  const friendships = await FriendshipRepository.getFollowers({
    followeeId: userId,
  })

  const post = await PostRepository.createReply({
    friendships,
    postId,
    text,
    userId,
  })

  const [reply] = post.replies

  await NotificationRepository.createReplyNotification({
    postUserId: new Id(post.userId),
    replyId: new Id(reply.id),
  })

  return post
}

export default createReply
