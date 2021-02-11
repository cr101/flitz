import { resolver } from "blitz"
import { Id } from "integrations/domain"
import { ExchangeRepository } from "integrations/infrastructure"

export default resolver.pipe(
  resolver.authorize(),
  (_: unknown, ctx) => ({
    userId: new Id(ctx.session.userId),
  }),
  async ({ userId }) => {
    const exchangeRepository = new ExchangeRepository()

    const { exchange } = await exchangeRepository.getUserExchange({ userId })

    return exchange !== null
  }
)
