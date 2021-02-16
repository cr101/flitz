import db from "db"
import {
  Count,
  Id,
  Skip,
  Take,
  Username,
} from "integrations/domain/valueObjects"
import { includeEmbededPost } from "integrations/infrastructure/utils"

export class UserLikeQuery {
  async count(input: { username: Username }) {
    const count = await db.like.count({
      where: { user: { username: input.username.value } },
    })

    return new Count(count)
  }

  async findMany(input: {
    userId: Id | null
    skip: Skip
    take: Take
    username: Username
  }) {
    const likes = await db.like.findMany({
      include: {
        post: {
          include: {
            likes: input.userId
              ? { where: { userId: input.userId.value } }
              : false,
            quotation: { include: includeEmbededPost(input.userId) },
            quotations: input.userId
              ? { where: { userId: input.userId.value } }
              : false,
            replies: input.userId
              ? { where: { userId: input.userId.value } }
              : false,
            reply: { include: includeEmbededPost(input.userId) },
            user: { include: { iconImage: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: input.skip.value,
      take: input.take.value,
      where: { user: { username: input.username.value } },
    })

    return likes
  }
}