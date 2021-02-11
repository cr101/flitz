import { Id } from "integrations/domain/valueObjects"

export const includeEmbededPost = (userId: Id | null) => {
  return {
    likes: userId ? { where: { userId: userId.value } } : false,
    quotations: userId ? { where: { userId: userId.value } } : false,
    replies: userId ? { where: { userId: userId.value } } : false,
    user: { include: { iconImage: true } },
  }
}
