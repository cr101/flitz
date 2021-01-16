import { NotificationRepository, UserRepository } from "app/domain/repositories"
import { Id, idSchema } from "app/domain/valueObjects"
import { Ctx } from "blitz"
import * as z from "zod"

const inputSchema = z.object({ userId: idSchema })

const transformer = inputSchema.transform(
  z.object({
    userId: z.instanceof(Id),
  }),
  (input) => ({
    userId: new Id(input.userId),
  })
)

const followUser = async (input: z.infer<typeof inputSchema>, ctx: Ctx) => {
  ctx.session.authorize()

  const { userId: followeeId } = transformer.parse(input)

  const followerId = new Id(ctx.session.userId)

  if (followerId.value === followeeId.value) {
    throw new Error("Unexpected error")
  }

  const user = await UserRepository.followUser({ followeeId, followerId })

  const [friendship] = user.followers

  await NotificationRepository.upsertFollowNotification({
    followeeId,
    followerId,
    friendshipId: new Id(friendship.id),
  })

  return user
}

export default followUser