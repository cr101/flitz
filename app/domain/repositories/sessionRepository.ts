import { Id } from "app/domain/valueObjects/id"
import { Name } from "app/domain/valueObjects/name"
import { Username } from "app/domain/valueObjects/username"
import { UserRole } from "app/domain/valueObjects/userRole"
import { SessionContext } from "blitz"

export class SessionRepository {
  static createSession(
    session: SessionContext,
    input: {
      name: Name | null
      role: UserRole
      userId: Id
      username: Username
    }
  ) {
    return session.create({
      name: input.name?.value || "",
      roles: [input.role.value],
      userId: input.userId.value,
      username: input.username.value,
    })
  }
  static async revokeSession(session: SessionContext) {
    await session.revoke()
  }
}