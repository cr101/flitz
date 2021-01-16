import { ExchangeRepository, MessageRepository } from "app/domain/repositories"
import { PageService } from "app/domain/services"
import { Id, idSchema, Skip, skipSchema, Take } from "app/domain/valueObjects"
import { Ctx, NotFoundError } from "blitz"
import * as z from "zod"

const inputSchema = z.object({
  skip: skipSchema,
  exchangeId: idSchema,
})

const getExchangeMessagesInfinite = async (
  input: z.infer<typeof inputSchema>,
  ctx: Ctx
) => {
  inputSchema.parse(input)

  ctx.session.authorize()

  const skip = new Skip(input.skip)

  const exchangeId = new Id(input.exchangeId)

  const exchange = await ExchangeRepository.findUniqueExchange({
    skip,
    exchangeId,
  })

  if (exchange === null) {
    throw new NotFoundError()
  }

  const messages = exchange.messages

  const count = await MessageRepository.countGroupMessages({
    exchangeId,
  })

  const take = new Take()

  const hasMore = PageService.hasMore({ count, skip, take })

  const nextPage = hasMore ? PageService.nextPage({ take, skip }) : null

  return { messages, nextPage }
}

export default getExchangeMessagesInfinite
