import db from "db"
import { Id, Username } from "integrations/domain"

export class UserQuery {
  async find(userId: Id) {
    const user = await db.user.findUnique({
      include: {
        iconImage: true,
      },
      where: { id: userId.value },
    })

    return user
  }

  async findByUsername(input: { userId: Id | null; username: Username }) {
    const user = await db.user.findUnique({
      include: {
        followers: input.userId
          ? { where: { followerId: input.userId.value } }
          : false,
        headerImage: true,
        iconImage: true,
      },
      where: { username: input.username.value },
    })

    return user
  }
}